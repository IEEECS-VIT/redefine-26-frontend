"use client";

import Image from "@/components/Layout/Image";
import { motion, useReducedMotion } from "framer-motion";

type SpinningLoaderProps = {
  label?: string;
  className?: string;
  fullScreen?: boolean;
};

export default function SpinningLoader({
  label = "Loading…",
  className = "",
  fullScreen = false,
}: SpinningLoaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-label={label}
      aria-busy="true"
      className={[
        "relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-black px-4 text-center text-white select-none",
        fullScreen ? "fixed inset-0 z-[100]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 1.2, repeat: Infinity, ease: "linear" }
        }
        className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20"
      >
        <Image
          src="/logo.png"
          alt=""
          aria-hidden
          fill
          priority
          unoptimized
          className="object-contain"
        />
      </motion.div>
      <p aria-hidden className="text-sm text-white/60">
        {label}
      </p>
    </div>
  );
}
