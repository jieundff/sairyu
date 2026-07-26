# public/ — media assets

These are the real files the site loads. **To update the whole site, replace
files here (keeping the same names) — you never need to touch any component.**

```
public/
├── videos/
│   ├── left.mp4      ← hero background video (left)
│   └── right.mp4     ← hero background video (right)
└── images/
    ├── 01.webp ... 10.webp   ← gallery artwork
```

## How it wires together

- Paths are declared once in [`src/data/assets.ts`](../src/data/assets.ts)
  (`VIDEOS`, `GALLERY_IMAGES`).
- Every component imports from there — no URLs are hardcoded anywhere else.
- Drop-in replacement: swap `public/images/03.webp` and the third gallery card
  updates automatically.

## Placeholders

- The `*.webp` files are tiny 1×1 transparent placeholders — replace them with
  real artwork (square images look best in the grid).
- The `*.mp4` files are empty placeholders — drop in real looping videos.

## Adding or removing gallery items

1. Add/remove the file in `public/images/`.
2. Add/remove the matching path in `GALLERY_IMAGES` in `src/data/assets.ts`.
3. (Optional) Add/remove the matching title + price in `GALLERY_META` in
   `src/data/content.ts`.

The grid grows or shrinks to match — no component edits required.
