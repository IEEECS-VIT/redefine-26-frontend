import type { Metadata } from "next";
import Link from "next/link";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-black px-6 text-center select-none">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/[0.10] blur-[130px]" />

      <p className="relative font-[var(--font-bebas-neue)] text-[clamp(5rem,22vw,11rem)] uppercase leading-none text-white drop-shadow-[0_0_30px_rgba(236,72,153,0.55)]">
        404
      </p>

      <h1 className="relative mt-2 font-[var(--font-bebas-neue)] text-[clamp(1.4rem,5vw,2.6rem)] uppercase tracking-[0.2em] text-pink-300 drop-shadow-[0_0_16px_rgba(236,72,153,0.45)]">
        Page Not Found
      </h1>

      <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back to the experience.
      </p>

      <Link
        href="/"
        className="relative mt-8 cursor-pointer select-none rounded-2xl bg-black px-10 py-3.5 font-[var(--font-bebas-neue)] text-lg uppercase tracking-widest text-pink-100 shadow-[5px_5px_1px_#fac2cf,0_8px_28px_rgba(236,72,153,0.3)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-white"
      >
        Back to Home
      </Link>

      <p className="relative mt-6 text-[10px] uppercase tracking-[0.35em] text-white/20">
        Redefine · 2026
      </p>
    </main>
  );
}