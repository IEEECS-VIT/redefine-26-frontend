"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import SpinningLoader from "@/components/Providers/SpinningLoader";

export type AuthGateMode = "require-auth" | "require-guest";

type GateState = "checking" | "allowed" | "blocked" | "error";

type AuthGateProps = {
  mode: AuthGateMode;
  children: React.ReactNode;
};

function AuthGateError() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-black px-6 text-center select-none">
      <div className="relative h-12 w-12 rounded-2xl border border-pink-600/80 bg-black/90 shadow-[0_0_28px_rgba(236,72,153,0.3)]">
        <span className="absolute inset-0 flex items-center justify-center font-[var(--font-bebas-neue)] text-2xl text-pink-300">
          !
        </span>
      </div>
      <h1 className="font-[var(--font-bebas-neue)] text-2xl uppercase tracking-widest text-white drop-shadow-[0_0_16px_rgba(236,72,153,0.4)] sm:text-3xl">
        Session Unavailable
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-white/60">
        We couldn&apos;t verify your session. Please check your connection and
        try again.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-xl bg-pink-500 px-8 py-3 font-[var(--font-bebas-neue)] text-lg uppercase tracking-widest text-white shadow-[0_8px_24px_rgba(236,72,153,0.35)] transition hover:-translate-y-0.5 hover:bg-pink-400"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function AuthGate({ mode, children }: AuthGateProps) {
  const router = useRouter();
  const [state, setState] = useState<GateState>("checking");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const auth = getFirebaseAuth();
        await auth.authStateReady();
        if (cancelled) return;

        const signedIn = Boolean(auth.currentUser);

        if (mode === "require-auth") {
          if (signedIn) {
            setState("allowed");
          } else {
            setState("blocked");
            router.replace("/signin");
          }
        } else if (signedIn) {
          setState("blocked");
          router.replace("/");
        } else {
          setState("allowed");
        }
      } catch (error) {
        if (cancelled) return;
        console.error("Auth gate check failed:", error);
        setState("error");
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [mode, router]);

  if (state === "allowed") {
    return <>{children}</>;
  }

  if (state === "error") {
    return <AuthGateError />;
  }

  return (
    <SpinningLoader
      label={state === "blocked" ? "Redirecting…" : "Checking session…"}
    />
  );
}
