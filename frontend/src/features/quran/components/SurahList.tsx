import React from "react";
import type { SurahSummary } from "../api/types";
import { SurahCard } from "./SurahCard";
import { SurahRow } from "./SurahRow";

export type SurahViewMode = "list" | "grid";

export function SurahList({
  surahs,
  viewMode,
}: {
  surahs: SurahSummary[];
  viewMode: SurahViewMode;
}) {
  return (
    <div className="rounded-2xl border border-(--reader-border) bg-(--reader-surface) shadow-theme-xs dark:bg-gray-900">
      {/* Mobile always uses list; grid only appears on >= sm */}
      <div className="sm:hidden">
        {surahs.map((s) => (
          <SurahRow key={s.id} surah={s} />
        ))}
      </div>

      <div className="hidden sm:block">
        {viewMode === "list" ? (
          <div>
            {surahs.map((s) => (
              <SurahRow key={s.id} surah={s} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3">
            {surahs.map((s) => (
              <SurahCard key={s.id} surah={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

