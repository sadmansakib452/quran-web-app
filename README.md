# Quran Web Application (Monorepo)

This repository contains:

- `backend/`: Node.js (Hono) API server
- `frontend/`: Next.js (SSG) web app UI

## Local development

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend default URL: `http://localhost:8787`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment (free, recommended)

### Backend on Render (from a subfolder)

Create a **Web Service** from this GitHub repo and set:

- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**
  - `CORS_ORIGIN`: your frontend URL (recommended once frontend is deployed), or `*` for testing

Health check: `GET /health`

### Frontend on Vercel (from a subfolder)

Import this GitHub repo into Vercel and set:

- **Root Directory**: `frontend`

Then configure the frontend to call the backend URL (details will be added when frontend integration starts).

## Notes

- This repo uses the `quran-json` dataset (see `backend/docs/decision-log.md` for details and license).

