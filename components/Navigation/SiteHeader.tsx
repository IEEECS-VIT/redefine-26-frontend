"use client";

import Link from "next/link";
import Image from "@/components/Layout/Image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOutUser, subscribeToAuthState } from "@/lib/auth";
import { getMyTeam } from "@/lib/teamup";
import { useToast } from "@/components/Providers/ToastProvider";
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
  const [checkingAction, setCheckingAction] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { warning } = useToast();
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

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Always collapse the menu once the route settles (single source of truth
  // for the open state, so navigation can never leave it stuck open).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
        warning(
          "Leader Only",
          "Only the team leader can submit the project. Please ask your team leader to submit.",
        );
      }
    } catch {
      warning(
        "Leader Only",
        "Only the team leader can submit the project. Please ask your team leader to submit.",
      );
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
        className="sticky top-0 z-[70] m-0 flex w-full max-w-none items-center justify-between border-b border-white/5 bg-transparent px-5 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6 min-[900px]:h-[clamp(4.5rem,11vh,6.5rem)] min-[900px]:border-0 min-[900px]:bg-transparent min-[900px]:p-0"
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
                <div className="flex aspect-[193/61] w-[120px] items-center justify-center rounded-xl bg-black font-[var(--font-bebas-neue)] text-[clamp(0.85rem,1.5vw,1.25rem)] uppercase leading-none font-bold text-pink-100 shadow-[5px_5px_1px_#fac2cf,0_4px_30px_rgba(255,194,207,0.25)] sm:w-[145px] md:w-[160px] min-[900px]:w-[clamp(5.5rem,10vw,9.25rem)]">
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
              <div className="flex aspect-[193/61] w-[120px] items-center justify-center rounded-xl bg-black font-[var(--font-bebas-neue)] text-[clamp(0.85rem,1.5vw,1.25rem)] uppercase leading-none font-bold text-pink-100 shadow-[5px_5px_1px_#fac2cf,0_4px_30px_rgba(255,194,207,0.2)] sm:w-[145px] md:w-[160px] min-[900px]:w-[clamp(5.5rem,10vw,9.25rem)]">
                Log Out
              </div>
            </button>
          )}

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="relative -mr-2 flex h-11 w-11 items-center justify-center min-[900px]:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-menu"
          >
            <span className="relative block h-[18px] w-6" aria-hidden="true">
              <motion.span
                animate={mobileOpen ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="absolute left-0 top-0 block h-0.5 w-full origin-center bg-white"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-2 block h-0.5 w-full bg-white"
              />
              <motion.span
                animate={mobileOpen ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="absolute bottom-0 left-0 block h-0.5 w-full origin-center bg-white"
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="site-mobile-menu"
            id="site-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black px-6 min-[900px]:hidden"
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-7"
              style={{ "--nav-cap": "clamp(1.4rem, 7vw, 1.9rem)" } as CSSProperties}
            >
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.label}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: idx * 0.05, duration: 0.3, ease: "easeOut" }}
                  onClick={() => handleNavClick(link.href)}
                  aria-label={link.label}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="flex cursor-pointer flex-col items-center transition-opacity duration-200 hover:opacity-75"
                >
                  <div className="relative" style={navLabelStyle(link)}>
                    <Image src={link.img} alt={link.label} fill className="object-contain" />
                  </div>
                </motion.button>
              ))}

              {!hideHeaderAction && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3, ease: "easeOut" }}
                  onClick={handleHeaderAction}
                  disabled={checkingAction}
                  className="mt-3 flex aspect-[193/61] w-[160px] cursor-pointer select-none items-center justify-center rounded-xl bg-black font-[var(--font-bebas-neue)] text-[clamp(0.9rem,3.5vw,1.15rem)] uppercase leading-none font-bold text-pink-100 shadow-[5px_5px_1px_#fac2cf,0_4px_30px_rgba(255,194,207,0.25)] transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {checkingAction ? "Checking…" : headerAction.label}
                </motion.button>
              )}

              {isSignedIn && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05, duration: 0.3, ease: "easeOut" }}
                  onClick={handleSignOut}
                  className="flex aspect-[193/61] w-[160px] cursor-pointer select-none items-center justify-center rounded-xl bg-black font-[var(--font-bebas-neue)] text-[clamp(0.9rem,3.5vw,1.15rem)] uppercase leading-none font-bold text-pink-100 shadow-[5px_5px_1px_#fac2cf,0_4px_30px_rgba(255,194,207,0.2)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Log Out
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
