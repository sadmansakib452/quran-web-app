"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GridIcon, ListIcon } from "../icons/index";

type NavItem = { name: string; path: string; icon: React.ReactNode };

const NAV_ITEMS: NavItem[] = [
  { name: "Surahs", path: "/", icon: <GridIcon /> },
  { name: "Search", path: "/search", icon: <ListIcon /> },
];

const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const activePath = useMemo(() => pathname, [pathname]);

  // Quran app no longer uses the TailAdmin sidebar subsystem. This is a minimal
  // navigation component kept only for template routes that still import it.
  return (
    <aside className="hidden" aria-hidden="true">
      <nav>
        <ul>
          {NAV_ITEMS.map((n) => (
            <li key={n.path}>
              <Link
                href={n.path}
                className={activePath === n.path ? "menu-item-active" : "menu-item-inactive"}
              >
                {n.icon}
                <span>{n.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AppSidebar;
