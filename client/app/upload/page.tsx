"use client";

import React, { useState } from "react";

export default function UploadPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/winds/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message || "Upload failed.");
        return;
      }

      setStatus("Upload successful!");
      form.reset();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 py-6">
      <header>
        <h1 className="text-2xl font-bold text-zinc-50">Upload a chart</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Upload an MP3 track to start creating a new Wind. (Chart editor
          coming soon.)
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-zinc-800 bg-[#050505] p-5"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-zinc-200"
          >
            Song title
          </label>
          <input
            id="title"
            name="title"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Midnight Etude"
          />
        </div>

        <div>
          <label
            htmlFor="artist"
            className="mb-1 block text-sm font-medium text-zinc-200"
          >
            Artist
          </label>
          <input
            id="artist"
            name="artist"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="aria"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="bpm"
              className="mb-1 block text-sm font-medium text-zinc-200"
            >
              BPM (optional)
            </label>
            <input
              id="bpm"
              name="bpm"
              type="number"
              min={1}
              max={400}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="180"
            />
          </div>

          <div>
            <label
              htmlFor="length_seconds"
              className="mb-1 block text-sm font-medium text-zinc-200"
            >
              Length (seconds, optional)
            </label>
            <input
              id="length_seconds"
              name="length_seconds"
              type="number"
              min={1}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="120"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="audio"
            className="mb-1 block text-sm font-medium text-zinc-200"
          >
            MP3 file
          </label>
          <input
            id="audio"
            name="audio"
            type="file"
            accept="audio/mpeg"
            required
            className="w-full text-sm text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-black file:hover:bg-emerald-400"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Max ~10MB for now. Only .mp3 files are supported.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
        {status && (
          <p className="text-sm text-emerald-400">
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
