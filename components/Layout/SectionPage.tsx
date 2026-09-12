"use client";

import type { ReactNode } from "react";
import SiteHeader from "@/components/Navigation/SiteHeader";

interface SectionPageProps {
  children: ReactNode;
  hideRegisterButton?: boolean;
}

export default function SectionPage({ children, hideRegisterButton }: SectionPageProps) {
  return (
    <main className="relative flex h-dvh w-full flex-col overflow-hidden bg-black font-sans text-white">
      <SiteHeader hideRegisterButton={hideRegisterButton} />
      <div className="relative min-h-0 flex-1">{children}</div>
      <footer className="shrink-0 border-t border-white/10 bg-black py-3 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Redefine &mdash; IEEE CS VIT
      </footer>
    </main>
  );
}