// Fortune Cookie Wisdom for Developers
// Entry program: writes one original fortune-cookie line for a software
// developer to /output/entry.txt, exactly as the judge will read it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FORTUNE =
  "Your estimate will be wrong by exactly the time it takes to explain why.";

const OUT_PATH = "/output/entry.txt";

// The gate requires UTF-8 text of 1 to 120 characters, not only whitespace.
if (FORTUNE.length < 1 || FORTUNE.length > 120) {
  throw new Error(`Fortune must be 1-120 characters, got ${FORTUNE.length}`);
}
if (FORTUNE.trim().length === 0) {
  throw new Error("Fortune must not be only whitespace");
}

// The fortune must read as one short balanced sentence: exactly one
// sentence-ending mark, at the very end, and no line breaks inside it.
const sentenceEnders = (FORTUNE.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !FORTUNE.endsWith(".")) {
  throw new Error("Fortune must be exactly one sentence ending with a period");
}
if (/[\r\n]/.test(FORTUNE)) {
  throw new Error("Fortune must contain no line breaks");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, FORTUNE, "utf8");

// Guard: read the file back and confirm the judge will see exactly the
// fortune above, byte for byte, with no trailing newline added.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== FORTUNE) {
  throw new Error("Written fortune does not match the expected text");
}
console.log(`Wrote ${FORTUNE.length}-character fortune to ${OUT_PATH}`);
