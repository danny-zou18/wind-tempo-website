export default function PatchNotesPage() {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Patch Notes</h1>
          <p className="text-sm text-zinc-400">
            Latest updates and changes to Wind Tempo.
          </p>
        </header>
  
        <section className="space-y-4">
          <article className="rounded-lg border border-zinc-800 bg-[#0b0b0b] p-4">
            <h2 className="text-lg font-semibold">v0.1.0 — Initial Prototype</h2>
            <p className="text-xs text-zinc-400">December 9, 2025</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-200">
              <li>Added main feed layout and sidebar navigation.</li>
              <li>Implemented top navigation with search and auth modals.</li>
              <li>Set up basic routing for Home / Discover / Patch Notes.</li>
            </ul>
          </article>
        </section>
      </div>
    );
  }
  