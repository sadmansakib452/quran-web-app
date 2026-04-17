export type QuranJsonVerse = {
  id: number; // verse number within the chapter
  text: string; // Arabic text
  translation: string; // English translation text
  /**
   * Verse transliteration is not included in `quran_en.json` (canonical file).
   * It exists in per-chapter files under `dist/chapters/en/{n}.json`.
   */
  transliteration?: string;
};

export type QuranJsonChapter = {
  id: number; // 1..114
  name: string; // Arabic chapter name
  transliteration: string; // English transliteration
  translation: string; // English meaning/title (e.g. "The Opener")
  type: "meccan" | "medinan";
  total_verses: number;
  verses: QuranJsonVerse[];
};

