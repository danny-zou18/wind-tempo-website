"use client";

import Image from "next/image";
import Link from "next/link";

import CreatePost from "@/components/homepage/CreatePost";
import Posts from "@/components/homepage/Posts";
import AboutCard from "@/components/homepage/AboutCard";
import GetStartedCard from "@/components/homepage/GetStartedCard";
import LatestPatchCard from "@/components/homepage/LatestPatchCard";

import { Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full gap-6 h-full bg-">
      <section className="flex-1 max-w-3xl space-y-4">
        <CreatePost />

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Flame className="h-4 w-4 text-amber-400" />
          <span className="font-medium text-zinc-100">
            Trending on Wind Tempo
          </span>
        </div>

        <Posts />
      </section>
      <aside className="hidden lg:flex w-80 flex-col gap-4">
        <AboutCard />
        <GetStartedCard />
        <LatestPatchCard />
      </aside>
    </div>
  );
}
