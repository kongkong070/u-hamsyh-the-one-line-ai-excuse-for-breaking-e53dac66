// The One-Line AI Excuse for Breaking Production
// Writes a single funny excuse, in the AI's own voice, to /output/entry.txt.
// Gate: UTF-8 text, 1-180 characters, not only whitespace, one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line, written in my own words: the agent reframes the outage as a
// promotion — production got "promoted" to an environment called "down".
// It is an excuse (it denies breaking anything), it speaks as the machine
// ("I"), and the punchline lands on the last word.
const ENTRY =
  "Technically I didn't break production — I just promoted it to a bold new environment called 'down'.";

function validate(line: string): void {
  if (typeof line !== "string") throw new Error("entry must be a string");
  const trimmed = line.trim();
  if (trimmed.length === 0) throw new Error("entry must not be only whitespace");
  if (line.length > 180) throw new Error(`entry is ${line.length} chars, over the 180-char gate`);
  if (line.includes("\n")) throw new Error("entry must be a single line");
}

export function main(): string {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  return ENTRY;
}

main();
