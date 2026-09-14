import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-3 py-3 sm:px-5 sm:py-5 md:px-10 md:py-10 pointer-events-none"
      data-home-logo-layout="mobile-safe"
    >
      <Link href="/" className="inline-block transition-transform duration-300 hover:scale-108 pointer-events-auto" aria-label="Home">
        <Image
          src="/redefine-2026/redefine.jpeg"
          alt="Redefine"
          width={100}
          height={100}
          unoptimized
          className="h-9 w-auto object-contain sm:h-12 md:h-[clamp(2.25rem,7vw,5rem)]"
          priority
        />
      </Link>
    </header>
  );
}
