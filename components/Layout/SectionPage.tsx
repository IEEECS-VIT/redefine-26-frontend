"use client";

import type { ReactNode } from "react";
import SiteHeader from "@/components/Navigation/SiteHeader";

export default function SectionPage({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex h-dvh w-full flex-col overflow-hidden bg-black font-sans text-white">
      <SiteHeader />
      <div className="relative min-h-0 flex-1">{children}</div>
    </main>
  );
}