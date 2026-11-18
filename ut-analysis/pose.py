"""MediaPipe Pose Landmarker(heavy)로 10 fps 랜드마크 추출 → npz 저장.

사용: python3 pose.py <영상폴더> <출력폴더> <참가자번호 ...>

저장 항목 (프레임 N개)
  t        (N,)       초
  img      (N,33,4)   정규화 이미지 좌표 x,y,z,visibility (검출 실패 시 NaN)
  world    (N,33,3)   world 좌표(m)
  rot      (N,)       0 = 원본, 1 = 시계 방향 90° 회전본에서 검출 (가로 영상 01 전용)
  W, H     검출에 쓴 이미지 크기 (rot=1이면 W/H가 뒤바뀜)
"""
import sys
from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks.python import BaseOptions, vision

MODEL = str(Path(__file__).parent / "models" / "pose_landmarker_heavy.task")
FPS = 10
TORSO = [11, 12, 23, 24]
# 촬영 중 카메라가 시계 방향 90° 돌아간 영상: (전환 시작 s, 전환 완료 s) — 01은 165.5–167s 프레임 육안 확인
ROT_WINDOW = {"01": (166.0, 167.0)}


def make():
    return vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(
        base_options=BaseOptions(model_asset_path=MODEL),
        running_mode=vision.RunningMode.VIDEO, num_poses=1))


def detect(lm, frame, ms):
    r = lm.detect_for_video(mp.Image(image_format=mp.ImageFormat.SRGB,
                                     data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)), ms)
    if not r.pose_landmarks:
        return None
    img = np.array([[p.x, p.y, p.z, p.visibility] for p in r.pose_landmarks[0]])
    world = np.array([[p.x, p.y, p.z] for p in r.pose_world_landmarks[0]])
    return img, world


def upright(img, w, h):
    sh = (img[11, :2] + img[12, :2]) / 2
    hp = (img[23, :2] + img[24, :2]) / 2
    return np.degrees(np.arctan2(abs((sh[0] - hp[0]) * w), -(sh[1] - hp[1]) * h))


def run(vid: Path, out: Path):
    cap = cv2.VideoCapture(str(vid))
    src_fps = cap.get(cv2.CAP_PROP_FPS)
    n_src = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w, h = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    landscape = w > h
    lm, lm_rot = make(), (make() if landscape else None)
    ts, imgs, worlds, rots = [], [], [], []
    step = src_fps / FPS
    nxt, i = 0.0, 0
    while True:
        ok, f = cap.read()
        if not ok:
            break
        if i >= nxt - 1e-6:
            ms = int(round(i / src_fps * 1000))
            best, rot = detect(lm, f, ms), 0
            win = ROT_WINDOW.get(vid.stem)
            sec = i / src_fps
            if landscape and win and sec >= win[0]:
                alt = detect(lm_rot, cv2.rotate(f, cv2.ROTATE_90_CLOCKWISE), ms)
                # 회전 전환 구간에서는 몸통이 영상 수직에 더 가까운 쪽, 전환 이후에는 회전본만 사용
                if sec >= win[1] or (alt is not None and (best is None or upright(alt[0], h, w) < upright(best[0], w, h))):
                    best, rot = alt, 1
            ts.append(i / src_fps)
            rots.append(rot)
            if best is None:
                imgs.append(np.full((33, 4), np.nan))
                worlds.append(np.full((33, 3), np.nan))
            else:
                imgs.append(best[0])
                worlds.append(best[1])
            nxt += step
        i += 1
    np.savez_compressed(out, t=np.array(ts), img=np.array(imgs), world=np.array(worlds),
                        rot=np.array(rots), W=w, H=h, n_src=n_src, src_fps=src_fps)
    print(vid.stem, len(ts), "frames,", int(np.isnan(np.array(imgs)[:, 0, 0]).sum()), "missing", flush=True)


if __name__ == "__main__":
    vdir, odir = Path(sys.argv[1]), Path(sys.argv[2])
    odir.mkdir(parents=True, exist_ok=True)
    for pid in sys.argv[3:]:
        dst = odir / f"{pid}.npz"
        if not dst.exists():
            run(vdir / f"{pid}.mp4", dst)
