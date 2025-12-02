"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Flame,
  MessageSquare,
  Compass,
  Info,
  Settings,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block fixed left-0 top-14 h-[calc(100vh-56px)] w-60 border-r border-zinc-800 bg-[#0b0b0b] pt-2 pb-6 text-sm">
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Wind Tempo
      </p>

      <ul className="mt-1 space-y-0.5">
        <li>
          <Link
            href="/"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              pathname === "/"
                ? "bg-zinc-800 text-zinc-50"
                : "text-zinc-300 hover:bg-zinc-800/80"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link
            href="/popular"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              pathname === "/popular"
                ? "bg-zinc-800 text-zinc-50"
                : "text-zinc-300 hover:bg-zinc-800/80"
            }`}
          >
            <Flame className="h-4 w-4" />
            <span>Popular</span>
          </Link>
        </li>

        <li>
          <Link
            href="/lfg"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              pathname === "/lfg"
                ? "bg-zinc-800 text-zinc-50"
                : "text-zinc-300 hover:bg-zinc-800/80"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>LFG (Find Players)</span>
          </Link>
        </li>

        <li>
          <Link
            href="/winds"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              pathname === "/winds"
                ? "bg-zinc-800 text-zinc-50"
                : "text-zinc-300 hover:bg-zinc-800/80"
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Discover Winds</span>
          </Link>
        </li>
      </ul>

      <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        More
      </p>

      <ul className="mt-1 space-y-0.5">
        <li>
          <Link
            href="/about"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              pathname === "/about"
                ? "bg-zinc-800 text-zinc-50"
                : "text-zinc-300 hover:bg-zinc-800/80"
            }`}
          >
            <Info className="h-4 w-4" />
            <span>About Wind Tempo</span>
          </Link>
        </li>

        <li>
          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              pathname === "/settings"
                ? "bg-zinc-800 text-zinc-50"
                : "text-zinc-300 hover:bg-zinc-800/80"
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
