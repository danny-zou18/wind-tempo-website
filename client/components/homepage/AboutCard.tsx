"use client";

import React from "react";

const AboutCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0b0b0b] p-4">
      <h3 className="text-sm font-semibold text-zinc-50">About Wind Tempo</h3>
      <p className="mt-2 text-xs text-zinc-400">
        Wind Tempo is a rhythm game where you ride the wind and hit notes across
        multiple lanes. This hub is the official place for updates, discussions,
        chart sharing, and finding other players.
      </p>

      <div className="mt-3 space-y-1 text-xs text-zinc-300">
        <div className="flex justify-between">
          <span>Players online</span>
          <span className="font-semibold text-emerald-400">512</span>
        </div>
        <div className="flex justify-between">
          <span>Total charts shared</span>
          <span className="font-semibold">1,284</span>
        </div>
      </div>

      <button className="mt-4 w-full rounded-full bg-emerald-500 py-2 text-xs font-semibold text-black hover:bg-emerald-400 transition">
        Download the game
      </button>
    </div>
  );
};

export default AboutCard;
