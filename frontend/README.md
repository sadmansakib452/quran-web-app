# Frontend (Next.js)

This is the **Next.js (App Router)** frontend for the Quran Web Application.

It consumes the backend API defined in [`backend/docs/api-contract.md`](../backend/docs/api-contract.md).

## Features

- Surah list (114 surahs)
- Surah reader (Ayahs with Arabic + translation)
- Search (by translation text)
- Reading settings (Arabic font selection, Arabic size, translation size) persisted to `localStorage`

## Tech

- Next.js (SSG where applicable)
- React
- TypeScript
- Tailwind CSS

## Run locally

From the repo root (recommended):

```bash
npm install
npm run dev
```

Or from this folder:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:3000`

## Environment variables

- `NEXT_PUBLIC_API_BASE_URL` (required in production)
  - Local: `http://localhost:8787`
  - Render: `https://quran-web-app-5wok.onrender.com`

Notes:

- In local development, the app can fall back to `http://localhost:8787` if the live server is unreachable.
- In production (Vercel), you must set `NEXT_PUBLIC_API_BASE_URL`.

## Routes

- `/` – Surah list (static generation)
- `/surah/[id]` – Surah reader (SSG via `generateStaticParams()`)
- `/search?q=...` – Search results (server-rendered on demand)

## Key folders (what to look at)

- `src/app/(admin)/`
  - Pages/layout for the Quran app shell (header + overlays)
- `src/features/quran/`
  - `api/` – API client + types matching backend contract
  - `components/` – Surah list, Ayah reader components
- `src/components/quran/`
  - `SettingsPanel` (right slide-over)
  - `SearchOverlay`
- `src/context/`
  - `ReadingSettingsContext` – persists settings and applies CSS vars
- `public/fonts/`
  - Arabic fonts used by settings
- `public/images/`
  - App assets (logo, surah number badge)

## Core logic (high level)

### Data fetching

- API calls go through `src/features/quran/api/client.ts`
- Base URL is resolved by `src/lib/env.ts` using `NEXT_PUBLIC_API_BASE_URL`

### SSG vs dynamic rendering

- Surah list (`/`) and surah reader (`/surah/[id]`) are generated statically where possible.
- Search (`/search`) is rendered dynamically because it depends on query params.

### Reading settings

- Settings are stored in `localStorage` and mapped to CSS variables:
  - `--q-arabic-font`
  - `--q-arabic-size`
  - `--q-translation-size`

## Deploy to Vercel (monorepo)

In Vercel:

- **Root Directory**: `frontend`
- **Env var**: `NEXT_PUBLIC_API_BASE_URL=https://quran-web-app-5wok.onrender.com`

`vercel.json` installs from the **repository root** (`cd .. && npm install --include=optional`) so the single root `package-lock.json` and npm workspaces apply. See the main [`README.md`](../README.md) for why this matters (Tailwind v4 native bindings on Linux).

## License

This app builds on an MIT-licensed Next.js starter; Quran data and usage follow the main project [`README.md`](../README.md).
