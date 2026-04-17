import { getApiBaseUrl } from "@/lib/env";
import type {
  ErrorResponse,
  GetSurahAyahsResponse,
  GetSurahResponse,
  GetSurahsResponse,
  SearchResponse,
} from "./types";

async function requestJson<T>(path: string): Promise<T> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}${path}`, {
    // Allow Next SSG/ISR caching by default; pages decide when they call this.
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const data = (await res.json()) as Partial<ErrorResponse>;
      if (data?.error?.message) message = data.error.message;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}

export const quranApi = {
  getSurahs(): Promise<GetSurahsResponse> {
    return requestJson<GetSurahsResponse>("/surahs");
  },
  getSurah(id: number): Promise<GetSurahResponse> {
    return requestJson<GetSurahResponse>(`/surahs/${id}`);
  },
  getSurahAyahs(id: number): Promise<GetSurahAyahsResponse> {
    return requestJson<GetSurahAyahsResponse>(`/surahs/${id}/ayahs`);
  },
  search(params: { q: string; limit?: number; offset?: number; surahId?: number }) {
    const usp = new URLSearchParams();
    usp.set("q", params.q);
    if (params.limit != null) usp.set("limit", String(params.limit));
    if (params.offset != null) usp.set("offset", String(params.offset));
    if (params.surahId != null) usp.set("surahId", String(params.surahId));
    return requestJson<SearchResponse>(`/search?${usp.toString()}`);
  },
};

