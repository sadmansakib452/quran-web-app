import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import type { QuranJsonChapter } from "./types.js";
import { validateQuranEnDataset } from "./validate.js";

const require = createRequire(import.meta.url);

/**
 * Resolves the absolute path to `quran-json/dist/quran_en.json`.
 *
 * We intentionally resolve via Node's module resolver instead of assuming a
 * relative `node_modules/...` path so this works in different build layouts.
 */
export function resolveQuranEnJsonPath(): string {
  const pkgJsonPath = require.resolve("quran-json/package.json");
  const pkgRoot = path.dirname(pkgJsonPath);
  return path.resolve(pkgRoot, "dist", "quran_en.json");
}

/**
 * Loads the canonical dataset (English translation) into memory.
 *
 * Chapter 2 will add integrity validation and normalization. This step only
 * focuses on safe file loading and basic parsing.
 */
export async function loadQuranEnDataset(): Promise<QuranJsonChapter[]> {
  const filePath = resolveQuranEnJsonPath();

  // `readFile` will throw ENOENT if missing; we let higher layers convert to API errors.
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;

  // Minimal runtime check to fail fast on unexpected shape.
  if (!Array.isArray(parsed)) {
    throw new Error("quran_en.json must be a JSON array");
  }

  const chapters = parsed as QuranJsonChapter[];
  validateQuranEnDataset(chapters);
  return chapters;
}

