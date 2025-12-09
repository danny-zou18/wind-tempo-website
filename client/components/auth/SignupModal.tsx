"use client";

import React, { useState } from "react";
import Modal from "../Modal";

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignedUp?: () => void;          // 👈 NEW
};

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSignedUp,                       // 👈 NEW
}) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message || "Could not create account.");
        return;
      }

      // ✅ tell TopNav to refresh session (or prep for login)
      if (onSignedUp) {
        await onSignedUp();
      }

      // reset + close + optionally switch to login
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      onClose();
      onSwitchToLogin();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create an account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="signup-email"
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="signup-username"
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            Username
          </label>
          <input
            id="signup-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="windtempo_user"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="signup-password"
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            Password
          </label>

          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="••••••••"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-200"
          >
            {showPassword ? (
              // eye-off
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3l18 18m-7.5-7.5A4.5 4.5 0 0112 15a4.5 4.5 0 01-4.5-4.5c0-.49.08-.96.23-1.4m3.45-3.45A4.5 4.5 0 0116.5 10.5c0 .49-.08.96-.23 1.4M21 10.5c-1.68 3.38-4.65 5.5-8.5 5.5-1.03 0-2.02-.16-2.97-.45m-3.48-1.92C3.74 12.45 2 10.5 2 10.5c1.68-3.38 4.65-5.5 8.5-5.5 1.03 0 2.02.16 2.97.45"
                />
              </svg>
            ) : (
              // eye
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
                />
                <circle cx="12" cy="12" r="3.75" />
              </svg>
            )}
          </button>
        </div>

        <div className="relative">
          <label
            htmlFor="signup-confirm-password"
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            Confirm Password
          </label>

          <input
            id="signup-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="••••••••"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-200"
          >
            {showConfirmPassword ? (
              // eye-off
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3l18 18m-7.5-7.5A4.5 4.5 0 0112 15a4.5 4.5 0 01-4.5-4.5c0-.49.08-.96.23-1.4m3.45-3.45A4.5 4.5 0 0116.5 10.5c0 .49-.08.96-.23 1.4M21 10.5c-1.68 3.38-4.65 5.5-8.5 5.5-1.03 0-2.02-.16-2.97-.45m-3.48-1.92C3.74 12.45 2 10.5 2 10.5c1.68-3.38 4.65-5.5 8.5-5.5 1.03 0 2.02.16 2.97.45"
                />
              </svg>
            ) : (
              // eye
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
                />
                <circle cx="12" cy="12" r="3.75" />
              </svg>
            )}
          </button>
        </div>

        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
        >
          Log in
        </button>
      </p>
    </Modal>
  );
};

export default SignupModal;
