# Save the Princess

> An original pixel-art adventure game that teaches English **directions** and
> **past-tense structures** (*there was / there wasn't / there were /
> there weren't*) to elementary school students.

© 2026 Cinthia Gonçalez — project developed as a teaching resource for the English subject taught by Teacher Angela Muniz for elementary school students.

---

## Overview

**Save the Princess** is a top-down, retro RPG-inspired educational game. The
player picks a hero (six diverse, original avatars), rolls a digital die,
walks the path across a fantasy map (forest, bridge, village, river,
mountains, castle) and solves short English challenges along the way.

The visual style is original pixel art: there are **no Zelda assets, no
copyrighted sprites, no copyrighted music, no copyrighted maps**. Every
sprite, tile and UI element is generated procedurally by the game itself.

## Pedagogical objective

The game reinforces vocabulary and grammar from elementary EFL classes:

- **Directions**: *turn right*, *turn left*, *go straight*, *opposite*,
  *next to*, *between*, *on the corner*, *roundabout*.
- **Location**: spatial relationships in the village.
- **Past tense**: *there was*, *there wasn't*, *there were*, *there weren't*.

Children learn by playing — every challenge is short, contextual and
contains a friendly explanation when answered.

## Features

- 🎲 Digital die with animation and friendly UI sounds
- 🧭 30-tile journey through 6 themed regions
- 🧠 ~25 educational challenges (directions, location, past tense)
- 👧🏽👦🏿👦🏼 6 original, diverse heroes with idle / walk / celebrate animations
- ⭐ Score, lives, coins, stars, streaks and 5 achievements
- 🗺️ Mini-map and journey progress bar
- 🏆 Local leaderboard with strict, child-safe nickname validation
- 🌐 Fully responsive (mobile, tablet, laptop, desktop)
- ♿ ARIA labels, high-contrast palette, reduced-motion support
- 🔒 No backend, no tracking, no ads, no personal data collection

## Tech stack

- **React 18** + **Vite 5** + **TypeScript 5**
- **TailwindCSS 3** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Phaser 3** for the pixel-art world rendering
- **Web Audio API** for synthesised sound effects (no audio files bundled)
- **LocalStorage** for persistence

All dependencies are free / open-source under MIT or Apache 2.0.

## Project structure

```
src/
 ├── components/   # Reusable UI (HUD, dice, modals, mini-map…)
 ├── data/         # Avatars, board, challenges, dialogs, achievements
 ├── game/         # Phaser ↔ React bridge and procedural sprite art
 ├── hooks/        # useGameState, useSettings
 ├── routes/       # Home, AvatarSelect, Game, Victory, Leaderboard, …
 ├── scenes/       # Phaser scenes (WorldScene)
 ├── services/     # Storage, leaderboard, audio, nickname validation
 ├── styles/       # Tailwind entry + global CSS
 └── types/        # Shared TypeScript types
```

## Getting started

You'll need [Node.js](https://nodejs.org/) 18.18 or newer.

```bash
# 1. clone
git clone https://github.com/cinthiagon/save-the-princess.git
cd save-the-princess

# 2. install
npm install

# 3. develop (Vite dev server with HMR)
npm run dev
# → http://localhost:5173

# 4. type-check
npm run lint

# 5. production build
npm run build
npm run preview   # serve the build locally
```

## Deploy on Vercel (free plan)

1. Push the repository to GitHub.
2. In [Vercel](https://vercel.com), click **Add New → Project** and import
   the repo. The project ships with a `vercel.json`, so Vercel picks up:
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
3. Click **Deploy**. That's it — no environment variables, no databases,
   no paid add-ons required.

The same `dist/` folder also deploys cleanly on **Netlify** or **GitHub
Pages** (publish `dist`).

## Safety & privacy

This project is built for children. Safety choices:

- **No backend, no databases, no chat, no uploads, no ads, no trackers,
  no social integrations, no in-app purchases.**
- All game data lives in the player's browser via LocalStorage.
- The leaderboard accepts **first name or nickname only**, max 15
  characters, letters and a single hyphen. URLs, emails, phone numbers
  and a long block-list of slurs (English + Portuguese, with leetspeak
  variants) are blocked at the input.
- Privacy reminder shown on the leaderboard screen:
  > *This game does not collect personal information. Please use only your
  > first name or a nickname for the leaderboard.*

## Future improvements

- ☁️ Optional Firebase Free Tier backend for a global leaderboard
- 🌐 Localisation (Portuguese / Spanish UI while keeping the lesson in English)
- 🔊 Background music (royalty-free chiptune)
- 🆕 Additional educational modules: present tense, prepositions of time
- 🧑‍🏫 Teacher dashboard: print quiz cards, track class progress (offline)

## Credits

- **Game design & development** — Cinthia Gonçalez
- **Pedagogical guidance** — Teacher Angela Muniz (English subject)
- **Open-source tools** — React, Vite, TypeScript, TailwindCSS, Framer
  Motion, React Router, Phaser (MIT / Apache licensed)
- **Fonts** — *Press Start 2P* and *Nunito* via Google Fonts (free use)

## License

[MIT](./LICENSE) — © 2026 Cinthia Gonçalez.
