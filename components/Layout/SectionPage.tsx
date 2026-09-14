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
      <div className="relative min-h-0 flex-1 w-full h-full overflow-hidden flex flex-col">{children}</div>
    </main>
  );
}