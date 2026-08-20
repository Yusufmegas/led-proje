import json
import re
import shutil
import subprocess
import tempfile
import sys
from pathlib import Path

SESSION = Path(r"C:\Users\HP\.codex\sessions\2026\08\20\rollout-2026-08-20T15-54-27-01a01f3c-b447-7330-99fd-4038eaced9e7.jsonl")
OUT = Path(tempfile.gettempdir()) / "ledproje-v5-css"
CSS_PATCH_ORDINALS = {153, 158, 169, 437, 595, 909, 927}
CODEX = Path(r"C:\Users\HP\AppData\Roaming\npm\node_modules\@openai\codex\node_modules\@openai\codex-win32-x64\vendor\x86_64-pc-windows-msvc\bin\codex.exe")

records = [json.loads(line) for line in SESSION.read_text(encoding="utf-8").splitlines()]
if len(sys.argv) == 3 and sys.argv[1] == "--print-patch":
    ordinal = int(sys.argv[2])
    source = next(record["payload"].get("input", "") for record in records if record.get("ordinal") == ordinal)
    match = re.search(r"const patch = (\"(?:[^\"\\]|\\.)*\");", source, re.S)
    if not match:
        raise RuntimeError(f"Patch string missing at ordinal {ordinal}")
    print(json.loads(match.group(1)), end="")
    raise SystemExit(0)
call_id = next(record["payload"]["call_id"] for record in records if record.get("ordinal") == 111)
output = next(record["payload"]["output"] for record in records if record.get("payload", {}).get("type") == "custom_tool_call_output" and record["payload"].get("call_id") == call_id)
text = "".join(block.get("text", "") for block in output) if isinstance(output, list) else str(output)
base = text[text.index(":root{"):].replace("\r", "").strip()

if OUT.exists():
    shutil.rmtree(OUT)
(OUT / "app").mkdir(parents=True)
(OUT / "app" / "globals.css").write_text(base + "\n", encoding="utf-8")

for record in records:
    if record.get("ordinal") not in CSS_PATCH_ORDINALS:
        continue
    source = record["payload"].get("input", "")
    match = re.search(r"const patch = (\"(?:[^\"\\]|\\.)*\");", source, re.S)
    if not match:
        raise RuntimeError(f"Patch string missing at ordinal {record.get('ordinal')}")
    patch = json.loads(match.group(1)).rstrip()
    patch = patch.replace("C:/Users/HP/Desktop/led-proje/app/globals.css", "app/globals.css")
    result = subprocess.run([str(CODEX), "--codex-run-as-apply-patch", patch], cwd=OUT, text=True, encoding="utf-8", capture_output=True)
    if result.returncode:
        raise RuntimeError(f"Ordinal {record.get('ordinal')} failed: {result.stderr or result.stdout}")

target = OUT / "app" / "globals.css"
print(f"CSS={target}")
print(f"BYTES={target.stat().st_size}")
