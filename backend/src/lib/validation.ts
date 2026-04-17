import { badRequest } from "./errors.js";

const SURAH_ID_RANGE_MESSAGE = "surahId must be between 1 and 114";
const SURAH_ID_INTEGER_MESSAGE = "surahId must be an integer between 1 and 114";

/**
 * Parses a surah id path param and validates it is in range 1..114.
 *
 * Throws BAD_REQUEST when invalid so route handlers can stay clean.
 */
export function parseSurahId(raw: string): number {
  if (!/^\d+$/.test(raw)) {
    throw badRequest(SURAH_ID_INTEGER_MESSAGE);
  }

  const id = Number(raw);
  if (!Number.isInteger(id) || id < 1 || id > 114) {
    throw badRequest(SURAH_ID_RANGE_MESSAGE);
  }

  return id;
}

function parseOptionalInt(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined;
  if (!/^\d+$/.test(raw)) return undefined;
  const n = Number(raw);
  if (!Number.isInteger(n)) return undefined;
  return n;
}

/**
 * Parses and validates search query params.
 *
 * Rules:
 * - q is required and must be at least 2 chars after trimming.
 * - limit defaults to 20, max 100.
 * - offset defaults to 0.
 * - surahId is optional but if present must be 1..114.
 */
export function parseSearchQuery(params: {
  q?: string;
  limit?: string;
  offset?: string;
  surahId?: string;
}): { q: string; limit: number; offset: number; surahId?: number } {
  const q = (params.q ?? "").trim();
  if (q.length < 2) {
    throw badRequest("q must be at least 2 characters");
  }

  const limitRaw = parseOptionalInt(params.limit);
  const offsetRaw = parseOptionalInt(params.offset);
  const surahIdRaw = parseOptionalInt(params.surahId);

  const limit = limitRaw ?? 20;
  const offset = offsetRaw ?? 0;

  if (limit < 1 || limit > 100) {
    throw badRequest("limit must be between 1 and 100");
  }
  if (offset < 0) {
    throw badRequest("offset must be 0 or greater");
  }
  if (surahIdRaw !== undefined && (surahIdRaw < 1 || surahIdRaw > 114)) {
    throw badRequest(SURAH_ID_RANGE_MESSAGE);
  }

  return { q, limit, offset, surahId: surahIdRaw };
}

