export type RevelationType = "meccan" | "medinan";

/**
 * A lightweight surah record used for list views and headers.
 *
 * Notes on naming:
 * - `nameAr` comes from the dataset `name` (Arabic).
 * - `nameEn` is transliteration (e.g. "Al-Fatihah") because that is what the dataset provides.
 * - `meaningEn` is the English title/meaning (dataset field: `translation`).
 */
export type SurahSummary = {
  id: number; // 1..114
  nameAr: string;
  nameEn: string;
  meaningEn: string;
  type: RevelationType;
  ayahCount: number;
};

export type Ayah = {
  surahId: number;
  ayahNumber: number; // 1..N within surah
  arabic: string;
  translation: string;
  transliteration: string;
};

