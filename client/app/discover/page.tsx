import { db } from "@/lib/db";

type DiscoverWind = {
  id: number;
  wind_title: string;
  song_title: string;
  artist: string;
  difficulty_label: string | null;
  bpm: number | null;
  length_seconds: number | null;
  creator_username: string;
};

function formatLength(seconds: number | null) {
  if (!seconds || seconds <= 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function DiscoverPage() {
  const { rows } = await db.query<DiscoverWind>(
    `
    SELECT
      w.id,
      w.title AS wind_title,
      s.title AS song_title,
      s.artist,
      w.difficulty_label,
      s.bpm,
      s.length_seconds,
      u.username AS creator_username
    FROM winds w
    JOIN songs s ON s.id = w.song_id
    JOIN users u ON u.id = w.creator_id
    WHERE w.status = 'published'
    ORDER BY w.created_at DESC
    LIMIT 20;
    `
  );

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Discover Winds</h1>
        <p className="text-sm text-zinc-400">
          Find new piano charts to play — from chill practice pieces to
          high-intensity tech maps.
        </p>
      </header>

      {/* Simple list from DB */}
      <section className="space-y-3">
        {rows.length === 0 && (
          <p className="text-sm text-zinc-400">
            No winds found yet. Check back soon!
          </p>
        )}

        {rows.map((wind) => (
          <article
            key={wind.id}
            className="flex flex-col justify-between gap-3 rounded-xl border border-zinc-800 bg-[#0b0b0b] px-4 py-3 sm:flex-row sm:items-center"
          >
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-zinc-50">
                {wind.wind_title}
              </h2>
              <p className="text-xs text-zinc-400">
                {wind.song_title} · {wind.artist} · by{" "}
                <span className="text-zinc-200">
                  {wind.creator_username}
                </span>
              </p>
            </div>

            <div className="flex items-end justify-between gap-4 sm:flex-col sm:items-end">
              <div className="text-right text-xs text-zinc-400">
                <div>
                  Difficulty:{" "}
                  <span className="font-medium text-zinc-100">
                    {wind.difficulty_label || "Unrated"}
                  </span>
                </div>
                <div>
                  {wind.bpm ?? "—"} BPM ·{" "}
                  {formatLength(wind.length_seconds)}
                </div>
              </div>

              <button className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-black hover:bg-white">
                Play Wind
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
