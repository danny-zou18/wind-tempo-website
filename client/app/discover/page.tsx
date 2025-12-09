// client/app/discover/page.tsx

type Wind = {
    title: string;
    song: string;
    creator: string;
    difficulty: "Easy" | "Normal" | "Hard" | "Expert";
    bpm: number;
    length: string;
    tags: string[];
  };
  
  const mockWinds: Wind[] = [
    {
      title: "Starlight Arpeggios",
      song: "Original Piano Mix",
      creator: "Aria",
      difficulty: "Hard",
      bpm: 165,
      length: "2:14",
      tags: ["Tech", "Arpeggios", "Flow"],
    },
    {
      title: "Moonlit Waltz",
      song: "Chopin-inspired",
      creator: "Nocturne",
      difficulty: "Normal",
      bpm: 130,
      length: "1:48",
      tags: ["Waltz", "Beginner-friendly"],
    },
    {
      title: "Thunder Etude",
      song: "Fast Piano Solo",
      creator: "Legato",
      difficulty: "Expert",
      bpm: 190,
      length: "2:32",
      tags: ["Stamina", "Jump Streams"],
    },
    {
      title: "Cafe Lofi Sessions",
      song: "Piano Lofi Beat",
      creator: "LoFiKeys",
      difficulty: "Easy",
      bpm: 90,
      length: "2:05",
      tags: ["Chill", "Practice", "Beginner"],
    },
  ];
  
  export default function DiscoverPage() {
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
  
        {/* Search / Filters (UI only for now) */}
        <section className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-[#0b0b0b] px-4 py-3">
          <input
            type="text"
            placeholder="Search by title, song, or creator"
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-200 hover:border-zinc-400">
              All difficulties
            </button>
            <button className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-200 hover:border-zinc-400">
              Featured
            </button>
            <button className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-200 hover:border-zinc-400">
              Chill / Practice
            </button>
          </div>
        </section>
  
        {/* Winds list */}
        <section className="space-y-3">
          {mockWinds.map((wind) => (
            <article
              key={wind.title}
              className="flex flex-col justify-between gap-3 rounded-xl border border-zinc-800 bg-[#0b0b0b] px-4 py-3 sm:flex-row sm:items-center"
            >
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-zinc-50">
                  {wind.title}
                </h2>
                <p className="text-xs text-zinc-400">
                  {wind.song} · by{" "}
                  <span className="text-zinc-200">{wind.creator}</span>
                </p>
  
                <div className="flex flex-wrap gap-1 text-[11px] text-zinc-300">
                  {wind.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-900 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
  
              <div className="flex items-end justify-between gap-4 sm:flex-col sm:items-end">
                <div className="text-right text-xs text-zinc-400">
                  <div>
                    Difficulty:{" "}
                    <span className="font-medium text-zinc-100">
                      {wind.difficulty}
                    </span>
                  </div>
                  <div>
                    {wind.bpm} BPM · {wind.length}
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
  