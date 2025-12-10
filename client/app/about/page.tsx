"use client";

import { useTheme } from "@/components/theme-provider";

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageClasses = isDark
    ? "min-h-screen bg-zinc-950 text-zinc-50 flex justify-center px-4 py-16 transition-colors"
    : "min-h-screen bg-zinc-50 text-zinc-900 flex justify-center px-4 py-16 transition-colors";

  const cardClasses = isDark
    ? "rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
    : "rounded-2xl border border-zinc-200 bg-white p-5";

  return (
    <div className={pageClasses}>
      <main className="w-full max-w-4xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            About Wind Tempo
          </h1>
          <p className="text-zinc-400 text-lg">
            Wind Tempo aims to perfect the rhythm-game genre by becoming the
            best gamified, community-based piano practice tool out there.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className={cardClasses}>
            <h2 className="text-xl font-semibold mb-2">Effectiveness</h2>
            <p className="text-sm text-zinc-400">
              Metronomes, visual notation, track playback, and MIDI compatibility
              help musicians practice efficiently.
            </p>
          </div>

          <div className={cardClasses}>
            <h2 className="text-xl font-semibold mb-2">Gamification</h2>
            <p className="text-sm text-zinc-400">
              Practice becomes addictive with high scores, leaderboards, unlockable
              difficulties, and visually engaging gameplay.
            </p>
          </div>

          <div className={cardClasses}>
            <h2 className="text-xl font-semibold mb-2">Community</h2>
            <p className="text-sm text-zinc-400">
              Like Geometry Dash for pianists — players can create and share tracks
              using a polished track editor that fuels the game's ecosystem.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Project Goals</h2>
          <ul className="list-disc list-inside text-zinc-400 space-y-1 text-sm">
            <li>Build a powerful tool that supports real musical improvement.</li>
            <li>Make practicing fun through game mechanics.</li>
            <li>Empower the community to create and share endless content.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
