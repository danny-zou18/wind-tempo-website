"use client";

import React from "react";

const GetStartedCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0b0b0b] p-4">
      <h3 className="text-sm font-semibold text-zinc-50">Getting started</h3>
      <ul className="mt-2 space-y-2 text-xs text-zinc-400">
        <li>
          • Read the <span className="text-emerald-300">Quickstart Guide</span>
        </li>
        <li>• Customize your keybinds in the Settings menu</li>
        <li>• Try the “Breeze” difficulty to learn the basics</li>
        <li>• Join a lobby from the LFG tab to play with others</li>
      </ul>
    </div>
  );
};

export default GetStartedCard;
