"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [metronomeSound, setMetronomeSound] = useState(true);
  const [showHitAccuracy, setShowHitAccuracy] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const pageClasses = isDark
    ? "min-h-screen flex justify-center px-4 py-16 bg-zinc-950 text-zinc-50 transition-colors"
    : "min-h-screen flex justify-center px-4 py-16 bg-zinc-50 text-zinc-900 transition-colors";

  const cardClasses = isDark
    ? "rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4"
    : "rounded-2xl border border-zinc-200 bg-white p-5 space-y-4";

  return (
    <div className={pageClasses}>
      <main className="w-full max-w-4xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-zinc-400 text-lg">
            Customize how Wind Tempo looks, feels, and tracks your practice.
          </p>
        </header>

        {/* Appearance */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Appearance</h2>
          <div className={cardClasses}>
            <SettingRow
              label="Dark mode"
              description="Switch between dark and light themes across the app."
              enabled={isDark}
              onToggle={toggleTheme}
            />

            <div className="flex gap-2 text-xs text-zinc-500">
              <button
                className={`rounded-full px-3 py-1 border ${
                  isDark
                    ? "border-emerald-500 text-emerald-400"
                    : "border-zinc-600"
                }`}
                onClick={() => setTheme("dark")}
              >
                Use dark theme
              </button>
              <button
                className={`rounded-full px-3 py-1 border ${
                  !isDark
                    ? "border-emerald-500 text-emerald-400"
                    : "border-zinc-600"
                }`}
                onClick={() => setTheme("light")}
              >
                Use light theme
              </button>
            </div>
          </div>
        </section>

        {/* Practice */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Practice</h2>
          <div className={cardClasses}>
            <SettingRow
              label="Metronome sound"
              description="Enable clicks during practice tracks to help keep consistent tempo."
              enabled={metronomeSound}
              onToggle={() => setMetronomeSound((v) => !v)}
            />
            <SettingRow
              label="Show hit accuracy"
              description="Display timing feedback (early/late/perfect) for each note."
              enabled={showHitAccuracy}
              onToggle={() => setShowHitAccuracy((v) => !v)}
            />
          </div>
        </section>

        {/* Notifications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          <div className={cardClasses}>
            <SettingRow
              label="Email practice summaries"
              description="Receive a weekly recap of your practice streak, scores, and new community tracks."
              enabled={emailUpdates}
              onToggle={() => setEmailUpdates((v) => !v)}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

type SettingRowProps = {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function SettingRow({ label, description, enabled, onToggle }: SettingRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition 
        ${enabled ? "bg-emerald-500" : "bg-zinc-700"}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition
          ${enabled ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}
