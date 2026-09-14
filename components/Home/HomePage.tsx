"use client";

import { useEffect, useState } from "react";
import SplitBackground from "@/components/Background/SplitBackground";
import Navbar from "@/components/Navigation/Navbar";
import SideMenu from "@/components/Navigation/SideMenu";
import { getStoredUser } from "@/lib/auth";

export default function HomePage() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const syncAuth = () => setIsSignedIn(Boolean(getStoredUser()));

    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black font-sans text-white">
      <SplitBackground />
      <Navbar />
      <SideMenu isSignedIn={isSignedIn} />
    </main>
  );
}
