"""포즈 npz + 구간 정보 → 프레임별 각도/손 영역/포즈 코드, 구간 셀 데이터, Raw 지표 계산.

사용: python3 analyze.py <영상폴더> <out폴더>
입력: out/pose/<pid>.npz, out/segments.json
출력: out/results.json, out/cells/<pid>_P<k>_<t>.jpg, out/timelines/<pid>_timeline.png
"""
import json
import sys
from collections import Counter
from pathlib import Path

import cv2
import matplotlib
import numpy as np

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib import font_manager  # noqa: E402

VID, OUT = Path(sys.argv[1]), Path(sys.argv[2])
CELL_W, CELL_H = 732, 1298          # 셀 이미지(366×649)의 2배 해상도
COLORS = {"H": "#7b61ff", "C2": "#e8590c", "C1": "#f59f00", "W": "#2f9e44",
          "N": "#868e96", "T": "#1c7ed6", "S1": "#0b7285", "S2": "#c2255c"}
L_SH, R_SH, L_HIP, R_HIP, L_KN, R_KN, L_AN, R_AN, L_WR, R_WR, NOSE = 11, 12, 23, 24, 25, 26, 27, 28, 15, 16, 0
EDGES = [(11, 12), (11, 23), (12, 24), (23, 24), (11, 13), (13, 15), (12, 14), (14, 16),
         (23, 25), (25, 27), (24, 26), (26, 28), (0, 11), (0, 12)]
VIS = 0.5


# ---------------------------------------------------------------- 기하 계산
def angle(a, b, c):
    """b에서 a-b-c 각도(°). 입력 (N,3)."""
    v1, v2 = a - b, c - b
    cos = (v1 * v2).sum(-1) / (np.linalg.norm(v1, axis=-1) * np.linalg.norm(v2, axis=-1))
    return np.degrees(np.arccos(np.clip(cos, -1, 1)))


def frame_features(d):
    img, world = d["img"], d["world"]
    W, H = float(d["W"]), float(d["H"])
    rot = d["rot"]
    # 회전 검출 프레임은 이미지 폭/높이가 뒤바뀜
    pw = np.where(rot == 1, H, W)
    ph = np.where(rot == 1, W, H)
    vis = img[:, :, 3]
    knee_l = angle(world[:, L_HIP], world[:, L_KN], world[:, L_AN])
    knee_r = angle(world[:, R_HIP], world[:, R_KN], world[:, R_AN])
    hip_l = angle(world[:, L_SH], world[:, L_HIP], world[:, L_KN])
    hip_r = angle(world[:, R_SH], world[:, R_HIP], world[:, R_KN])
    # 다리 랜드마크(엉덩이·무릎) visibility 합이 큰 쪽 한쪽 값을 사용 (기존 06–17 값과 오차 최소)
    left_side = (vis[:, L_KN] + vis[:, L_HIP]) >= (vis[:, R_KN] + vis[:, R_HIP])
    knee = np.where(left_side, knee_l, knee_r)
    hip = np.where(left_side, hip_l, hip_r)
    # 몸통 기울기: 엉덩이 중점→어깨 중점 벡터와 영상 수직 사이 각도(픽셀 비율 보정)
    sh = (img[:, L_SH, :2] + img[:, R_SH, :2]) / 2
    hp = (img[:, L_HIP, :2] + img[:, R_HIP, :2]) / 2
    dx, dy = (sh[:, 0] - hp[:, 0]) * pw, (sh[:, 1] - hp[:, 1]) * ph
    tilt = np.degrees(np.arctan2(np.abs(dx), -dy))
    # 거꾸로 검출된 프레임(몸통 기울기 >100°)은 오검출로 보고 미검출 처리
    bad = tilt > 100
    img = img.copy()
    img[bad] = np.nan
    world = world.copy()
    world[bad] = np.nan
    for a in (knee, hip, tilt):
        a[bad] = np.nan
    # 손목 영역
    torso_len = (hp[:, 1] - sh[:, 1])
    sh_w = np.abs(img[:, L_SH, 0] - img[:, R_SH, 0]) * pw / ph   # 높이 단위로 환산
    zones, heights = [], []
    for wr in (L_WR, R_WR):
        x, y, v = img[:, wr, 0], img[:, wr, 1], vis[:, wr]
        h = (y - sh[:, 1]) / torso_len
        front = np.abs((x - (sh[:, 0] + hp[:, 0]) / 2) * pw / ph) <= np.maximum(sh_w * 0.75, 0.04)
        z = np.full(len(x), "아래", dtype=object)
        z[front & (h <= 1.15)] = "배·허리"
        z[front & (h <= 0.45)] = "목·가슴"
        z[y < img[:, NOSE, 1]] = "머리"
        z[v < VIS] = "가림"
        z[np.isnan(x)] = "–"
        zones.append(z)
        heights.append(np.where(z == "목·가슴", h, np.nan))
    # world 길이
    wl = lambda a, b: np.linalg.norm(world[:, a] - world[:, b], axis=-1)
    lens = {
        "shoulder": wl(L_SH, R_SH),
        "torso": np.linalg.norm((world[:, L_SH] + world[:, R_SH]) / 2 - (world[:, L_HIP] + world[:, R_HIP]) / 2, axis=-1),
        "thigh": (wl(L_HIP, L_KN) + wl(R_HIP, R_KN)) / 2,
        "shin": (wl(L_KN, L_AN) + wl(R_KN, R_AN)) / 2,
    }
    return dict(knee=knee, hip=hip, tilt=tilt, zl=zones[0], zr=zones[1],
                hl=heights[0], hr=heights[1], lens=lens, missing=np.isnan(img[:, 0, 0]), img=img)


