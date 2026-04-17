export type SurahSummary = {
  id: number;
  nameAr: string;
  nameEn: string;
  meaningEn: string;
  type: "meccan" | "medinan" | string;
  ayahCount: number;
};

export type Ayah = {
  surahId: number;
  ayahNumber: number;
  arabic: string;
  translation: string;
  transliteration: string;
};

export type ApiErrorCode = "BAD_REQUEST" | "NOT_FOUND" | "INTERNAL_ERROR";

export type ErrorResponse = {
  error: { code: ApiErrorCode; message: string };
};

export type GetSurahsResponse = { surahs: SurahSummary[] };
export type GetSurahResponse = { surah: SurahSummary };
export type GetSurahAyahsResponse = { surah: SurahSummary; ayahs: Ayah[] };

export type SearchHit = {
  surahId: number;
  ayahNumber: number;
  arabic?: string;
  translation: string;
  transliteration?: string;
  highlight: { start: number; end: number };
};

export type SearchResponse = {
  q: string;
  limit: number;
  offset: number;
  total: number;
  hits: SearchHit[];
};

