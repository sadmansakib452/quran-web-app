import type { Hono } from "hono";
import { parseSearchQuery } from "../lib/validation.js";
import type { SearchService } from "../services/searchService.js";

/**
 * Search endpoints.
 *
 * Chapter 4 Step 1: only validates params and returns the correct response shape.
 * Chapter 4 Step 2: will implement the actual matching logic.
 */
export function registerSearchRoutes(app: Hono, deps: { search: SearchService }) {
  app.get("/search", (c) => {
    const { q, limit, offset, surahId } = parseSearchQuery({
      q: c.req.query("q"),
      limit: c.req.query("limit"),
      offset: c.req.query("offset"),
      surahId: c.req.query("surahId"),
    });

    const { total, hits } = deps.search.search({ q, limit, offset, surahId });

    return c.json({
      query: q,
      limit,
      offset,
      total,
      hits,
    });
  });
}

