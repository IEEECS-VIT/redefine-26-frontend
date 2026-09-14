"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import SpinningLoader from "@/components/Providers/SpinningLoader";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const auth = getFirebaseAuth();
      await auth.authStateReady();
      if (cancelled) return;

      if (auth.currentUser) {
        router.replace("/");
      } else {
        setAllowed(true);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!allowed) {
    return (
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-black">
        <SpinningLoader label="Checking session…" />
      </div>
    );
  }

  return <>{children}</>;
}