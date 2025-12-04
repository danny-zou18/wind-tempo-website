"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { Music2, Plus } from "lucide-react";
import CreatePost from "@/components/homepage/CreatePost";

export default function Home() {
  return (
    <div className="flex w-full gap-6">
      <section className="flex-1 max-w-3xl space-y-4">
        <CreatePost />
      </section>
    </div>
  );
}
