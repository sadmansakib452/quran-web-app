import React from "react";
import type { Ayah } from "../api/types";

export function AyahCard({ ayah }: { ayah: Ayah }) {
  return (
    <div className="border-b border-(--reader-border) px-4 py-7 last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="mt-1 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-(--reader-border) bg-(--reader-surface) text-theme-sm font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            {ayah.ayahNumber}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="text-right leading-loose text-gray-900 dark:text-white/90"
            style={{
              fontFamily: "var(--q-arabic-font)",
              fontSize: "var(--q-arabic-size)",
            }}
          >
            {ayah.arabic}
          </div>

          <div
            className="mt-4 leading-7 text-gray-700 dark:text-gray-300"
            style={{ fontSize: "var(--q-translation-size)" }}
          >
            {ayah.translation}
          </div>
        </div>
      </div>
    </div>
  );
}

