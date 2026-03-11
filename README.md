# Arknights Endfield Gacha Simulator

> **Let's Go Gambling!** — A gacha pull simulator for Arknights: Endfield.

🎰 **[Try it live →](https://endfield-gacha-simulator.vercel.app)**

---

## Overview

A browser-based gacha simulator that faithfully replicates the pull mechanics from **Arknights: Endfield**. Simulate banner pulls, track pity counters, and collect operators — all without spending a single Orundum.

## Features

- 🎲 **Accurate gacha rates** — Base rates of 6★ 0.8% · 5★ 8% · 4★ 91.2%
- 📈 **Pity system** — 6★ pity begins increasing at pull 66, with hard pity at pull 80
- 🛡️ **Guarantees** — First 6★ within 120 pulls is guaranteed featured; every 240 pulls guarantees a featured 6★
- 🎟️ **Arsenal tickets** — Earn tickets from pulls (6★: 2000 · 5★: 200 · 4★: 20)
- 🔄 **Pull x1 / Pull x10** — Simulate single or multi pulls
- 📊 **Live stats** — Track total pulls, 6★ pity, 5★ pity, tickets, and featured pulls in real time
- 🔁 **Reset** — Start fresh at any time

## Tech Stack

- **Framework** — [Next.js](https://nextjs.org/) (App Router)
- **Language** — TypeScript
- **Styling** — CSS
- **Deployment** — [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Mark-Barican/Endfield-gacha-simulator.git
cd Endfield-gacha-simulator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Gacha Mechanics Reference

| Rarity | Base Rate | Pity Start | Hard Pity |
|--------|-----------|------------|-----------|
| 6★     | 0.8%      | Pull 66    | Pull 80   |
| 5★     | 8.0%      | —          | —         |
| 4★     | 91.2%     | —          | —         |

**Featured guarantees:**
- First 6★ within 120 pulls → guaranteed featured operator
- Every 240 pulls → guaranteed featured 6★

## License

This is a fan-made project and is not affiliated with or endorsed by Hypergryph or Yostar. Arknights: Endfield and all related assets are property of their respective owners.

---

*Developed with Caffeine by Maruko Aizawa*
