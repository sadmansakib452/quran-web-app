import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

function pkgDistPath(...parts: string[]) {
  // Resolve from Node's module graph (works from dist/ too).
  const pkgJsonPath = require.resolve("quran-json/package.json");
  const pkgRoot = path.dirname(pkgJsonPath);
  return path.resolve(pkgRoot, "dist", ...parts);
}

async function readJson(filePath: string) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as unknown;
}

async function main() {
  const chaptersEnIndexPath = pkgDistPath("chapters", "en", "index.json");
  const chaptersArIndexPath = pkgDistPath("chapters", "index.json");
  const quranEnPath = pkgDistPath("quran_en.json");
  const chapterEn1Path = pkgDistPath("chapters", "en", "1.json");
  const verse1Path = pkgDistPath("verses", "1.json");

  const [chaptersEnIndex, chaptersArIndex, quranEn] = await Promise.all([
    readJson(chaptersEnIndexPath),
    readJson(chaptersArIndexPath),
    readJson(quranEnPath),
  ]);

  const [chapterEn1, verse1] = await Promise.all([
    readJson(chapterEn1Path),
    readJson(verse1Path),
  ]);

  const chaptersEnCount = Array.isArray(chaptersEnIndex) ? chaptersEnIndex.length : null;
  const chaptersArCount = Array.isArray(chaptersArIndex) ? chaptersArIndex.length : null;
  const quranEnTopLevelType = Array.isArray(quranEn) ? "array" : typeof quranEn;
  const quranEnCount = Array.isArray(quranEn) ? quranEn.length : null;
  const quranEnFirstItemKeys =
    Array.isArray(quranEn) && quranEn[0] && typeof quranEn[0] === "object"
      ? Object.keys(quranEn[0] as Record<string, unknown>)
      : null;

  const chapterEn1Keys = chapterEn1 && typeof chapterEn1 === "object" ? Object.keys(chapterEn1 as Record<string, unknown>) : null;
  const chapterEn1FirstVerseKeys =
    chapterEn1 &&
    typeof chapterEn1 === "object" &&
    Array.isArray((chapterEn1 as any).verses) &&
    (chapterEn1 as any).verses[0] &&
    typeof (chapterEn1 as any).verses[0] === "object"
      ? Object.keys((chapterEn1 as any).verses[0] as Record<string, unknown>)
      : null;

  const verse1Keys = verse1 && typeof verse1 === "object" ? Object.keys(verse1 as Record<string, unknown>) : null;

  // Keep output short but useful for analysis.
  console.log(
    JSON.stringify(
      {
        paths: {
          chaptersEnIndexPath,
          chaptersArIndexPath,
          quranEnPath,
        },
        chaptersEnCount,
        chaptersArCount,
        quranEnTopLevelType,
        quranEnCount,
        quranEnFirstItemKeys,
        chaptersEnFirstItemKeys:
          Array.isArray(chaptersEnIndex) && chaptersEnIndex[0] && typeof chaptersEnIndex[0] === "object"
            ? Object.keys(chaptersEnIndex[0] as Record<string, unknown>)
            : null,
        chaptersArFirstItemKeys:
          Array.isArray(chaptersArIndex) && chaptersArIndex[0] && typeof chaptersArIndex[0] === "object"
            ? Object.keys(chaptersArIndex[0] as Record<string, unknown>)
            : null,
        chapterEn1Keys,
        chapterEn1FirstVerseKeys,
        verse1Keys,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

