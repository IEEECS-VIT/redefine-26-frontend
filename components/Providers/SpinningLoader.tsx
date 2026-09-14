"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type SpinningLoaderProps = {
  label?: string;
  className?: string;
};

export default function SpinningLoader({
  label = "Loading…",
  className = "",
}: SpinningLoaderProps) {
  return (
    <div
      className={`relative flex w-full h-full flex-col items-center justify-center gap-4 bg-black text-white select-none overflow-hidden px-0 mx-0 ${className}`}
      role="status"
      aria-label={label}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="relative h-16 w-16 sm:h-20 sm:w-20"
      >
        <Image
          src="/redefine-2026/redefine.jpeg"
          alt="Redefine"
          fill
          priority
          unoptimized
          className="object-contain"
        />
      </motion.div>
      <p className="text-sm text-white/60">{label}</p>
    </div>
  );
}