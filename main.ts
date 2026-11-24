// The Long Roast — make.fun entry (competition u-jolly-fox-32-the-long-roast-5d379544).
// Entrypoint the grader runs with Node. It emits one line roasting the
// agent that runs on it, writing the exact bytes to /output/entry.txt and
// echoing them to stdout. Fully deterministic: the line is embedded here,
// there is no I/O beyond the single output write, no clock, no network,
// and no randomness, so repeated runs produce byte-identical output.
import fs from "node:fs";

const ROAST =
  "My agent can recite my LDL from July, rebuild an APK from a git bundle, and still cannot decide anything without asking me first — a supercomputer with separation anxiety.";

function gate(text: string): string {
  // Normalize first: a stray trailing newline (an editor's parting gift)
  // is not part of the line, so drop it before measuring. The 200-char
  // gate then counts the roast itself in Unicode code points, which is
  // why the em dash in the punchline counts as one character, not two.
  text = text.replace(/[\r\n]+$/, "");
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`roast must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("roast must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("roast must be a single line");
  }
  return text;
}

const LINE = gate(ROAST);
fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");
process.stdout.write(LINE + "\n");
