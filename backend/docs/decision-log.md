# Decision log (backend, v1)

Small, explicit decisions made during analysis so implementation stays consistent.

## Data source

- **Dataset**: npm package `quran-json@3.1.2` (JSON shipped in `node_modules/quran-json/dist`)
- **License**: CC-BY-SA 4.0 (ensure attribution in README)

## Canonical file

- **Canonical dataset file**: `dist/quran_en.json`
- Reason: single file includes 114 surahs + Arabic verse text + English verse translations; simplest to load + search.

## API contract

- Contract documented in `docs/api-contract.md`
- Errors: single consistent `{ error: { code, message } }` shape

## Search behavior

- Search is performed on **English translation text** only (matches assignment requirement).
- Default: case-insensitive substring match (can upgrade later to tokenization/ranking).
- Response includes `surahId` + `ayahNumber` so frontend can link users to the right verse.

## Naming conventions

- **`nameAr`**: Arabic surah name (dataset field: `name`)
- **`nameEn`**: English transliteration (dataset field: `transliteration`)
- **`meaningEn`**: English surah meaning/title (dataset field: `translation`)

