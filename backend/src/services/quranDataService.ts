import { ApiError, internalError, notFound } from "../lib/errors.js";
import { loadQuranEnDataset } from "../data/quranJson/loader.js";
import { normalizeQuranEnDataset } from "../data/quranJson/normalize.js";
import type { Ayah, SurahSummary } from "../core/models.js";

export type QuranDataService = {
  /**
   * Returns all 114 surahs as lightweight summaries.
   */
  getSurahs(): SurahSummary[];

  /**
   * Returns a surah summary or throws NOT_FOUND.
   */
  getSurahById(id: number): SurahSummary;

  /**
   * Returns ayahs for a surah or throws NOT_FOUND.
   */
  getAyahsBySurahId(surahId: number): Ayah[];
};

/**
 * Builds the Quran data service by loading and normalizing the dataset once.
 *
 * We do this at startup so request handlers never touch the filesystem and
 * always respond quickly.
 */
export async function createQuranDataService(): Promise<QuranDataService> {
  try {
    const rawChapters = await loadQuranEnDataset();
    const { surahs, ayahsBySurahId } = normalizeQuranEnDataset(rawChapters);

    const surahById = new Map<number, SurahSummary>(surahs.map((s) => [s.id, s]));

    return {
      getSurahs: () => surahs,

      getSurahById: (id) => {
        const surah = surahById.get(id);
        if (!surah) throw notFound("Surah not found");
        return surah;
      },

      getAyahsBySurahId: (surahId) => {
        const ayahs = ayahsBySurahId.get(surahId);
        if (!ayahs) throw notFound("Surah not found");
        return ayahs;
      },
    };
  } catch (err) {
    // Startup failures should be explicit and consistent.
    if (err instanceof ApiError) throw err;
    const message = err instanceof Error ? err.message : "Failed to load Quran dataset";
    throw internalError(`Dataset load failed: ${message}`);
  }
}

