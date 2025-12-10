"use client";

import { useTheme } from "@/components/theme-provider";

type LfgPost = {
  title: string;
  username: string;
  region: string;
  skill: "Beginner" | "Intermediate" | "Advanced";
  availability: string;
  notes: string;
};

const lfgPosts: LfgPost[] = [
  {
    title: "Looking for daily practice buddy · 20–30 min",
    username: "@lofigrind",
    region: "EST",
    skill: "Beginner",
    availability: "Weeknights · 8–10 PM",
    notes: "Working through basic chords and lo-fi progressions. Voice not required, just accountability + screen share.",
  },
  {
    title: "Anime / game music duo",
    username: "@otakupiano",
    region: "PST",
    skill: "Intermediate",
    availability: "Sat/Sun afternoons",
    notes: "Would love to trade custom charts and practice together. Focus on rhythm accuracy and expression.",
  },
  {
    title: "Serious practice partner for exams",
    username: "@conservatoryPrep",
    region: "EU",
    skill: "Advanced",
    availability: "Flexible · 4–6 sessions/week",
    notes: "Preparing for entrance auditions. Looking for someone who wants structured sessions and detailed feedback.",
  },
];

export default function LfgPage() {
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
      {/* Header + create post */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Wind Tempo · LFG
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Find players to practice with.
          </h1>
          <p className={subtleText}>
            Post your practice goals, time zone, and skill level, or join
            someone else&apos;s session.
          </p>
        </div>

        <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition">
          + Create LFG post
        </button>
      </section>

      {/* Filters (static for now) */}
      <section className={cardClasses + " flex flex-wrap items-center gap-3 text-xs"}>
        <span className="font-semibold text-zinc-300">Filters:</span>
        <button className="rounded-full border border-emerald-500 px-3 py-1 text-emerald-400">
          Any skill
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
          My time zone
        </button>
      </section>

      {/* LFG posts */}
      <section className="space-y-4">
        {lfgPosts.map((post) => (
          <article key={post.title} className={cardClasses}>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">{post.title}</h2>
                <p className={subtleText}>{post.username}</p>
                <p className="text-xs text-zinc-500">
                  Region: {post.region} · Skill: {post.skill}
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 text-xs md:items-end">
                <span className="rounded-full border border-zinc-600 px-2 py-1">
                  {post.availability}
                </span>
                <button className="rounded-full bg-emerald-500 px-3 py-1 font-medium text-black hover:bg-emerald-400 transition">
                  Send message
                </button>
              </div>
            </div>

            <p className={subtleText + " mt-4"}>{post.notes}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
