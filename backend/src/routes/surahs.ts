import type { Hono } from "hono";
import type { QuranDataService } from "../services/quranDataService.js";
import { parseSurahId } from "../lib/validation.js";

/**
 * Surah browsing endpoints.
 *
 * Chapter 3 adds these routes step-by-step to match `docs/api-contract.md`.
 */
export function registerSurahRoutes(app: Hono, deps: { quranData: QuranDataService }) {
  app.get("/surahs", (c) => {
    const surahs = deps.quranData.getSurahs();
    return c.json({ surahs });
  });

  app.get("/surahs/:id", (c) => {
    const surahId = parseSurahId(c.req.param("id"));
    const surah = deps.quranData.getSurahById(surahId);
    return c.json({ surah });
  });

  app.get("/surahs/:id/ayahs", (c) => {
    const surahId = parseSurahId(c.req.param("id"));
    const surah = deps.quranData.getSurahById(surahId);
    const ayahs = deps.quranData.getAyahsBySurahId(surahId);
    return c.json({ surah, ayahs });
  });
}

