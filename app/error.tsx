"use client";

import Link from "next/link";
import { useEffect } from "react";
import "@/app/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: "#000", color: "#fff" }}>
        <main className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-black px-6 text-center select-none">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/[0.10] blur-[130px]" />

          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-600/80 bg-black/90 shadow-[0_0_28px_rgba(236,72,153,0.3)]">
            <svg className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>

          <h1 className="relative mt-6 font-[var(--font-bebas-neue)] text-[clamp(1.6rem,5vw,2.8rem)] uppercase tracking-[0.18em] text-white drop-shadow-[0_0_18px_rgba(236,72,153,0.5)]">
            Something Went Wrong
          </h1>

          <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            An unexpected error occurred. Try again, or head back home and
            we&apos;ll take it from there.
          </p>

          <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-2xl bg-pink-500 px-8 py-3.5 font-[var(--font-bebas-neue)] text-lg uppercase tracking-widest text-white shadow-[0_8px_28px_rgba(236,72,153,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-pink-400"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="cursor-pointer rounded-2xl bg-black px-8 py-3.5 font-[var(--font-bebas-neue)] text-lg uppercase tracking-widest text-pink-100 shadow-[5px_5px_1px_#fac2cf] transition-transform duration-200 hover:-translate-y-0.5 hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}