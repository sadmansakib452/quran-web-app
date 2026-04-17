# Backend API Contract (v1)

This contract defines how the **frontend** talks to the **separate backend service**.

## Conventions

- **Base URL**: (set per environment) e.g. `http://localhost:8787`
- **Content-Type**: `application/json`
- **IDs**
  - `surahId`: 1–114
  - `ayahNumber`: 1..N within a surah
- **Error format** (all non-2xx):

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Human readable message"
  }
}
```

## Endpoints

### `GET /health`

Response `200`:

```json
{ "ok": true }
```

### `GET /surahs`

Purpose: Surah List page.

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

Purpose: Surah metadata (header) without loading all verses.

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

Purpose: Ayat page content.

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

### `GET /search`

Purpose: search in **translation text**.

Query params:
- `q` (required): string
- `limit` (optional): number, default 20, max 100
- `offset` (optional): number, default 0
- `surahId` (optional): number

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
      "transliteration": "Bismi Allahi alrrahmani alrrahimi",
      "highlight": { "start": 31, "end": 36 }
    }
  ]
}
```

