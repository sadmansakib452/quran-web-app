import { internalError } from "../../lib/errors.js";
import type { QuranJsonChapter, QuranJsonVerse } from "./types.js";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    // Dataset problems are server problems (misconfiguration), not user input.
    throw internalError(message);
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function validateVerse(chapterId: number, verse: QuranJsonVerse, index: number) {
  assert(isFiniteNumber(verse.id), `Invalid verse.id in chapter ${chapterId} at index ${index}`);
  assert(isNonEmptyString(verse.text), `Invalid verse.text in chapter ${chapterId} verse ${verse.id}`);
  assert(
    isNonEmptyString(verse.translation),
    `Invalid verse.translation in chapter ${chapterId} verse ${verse.id}`
  );
  // Verse transliteration is not present in `quran_en.json` (our canonical file).
}

/**
 * Validates the integrity of `quran_en.json` after parsing.
 *
 * This is intentionally stricter than "just parse JSON": if the dataset changes
 * shape unexpectedly, we fail fast so broken data doesn't reach clients.
 */
export function validateQuranEnDataset(chapters: QuranJsonChapter[]) {
  assert(chapters.length === 114, `Expected 114 chapters, got ${chapters.length}`);

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];

    assert(isFiniteNumber(chapter.id), `Invalid chapter.id at index ${i}`);
    assert(
      Number.isInteger(chapter.id) && chapter.id >= 1 && chapter.id <= 114,
      `chapter.id out of range at index ${i}: ${chapter.id}`
    );
    assert(isNonEmptyString(chapter.name), `Invalid chapter.name for chapter ${chapter.id}`);
    assert(
      isNonEmptyString(chapter.transliteration),
      `Invalid chapter.transliteration for chapter ${chapter.id}`
    );
    assert(isNonEmptyString(chapter.translation), `Invalid chapter.translation for chapter ${chapter.id}`);
    assert(
      chapter.type === "meccan" || chapter.type === "medinan",
      `Invalid chapter.type for chapter ${chapter.id}`
    );
    assert(
      isFiniteNumber(chapter.total_verses) && Number.isInteger(chapter.total_verses) && chapter.total_verses > 0,
      `Invalid chapter.total_verses for chapter ${chapter.id}`
    );
    assert(Array.isArray(chapter.verses), `Invalid chapter.verses for chapter ${chapter.id}`);
    assert(
      chapter.verses.length === chapter.total_verses,
      `Verse count mismatch for chapter ${chapter.id}: verses.length=${chapter.verses.length}, total_verses=${chapter.total_verses}`
    );

    for (let v = 0; v < chapter.verses.length; v++) {
      validateVerse(chapter.id, chapter.verses[v], v);
    }
  }
}

