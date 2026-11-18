"""전사 결과에서 진행자 프롬프트 키워드를 찾아 P1–P6 구간 경계를 정한다.

사용: python3 split.py <out폴더>   →  out/segments.json, out/segments_debug.txt
경계 = 각 시나리오 키워드가 처음 등장한 발화의 시작 시각(이전 경계 이후에서만 탐색).
P6 끝 = 영상 길이.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

OUT = Path(sys.argv[1])
VID = Path(sys.argv[2])
KEYS = [
    ("P1", r"입어"),
    ("P2", r"미팅|비가|비에|비와|젖지"),
    ("P3", r"맑|햇살|햇볕|햇빛"),
    ("P4", r"더워|더위"),
    ("P5", r"도착|의자|소파|편안한 자세|편한 자세"),
    ("P6", r"벗어|벗고|일어나"),
]
# 01은 탈의 프롬프트가 착석 전에 나오고(143.1s), 착석 뒤에는 탈의 지시가 없음 → P6만 P5 앞에서 탐색
P6_BEFORE_P5 = {"01"}

segs, dbg = {}, []
for f in sorted((OUT / "transcripts").glob("*_transcript.json")):
    pid = f.name[:2]
    lines = json.loads(f.read_text())
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                         "-of", "csv=p=0", str(VID / f"{pid}.mp4")]))
    starts, prev = [], 0.0
    for name, pat in KEYS:
        lo = prev
        if name == "P6" and pid in P6_BEFORE_P5:
            lo = starts[3]
        hi = 40 if name == "P1" else 1e9          # P1 지시는 영상 초반에만 있음
        hit = next((l for l in lines if lo <= l["start"] <= hi and re.search(pat, l["text"])), None)
        s = round(hit["start"], 1) if hit else (0.0 if name == "P1" else None)
        starts.append(s)
        dbg.append(f"{pid} {name} {s} {hit['text'] if hit else '— 못 찾음'}")
        if s is not None and not (name == "P6" and pid in P6_BEFORE_P5):
            prev = s
    if pid in P6_BEFORE_P5:
        order = [0, 1, 2, 3, 5, 4]           # P1 P2 P3 P4 P6 P5 순서로 진행
        bounds = {}
        seq = [starts[i] for i in order] + [round(dur, 1)]
        for j, i in enumerate(order):
            bounds[i] = (seq[j], seq[j + 1])
        segs[pid] = [bounds[i] for i in range(6)]
    else:
        seq = starts + [round(dur, 1)]
        segs[pid] = [(seq[i], seq[i + 1]) for i in range(6)]

(OUT / "segments.json").write_text(json.dumps(segs, indent=1))
(OUT / "segments_debug.txt").write_text("\n".join(dbg))
print("\n".join(dbg))
