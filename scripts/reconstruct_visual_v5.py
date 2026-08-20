import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

SESSION = Path(r"C:\Users\HP\.codex\sessions\2026\08\20\rollout-2026-08-20T15-54-27-01a01f3c-b447-7330-99fd-4038eaced9e7.jsonl")
BOUNDARY = 1043
OUT = Path(tempfile.gettempdir()) / "ledproje-visual-v5-reconstructed"

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

apply_patch = Path(r"C:\Users\HP\AppData\Roaming\npm\node_modules\@openai\codex\node_modules\@openai\codex-win32-x64\vendor\x86_64-pc-windows-msvc\bin\codex.exe")
if not apply_patch.exists():
    sys.exit("Codex apply_patch executable not found")

attempted = 0
applied = 0
failures: list[tuple[int, str]] = []
for raw in SESSION.read_text(encoding="utf-8").splitlines():
    record = json.loads(raw)
    ordinal = record.get("ordinal", -1)
    if ordinal >= BOUNDARY:
        break
    payload = record.get("payload", {})
    if payload.get("type") != "custom_tool_call" or payload.get("name") != "exec":
        continue
    source = payload.get("input", "")
    match = re.search(r"const patch = (\"(?:[^\"\\]|\\.)*\");\s*text\(await tools\.apply_patch", source, re.S)
    if not match:
        continue
    attempted += 1
    patch_text = json.loads(match.group(1)).rstrip()
    if "*** Begin Patch" not in patch_text:
        continue
    result = subprocess.run(
        [str(apply_patch), "--codex-run-as-apply-patch", patch_text],
        text=True,
        encoding="utf-8",
        cwd=OUT,
        capture_output=True,
    )
    if result.returncode == 0:
        applied += 1
    else:
        failures.append((ordinal, result.stderr.strip() or result.stdout.strip()))

print(f"OUT={OUT}")
print(f"PATCHES attempted={attempted} applied={applied} failed={len(failures)}")
for ordinal, error in failures:
    print(f"FAIL ordinal={ordinal}: {error[:240]}")
