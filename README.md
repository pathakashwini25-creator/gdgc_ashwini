# gdgc_ashwini

A minimal, premium developer portfolio built with **Next.js 16**, **React 19** and **Tailwind CSS v4**, with a procedural WebGL hero rendered in real time.

Dark, typographic and deliberately quiet — a hairline grid, matte black surfaces, and no decorative gradients.

## Highlights

- **Procedural 3D hero** — a glass torus knot built on `@react-three/fiber` and `@react-three/drei`, using `MeshTransmissionMaterial` for true refraction. It floats, rotates slowly, and stops its render loop entirely the moment it scrolls out of view.
- **Spotlight cards** — a pointer-following radial light on every project card. The cursor position is written to CSS custom properties, so hovering never triggers a React re-render.
- **Static by default** — Cache Components is enabled; `next build` prerenders the whole page to static HTML (`○ (Static)`).
- **Content lives in one place** — profile, navigation, stats, capabilities, projects and social links all live in `src/data/portfolio.ts`.
- **Self-hosted type** — Inter and Albert Sans are loaded through `next/font/google`, so there are no render-blocking third-party font requests.

## Stack

| Layer          | Choice                                        |
| -------------- | --------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)            |
| UI             | React 19, Tailwind CSS v4                     |
| 3D             | three.js, @react-three/fiber, @react-three/drei |
| Language       | TypeScript (strict)                           |
| Lint           | ESLint 9 + eslint-config-next                 |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script            | What it does                        |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the Turbopack dev server      |
| `npm run build`   | Production build                    |
| `npm run start`   | Serve the production build          |
| `npm run lint`    | Run ESLint                          |

## Project structure

```
src/
├─ app/
│  ├─ globals.css      # Tailwind theme tokens, grid overlay, spotlight glow
│  ├─ layout.tsx       # Fonts, metadata, viewport
│  └─ page.tsx         # Hero, Work, About, Contact
├─ components/
│  ├─ HeroCanvas.tsx   # Procedural 3D hero
│  ├─ Navbar.tsx       # Glassmorphism nav with scroll-spy
│  ├─ ProjectCard.tsx
│  └─ SpotlightCard.tsx
└─ data/
   └─ portfolio.ts     # All site content
```

## Customising

Everything worth changing is in `src/data/portfolio.ts`. Colour and type tokens are defined in the `@theme` block in `src/app/globals.css` — `--color-ink` for the matte black background, `--color-paper` for off-white text, and the `font-display` / `font-sans` families.

## Notes

- The hero HDRI (`Environment preset="city"`) is fetched from a CDN at runtime. If that request fails, an error boundary degrades the scene to local lighting rather than taking the page down.
- The page is fully static, so it can be deployed to any host that runs Next.js.
