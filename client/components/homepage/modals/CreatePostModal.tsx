"use client";

import { useState } from "react";
import Modal from "../../Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreatePostModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Post">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("POST SUBMITTED:", { title, body });
          onClose();
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Post title"
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Write your post..."
            className="w-full h-40 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-500 py-2 text-black font-semibold hover:bg-emerald-400 transition"
        >
          Post
        </button>
      </form>
    </Modal>
  );
}
