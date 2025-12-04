"use client";

import React from "react";
import Link from "next/link";

const LatestPatchCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0b0b0b] p-4">
      <h3 className="text-sm font-semibold text-zinc-50">
        Latest patch: 0.3.1
      </h3>
      <p className="mt-1 text-xs text-zinc-400">
        • New difficulty: <span className="text-emerald-300">Gale Force</span>•
        Timing window tweaks • Improved hit feedback and combo visuals
      </p>
      <Link
        href="/patch-notes"
        className="mt-3 inline-flex text-xs font-semibold text-emerald-300 hover:text-emerald-200"
      >
        View full patch notes →
      </Link>
    </div>
  );
};

export default LatestPatchCard;
