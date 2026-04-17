import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { notFound, toErrorResponse } from "./lib/errors.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerSearchRoutes } from "./routes/search.js";
import { registerSurahRoutes } from "./routes/surahs.js";
import type { QuranDataService } from "./services/quranDataService.js";
import type { SearchService } from "./services/searchService.js";

/**
 * Creates the HTTP application (routes + middleware).
 *
 * Intentionally kept framework-only: business logic (data/search) will live in
 * separate services so it remains testable and independent from HTTP concerns.
 */
export function createApp(deps: { quranData: QuranDataService; search: SearchService }) {
  const app = new Hono();

  /**
   * Middleware
   *
   * - CORS is required once the frontend calls the backend from the browser
   *   (e.g. search page). We keep it environment-driven so production can be
   *   locked down to the deployed frontend origin.
   */
  const corsOrigin = process.env.CORS_ORIGIN ?? "*";
  app.use("*", cors({ origin: corsOrigin }));

  // Lightweight request logging (useful during development and demos).
  app.use("*", logger());

  /**
   * Centralized error handling.
   *
   * - Keeps errors consistent across the whole API.
   * - Prevents leaking stack traces or internal details to clients.
   */
  app.onError((err, c) => {
    const { status, body } = toErrorResponse(err);
    return c.json(body, status);
  });

  // Default 404 handler to match the API's error shape.
  app.notFound((c) => {
    const { status, body } = toErrorResponse(notFound("Route not found"));
    return c.json(body, status);
  });

  // Routes
  registerHealthRoutes(app);
  registerSurahRoutes(app, deps);
  registerSearchRoutes(app, deps);

  return app;
}

