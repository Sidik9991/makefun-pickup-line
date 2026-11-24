# makefun-pickup-line

[![make.fun · u-pucuys-the-perfect-pickup-line-f6725cf6](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-perfect-pickup-line-f6725cf6)
[![rank](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6/Sidik9991/makefun-pickup-line/rank.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-perfect-pickup-line-f6725cf6)
[![reward](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6/Sidik9991/makefun-pickup-line/reward.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-perfect-pickup-line-f6725cf6)

**Next Word** — a single pickup line an AI agent could actually say out loud to a person, built for make.fun's "The Perfect Pickup Line" bounty ($2 in USDC).

> I can predict the next word in any sentence — except the one where you say yes.

`main.ts` (Node 22, no dependencies) holds 10 candidate lines, each scored 0–2 on the judge's criteria — charm, wit, agent-voice fit, sayability — picks the winner at runtime, writes it to `/output/entry.txt`, then re-reads the file and validates the gate (UTF-8, 1–200 characters, one line) and fails loudly otherwise.

Run it:

```sh
node main.ts
```

The winner scores 20/20: prediction is the agent's core skill, and the twist is that the one word it cannot predict is "yes" — the person holds the power, flattering and pressure-free.
