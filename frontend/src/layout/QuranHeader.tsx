"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSurahViewMode } from "@/context/SurahViewModeContext";

function IconButton({
  label,
  title,
  onClick,
  children,
}: {
  label: string;
  title?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-black/5 focus:outline-hidden focus:ring-3 focus:ring-brand-500/15 dark:text-gray-200 dark:hover:bg-white/5"
      onClick={onClick}
      aria-label={label}
      title={title}
    >
      {children}
    </button>
  );
}

export function QuranHeader({
  onOpenSettings,
  onOpenSearch,
}: {
  onOpenSettings: () => void;
  onOpenSearch: () => void;
}) {
  const pathname = usePathname();
  const { viewMode, setViewMode } = useSurahViewMode();
  const showSurahToggles = pathname === "/";

  return (
    <header className="rounded-xl border border-(--reader-border) bg-(--reader-surface) shadow-theme-xs dark:bg-gray-900">
      <div className="relative flex h-14 items-center px-3 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center justify-start">
          <Link
            href="/"
            aria-label="Go to Surahs"
            title="Surahs"
            className="inline-flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            <Image
              src="/images/logo/logo.png"
              alt="App logo"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-contain"
              priority
            />
          </Link>
        </div>

        {/* Absolutely centered title to avoid optical drift */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            href="/"
            aria-label="Go to Surahs"
            title="Surahs"
            className="pointer-events-auto inline-flex items-center justify-center rounded-lg px-2 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <span className="whitespace-nowrap text-[18px] font-extrabold uppercase leading-none tracking-[0.24em] text-gray-900 dark:text-white/90 sm:text-[20px]">
              Quran Majeed
            </span>
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
          {showSurahToggles ? (
            <div className="hidden sm:flex items-center gap-1 pr-1">
              <button
                type="button"
                aria-label="List view"
                title="List view"
                onClick={() => setViewMode("list")}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-theme-xs ${
                  viewMode === "list"
                    ? "border-(--reader-border) bg-(--reader-surface) text-gray-900 dark:bg-gray-900 dark:text-white/90"
                    : "border-(--reader-border) bg-(--reader-surface)/60 text-gray-700 hover:bg-(--reader-surface) dark:bg-white/3 dark:text-gray-300"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 6H21M8 12H21M8 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 6H3.01M3 12H3.01M3 18H3.01"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Card view"
                title="Card view"
                onClick={() => setViewMode("grid")}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-theme-xs ${
                  viewMode === "grid"
                    ? "border-(--reader-border) bg-(--reader-surface) text-gray-900 dark:bg-gray-900 dark:text-white/90"
                    : "border-(--reader-border) bg-(--reader-surface)/60 text-gray-700 hover:bg-(--reader-surface) dark:bg-white/3 dark:text-gray-300"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H20V20H14V14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : null}

          <IconButton label="Open settings" title="Settings" onClick={onOpenSettings}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19.4 15A7.96 7.96 0 0 0 19.9 12C19.9 10.97 19.7 9.98 19.4 9.05L21 7.4L19.6 6L17.95 7.6A8.1 8.1 0 0 0 15 6.6L14.7 4H9.3L9 6.6A8.1 8.1 0 0 0 6.05 7.6L4.4 6L3 7.4L4.6 9.05A8.02 8.02 0 0 0 4.1 12C4.1 13.03 4.3 14.02 4.6 14.95L3 16.6L4.4 18L6.05 16.4A8.1 8.1 0 0 0 9 17.4L9.3 20H14.7L15 17.4A8.1 8.1 0 0 0 17.95 16.4L19.6 18L21 16.6L19.4 15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>

          <IconButton label="Search" title="Search" onClick={onOpenSearch}>
            <svg
              width="24"
              height="24"
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
          </IconButton>
        </div>
      </div>
    </header>
  );
}

