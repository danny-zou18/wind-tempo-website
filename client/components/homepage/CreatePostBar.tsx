"use client";

import { useState } from "react";
import { Music2, Plus } from "lucide-react";
import CreatePostModal from "@/components/homepage/modals/CreatePostModal";

export default function CreatePostBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-xl border border-zinc-800 bg-[#0b0b0b] p-4 shadow-sm cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
            <Music2 className="h-5 w-5 text-emerald-400" />
          </div>

          <div className="flex-1 rounded-full border border-zinc-700 bg-[#1a1a1b] px-4 py-2 text-left text-sm text-zinc-400">
            Create a post
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 transition"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <Plus className="h-5 w-5 text-black" />
          </button>
        </div>
      </div>

      <CreatePostModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
