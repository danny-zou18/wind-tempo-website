"use client";

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

type WavePlayerProps = {
  audioUrl: string;
};

function formatTime(seconds: number) {
  if (!seconds || seconds < 0) return "0:00";
  const m = Math.floor(seconds);
  const s = Math.floor((seconds - m) * 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const WavePlayer: React.FC<WavePlayerProps> = ({ audioUrl }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wsRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      height: 48,                 // ⬅ smaller overall height
      barWidth: 2,
      barGap: 1.5,
      barRadius: 1,
      barAlign: "center",         // ⬅ keep bars centered vertically
      normalize: true,            // ⬅ keeps waveform nicely balanced
      waveColor: "#71717a",
      progressColor: "#e5e5e5",
      cursorColor: "transparent",
      responsive: true,
      dragToSeek: true,
    });

    ws.load(audioUrl);

    ws.on("ready", () => {
      setDuration(ws.getDuration());
    });

    ws.on("timeupdate", (t) => {
      setCurrentTime(t);
    });

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    wsRef.current = ws;
    return () => ws.destroy();
  }, [audioUrl]);

  const togglePlay = () => {
    if (!wsRef.current) return;
    wsRef.current.playPause();
  };

  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#101012] px-3 py-2">
      {/* Play button */}
      <button
        type="button"
        onClick={togglePlay}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-black hover:bg-white"
      >
        {isPlaying ? (
          <span className="text-xs font-semibold">||</span>
        ) : (
          <span className="ml-[1px] text-[11px] font-semibold">▶</span>
        )}
      </button>

      {/* Waveform */}
      <div className="flex-1 overflow-hidden" ref={containerRef} />

      {/* Time */}
      <div className="w-12 text-right text-[11px] text-zinc-400">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default WavePlayer;
