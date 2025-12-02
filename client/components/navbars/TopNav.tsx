"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, PlusCircle, MessageCircle, Search } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Patch Notes", href: "/patch-notes" },
];

const TopNav: React.FC = () => {
  const pathname = usePathname();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const closeAll = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#030303]/95 backdrop-blur">
        <div className="flex w-full items-center gap-3 px-10 py-2">
          <Link href="/" className="flex items-center gap-2 px-2">
            <div className="relative h-11 w-11">
              <Image
                src="/logo.png"
                alt="Wind Tempo"
                fill
                sizes="45px"
                className="rounded-md object-contain"
              />
            </div>
          </Link>

          <div className="flex-1 max-w-50" />

          <div className="flex-1">
            <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-[#1a1a1b] px-3 py-1.5 focus-within:border-zinc-400">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search Wind Tempo posts"
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 max-w-50" />

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                    active
                      ? "bg-zinc-100 text-black"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-full p-2 hover:bg-zinc-800">
              <PlusCircle className="h-5 w-5 text-zinc-300" />
            </button>
            <button className="rounded-full p-2 hover:bg-zinc-800">
              <MessageCircle className="h-5 w-5 text-zinc-300" />
            </button>
            <button className="rounded-full p-2 hover:bg-zinc-800">
              <Bell className="h-5 w-5 text-zinc-300" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openLogin}
              className="hidden rounded-full border border-zinc-600 px-3 py-1.5 text-xs font-semibold text-zinc-100 hover:border-zinc-400 md:inline-block"
            >
              Log In
            </button>
            <button
              onClick={openSignup}
              className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-black hover:bg-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeAll}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={closeAll}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default TopNav;
