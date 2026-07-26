# Sairyu

A single-page collection site (React + TypeScript + Vite) built around a
**one-file assets management** rule: all media lives in `src/data/assets.ts`,
and every component imports from there. Changing that one file — or replacing
the matching files in `public/` — updates the entire site without touching a
single component.

## Getting started

```bash
npm install
npm run dev        # start the dev server
npm run build      # typecheck + production build
npm run preview    # preview the production build
npm run typecheck  # types only
```

## Project structure

```
src/
├── components/     # Reusable, presentational components
│   ├── Hero.tsx
│   ├── VideoCanvas.tsx
│   ├── Gallery.tsx
│   ├── GalleryCard.tsx
│   └── Button.tsx
├── hooks/          # Animation & behavior logic, isolated from UI
│   ├── useInView.ts     # reveal-on-scroll
│   └── useParallax.ts   # scroll parallax
├── data/           # All configurable values live here
│   ├── assets.ts        # ← the ONLY place media URLs are declared
│   └── content.ts       # collection name, prices, copy, button labels
├── utils/          # cn(), named constants (no magic numbers)
│   ├── classNames.ts
│   └── constants.ts
└── types/          # Shared TypeScript types
    └── index.ts
```

## The one rule

> **Never hardcode an image or video URL inside a component.**

- Media paths: [`src/data/assets.ts`](src/data/assets.ts) (`VIDEOS`, `GALLERY_IMAGES`)
- Text / prices / labels: [`src/data/content.ts`](src/data/content.ts)
- Physical files: [`public/`](public/README.md)

`Hero.tsx`, `VideoCanvas.tsx`, `Gallery.tsx`, `GalleryCard.tsx` and every other
component import media only from `data/`. No component declares an image array
or a magic number of its own.

## Swapping assets

Replace the files in `public/images/` and `public/videos/` (keep the names), or
edit the paths in `src/data/assets.ts`. That's it — the site follows.
See [`public/README.md`](public/README.md) for details.
