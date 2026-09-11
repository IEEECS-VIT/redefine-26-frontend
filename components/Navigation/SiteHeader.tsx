"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
  img: string;
  width: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Timeline", href: "/timeline", img: "/tracks/TIMELINE.svg", width: "135px" },
  { label: "Tracks", href: "/tracks", img: "/tracks/TRACKS.svg", width: "118px" },
  { label: "Team Up", href: "/team-up", img: "/tracks/TEAM UP.svg", width: "118px" },
  { label: "FAQ", href: "/faq", img: "/tracks/FAQ.svg", width: "70px" },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="sticky top-0 z-50 m-0 flex w-full max-w-none items-center justify-between border-b border-white/5 bg-black/95 px-5 py-4 backdrop-blur-md sm:px-8 md:px-12 md:py-5 lg:px-10 lg:py-6 xl:px-16">
        {/* Left: Logo */}
        <Link
          href="/"
          prefetch={true}
          className="relative h-12 w-12 shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[70px] lg:w-[70px] xl:h-20 xl:w-20"
        >
          <Image
            src="/redefine-2026/redefine.jpeg"
            alt="Redefine Logo"
            fill
            priority
            unoptimized
            className="object-contain"
          />
        </Link>

        {/* Center: SVG Menu Links (Desktop) */}
        <nav className="hidden items-center gap-6 lg:flex lg:gap-10 xl:gap-16">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <div key={link.label} className="relative flex flex-col items-center">
                <Link
                  href={link.href}
                  prefetch={true}
                  aria-current={active ? "page" : undefined}
                  className="transition-all duration-150 hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0"
                >
                  <div className="relative h-[28px] md:h-[32px]" style={{ width: link.width }}>
                    <Image src={link.img} alt={link.label} fill priority className="object-contain" />
                  </div>
                </Link>
                {active && (
                  <motion.div
                    layoutId="activeNavDot"
                    className="absolute -bottom-2 h-1.5 w-1.5 rounded-full bg-pink-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Register + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Register Button (hidden on small mobile, shown on sm+) */}
          <Link
            href="/#register"
            prefetch={true}
            className="hidden cursor-pointer select-none transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95 sm:block"
          >
            <div className="relative aspect-[2.8/1] w-[175px] sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[275px]">
              <Image
                src="/redefine-2026/register.svg"
                alt="Register"
                fill
                priority
                className="pointer-events-none select-none object-contain"
              />
            </div>
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg transition-colors active:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col items-center justify-center gap-1.5 w-6 h-6">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="block h-0.5 w-6 bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-0.5 w-6 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="block h-0.5 w-6 bg-white origin-center"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-black/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={true}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center gap-2 py-2 px-6 transition-transform active:scale-95"
                >
                  <div className="relative h-[30px]" style={{ width: link.width }}>
                    <Image src={link.img} alt={link.label} fill priority className="object-contain" />
                  </div>
                  <span
                    className={`text-sm tracking-wider uppercase transition-colors ${
                      isActive(link.href) ? "text-pink-400 font-semibold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}

              <Link
                href="/#register"
                prefetch={true}
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-xl bg-pink-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-pink-500/25 transition-transform active:scale-95"
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
