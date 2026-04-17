# Backend

Node.js API server built with **Hono**.

This service provides Quran data + search endpoints consumed by the Next.js frontend.

## Requirements

- Node.js 20+

## Setup

From the **repository root** (installs all workspaces):

```bash
npm install
```

Do not rely on a separate `package-lock.json` inside `backend/`; this monorepo uses one lockfile at the root.

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

## Example requests

Assuming `http://localhost:8787`:

```bash
curl http://localhost:8787/health
curl http://localhost:8787/surahs
curl http://localhost:8787/surahs/1
curl http://localhost:8787/surahs/1/ayahs
curl "http://localhost:8787/search?q=obedience&limit=10&offset=0"
```

## How it works (high level)

- **Dataset**: loaded from the `quran-json@3.1.2` npm package at startup.
- **Data service**: normalizes the dataset into a consistent in-memory model for fast reads.
- **Search**: indexes translation text in memory and returns matches with `{ highlight: { start, end } }`
  so the frontend can emphasize the match.

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

