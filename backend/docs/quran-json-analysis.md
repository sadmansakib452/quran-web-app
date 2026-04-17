# `quran-json@3.1.2` analysis notes (backend)

This document captures what we learned from the installed npm package `quran-json@3.1.2` so we can reuse it during implementation without re-checking `node_modules`.

Related docs:

- `docs/api-contract.md` (frontend ↔ backend contract)
- `docs/decision-log.md` (explicit decisions)

## Step 1 — Data assets map (`dist/`)

Top-level files (examples):

- `dist/quran.json`
  - **Arabic text only**, full Quran in one JSON file.
- `dist/quran_en.json` (also `quran_bn.json`, `quran_es.json`, etc.)
  - **Full Quran per language** (array of 114 chapters/surahs).
- `dist/quran_transliteration.json`
  - Full Quran transliteration (separate).
- `dist/chapters/`
  - Chapter-level files and indexes.
- `dist/verses/`
  - One JSON file per global verse number (1–6236).

## Step 2 — Schema sampling results

### `dist/chapters/en/index.json`

- Type: **array**
- Count: **114**
- Item keys:
  - `id` (number)
  - `name` (Arabic name)
  - `transliteration` (English transliteration, e.g. `Al-Fatihah`)
  - `translation` (English meaning/title, e.g. `The Opener`)
  - `type` (`meccan` or `medinan`)
  - `total_verses` (number)
  - `link` (URL string pointing to chapter JSON in CDN)

### `dist/chapters/index.json` (Arabic index)

- Type: **array**
- Count: **114**
- Item keys:
  - `id`, `name` (Arabic), `transliteration`, `type`, `total_verses`, `link`
- Difference vs English index: **no `translation` field**.

### `dist/chapters/en/1.json` (per-chapter with translation)

- Type: **object**
- Keys:
  - `id`, `name` (Arabic), `transliteration`, `translation` (English title), `type`, `total_verses`, `verses`
- `verses` is an array; first verse keys:
  - `id` (verse number within the chapter)
  - `text` (Arabic)
  - `translation` (English translation of the verse)
  - `transliteration`

### `dist/chapters/1.json` (per-chapter Arabic-only)

- Same shape as `chapters/en/1.json` but verse objects **do not** include `translation`.

### `dist/verses/1.json` (single verse, global numbering)

- Type: **object**
- Keys:
  - `id` (global id)
  - `number` (global verse number; matches `id` in sample)
  - `text` (Arabic)
  - `translations` (object map by language code, e.g. `en`, `es`, …)
  - `transliteration`
  - `chapter` (object containing chapter metadata + translations for chapter title)

### `dist/quran_en.json`

We didn’t print the full file (large), but inspection confirms:

- Type: **array**
- Count: **114**
- Chapter keys (first item):
  - `id`, `name`, `transliteration`, `translation`, `type`, `total_verses`, `verses`
- This matches the shape of `dist/chapters/en/{n}.json`, but bundled for all chapters.

## Step 3 — Canonical source recommendation (for our backend)

Recommended: use **`dist/quran_en.json` as the single source of truth** for this project.

Why:

- It already contains **all 114 surahs**, each with:
  - Arabic name (`name`)
  - English transliteration (`transliteration`) and English title/meaning (`translation`)
  - verse list with **Arabic verse text** + **English verse translation**
- It’s a single file (~2–3MB), easy to load once at backend startup.
- It supports the assignment requirements directly:
  - Surah list: Arabic + English naming + verse counts
  - Ayat page: Arabic text + translation
  - Search: search across `verses[].translation`

When we need additional languages later, we can swap/extend to `quran_{lang}.json` or use `verses/{n}.json` for multi-language.

## Attribution / license note

The npm package indicates: **CC-BY-SA 4.0**. We should include a “Data & Attribution” section in the repo README and link the dataset source.

## Step 4 — Normalized backend model (v1)

Even though the dataset already has a reasonable shape, we should **normalize** what we return from the backend so:

- the frontend doesn’t depend on raw dataset quirks
- we can switch datasets later without breaking the UI

### Types (conceptual)

#### `SurahSummary`

- `id`: number (1–114)
- `nameAr`: string (Arabic name)
- `nameEn`: string (English transliteration, e.g. `Al-Fatihah`)
- `meaningEn`: string (English title/meaning, e.g. `The Opener`)
- `type`: `"meccan" | "medinan"`
- `ayahCount`: number

#### `Ayah`

- `surahId`: number
- `ayahNumber`: number (1..N within surah)
- `arabic`: string
- `translation`: string (English translation text)
- `transliteration`: string

#### `SurahDetail`

- `surah`: `SurahSummary`
- `ayahs`: `Ayah[]`

#### `SearchHit`

- `surahId`: number
- `ayahNumber`: number
- `arabic`: string
- `translation`: string
- `transliteration`: string
- `highlight` (optional): `{ start: number; end: number }`
  - offsets in `translation` for UI highlighting (nice-to-have)

## Step 5 — API contract draft (v1)

This is a simple REST-ish contract. All responses are JSON.

### `GET /health`

Purpose: quick check that backend is up.

Response `200`:

```json
{ "ok": true }
```

### `GET /surahs`

Purpose: Surah List page (114 surahs).

Response `200`:

```json
{
  "surahs": [
    {
      "id": 1,
      "nameAr": "الفاتحة",
      "nameEn": "Al-Fatihah",
      "meaningEn": "The Opener",
      "type": "meccan",
      "ayahCount": 7
    }
  ]
}
```

### `GET /surahs/:id`

Purpose: Surah header/meta without all verses (optional convenience).

Response `200`:

```json
{
  "surah": {
    "id": 55,
    "nameAr": "الرحمن",
    "nameEn": "Ar-Rahman",
    "meaningEn": "The Beneficent",
    "type": "medinan",
    "ayahCount": 78
  }
}
```

### `GET /surahs/:id/ayahs`

Purpose: Ayat page for a selected surah.

Response `200`:

```json
{
  "surah": {
    "id": 1,
    "nameAr": "الفاتحة",
    "nameEn": "Al-Fatihah",
    "meaningEn": "The Opener",
    "type": "meccan",
    "ayahCount": 7
  },
  "ayahs": [
    {
      "surahId": 1,
      "ayahNumber": 1,
      "arabic": "بِسۡمِ ٱللَّهِ ...",
      "translation": "In the name of Allah, the Entirely Merciful, the Especially Merciful",
      "transliteration": "Bismi Allahi alrrahmani alrraheemi"
    }
  ]
}
```

### `GET /search?q=...`

Purpose: Search ayahs by **translation text**.

Query params:
- `q` (required): search string
- `limit` (optional, default 20, max 100)
- `offset` (optional, default 0)
- `surahId` (optional): restrict search to one surah

Response `200`:

```json
{
  "query": "mercy",
  "limit": 20,
  "offset": 0,
  "total": 123,
  "hits": [
    {
      "surahId": 1,
      "ayahNumber": 1,
      "arabic": "بِسۡمِ ٱللَّهِ ...",
      "translation": "In the name of Allah, the Entirely Merciful, the Especially Merciful",
      "transliteration": "Bismi Allahi alrrahmani alrraheemi",
      "highlight": { "start": 31, "end": 36 }
    }
  ]
}
```

### Error shape (recommended)

For invalid surah id or missing params:

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "surahId must be between 1 and 114"
  }
}
```


