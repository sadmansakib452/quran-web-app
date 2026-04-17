# Quran Web Application (Monorepo)

A responsive Quran web app with:

- **Surah list** (114 surahs, Arabic + English)
- **Surah reader** (Ayahs with Arabic + translation)
- **Search** (by translation text)
- **Reading settings** (Arabic font + font sizes, persisted via `localStorage`)

This repository contains:

- `backend/`: Node.js (**Hono**) JSON API
- `frontend/`: **Next.js (SSG)** web app (Tailwind CSS)

Quick links:

- Backend docs: [`backend/README.md`](backend/README.md)
- Frontend docs: [`frontend/README.md`](frontend/README.md)

## Architecture (high level)

- The **frontend** is a Next.js App Router project.
- The **backend** is a separate Node.js service that loads the Quran dataset into memory and serves it via JSON endpoints.
- The frontend calls the backend using `NEXT_PUBLIC_API_BASE_URL`.

## Requirements

- Node.js 20+
- npm

## Local development (from repo root)

**You only need one install at the repository root.** You do **not** need to run `npm install` separately inside `frontend/` and `backend/` first—npm workspaces install dependencies for both packages when you run:

```bash
npm install
```

Run backend + frontend together:

```bash
npm run dev
```

Production-style (builds both, then starts both):

```bash
npm start
```

Default URLs:

- Backend: `http://localhost:8787`
- Frontend: `http://localhost:3000`

### Environment variables

#### Frontend

- `NEXT_PUBLIC_API_BASE_URL`
  - **Production (e.g. Vercel): required** — set to your deployed backend URL.
  - **Local dev:** optional. If unset, the app defaults to `http://localhost:8787`; if your `.env` points at Render but Render is down, requests can fall back to localhost in development only.
  - Example (Render): `https://quran-web-app-5wok.onrender.com`

#### Backend

- `PORT` (default `8787`)
- `CORS_ORIGIN` (default `*`)

## Deployment

### Backend on Render (from a subfolder)

Create a **Web Service** from this GitHub repo:

- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment variables**
  - `CORS_ORIGIN`: `*` (simple demo) or your frontend origin (recommended later)

Verify:

- `GET /health` → `{ "ok": true }`

### Frontend on Vercel (from a subfolder)

Import this GitHub repo into Vercel:

- **Root Directory**: `frontend`
- **Environment variables**
  - `NEXT_PUBLIC_API_BASE_URL=https://quran-web-app-5wok.onrender.com`

## Data source / license

The backend uses the `quran-json@3.1.2` dataset (**CC-BY-SA 4.0**).

## Notes

- The repo root includes an **`.npmrc`** with `legacy-peer-deps=true` so `npm install` at the root succeeds with the frontend’s dependency tree (npm workspaces).
- This repo also includes **`render.yaml`** as a reference for deploying the backend to Render (optional; you can configure the service manually instead).

