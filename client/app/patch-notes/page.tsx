export default function PatchNotesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex justify-center px-4 py-16">
      <main className="w-full max-w-4xl space-y-14">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Patch Notes</h1>
          <p className="text-zinc-400 text-lg">
            Track the evolution of Wind Tempo as we build the future of rhythm-based piano practice.
          </p>
        </header>

        {/* v0.2.0 */}
        <section className="space-y-6 border-l-2 border-emerald-500 pl-6">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-400">v0.2.0 — Community & Practice Update</h2>
            <p className="text-sm text-zinc-500">March 2025</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🎹 Practice & Gameplay</h3>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 text-sm">
              <li>Added real-time hit accuracy indicators (Perfect / Early / Late).</li>
              <li>Improved note timing windows for tighter rhythm consistency.</li>
              <li>New difficulty scaling system for beginner → advanced players.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🛠️ Systems</h3>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 text-sm">
              <li>Initial MIDI keyboard compatibility framework implemented.</li>
              <li>Latency compensation system added for external devices.</li>
              <li>Improved performance on lower-end machines.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">👥 Community</h3>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 text-sm">
              <li>Track sharing prototype released for internal testing.</li>
              <li>Creator profile system groundwork completed.</li>
            </ul>
          </div>
        </section>

        {/* v0.1.0 */}
        <section className="space-y-6 border-l-2 border-zinc-700 pl-6">
          <div>
            <h2 className="text-2xl font-semibold">v0.1.0 — Prototype Release</h2>
            <p className="text-sm text-zinc-500">February 2025</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🚀 Core Features</h3>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 text-sm">
              <li>Initial rhythm engine and note highway implemented.</li>
              <li>Basic scoring system with combo tracking.</li>
              <li>Simple track playback system.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🎨 UI / UX</h3>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 text-sm">
              <li>Dark mode interface introduced.</li>
              <li>Foundational UI layout for Home, Discover, and Settings.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🔧 Dev Infrastructure</h3>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 text-sm">
              <li>Next.js frontend architecture finalized.</li>
              <li>Initial CI + GitHub repo structure established.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
