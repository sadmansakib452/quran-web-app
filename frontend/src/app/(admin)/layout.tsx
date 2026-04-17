"use client";

import React from "react";
import { QuranHeader } from "@/layout/QuranHeader";
import { SettingsPanel } from "@/components/quran/SettingsPanel";
import { SearchOverlay } from "@/components/quran/SearchOverlay";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-(--reader-bg)">
      <main className="p-4 mx-auto max-w-(--breakpoint-2xl) space-y-4 md:p-6">
        <QuranHeader
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
        {children}
      </main>

      <SettingsPanel
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
