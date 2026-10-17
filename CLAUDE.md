# CLAUDE.md

Single-page personal portfolio ("Aman Kumar"), deployed on Vercel. Next.js 16 **pages router**, React 19, TypeScript 6 (strict), MUI 9 + emotion, framer-motion 14, react-three-fiber 9 / drei 10 (three 0.186). No backend, no DB, no tests, no CI.

## Commands
Use **npm** (yarn is not installed on the dev machine; lockfiles are gitignored, so installs are not reproducible).
- `npm run dev` – dev server
- `npm run build` / `npm start` – production build / serve
- `npm run lint` – `eslint .` (flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals`)
- `npx tsc --noEmit` – type-check

## Gotchas
- `next build` now fails on type errors (the old `ignoreBuildErrors` flags were removed); Next 16 has no `next lint`.
- **TypeScript is capped at 6.x**: `typescript-eslint` (via eslint-config-next) doesn't support TS 7 yet. Don't bump to 7 until it does.
- MUI 9 removed system props on components: use `sx={{ mt: 2, textAlign: 'center' }}`, not `mt={2}` / `textAlign=`; `Typography` has no `paragraph` or `variant="p"` (use `component="p"`).
- Use `useTheme` from `@mui/material/styles`, **not** `@emotion/react` (the latter returns an empty theme and breaks prerendering).
- `next/image` uses `fill` + `style`/`sizes` (no `layout=`); remote hosts go in `images.remotePatterns` in `next.config.js`.
- `.env` needs `NEXT_PUBLIC_FORM_SUBMIT_KEY` (FormSubmit.co endpoint key, used in `components/MainComponents/contact.tsx`). It is public in the client bundle; never print it. Must also be set in Vercel.
- Contact form never checks `response.ok` (non-2xx shows "Message Sent") and `handleChange` has a stray `console.log` of form data.

## Architecture
- `pages/_app.tsx` – holds color-mode state (default `dark`, not persisted), builds MUI theme, provides `ColorModeContext`, renders global `Navbar`.
- `pages/index.tsx` – the only real page: stacks `Home`, `About`, `Tech`, `Projects`, `Contact` (from `components/MainComponents/`) and holds all SEO `<Head>` tags (og:image is empty).
- `components/Navbar.tsx` links to in-page anchors (`/#home`, `/#about`, `/#tech`, `/#projects`, `/#contact`). A new section needs a matching `id` and entry in the Navbar `pages` array.
- `components/ThreeComponent.tsx` – R3F canvas showing `public/static/retrocomputer/scene.gltf` via drei `useGLTF`; used by the hero. Rotation is driven by refs inside `useFrame` (no per-frame React state).
- `PageSwapMotion` (fade-in wrapper), `SingleProjectCard` + `FramerModal` + `Backdrop` (project card with image lightbox), `MaterialUISwitch` (theme toggle).
- `constants/`: `projectDesc.ts` (`PROJECT_ARRAY` – add projects here, hero image in `public/static/PROJECT_PICS/`), `icons.ts` (tech grid filenames; each must exist in `public/static/TECH_ICONS/`), `fontsSize.ts` (per-section `{lg, md, xs}` vw sizes), `themeColor.ts` (`LIGHTTHEME`/`DARKTHEME` tokens).
- `utils/stringFunctions.ts` – `CapitalizeString` (icon filename → label), `_validateEmail`.

## Styling & conventions
- Primarily MUI `sx` / `styled()` with responsive keys `lg`, `md`, `xs` (not `sm`). Some SCSS modules in `styles/` (breakpoints in `styles/global.scss`: 900/1200/1536px). Only `styles/globals.css` is imported globally (smooth scroll + `scroll-snap-type: y mandatory`).
- Prettier (`.prettierrc.json`): 4 spaces, no semicolons, single quotes, es5 trailing commas. Prettier isn't a dependency (editor-provided); `pages/api/hello.ts` and `pages/blog/index.tsx` don't follow it.
- Relative imports only (no path aliases).

## Dead / unused code (safe to ignore or remove)
`pages/blog/` (stub), `pages/api/hello.ts` (boilerplate), `public/static/One-line-cube/`, `Home.module.css` duplicate of `Home.module.scss`, empty `Navbar.module.css`. SCSS modules use deprecated `@import` (Sass warning, still works).
