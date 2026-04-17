import React from "react";
import type { Ayah } from "../api/types";
import { AyahCard } from "./AyahCard";

export function AyahList({ ayahs }: { ayahs: Ayah[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-(--reader-border) bg-(--reader-surface) shadow-theme-xs dark:bg-gray-900">
      {ayahs.map((a) => (
        <AyahCard key={`${a.surahId}-${a.ayahNumber}`} ayah={a} />
      ))}
    </div>
  );
}

