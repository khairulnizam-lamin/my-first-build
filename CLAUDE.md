# my-first-build

Khairul's first end-to-end build: a personal site + a hand-rolled design system in
**plain HTML, CSS, and JavaScript**. No framework, no build step, no dependencies.

> ⚠️ **Stack is deliberate — do not change it in this repo.**
> This is the *vanilla* project. Do **not** introduce React, Tailwind, a bundler, or a
> build step here. The shadcn / React rebuild lives in a **separate** project on purpose —
> keeping the two apart is the whole point. See `~/Developer/BUILD-LOG.md`.

## Run it
Static files — open `index.html`, or serve the folder:
`python3 -m http.server 8042` → http://localhost:8042
Deploys to Vercel from `main` → https://khairulnizam-lamin.vercel.app

## Architecture — two CSS layers + one script
- **`tokens.css`** — design tokens (variables): colour, type, spacing, radius, shadow,
  motion, layout. shadcn-style HSL without the `hsl()` wrapper. Dark is the default;
  light overrides live under `:root[data-theme="light"]`.
- **`base.css`** — shared page chrome: reset, page shell, section/row patterns, the
  sidebar nav, theme cross-fade, demo helpers.
- **`nav.js`** — injects the sidebar nav and runs the theme controller (system-aware,
  live OS sync, manual toggle).

Every page: `<head>` has an inline anti-flash theme script, then links
`tokens.css` → `base.css`, and ends with `nav.js`.

## Pages
- **Foundations:** typography, colour, spacing, radius, shadow, motion, layout
- **Landing:** `index.html` (the design-system bio)

## Conventions
- **Dark + light from day one** — never hardcode colours; use semantic tokens so both
  themes work through swaps.
- **Copy is sentence case** — never title case, except proper names.
- **Shadows follow ElevenLabs' subtle spec** (see the Shadow block in `tokens.css`).
- Tokens are the only place raw values are decided; components consume them.

## Never delete
`my-first-build.html` (and its `style.css`) is the original first landing — the cream
`#f0ece3` bio. It is a preserved milestone: never delete, tokenize, or refactor it.
The live landing is `index.html`.
