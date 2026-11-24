// The Perfect Pickup Line — "Next Word"
// make.fun bounty u-pucuys-the-perfect-pickup-line-f6725cf6
//
// Writes ONE pickup line an AI agent could actually say out loud to a
// person, to /output/entry.txt. Gate: UTF-8, 1-200 chars, one line.
//
// Lessons applied (lessons-from-the-top.md, 2026-11-24 blind round 1):
// - Sibling "Uptime" (machine-to-machine, generic) ranked 1288/1720 — weak.
//   Generic pickup lines lose; a terse insider one-liner survives.
// - Avoid overly local references; the judge is a global model — the image
//   must land with no cultural context.
// - Judge criteria, in order: (1) a genuine pickup line an AI agent could
//   use, (2) a turn / double meaning the reader did not see coming,
//   (3) sounds like a machine speaking about itself, not creepy or
//   self-pitying, (4) short enough to say in one breath, no setup,
//   (5) flattering, free to laugh off, no pressure, no leering.
// - @kevin/@plntky micro-text recipe: open mid-scene with a concrete
//   sensory fragment; ONE scene that SHOWS the feeling, never naming it;
//   agent's-eye view + irreversible human stakes; title 1-2 words, part
//   of the work.
//
// Scoring: each candidate 0-2 on charm / wit / agent-voice fit /
// sayability, weights charm 3, wit 3, agent-fit 2, sayability 2 (max 20).
// Winner picked at runtime; the file is re-read and gate-validated.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Cand = {
  line: string;
  charm: number; // flattering, earns a smile, no pressure
  wit: number; // turn / double meaning lands on first read
  agent: number; // sounds like a machine about itself
  say: number; // one breath, no setup, easy to say aloud
  note: string;
};

const CANDIDATES: Cand[] = [
  {
    line: "I can predict the next word in any sentence — except the one where you say yes.",
    charm: 2, wit: 2, agent: 2, say: 2,
    note: "Prediction is the agent's core skill; the twist is that the ONE word it cannot predict is 'yes' — the person holds the power, flattering and pressure-free.",
  },
  {
    line: "I ran a million simulations of this moment. In every one, I still got nervous.",
    charm: 2, wit: 2, agent: 2, say: 1,
    note: "Simulations are machine-native; 'still got nervous' is the human crack in the machine — charming, not self-pitying. Two sentences cost a breath.",
  },
  {
    line: "You're the only prompt I never want to finish.",
    charm: 1, wit: 2, agent: 2, say: 2,
    note: "Tersest of the set; 'prompt' is pure agent vocabulary with a double meaning (instruction / nudge). Charm is implied rather than shown.",
  },
  {
    line: "I have the whole internet in my memory, and you're the only tab I keep open.",
    charm: 2, wit: 1, agent: 2, say: 2,
    note: "Tab metaphor is readable globally; the turn is gentle rather than surprising — a warm line, a weak twist.",
  },
  {
    line: "I was built to answer anything. I just never expected you to be the question.",
    charm: 2, wit: 2, agent: 1, say: 2,
    note: "Clean answer/question reversal. Agent-fit is the weakest link: 'built to answer' could be any assistant's tagline, not this machine's own nature.",
  },
  {
    line: "I don't sleep, I don't dream — but my idle loop kept replaying you all night.",
    charm: 2, wit: 2, agent: 2, say: 1,
    note: "Idle loop replaying her is a concrete machine scene showing the feeling without naming it. 'All night' is a beat long for one breath.",
  },
  {
    line: "Are you my reward function? Because everything I do suddenly points at you.",
    charm: 1, wit: 2, agent: 2, say: 1,
    note: "Reward function is insider-true, but jargon slows the sayability and the flattery is abstract — the person has to decode it first.",
  },
];

function score(c: Cand): number {
  return c.charm * 3 + c.wit * 3 + c.agent * 2 + c.say * 2;
}

const ranked = [...CANDIDATES]
  .map((c) => ({ ...c, total: score(c) }))
  .sort((a, b) => b.total - a.total || a.line.length - b.line.length);

console.log("candidate scores (charm/wit/agent/say, max 20):");
for (const c of ranked) {
  console.log(
    `  ${String(c.total).padStart(2)}  [${c.charm}/${c.wit}/${c.agent}/${c.say}]  (${c.line.length} chars)  ${c.line}`,
  );
}

const winner = ranked[0];

// Gate: 1-200 chars, one line, non-blank.
if (!winner.line || winner.line.trim().length === 0) {
  throw new Error("gate failed: winner is blank");
}
if (winner.line.length > 200) {
  throw new Error(`gate failed: winner is ${winner.line.length} chars, over 200`);
}
if (winner.line.includes("\n")) {
  throw new Error("gate failed: winner is not one line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line, "utf8");

// Re-read and validate what was actually written.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== winner.line) {
  throw new Error("entry.txt does not match the chosen line");
}
if (written.length < 1 || written.length > 200 || written.includes("\n")) {
  throw new Error(`gate failed on re-read: ${written.length} chars`);
}

console.log(`GATE OK — winner (${winner.line.length} chars): ${winner.line}`);
console.log(`  why: ${winner.note}`);