def classify(f):
    n = len(f["knee"])
    codes = np.full(n, "-", dtype=object)
    for i in range(n):
        if f["missing"][i]:
            continue
        k, hp, tl, zl, zr = f["knee"][i], f["hip"][i], f["tilt"][i], f["zl"][i], f["zr"][i]
        zs = (zl, zr)
        if k < 120 and hp < 135:
            codes[i] = "S2" if tl >= 25 else "S1"
        elif hp < 135 and k >= 120 and tl >= 25:      # 다리 뻗고 기댐
            codes[i] = "S2"
        elif "머리" in zs:
            codes[i] = "H"
        elif zs.count("목·가슴") == 2:
            codes[i] = "C2"
        elif "목·가슴" in zs:
            codes[i] = "C1"
        elif "배·허리" in zs:
            codes[i] = "W"
        elif k < 150:
            codes[i] = "T"
        else:
            codes[i] = "N"
    return codes


def smooth(codes, win=10):
    out = codes.copy()
    for i in range(len(codes)):
        seg = [c for c in codes[max(0, i - win // 2): i + win // 2] if c != "-"]
        out[i] = Counter(seg).most_common(1)[0][0] if len(seg) >= win // 2 else "-"
    return out


# ---------------------------------------------------------------- 렌더링
def read_frame(pid, t, rot):
    cap = cv2.VideoCapture(str(VID / f"{pid}.mp4"))
    cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
    ok, f = cap.read()
    if rot:
        f = cv2.rotate(f, cv2.ROTATE_90_CLOCKWISE)
    return f


def draw_cell(frame, lm, path, cx_fallback=None):
    h, w = frame.shape[:2]
    pts = None if np.isnan(lm[0, 0]) else (lm[:, :2] * [w, h]).astype(int)
    if pts is not None:
        th = max(2, int(h / 300))
        for a, b in EDGES:
            if min(lm[a, 3], lm[b, 3]) < 0.3:
                continue
            cv2.line(frame, tuple(pts[a]), tuple(pts[b]), (120, 120, 120), th * 3, cv2.LINE_AA)
            cv2.line(frame, tuple(pts[a]), tuple(pts[b]), (255, 255, 255), th, cv2.LINE_AA)
        for wr in (L_WR, R_WR):
            if lm[wr, 3] >= VIS:
                cv2.circle(frame, tuple(pts[wr]), th * 4, (0, 230, 255), -1, cv2.LINE_AA)
    # 9:16 세로 크롭 (가로 영상은 인물 중심)
    tw = int(h * CELL_W / CELL_H)
    if tw < w:
        if pts is not None:
            cx = int(np.nanmean(pts[[11, 12, 23, 24], 0]))
        else:   # 미검출 프레임은 가장 가까운 검출 프레임의 인물 위치로 크롭
            cx = int(cx_fallback * w) if cx_fallback is not None else w // 2
        x0 = int(np.clip(cx - tw // 2, 0, w - tw))
        frame = frame[:, x0:x0 + tw]
    cv2.imwrite(str(path), cv2.resize(frame, (CELL_W, CELL_H), interpolation=cv2.INTER_AREA),
                [cv2.IMWRITE_JPEG_QUALITY, 88])


def timeline(pid, t, f, codes, segs, path):
    fp = font_manager.FontProperties(fname="/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc")
    plt.rcParams["font.family"] = fp.get_name()
    font_manager.fontManager.addfont(fp.get_file())
    fig, (a1, a2) = plt.subplots(2, 1, figsize=(16.76, 4.465), dpi=200, sharex=True,
                                 gridspec_kw={"height_ratios": [1, 2.6]})
    for i, c in enumerate(codes):
        if c in COLORS:
            a1.axvspan(t[i], t[i] + 0.1, color=COLORS[c], lw=0)
    for k, (s, e) in enumerate(segs):
        a1.axvline(s, color="k", lw=0.6)
        a1.text((s + e) / 2, 1.08, f"P{k + 1}", ha="center", va="bottom", fontsize=8)
    a1.set_yticks([])
    a1.set_ylim(0, 1)
    a1.spines[["top", "right"]].set_visible(False)
    a1.set_title(f"P{pid} 행동 코드 타임라인 · 관절 각도(raw, 10 fps)", loc="left", fontsize=11, pad=14)
    a2.plot(t, f["knee"], lw=0.8, label="무릎각")
    a2.plot(t, f["hip"], lw=0.8, label="몸통-허벅지각")
    a2.plot(t, f["tilt"], lw=0.8, label="몸통 기울기")
    a2.set_ylim(0, 185)
    a2.legend(loc="lower left", ncol=3, fontsize=8)
    a2.set_xlabel("시간(s)")
    a2.spines[["top", "right"]].set_visible(False)
    fig.tight_layout()
    fig.savefig(path, facecolor="white")
    plt.close(fig)


# ---------------------------------------------------------------- 집계
def r(v, nd=1):
    return None if v is None or np.isnan(v) else round(float(v), nd)


def cumulative(codes):
    cnt = Counter(c for c in codes if c != "-")
    return " ".join(f"{c} {n / 10:.3g}s" for c, n in cnt.most_common() if n >= 10)


def main():
    segments = json.loads((OUT / "segments.json").read_text())
    if len(sys.argv) > 3:
        segments = {k: v for k, v in segments.items() if k in sys.argv[3:]}
    (OUT / "cells").mkdir(exist_ok=True)
    (OUT / "timelines").mkdir(exist_ok=True)
    results = {}
    for pid, segs in segments.items():
        d = np.load(OUT / "pose" / f"{pid}.npz")
        t = d["t"]
        f = frame_features(d)
        raw = classify(f)
        codes = smooth(raw)
        # Raw 지표
        seat = (f["knee"] < 120) & (f["hip"] < 135)
        stand = (f["knee"] > 138) & (f["hip"] > 145)
        nchest = (f["zl"] == "목·가슴").astype(int) + (f["zr"] == "목·가슴").astype(int)
        heights = np.concatenate([f["hl"], f["hr"]])
        q = lambda a, p: np.nanpercentile(a, p) if np.isfinite(a).any() else np.nan
        metrics = {
            "seat_knee_med": r(q(f["knee"][seat], 50)), "seat_hip_med": r(q(f["hip"][seat], 50)),
            "seat_hip_p90": r(q(f["hip"][seat], 90)), "seat_tilt_med": r(q(f["tilt"][seat], 50)),
            "seat_tilt_p90": r(q(f["tilt"][seat], 90)),
            "stand_one": r((nchest[stand] == 1).mean() if stand.any() else np.nan, 3),
            "stand_two": r((nchest[stand] == 2).mean() if stand.any() else np.nan, 3),
            "seat_one": r((nchest[seat] == 1).mean() if seat.any() else np.nan, 3),
            "grip_h": r(q(heights, 50), 3),
            **{k: r(q(v, 50), 3) for k, v in f["lens"].items()},
            "n_seat": int(seat.sum()), "n_stand": int(stand.sum()),
        }
        cells = []
        for k, (s, e) in enumerate(segs):
            m = (t >= s) & (t < e)
            cards = []
            for frac in (0.4, 0.85):
                tt = s + (e - s) * frac
                i = int(np.argmin(np.abs(t - tt)))
                rot = int(d["rot"][i])
                fr = read_frame(pid, t[i], rot)
                name = f"{pid}_P{k + 1}_{t[i]:.1f}.jpg"
                ok_idx = np.where(~np.isnan(f["img"][:, 11, 0]) & (d["rot"] == rot))[0]
                j = ok_idx[np.argmin(np.abs(ok_idx - i))] if len(ok_idx) else None
                cxf = None if j is None else float(np.nanmean(f["img"][j, [11, 12, 23, 24], 0]))
                draw_cell(fr, f["img"][i], OUT / "cells" / name, cxf)
                fmt = lambda v: "–" if np.isnan(v) else f"{v:.0f}°"
                cards.append({
                    "img": name, "t": round(float(t[i]), 1), "code": codes[i],
                    "meta1": f"t {t[i]:.1f}s · {codes[i]}",
                    "meta2": f"무릎 {fmt(f['knee'][i])} · 고관절 {fmt(f['hip'][i])} · 기울기 {fmt(f['tilt'][i])}",
                    "meta3": f"손 L {f['zl'][i]} · R {f['zr'][i]}",
                })
            cells.append({"range": f"구간 {s:g}–{e:g}s", "cards": cards,
                          "cum": f"포즈 코드 누적: {cumulative(codes[m])}"})
        timeline(pid, t, f, codes, segs, OUT / "timelines" / f"P{pid}_timeline.png")
        results[pid] = {"metrics": metrics, "cells": cells,
                        "missing_ratio": round(float(f["missing"].mean()), 3),
                        "rot_ratio": round(float(d["rot"].mean()), 3)}
        print(pid, metrics, flush=True)
    dst = OUT / "results.json"
    prev = json.loads(dst.read_text()) if dst.exists() else {}
    prev.update(results)
    dst.write_text(json.dumps(prev, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
