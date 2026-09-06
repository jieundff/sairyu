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

---

## The shop (`src/shop/`)

A second, self-contained layer that implements the SAIRYU mobile commerce
design from Figma ("코딩용 최종"). It does not touch the editorial site above —
different palette, different type, its own stylesheet and its own HTML entry.

```bash
npm run dev      # editorial site at /, shop at /shop.html
npm run build    # builds both entries
```

### Structure

```
src/shop/
├── ShopApp.tsx              # screen switching + cart state (useState, no router)
├── shop.css                 # tokens (.shop scope) + every component's BEM rules
├── types.ts                 # Product, CartItem, NavItem, SizeRow, …
├── format.ts                # formatKrw / formatRate
├── components/
│   ├── layout/              # MobileShell, AppHeader, PageTitle
│   ├── nav/                 # SideDrawer, NavMenuList, SearchField, CloseButton
│   ├── commerce/            # ProductCard, ProductGrid, CartLineItem,
│   │                        # QuantityStepper, PriceLine, OrderSummary,
│   │                        # CategoryBreadcrumb, SortTrigger, SortMenu
│   ├── form/                # ShopButton, ButtonPair, TextField, SocialLoginButton
│   ├── content/             # TabNav, SizeGuideTable, PolicyList,
│   │                        # CollectionStrip, EmptyState
│   └── icons/               # the 7 line icons, authored as inline SVG
├── screens/                 # the 10 screens the design describes
└── data/                    # products, navigation, collections, copy
```

Seven of these components come straight off the designer's own component sheet
(`Frame 64`): the two tab bars, the SORT breadcrumb, the SORT BY trigger, the
cart line, the order-button pair, the product card and the order summary. The
rest were factored out of elements that repeat across the fourteen artboards.

### Same rule as the site above

Shop media is declared at the bottom of [`src/data/assets.ts`](src/data/assets.ts)
(`SHOP_LOGO`, `PRODUCT_IMAGES`, `SHOP_HOME_IMAGE`, `SHOP_ABOUT_IMAGE`,
`LOOK_IMAGES`); copy, prices and labels live in
[`src/shop/data/`](src/shop/data). No shop component hardcodes either.

The Figma artwork could not be exported into the repo, so every image slot
currently points at the existing preview files and `SHOP_LOGO` is empty (the
header falls back to a text wordmark). Drop the real files into `public/images`
and repoint those lines — no component changes needed.

See [`research.md`](research.md) for the design audit and [`plan.md`](plan.md)
for the component inventory, tokens and the trade-offs taken against the
artboards.
