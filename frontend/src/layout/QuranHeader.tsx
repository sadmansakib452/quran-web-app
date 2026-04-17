"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

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
  usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
          {/* Desktop icons */}
          <div className="hidden sm:flex items-center gap-1">
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

          {/* Mobile overflow (three dots) */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-black/5 focus:outline-hidden focus:ring-3 focus:ring-brand-500/15 dark:text-gray-200 dark:hover:bg-white/5 sm:hidden"
            aria-label="Menu"
            title="Menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H5.01M12 12H12.01M19 12H19.01"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {mobileMenuOpen ? (
            <div className="absolute right-3 top-[52px] w-40 rounded-xl border border-(--reader-border) bg-(--reader-surface) p-1 shadow-theme-md dark:bg-gray-900 sm:hidden">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-theme-sm text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/5"
              >
                <span>Settings</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-theme-sm text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/5"
              >
                <span>Search</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

