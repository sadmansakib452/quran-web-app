"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const placeholder = useMemo(
    () => "Search ayah translation (e.g. mercy, prayer, guidance)…",
    []
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) setQ("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onEnter = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const query = q.trim();
      if (!query) return;
      onClose();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    };
    window.addEventListener("keydown", onEnter);
    return () => window.removeEventListener("keydown", onEnter);
  }, [open, q, onClose, router]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-110">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute left-1/2 top-6 w-[min(920px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-(--reader-border) bg-(--reader-surface) shadow-2xl dark:bg-gray-900">
        <div className="flex items-center gap-3 border-b border-(--reader-border) px-4 py-3">
          <div className="shrink-0 text-gray-600 dark:text-gray-300">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21L16.7 16.7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="h-11 w-full rounded-lg border border-(--reader-border) bg-white px-3 text-theme-sm text-gray-900 shadow-theme-xs placeholder:text-gray-500 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-950/20 dark:text-white/90 dark:placeholder:text-white/30"
          />

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/5"
            aria-label="Close search"
            title="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <div className="text-theme-xs text-gray-600 dark:text-gray-400">
            Press Enter to open full results. (We’ll integrate live results here next.)
          </div>

          <button
            type="button"
            disabled={!q.trim()}
            onClick={() => {
              const query = q.trim();
              if (!query) return;
              onClose();
              router.push(`/search?q=${encodeURIComponent(query)}`);
            }}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-2 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

