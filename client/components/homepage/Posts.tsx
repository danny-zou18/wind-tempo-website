"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, Clock, Pin } from "lucide-react";

type Post = {
  id: number;
  title: string;
  community: string;
  author: string;
  createdAt: string;
  tag?: string;
  commentCount: number;
  upvotes: number;
  isPinned?: boolean;
};

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Share your highest combo streak in Wind Tempo 🎵",
    community: "r/WindTempo",
    author: "wind_main",
    createdAt: "2h ago",
    tag: "Discussion",
    commentCount: 34,
    upvotes: 212,
    isPinned: true,
  },
  {
    id: 2,
    title: "[Patch 0.3.1] New chart difficulty: Gale Force (preview)",
    community: "r/WindTempoPatchNotes",
    author: "dev_team",
    createdAt: "5h ago",
    tag: "Patch Notes",
    commentCount: 18,
    upvotes: 156,
  },
  {
    id: 3,
    title: "Looking for players to test co-op charts this weekend",
    community: "r/WindTempoLFG",
    author: "tempoTester",
    createdAt: "1d ago",
    tag: "LFG",
    commentCount: 9,
    upvotes: 73,
  },
];

const Posts: React.FC = () => {
  return (
    <div className="space-y-3">
      {mockPosts.map((post) => (
        <article
          key={post.id}
          className="rounded-xl border border-zinc-800 bg-[#0b0b0b] p-4 hover:border-zinc-700 transition"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Link
                  href="/"
                  className="font-semibold text-zinc-300 hover:text-zinc-100"
                >
                  {post.community}
                </Link>
                <span>•</span>
                <span>Posted by u/{post.author}</span>
                <span>•</span>
                <span>{post.createdAt}</span>
                {post.isPinned && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-300">
                    <Pin className="h-3 w-3" />
                    Pinned
                  </span>
                )}
              </div>

              <h2 className="mt-1 text-base font-semibold text-zinc-50">
                {post.title}
              </h2>

              {post.tag && (
                <span className="mt-2 inline-flex items-center rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-200">
                  {post.tag}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400">
            <div className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1">
              <span className="text-zinc-200">{post.upvotes}</span>
              <span className="text-zinc-500">upvotes</span>
            </div>
            <button className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1 hover:bg-zinc-800">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{post.commentCount} comments</span>
            </button>
            <div className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1">
              <Clock className="h-3.5 w-3.5" />
              <span>In-game</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Posts;
