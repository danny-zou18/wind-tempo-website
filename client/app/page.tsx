import Link from "next/link";
import { Flame, Music2, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-6">
      {/* Hero */}
      <section className="rounded-2xl border border-zinc-800 bg-[#050505] px-6 py-6 sm:px-8 sm:py-8 shadow-lg shadow-black/40">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
          <Sparkles className="h-4 w-4" />
          Piano rhythm, reimagined
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
          Welcome to Wind Tempo
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
          A competitive piano rhythm game inspired by OSU. Discover community
          charts, track your scores, and share your own creations with other
          players.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-400"
          >
            <Flame className="h-4 w-4" />
            Discover Winds
            <ArrowRight className="h-3 w-3" />
          </Link>


          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-100 hover:border-zinc-500 hover:bg-zinc-900"
          >
            <Music2 className="h-4 w-4" />
            Upload a chart
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {/* Trending winds */}
        <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-[#050505] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-100">
              Trending Winds
            </h2>
            <Link
              href="/discover"
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              View all
            </Link>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between rounded-xl bg-zinc-900/60 px-3 py-2">
              <div>
                <p className="font-medium text-zinc-100">Midnight Etude</p>
                <p className="text-xs text-zinc-400">by aria • ★★☆ • 180 BPM</p>
              </div>
              <span className="text-xs text-emerald-400">SS • 99.7%</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-zinc-900/60 px-3 py-2">
              <div>
                <p className="font-medium text-zinc-100">Neon Nocturne</p>
                <p className="text-xs text-zinc-400">by keystorm • ★★★ • 200 BPM</p>
              </div>
              <span className="text-xs text-emerald-400">S • 98.3%</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-zinc-900/60 px-3 py-2">
              <div>
                <p className="font-medium text-zinc-100">Wind Runner</p>
                <p className="text-xs text-zinc-400">
                  by tempofox • ★★☆ • 165 BPM
                </p>
              </div>
              <span className="text-xs text-emerald-400">A • 95.1%</span>
            </li>
          </ul>
        </div>

        {/* Patch notes preview */}
        <div className="rounded-2xl border border-zinc-800 bg-[#050505] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-100">
              Latest Patch Notes
            </h2>
            <Link
              href="/patch-notes"
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3 text-xs text-zinc-300">
            <div className="rounded-xl bg-zinc-900/60 p-3">
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                v0.1.0 • Prototype
              </p>
              <p className="mt-1 font-medium text-zinc-100">
                Added basic account system, Discover page, and community layout.
              </p>
            </div>

            <p className="text-[11px] text-zinc-500">
              You&apos;re early! Gameplay, chart editor, leaderboards, and
              profile pages are in active development.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
