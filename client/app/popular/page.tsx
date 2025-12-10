"use client";

import { useTheme } from "@/components/theme-provider";

type PopularTrack = {
  title: string;
  creator: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  plays: string;
  streak: string;
};

const popularTracks: PopularTrack[] = [
  {
    title: "Lo-fi Study Session",
    creator: "@lofigrind",
    difficulty: "Beginner",
    plays: "3.4k plays",
    streak: "Avg. streak: 7 days",
  },
  {
    title: "Arpeggio Gauntlet",
    creator: "@arpeggioszn",
    difficulty: "Advanced",
    plays: "2.1k plays",
    streak: "Avg. streak: 4 days",
  },
  {
    title: "Anime Ballad Pack",
    creator: "@otakupiano",
    difficulty: "Intermediate",
    plays: "1.9k plays",
    streak: "Avg. streak: 5 days",
  },
  {
    title: "Scales Speedrun",
    creator: "@practicebot",
    difficulty: "Intermediate",
    plays: "1.5k plays",
    streak: "Avg. streak: 6 days",
  },
];

export default function PopularPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageClasses = isDark
    ? "space-y-8 text-zinc-50"
    : "space-y-8 text-zinc-900";

  const cardClasses = isDark
    ? "rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm"
    : "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm";

  const subtleText = "text-sm text-zinc-400";

  return (
    <div className={pageClasses}>
      {/* Header */}
      <section className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Wind Tempo · Popular
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Popular winds right now.
        </h1>
        <p className={subtleText}>
          See what other pianists are playing the most—great picks for quick,
          high-impact practice sessions.
        </p>
      </section>

      {/* Popular list */}
      <section className={cardClasses + " divide-y divide-zinc-800/40"}>
        {popularTracks.map((track, index) => (
          <div
            key={track.title}
            className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-black">
                #{index + 1}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{track.title}</p>
                <p className={subtleText}>{track.creator}</p>
                <p className="text-xs text-zinc-500">
                  {track.plays} · {track.streak}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs md:justify-end">
              <span className="rounded-full border border-zinc-600 px-2 py-1">
                {track.difficulty}
              </span>
              <button className="rounded-full bg-emerald-500 px-3 py-1 font-medium text-black hover:bg-emerald-400 transition">
                Play
              </button>
              <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 transition">
                Add to queue
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
