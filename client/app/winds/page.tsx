"use client";

import { useTheme } from "@/components/theme-provider";

type Wind = {
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  type: "Practice Pack" | "Single Track" | "Drill";
  length: string;
  communityTag: string;
};

const winds: Wind[] = [
  {
    name: "Foundations: Scales & Arpeggios",
    description: "A warmup pack focused on major scales and broken chords.",
    difficulty: "Beginner",
    type: "Practice Pack",
    length: "6 tracks · 18 min",
    communityTag: "Technique",
  },
  {
    name: "Lo-fi Groove Starter Kit",
    description: "Chill chord progressions designed for timing and voicing.",
    difficulty: "Intermediate",
    type: "Practice Pack",
    length: "5 tracks · 22 min",
    communityTag: "Lo-fi",
  },
  {
    name: "Boss Theme Rhythm Drill",
    description:
      "Short loop with syncopated rhythms to sharpen left/right-hand independence.",
    difficulty: "Advanced",
    type: "Drill",
    length: "1 track · 2 min loop",
    communityTag: "Game Music",
  },
  {
    name: "Anime Ballad Night Session",
    description:
      "Emotional melodies with focus on dynamics and expression.",
    difficulty: "Intermediate",
    type: "Practice Pack",
    length: "4 tracks · 19 min",
    communityTag: "Anime",
  },
  {
    name: "Speedrun Scales Challenge",
    description:
      "Push your tempo gradually while keeping hits in the Perfect window.",
    difficulty: "Advanced",
    type: "Drill",
    length: "3 tracks · 12 min",
    communityTag: "Speed",
  },
  {
    name: "First Week on Wind Tempo",
    description:
      "Guided winds that introduce timing, visuals, and scoring basics.",
    difficulty: "Beginner",
    type: "Practice Pack",
    length: "5 tracks · 20 min",
    communityTag: "Onboarding",
  },
];

export default function DiscoverWindsPage() {
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
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Wind Tempo · Discover Winds
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Find new winds to practice.
        </h1>
        <p className={subtleText}>
          Curated practice packs, drills, and tracks designed to target specific
          skills, genres, and difficulty levels.
        </p>
      </section>

      {/* Filters (static for now) */}
      <section className={cardClasses + " flex flex-wrap items-center gap-3 text-xs"}>
        <span className="font-semibold text-zinc-300">Browse by:</span>
        <button className="rounded-full border border-emerald-500 px-3 py-1 text-emerald-400">
          All winds
        </button>
        <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-400">
          Beginner
        </button>
        <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-400">
          Intermediate
        </button>
        <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-400">
          Advanced
        </button>
        <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-400">
          Technique
        </button>
        <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-400">
          Lo-fi
        </button>
        <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-400">
          Anime
        </button>
      </section>

      {/* Winds grid */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {winds.map((wind) => (
          <article key={wind.name} className={cardClasses}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">{wind.name}</h2>
                <p className={subtleText}>{wind.description}</p>
              </div>
              <span className="rounded-full border border-zinc-600 px-2 py-1 text-xs">
                {wind.difficulty}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-zinc-800/70 px-2 py-1 text-zinc-200">
                {wind.type}
              </span>
              <span className="rounded-full bg-zinc-800/70 px-2 py-1 text-zinc-200">
                {wind.length}
              </span>
              <span className="rounded-full border border-zinc-600 px-2 py-1 text-zinc-300">
                #{wind.communityTag}
              </span>
            </div>

            <div className="mt-4 flex gap-2 text-xs">
              <button className="rounded-full bg-emerald-500 px-3 py-1 font-medium text-black hover:bg-emerald-400 transition">
                Start wind
              </button>
              <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 transition">
                Add to queue
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
