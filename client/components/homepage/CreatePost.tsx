"use client";

import { useState } from "react";
import { Music2, Plus } from "lucide-react";
import Modal from "@/components/Modal";

const CreatePost: React.FC = () => {
  // Shared title between inline input and modal
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("NEW POST:", { title, body });
    setIsOpen(false);
    setBody("");
  };

  return (
    <>
      <div className="rounded-xl border border-zinc-800 bg-[#0b0b0b] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
            <Music2 className="h-5 w-5 text-emerald-400" />
          </div>

          <input
            type="text"
            placeholder="Create a post..."
            className="flex-1 rounded-full border border-zinc-700 bg-[#1a1a1b] px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-emerald-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 transition"
            onClick={openModal}
          >
            <Plus className="h-5 w-5 text-black" />
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} title="Create Post">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Title
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Body
            </label>
            <textarea
              className="w-full h-40 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Write your post..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
          >
            Post
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
