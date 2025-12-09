"use client";

import { useTheme } from "@/components/theme-provider";

type DiscoverTrack = {
  title: string;
  creator: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  plays: string;
};

const trendingTracks: DiscoverTrack[] = [
  {
    title: "Starlight Etude",
    creator: "@nocturne",
    tags: ["Arpeggios", "Warmup"],
    difficulty: "Intermediate",
    plays: "1.2k plays",
  },
  {
    title: "Chill Lo-fi Progressions",
    creator: "@lofigrind",
    tags: ["Chords", "Groove"],
    difficulty: "Beginner",
    plays: "842 plays",
  },
  {
    title: "Boss Theme Practice",
    creator: "@rhythmdev",
    tags: ["Syncopation", "Fast"],
    difficulty: "Advanced",
    plays: "503 plays",
  },
];

export default function DiscoverPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageClasses = isDark
    ? "space-y-8 text-zinc-50"
    : "space-y-8 text-zinc-900";

  const cardClasses = isDark
    ? "rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5"
    : "rounded-2xl border border-zinc-200 bg-white p-5";

  const subtleText = "text-sm text-zinc-400";

  return (
    <div className={`${pageClasses} w-full`}>
      {/* Header + search */}
      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Wind Tempo · Discover
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Discover new winds to practice.
          </h1>
          <p className={subtleText}>
            Browse community-made tracks, practice charts, and drills tailored
            to your level.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            placeholder="Search tracks, creators, or tags…"
            className={
              (isDark
                ? "bg-zinc-900/70 border-zinc-800 text-zinc-50"
                : "bg-white border-zinc-300 text-zinc-900") +
              " w-full rounded-full border px-4 py-2 text-sm outline-none focus:border-emerald-500"
            }
          />
          <div className="flex gap-2 text-xs">
            <button className="rounded-full border border-emerald-500 px-3 py-1 font-medium text-emerald-400">
              Trending
            </button>
            <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-400">
              New
            </button>
            <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-400">
              Recommended
            </button>
          </div>
        </div>
      </section>

      {/* Trending tracks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Trending tracks</h2>
            <p className={subtleText}>
              Popular charts other pianists are practicing this week.
            </p>
          </div>
          <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
            See all
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {trendingTracks.map((track) => (
            <div key={track.title} className={cardClasses}>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{track.title}</p>
                  <p className={subtleText}>{track.creator}</p>
                </div>
                <span className="rounded-full border border-zinc-600 px-2 py-1 text-xs">
                  {track.difficulty}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                {track.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-800/60 px-2 py-1 text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
                <span className={subtleText + " ml-auto"}>{track.plays}</span>
              </div>

              <div className="mt-4 flex gap-2 text-xs">
                <button className="rounded-full bg-emerald-500 px-3 py-1 font-medium text-black hover:bg-emerald-400 transition">
                  Play
                </button>
                <button className="rounded-full border border-zinc-600 px-3 py-1 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 transition">
                  Add to practice queue
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories / tags strip */}
      <section className={cardClasses + " flex flex-wrap gap-2 text-xs"}>
        <span className="font-semibold text-zinc-300">Browse by tag:</span>
        {[
          "Scales",
          "Arpeggios",
          "Chord Progressions",
          "Lo-fi",
          "Anime",
          "Film score",
          "Warmup",
        ].map((tag) => (
          <button
            key={tag}
            className="rounded-full bg-zinc-800/70 px-3 py-1 text-zinc-200 hover:bg-zinc-700 transition"
          >
            {tag}
          </button>
        ))}
      </section>
    </div>
  );
}
