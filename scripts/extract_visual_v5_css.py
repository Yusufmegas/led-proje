import json
import tempfile
from pathlib import Path

SESSION = Path(r"C:\Users\HP\.codex\sessions\2026\08\20\rollout-2026-08-20T15-54-27-01a01f3c-b447-7330-99fd-4038eaced9e7.jsonl")
OUT = Path(tempfile.gettempdir()) / "visual-v5-final.css"
records = [json.loads(line) for line in SESSION.read_text(encoding="utf-8").splitlines()]

def output_for(ordinal: int) -> str:
    call_id = next(record["payload"]["call_id"] for record in records if record.get("ordinal") == ordinal)
    output = next(record["payload"]["output"] for record in records if record.get("payload", {}).get("type") == "custom_tool_call_output" and record["payload"].get("call_id") == call_id)
    return "".join(block.get("text", "") for block in output) if isinstance(output, list) else str(output)

base_output = output_for(111).replace("\r", "")
base = base_output[base_output.index(":root{"):].strip()
v6_output = output_for(1207).replace("\r", "")
css = v6_output[v6_output.index(":root{"):]
enhancements = css[css.index(".mega-panel a:focus-visible"):css.index("/* Visual V6")].strip()
OUT.write_text(base + "\n" + enhancements + "\n", encoding="utf-8")
print(f"CSS={OUT}")
print(f"BYTES={OUT.stat().st_size}")
