"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOutUser, subscribeToAuthState } from "@/lib/auth";
import { getMyTeam } from "@/lib/teamup";
import NavThread from "./NavThread";
import { getHeaderAction, getHeaderNavLinks } from "./navigationLinks";

const CAP_UNIT = 17;

function navLabelStyle(link: { w: number; h: number }): CSSProperties {
  return {
    width: `calc(var(--nav-cap, 20px) * ${(link.w / CAP_UNIT).toFixed(4)})`,
    aspectRatio: `${link.w} / ${link.h}`,
  };
}

export default function SiteHeader({ hideRegisterButton }: { hideRegisterButton?: boolean } = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [leaderPopup, setLeaderPopup] = useState(false);
  const [checkingAction, setCheckingAction] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const navLinks = getHeaderNavLinks(isSignedIn);
  const headerAction = getHeaderAction(isSignedIn);

  useEffect(() => {
    return subscribeToAuthState((user) => setIsSignedIn(Boolean(user)));
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hideHeaderAction =
    hideRegisterButton ||
    pathname === headerAction.href;

  const handleHeaderAction = async () => {
    if (headerAction.href !== "/submit") {
      handleNavClick(headerAction.href);
      return;
    }

    setCheckingAction(true);
    try {
      const team = await getMyTeam();
      if (team?.isLeader) {
        setMobileOpen(false);
        router.push("/submit");
      } else {
        setLeaderPopup(true);
      }
    } catch {
      setLeaderPopup(true);
    } finally {
      setCheckingAction(false);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setMobileOpen(false);
    router.push("/");
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    router.push(href);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.header
        data-site-header="figma-responsive"
        data-site-logo-size="56-88"
        data-site-register-size="120-210"
        data-site-register-layout="right-edge-responsive"
        data-site-header-fit="responsive-row"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-[70] m-0 flex w-full max-w-none items-center justify-between border-b border-white/5 bg-transparent px-5 py-5 sm:px-8 md:px-12 md:py-6 min-[900px]:h-[clamp(4.5rem,11vh,6.5rem)] min-[900px]:border-0 min-[900px]:bg-transparent min-[900px]:p-0"
      >
        {/* Left: Logo */}
        <Link href="/" className="relative h-12 w-12 shrink-0 transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-14 md:h-16 md:w-16 min-[900px]:absolute min-[900px]:left-[clamp(1rem,2.4vw,2.2rem)] min-[900px]:top-1/2 min-[900px]:aspect-[115/112] min-[900px]:h-auto min-[900px]:w-[clamp(3.5rem,6vw,5.5rem)] min-[900px]:-translate-y-1/2">
          <Image
            src="/logo.png"
            alt="Redefine Logo"
            fill
            priority
            unoptimized
            className="object-contain"
          />
        </Link>

        {/* Center: SVG Menu Links (Desktop) */}
        <nav
          className="hidden items-center gap-6 min-[900px]:absolute min-[900px]:left-1/2 min-[900px]:top-1/2 min-[900px]:flex min-[900px]:w-[min(52vw,46.5rem)] min-[900px]:-translate-x-1/2 min-[900px]:-translate-y-1/2 min-[900px]:justify-between min-[900px]:gap-0"
          style={{ "--nav-cap": "clamp(1rem, 1.7vw, 1.2rem)" } as CSSProperties}
        >
          {navLinks.map((link) => (
            <div key={link.label} className="relative flex flex-col items-center">
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="transition-all duration-200 hover:-translate-y-0.5 hover:opacity-75"
              >
                <div className="relative" style={navLabelStyle(link)}>
                  <Image src={link.img} alt={link.label} fill className="object-contain" />
                </div>
              </Link>
              {isActive(link.href) ? <NavThread /> : null}
            </div>
          ))}
        </nav>

        {/* Right: Register / Submit + Hamburger */}
        <div className="flex items-center gap-4 min-[900px]:absolute min-[900px]:right-[clamp(1rem,2.4vw,2.2rem)] min-[900px]:top-1/2 min-[900px]:-translate-y-1/2">
          {/* Auth-aware action (hidden on small mobile or on its destination page) */}
          {!hideHeaderAction ? (
            <button
              type="button"
              onClick={handleHeaderAction}
              disabled={checkingAction}
              aria-busy={checkingAction}
              className="hidden sm:block cursor-pointer select-none transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
              aria-label={headerAction.label}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer select-none"
              >
                <div className="flex aspect-[193/61] w-[120px] items-center justify-center rounded-[19px] bg-black font-[var(--font-bebas-neue)] text-[clamp(0.85rem,1.5vw,1.25rem)] uppercase leading-none font-bold text-pink-100 shadow-[5px_5px_1px_#fac2cf,0_4px_30px_rgba(255,194,207,0.25)] sm:w-[145px] md:w-[160px] min-[900px]:w-[clamp(5.5rem,10vw,9.25rem)]">
                  {checkingAction ? "Checking…" : headerAction.label}
                </div>
              </motion.div>
            </button>
          ) : (
            <div className="hidden w-12 pointer-events-none sm:w-14 md:w-16 min-[900px]:block min-[900px]:w-[clamp(7.5rem,14vw,13.125rem)]" aria-hidden="true" />
          )}
          {/* Sign out (signed-in only, desktop) */}
          {isSignedIn && (
            <button
              type="button"
              onClick={handleSignOut}
              className="hidden cursor-pointer select-none transition-transform duration-200 hover:-translate-y-0.5 sm:block"
              aria-label="Sign out"
            >
              <div className="flex aspect-[193/61] w-[120px] items-center justify-center rounded-[19px] bg-black font-[var(--font-bebas-neue)] text-[clamp(0.85rem,1.5vw,1.25rem)] uppercase leading-none font-bold text-pink-100 shadow-[5px_5px_1px_#fac2cf,0_4px_30px_rgba(255,194,207,0.2)] sm:w-[145px] md:w-[160px] min-[900px]:w-[clamp(5.5rem,10vw,9.25rem)]">
                Log Out
              </div>
            </button>
          )}

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 min-[900px]:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="block h-0.5 w-6 bg-white"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/98 backdrop-blur-xl min-[900px]:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.06, duration: 0.3, ease: "easeOut" }}
                  onClick={() => handleNavClick(link.href)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="relative" style={navLabelStyle(link)}>
                    <Image src={link.img} alt={link.label} fill className="object-contain" />
                  </div>
                </motion.button>
              ))}

              {!hideHeaderAction && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.3, ease: "easeOut" }}
                  onClick={handleHeaderAction}
                  disabled={checkingAction}
                  className="mt-4 cursor-pointer rounded-xl bg-pink-500 px-8 py-3 text-base font-[var(--font-bebas-neue)] uppercase tracking-widest text-white font-bold shadow-lg shadow-pink-500/25 transition-transform hover:scale-105 disabled:opacity-60"
                >
                  {checkingAction ? "CHECKING…" : headerAction.label}
                </motion.button>
              )}

              {isSignedIn && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: (navLinks.length + 1) * 0.06, duration: 0.3, ease: "easeOut" }}
                  onClick={handleSignOut}
                  className="mt-2 cursor-pointer rounded-xl border border-pink-500 bg-transparent px-8 py-3 text-base font-[var(--font-bebas-neue)] uppercase tracking-widest text-pink-100 font-bold transition-transform hover:scale-105"
                >
                  Log Out
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leader-only popup */}
      <AnimatePresence>
        {leaderPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLeaderPopup(false)}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Submit restricted"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-pink-600/90 bg-black/95 px-6 py-8 sm:px-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_32px_rgba(236,72,153,0.2)]"
            >
              <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-pink-500/70 to-transparent" />
              <div className="relative mx-auto h-12 w-12 rounded-full bg-pink-500/15 flex items-center justify-center">
                <svg className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h3 className="mt-5 font-[var(--font-bebas-neue)] text-2xl sm:text-[1.7rem] uppercase tracking-widest text-white drop-shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                Leader Only
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                Only the team leader can submit the project. Please ask your team leader to submit.
              </p>
              <button
                type="button"
                onClick={() => setLeaderPopup(false)}
                className="mt-6 w-full cursor-pointer rounded-xl bg-pink-500 px-6 py-3 font-[var(--font-bebas-neue)] text-lg uppercase tracking-widest text-white shadow-[0_8px_24px_rgba(236,72,153,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-pink-400"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
