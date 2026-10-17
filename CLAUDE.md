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
- The R3F canvas throws without WebGL; `CanvasErrorBoundary` keeps that from crashing the page. Headless screenshots with `--disable-gpu` exercise this path.

## Architecture
- `pages/_app.tsx` – color-mode state (default `dark`, not persisted), `buildTheme()` maps `constants/themeColor.ts` tokens to the MUI palette (accent = `primary`), provides `ColorModeContext`, renders global `Navbar`.
- `pages/index.tsx` – the only real page: `Home`, `About`, `Experience`, `Skills`, `Projects`, `Contact` (from `components/MainComponents/`), a footer, and all SEO `<Head>` tags.
- `components/Navbar.tsx` links to in-page anchors. A new section needs a matching `id` and an entry in the Navbar `pages` array.
- Shared pieces: `Section` (numbered eyebrow + heading + `Container`), `Reveal` (fade-up on scroll via framer-motion `whileInView`), `Tag` (mono pill), `Emphasis` (renders `**bold**` markers in content strings), `SingleProjectCard` (+ `ProjectLinks`).
- `components/ThreeComponent.tsx` – R3F canvas (fills its parent) showing `public/static/retrocomputer/scene.gltf`; rotation via refs in `useFrame`. Wrapped in `CanvasErrorBoundary` in the hero.

## Content
- All personal content is data: `constants/profile.ts` (profile/links, hero stats, about text, experience, skills, education, interests) and `constants/projectDesc.ts` (featured `PROJECT_ARRAY` + `EARLIER_PROJECTS`). Update these, not the components.
- Skill icons: `components/SkillIcon.tsx` maps each skill label in `SKILL_GROUPS` to a `simple-icons` brand path or a MUI icon (exact label match; unmapped skills render without an icon). Add a mapping when adding a skill. simple-icons has no AWS logo (trademark removal).
- Resume PDF is served from `public/resume/Aman_Kumar_Resume.pdf` (replace the file to update it).
- SEO: title/description/keywords and the schema.org `ProfilePage`/`Person` JSON-LD live in `constants/seo.ts` (built from `profile.ts`); tags are rendered in `pages/index.tsx` `<Head>`. `SITE_URL` is hard-coded there **and** in `public/robots.txt` + `public/sitemap.xml` (update all three if the domain changes; bump sitemap `lastmod` on content changes). `public/og-image.png` (1200×630) is a static share image with the role/years baked in, so regenerate it when those change. `pages/_document.tsx` sets `<html lang="en">`.
- Fonts: Inter + JetBrains Mono via `next/font/google` in `constants/fonts.ts` (`MONO_FONT_FAMILY` for mono text). The build downloads them, so it needs network access.

## Styling & conventions
- MUI `sx` with theme tokens (`text.secondary`, `divider`, `background.paper`, `primary.main`) and pixel/breakpoint values; layouts use CSS grid in `sx`. No SCSS modules remain; only `styles/globals.css` is global.
- Prettier (`.prettierrc.json`): 4 spaces, no semicolons, single quotes, es5 trailing commas. Prettier isn't a dependency (editor-provided).
- Relative imports only (no path aliases).

## Dead / unused code (safe to ignore or remove)
`pages/blog/` (stub), `pages/api/hello.ts` (boilerplate), `public/static/One-line-cube/`, and now-unreferenced images in `public/static/` (`PROJECT_PICS/`, `TECH_ICONS/`, `ICONS/`, `programmer.gif`, `personal*.png`). The About portrait is `public/static/aman-portrait-dark.jpg`. `sass` is no longer used by any file.
