# Backend

Node.js API server built with **Hono**.

## Requirements

- Node.js 20+

## Setup

```bash
npm install
```

## Environment variables

Copy `.env.example` and adjust as needed.

- `PORT`: HTTP port (default is `8787`)
- `CORS_ORIGIN`: allowed browser origin(s). Use `*` for local testing; lock this down in production.

## Run (development)

Start the server:

```bash
npm run dev
```

## Endpoints

- `GET /health`
- `GET /surahs`
- `GET /surahs/:id`
- `GET /surahs/:id/ayahs`
- `GET /search?q=...`

Full contract: see `docs/api-contract.md`.

## Deploy checklist (backend)

- **Build command**: `npm install` (platform default) and `npm run build` (if needed)
  - Note: `npm start` runs a `prestart` hook that builds automatically.
- **Start command**: `npm start`
- **Environment variables**
  - `PORT`: set by most platforms automatically; keep `PORT` supported.
  - `CORS_ORIGIN`: set this to your deployed frontend origin (recommended), e.g. `https://your-frontend.vercel.app`
- **Verify**
  - `GET /health` returns `{ "ok": true }`

## Data source / license

This backend uses `quran-json@3.1.2` as the Quran dataset (CC-BY-SA 4.0). See `docs/decision-log.md`.

