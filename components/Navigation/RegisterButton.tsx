"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterButton() {
  const router = useRouter();

  return (
    <div className="absolute right-4 top-[13px] z-50 overflow-visible sm:right-6 sm:top-[11px] md:right-10 md:top-[17px] lg:top-[21px] xl:top-[20px]">
      {/* Animated Button */}
      <motion.button
        type="button"
        onClick={() => router.push("/register")}
        whileHover={{
          scale: 1.05,
          y: -2,
        }}
        whileTap={{
          scale: 0.96,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="cursor-pointer select-none"
        aria-label="Register"
      >
        <div className="relative w-[120px] sm:w-[180px] md:w-[210px] lg:w-[230px] xl:w-[250px]">
          <Image
            src="/redefine-2026/register.svg"
            alt="Register"
            width={220}
            height={80}
            priority
            className="w-full h-auto pointer-events-none select-none"
          />
        </div>
      </motion.button>

      {/* Arrow (doesn't animate) — directly below the button, pointing up at it (desktop only) */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-[60%] pointer-events-none hidden justify-center md:flex">
        <Image
          src="/redefine-2026/arrow.svg"
          alt="Arrow"
          width={120}
          height={80}
          priority
          className="w-[72px] object-contain opacity-80 sm:w-[88px] md:w-[110px]"
        />
      </div>
    </div>
  );
}
