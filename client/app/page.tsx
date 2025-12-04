import Image from "next/image";
import Link from "next/link";

import { Music2, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full gap-6">
      <section className="flex-1 max-w-3xl space-y-4">
        {/* Create Post Card */}
        <div className="rounded-xl border border-zinc-800 bg-[#0b0b0b] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
              <Music2 className="h-5 w-5 text-emerald-400" />
            </div>
            <button className="flex-1 rounded-full border border-zinc-700 bg-[#1a1a1b] px-4 py-2 text-left text-sm text-zinc-400 hover:border-zinc-500">
              Create a post
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 transition">
              <Plus className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
