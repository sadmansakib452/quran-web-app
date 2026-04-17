import type { Hono } from "hono";

/**
 * Health check endpoint for uptime and deploy verification.
 */
export function registerHealthRoutes(app: Hono) {
  app.get("/health", (c) => c.json({ ok: true }));
}

