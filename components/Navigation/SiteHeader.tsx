"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavThread from "./NavThread";

const NAV_LINKS = [
  ["Timeline", "/timeline", "/tracks/TIMELINE.svg", "135px"],
  ["Tracks", "/tracks", "/tracks/TRACKS.svg", "118px"],
  ["Team Up", "/team-up", "/tracks/TEAM UP.svg", "118px"],
  ["Team", "/team", "/tracks/TEAM.svg", "75px"],
  ["FAQ", "/faq", "/tracks/FAQ.svg", "70px"],
] as const;

export default function SiteHeader({ hideRegisterButton }: { hideRegisterButton?: boolean } = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const showRegister = !hideRegisterButton && pathname !== "/register";
  const navigate = (href: string) => { setMobileOpen(false); router.push(href); };

  return (
    <>
      <motion.header data-site-header="figma-responsive" data-site-logo-size="56-88" data-site-register-size="120-210" data-site-register-layout="right-edge-responsive" data-site-header-fit="responsive-row" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-black/95 px-5 py-4 backdrop-blur-md sm:px-8 md:px-12 md:py-5 lg:px-10 lg:py-6 xl:px-16">
        <Link href="/" prefetch className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[70px] lg:w-[70px] xl:h-20 xl:w-20">
          <Image src="/redefine-2026/redefine.jpeg" alt="Redefine Logo" fill priority unoptimized className="object-contain" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex lg:gap-10 xl:gap-16">
          {NAV_LINKS.map(([label, href, img, width]) => (
            <Link key={href} href={href} prefetch className="relative transition-opacity hover:opacity-80" aria-current={pathname === href ? "page" : undefined}>
              <span className="relative block h-[28px] md:h-[32px]" style={{ width }}><Image src={img} alt={label} fill priority sizes={width} className="object-contain" /></span>
              {pathname === href && <NavThread />}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {showRegister && <button type="button" onClick={() => navigate("/register")} className="hidden transition-transform hover:scale-105 sm:block" aria-label="Register"><span className="relative block aspect-[193/61] w-[clamp(7.5rem,14vw,13.125rem)]"><Image src="/redefine-2026/register.svg" alt="Register" fill priority sizes="clamp(120px,14vw,210px)" className="object-contain" /></span></button>}
          <button type="button" onClick={() => setMobileOpen((open) => !open)} className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Toggle menu" aria-expanded={mobileOpen}><span className="flex w-6 flex-col gap-1.5"><motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-white" /><motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="h-0.5 w-6 bg-white" /><motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-white" /></span></button>
        </div>
      </motion.header>
      <AnimatePresence>{mobileOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl lg:hidden"><nav className="flex h-full flex-col items-center justify-center gap-8">{NAV_LINKS.map(([label, href, img, width]) => <Link key={href} href={href} prefetch onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-2 px-6 py-2"><span className="relative h-[30px]" style={{ width }}><Image src={img} alt={label} fill sizes={width} className="object-contain" /></span><span className="text-sm uppercase tracking-wider text-white/70">{label}</span></Link>)}{showRegister && <button type="button" onClick={() => navigate("/register")} className="mt-4 rounded-xl bg-pink-500 px-8 py-3 text-base font-semibold">Register</button>}</nav></motion.div>}</AnimatePresence>
    </>
  );
}
