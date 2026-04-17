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


### Version 2.1.0 - [November 15, 2025]

* Updated to Next.js 16.x
* Fixed all reported minor bugs

### Version 2.0.2 - [March 25, 2025]

* Upgraded to Next.js 16.x for [CVE-2025-29927](https://nextjs.org/blog/cve-2025-29927) concerns
* Included overrides vectormap for packages to prevent peer dependency errors during installation.
* Migrated from react-flatpickr to flatpickr package for React 19 support

### Version 2.0.1 - [February 27, 2025]

#### Update Overview

* Upgraded to Tailwind CSS v4 for better performance and efficiency.
* Updated class usage to match the latest syntax and features.
* Replaced deprecated class and optimized styles.

#### Next Steps

* Run npm install or yarn install to update dependencies.
* Check for any style changes or compatibility issues.
* Refer to the Tailwind CSS v4 [Migration Guide](https://tailwindcss.com/docs/upgrade-guide) on this release. if needed.
* This update keeps the project up to date with the latest Tailwind improvements. 🚀

### v2.0.0 (February 2025)

A major update focused on Next.js 16 implementation and comprehensive redesign.

#### Major Improvements

* Complete redesign using Next.js 16 App Router and React Server Components
* Enhanced user interface with Next.js-optimized components
* Improved responsiveness and accessibility
* New features including collapsible sidebar, chat screens, and calendar
* Redesigned authentication using Next.js App Router and server actions
* Updated data visualization using ApexCharts for React

#### Breaking Changes

* Migrated from Next.js 14 to Next.js 16
* Chart components now use ApexCharts for React
* Authentication flow updated to use Server Actions and middleware

[Read more](https://tailadmin.com/docs/update-logs/nextjs) on this release.

### v1.3.4 (July 01, 2024)

* Fixed JSvectormap rendering issues

### v1.3.3 (June 20, 2024)

* Fixed build error related to Loader component

### v1.3.2 (June 19, 2024)

* Added ClickOutside component for dropdown menus
* Refactored sidebar components
* Updated Jsvectormap package

### v1.3.1 (Feb 12, 2024)

* Fixed layout naming consistency
* Updated styles

### v1.3.0 (Feb 05, 2024)

* Upgraded to Next.js 14
* Added Flatpickr integration
* Improved form elements
* Enhanced multiselect functionality
* Added default layout component

## License

TailAdmin Next.js Free Version is released under the MIT License.

## Support
If you find this project helpful, please consider giving it a star on GitHub. Your support helps us continue developing and maintaining this template.
