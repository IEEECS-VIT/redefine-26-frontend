"use client";

import Image from "next/image";

export default function DesktopBackgroundThreads() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block select-none opacity-45">
      <div className="relative w-full h-full">
        <Image
          src="/strings.svg"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center scale-105"
        />
      </div>
    </div>
  );
}
