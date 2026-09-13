import type { Metadata } from "next";
import SiteHeader from "@/components/Navigation/SiteHeader";
import Timeline from "@/components/Timeline/timeline";

export const metadata: Metadata = {
  title: "Timeline",
};

export default function TimelinePage() {
  return (
    <main
      className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black font-sans text-white"
      data-layout-shell="figma"
    >
      <SiteHeader />
      <div className="absolute inset-0">
        <Timeline />
      </div>
    </main>
  );
}
