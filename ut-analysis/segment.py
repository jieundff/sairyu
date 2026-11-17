"""Whisper medium 전사 → 진행자 프롬프트 시점으로 P1–P6 구간 분할.

사용: python3 segment.py <영상폴더> <출력폴더> [참가자번호 ...]
"""
import json
import subprocess
import sys
from pathlib import Path

import whisper

VID, OUT = Path(sys.argv[1]), Path(sys.argv[2])
IDS = sys.argv[3:] or [f"{i:02d}" for i in range(1, 18)]
OUT.mkdir(parents=True, exist_ok=True)

model = whisper.load_model("medium")
for pid in IDS:
    dst = OUT / f"{pid}_transcript.json"
    if dst.exists():
        continue
    wav = OUT / f"{pid}.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(VID / f"{pid}.mp4"),
                    "-ac", "1", "-ar", "16000", str(wav)], check=True)
    res = model.transcribe(str(wav), language="ko", fp16=False)
    segs = [{"start": s["start"], "end": s["end"], "text": s["text"]} for s in res["segments"]]
    dst.write_text(json.dumps(segs, ensure_ascii=False, indent=1))
    wav.unlink()
    print(pid, len(segs), flush=True)
