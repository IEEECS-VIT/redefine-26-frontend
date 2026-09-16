"use client";

import Image from "@/components/Layout/Image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  TRACK_SUBTRACKS,
  type Subtrack,
} from "./trackSubtracks";

interface TrackData {
  id: number;
  title: string;
  titleImg: string;
  bladeSvg: string;
  illustration: string;
  left: string;
  width: string;
  titlePos: { left: string; top: string };
  titleWidth: string;
  titleAspect: string;

  // Mobile layout properties
  mobileBlade: string;
  mobileTitle: string;
  mobileTitlePos: { left: string; top: string };
  mobileTitleWidth: string;
  mobileTitleAspect: string;
  mobileTop: string;
  mobileHeight: string;
}

const tracks: TrackData[] = [
  {
    id: 1,
    title: "Brutalism",
    titleImg: "/tracks/theme_title_1.svg",
    bladeSvg: "/tracks/Mask-group.svg.webp",
    illustration: "/tracks/illustration_1.webp",
    left: "-0.7%",
    width: "50.56%",
    titlePos: { left: "26%", top: "16%" },
    titleWidth: "22%",
    titleAspect: "140/76",

    mobileBlade: "/tracks-mobile/Mask-group.webp",
    mobileTitle: "/tracks/theme_title_1.svg",
    mobileTitlePos: { left: "80%", top: "30%" },
    mobileTitleWidth: "25%",
    mobileTitleAspect: "140/76",
    mobileTop: "0%",
    mobileHeight: "50.5%",
  },
  {
    id: 2,
    title: "Skeuomorphism",
    titleImg: "/tracks/theme_title_2.svg",
    bladeSvg: "/tracks/Mask-group-1.svg.webp",
    illustration: "/tracks/illustration_2.webp",
    left: "18.3%",
    width: "31.28%",
    titlePos: { left: "33.5%", top: "15%" },
    titleWidth: "33%",
    titleAspect: "150/76",

    mobileBlade: "/tracks-mobile/Mask-group-1.webp",
    mobileTitle: "/tracks/theme_title_2.svg",
    mobileTitlePos: { left: "80%", top: "36%" },
    mobileTitleWidth: "26%",
    mobileTitleAspect: "150/76",
    mobileTop: "18.74%",
    mobileHeight: "31.33%",
  },
  {
    id: 3,
    title: "Swiss / International Style",
    titleImg: "/tracks/theme_title_3.svg",
    bladeSvg: "/tracks/Mask-group-2.svg.webp",
    illustration: "/tracks/illustration_3.webp",
    left: "34.5%",
    width: "17.81%",
    titlePos: { left: "51%", top: "13%" },
    titleWidth: "56%",
    titleAspect: "140/110",

    mobileBlade: "/tracks-mobile/Mask-group-2.webp",
    mobileTitle: "/tracks/theme_title_3.svg",
    mobileTitlePos: { left: "80%", top: "55%" },
    mobileTitleWidth: "24%",
    mobileTitleAspect: "140/110",
    mobileTop: "34.48%",
    mobileHeight: "17.88%",
  },
  {
    id: 4,
    title: "Maximalism",
    titleImg: "/tracks/theme_title_4.svg",
    bladeSvg: "/tracks/Mask-group-3.svg.webp",
    illustration: "/tracks/illustration_4.webp",
    left: "49.5%",
    width: "17.46%",
    titlePos: { left: "52.5%", top: "13%" },
    titleWidth: "54%",
    titleAspect: "140/76",

    mobileBlade: "/tracks-mobile/Mask-group-3.webp",
    mobileTitle: "/tracks/theme_title_4.svg",
    mobileTitlePos: { left: "80%", top: "48%" },
    mobileTitleWidth: "24%",
    mobileTitleAspect: "140/76",
    mobileTop: "49.78%",
    mobileHeight: "17.45%",
  },
  {
    id: 5,
    title: "Retro / Nostalgic UI",
    titleImg: "/tracks/theme_title_5.svg",
    bladeSvg: "/tracks/Mask-group-4.svg.webp",
    illustration: "/tracks/illustration_5.webp",
    left: "49.5%",
    width: "31.15%",
    titlePos: { left: "67.5%", top: "15%" },
    titleWidth: "31%",
    titleAspect: "140/96",

    mobileBlade: "/tracks-mobile/Mask-group-4.webp",
    mobileTitle: "/tracks/theme_title_5.svg",
    mobileTitlePos: { left: "80%", top: "65%" },
    mobileTitleWidth: "24%",
    mobileTitleAspect: "140/96",
    mobileTop: "49.78%",
    mobileHeight: "31.18%",
  },
  {
    id: 6,
    title: "Dark Mode / Low-Light Design",
    titleImg: "/tracks/theme_title_6.svg",
    bladeSvg: "/tracks/Mask-group-5.svg.webp",
    illustration: "/tracks/illustration_6.webp",
    left: "49.5%",
    width: "50.0%",
    titlePos: { left: "71.5%", top: "16%" },
    titleWidth: "23%",
    titleAspect: "160/96",

    mobileBlade: "/tracks-mobile/Mask-group-5.webp",
    mobileTitle: "/tracks/theme_title_6.svg",
    mobileTitlePos: { left: "80%", top: "70%" },
    mobileTitleWidth: "26%",
    mobileTitleAspect: "160/96",
    mobileTop: "49.78%",
    mobileHeight: "50.07%",
  },
];

/**
 * --- Dynamic fan-geometry helpers ---
 * These replace what used to be a hand-typed hoverX / hoverY / zIndex /
 * mobileHeight / mobileAlign value on every single track. Everything here
 * is computed from (index, total) so the fan re-balances itself if a
 * track is added, removed or reordered — nothing is hardcoded per item.
 */

// Blades stack highest in the middle of the fan, symmetrically.
function getZIndex(i: number, total: number) {
  return 11 + Math.min(i, total - 1 - i);
}

// Desktop: blades fan out left→right on hover, bulging upward at the
// midpoint (matches the original -15..+15 / -8..-15..-8 curve).
function getDesktopHover(i: number, total: number) {
  const t = total > 1 ? i / (total - 1) : 0;
  return {
    x: Math.round(-15 + 30 * t),
    y: Math.round(-8 - 7 * Math.sin(Math.PI * t)),
  };
}

// Mobile: blades fan out top→bottom on hover, bulging rightward at the
// midpoint (matches the original 10..14..10 / -8..8 curve).
function getMobileHover(i: number, total: number) {
  const t = total > 1 ? i / (total - 1) : 0;
  return {
    x: Math.round(10 + 4 * Math.sin(Math.PI * t)),
    y: Math.round(-8 + 16 * t),
  };
}

// First half of the fan reads its title from the bottom of the blade,
// second half from the top — derived from position, not stored per item.
function getMobileAlign(i: number, total: number): "bottom" | "top" {
  return i < total / 2 ? "bottom" : "top";
}

// SVG hit-test paths matching the exact fan blades (viewBox 0 0 1432 611)
const DESKTOP_HIT_PATHS = [
  // Blade 1: 01 E-Commerce
  "M 0 0 L 255 0 L 546.5 457 L 716 610 L 367 457 L 185 251.5 L 0 0 Z",
  // Blade 2: 02 Smart Education
  "M 255 0 L 485 0 L 632 457 L 716 610 L 546.5 457 Z",
  // Blade 3: 03 Healthcare Companion
  "M 485 0 L 745 0 L 716.5 457.5 L 716 610 L 632 457 Z",
  // Blade 4: 04 Travel & Exploration
  "M 760 0 L 960 0 L 780 463.5 L 716 610 L 716.5 457.5 Z",
  // Blade 5: 05 Finance
  "M 960 0 L 1155 0 L 843 465.5 L 716 610 L 780 463.5 Z",
  // Blade 6: 06 Social Impact Platform
  "M 1155 0 L 1432 0 L 1017.5 467 L 716 610 L 843 465.5 Z",
];

// SVG hit-test paths matching the exact mobile fan blades (viewBox 0 0 298 699)
const MOBILE_HIT_PATHS = [
  // Blade 1: 01 E-Commerce
  "M 0 348 L 70 200 L 150 116 L 220 58 L 298 0 L 298 132 L 200 188 L 100 251 L 50 294 Z",
  // Blade 2: 02 Smart Education
  "M 0 348 L 50 294 L 100 251 L 200 188 L 298 132 L 298 241 L 200 270 L 100 303 L 50 323 Z",
  // Blade 3: 03 Healthcare Companion
  "M 0 348 L 50 323 L 100 303 L 200 270 L 298 241 L 298 368 L 200 361 L 100 353 L 50 350 Z",
  // Blade 4: 04 Travel & Exploration
  "M 0 348 L 50 350 L 100 353 L 200 361 L 298 368 L 298 469 L 200 434 L 100 394 L 50 372 Z",
  // Blade 5: 05 Finance
  "M 0 348 L 50 372 L 100 394 L 200 434 L 298 469 L 298 564 L 200 503 L 100 436 L 50 396 Z",
  // Blade 6: 06 Social Impact Platform
  "M 0 348 L 50 396 L 100 436 L 200 503 L 298 564 L 298 699 L 220 640 L 150 580 L 70 495 Z",
];

function SubtracksPanel({
  subtracks,
  compact = false,
  align = "left",
}: {
  subtracks: Subtrack[];
  compact?: boolean;
  align?: "left" | "right";
}) {
  const isRight = align === "right";
  return (
    <div className={`pointer-events-none select-none ${isRight ? "text-right" : "text-left"}`}>
      <h3
        className={`font-[var(--font-bebas-neue)] font-bold uppercase leading-none tracking-[0.15em] ${
          compact
            ? "text-sm text-white/90"
            : "text-lg sm:text-xl xl:text-2xl text-pink-200 drop-shadow-[0_0_18px_rgba(236,72,153,0.3)]"
        }`}
      >
        Subtracks
      </h3>

      <ul className={`flex flex-col ${compact ? "mt-3 gap-3.5" : "mt-7 gap-7"}`}>
        {subtracks.map((sub) => (
          <li key={sub.id}>
            <p
              className={`font-bold tracking-wide text-white ${
                compact ? "text-[10px] leading-snug" : "text-xs sm:text-sm xl:text-base"
              }`}
            >
              <span className={compact ? "text-white/60" : "text-pink-400"}>{sub.number}.</span> {sub.title}
            </p>
            {sub.description && (
              <p
                className={`text-white/45 ${
                  compact
                    ? "mt-0.5 text-[8px] leading-snug"
                    : "mt-1.5 max-w-sm text-[11px] leading-relaxed sm:text-xs"
                } ${isRight ? "ml-auto" : ""}`}
              >
                {sub.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TracksSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileHoveredIdx, setMobileHoveredIdx] = useState<number | null>(null);

  const activeDesktopTrack =
    hoveredIdx !== null ? TRACK_SUBTRACKS[hoveredIdx + 1] : null;

  const activeMobileTrack =
    mobileHoveredIdx !== null ? TRACK_SUBTRACKS[mobileHoveredIdx + 1] : null;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Mobile/Tablet Fan Layout (< lg) */}
      <div
        className="lg:hidden flex items-center justify-center w-full h-full py-2 px-2 relative select-none overflow-hidden"
        onClick={() => setMobileHoveredIdx(null)}
      >
        {/* Mobile Subtracks (simple centered popup) */}
        <AnimatePresence>
          {activeMobileTrack && mobileHoveredIdx !== null && (
            <motion.div
              key={`mobile-subtracks-${mobileHoveredIdx}`}
              role="dialog"
              aria-label={`${activeMobileTrack.trackName} subtracks`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`fixed inset-0 z-50 flex justify-center px-6 ${
                mobileHoveredIdx >= 3 ? "items-end pb-24" : "items-center"
              }`}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[70vh] w-full max-w-[20rem] overflow-hidden bg-black p-4 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileHoveredIdx(null);
                  }}
                  aria-label="Close subtracks"
                  className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center text-white/60 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
                <div className="max-h-[calc(70vh-2rem)] overflow-y-auto pr-5">
                  <SubtracksPanel subtracks={activeMobileTrack.subtracks} compact />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Composition wrapper: centers both the brain scribbles on the left and fan blades on the right */}
        <div className="relative w-[min(94vw,390px)] aspect-[380/699] max-h-[calc(100dvh-130px)] flex items-center justify-end">
          {/* Fan blades wrapper with locked aspect ratio matching Polygon 8 (298x699) */}
          <div className="relative w-[78.4%] h-full aspect-[298/699] shrink-0">
            {/* Background Polygon */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/tracks-mobile/Polygon-8.webp"
                alt=""
                fill
                draggable={false}
                className="object-contain pointer-events-none"
              />
            </div>

            {/* Mobile Fan Blades */}
            {tracks.map((track, i) => {
              const isHovered = mobileHoveredIdx === i;
              const isAnyHovered = mobileHoveredIdx !== null;
              const hover = getMobileHover(i, tracks.length);
              const stripOnly = track.id === 1 || track.id === 6;

              return (
                <motion.div
                  key={track.id}
                  style={{
                    left: 0,
                    width: "100%",
                    top: track.mobileTop,
                    height: track.mobileHeight,
                    zIndex: isHovered ? 30 : getZIndex(i, tracks.length),
                  }}
                  animate={{
                    x: isHovered ? hover.x : 0,
                    y: isHovered ? hover.y : 0,
                    scale: stripOnly ? 1 : (isHovered ? 1.03 : 1),
                    opacity: isAnyHovered && !isHovered ? 0.65 : 1,
                    filter: isAnyHovered && !isHovered ? "brightness(0.85)" : "brightness(1)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="absolute origin-left select-none pointer-events-none"
                >
                  <div className="relative w-full h-full">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: stripOnly && isHovered ? 1.03 : 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    >
                      <Image
                        src={track.mobileBlade}
                        alt=""
                        fill
                        draggable={false}
                        className="object-contain pointer-events-none"
                      />
                    </motion.div>

                    {/* Title overlay — font size follows the blade image scale,
                        so it's responsive without a separate breakpoint value */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                      style={{
                        left: track.mobileTitlePos.left,
                        top: track.mobileTitlePos.top,
                        width: track.mobileTitleWidth,
                        aspectRatio: track.mobileTitleAspect,
                      }}
                    >
                      <Image
                        src={track.mobileTitle}
                        alt={track.title}
                        fill
                        className="object-contain pointer-events-none"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Native SVG hit overlay for pixel-perfect tap-to-toggle detection on mobile */}
            <svg
              viewBox="0 0 298 699"
              preserveAspectRatio="none"
              style={{ touchAction: "manipulation" }}
              className="absolute inset-0 w-full h-full z-30 pointer-events-none select-none"
            >
              {MOBILE_HIT_PATHS.map((pathD, i) => (
                <path
                  key={i}
                  d={pathD}
                  fill="rgba(0,0,0,0.001)"
                  className="pointer-events-auto cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileHoveredIdx((prev) => (prev === i ? null : i));
                  }}
                />
              ))}
            </svg>

            {/* Left Side: Brain scribble centered on the fan blade apex matching Figma */}
            <div className="absolute right-[calc(100%-2px)] top-1/2 -translate-y-1/2 w-[29.5%] aspect-[88/585] z-20 select-none pointer-events-none">
              <Image
                src="/tracks-mobile/scribble_figma.webp"
                alt="Brain Scribble"
                fill
                draggable={false}
                className="object-contain pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Fan Layout (>= lg) */}
      <div className="hidden lg:flex flex-col items-center justify-center w-full h-full relative">
        {/* Desktop Subtracks (plain page content, appears on hover) */}
        <AnimatePresence>
          {activeDesktopTrack && hoveredIdx !== null && (
            <motion.div
              key={`desktop-subtracks-${hoveredIdx}`}
              initial={{ opacity: 0, y: 22, x: hoveredIdx < 3 ? -14 : 14 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 14, x: hoveredIdx < 3 ? -8 : 8 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className={`absolute bottom-8 xl:bottom-16 z-40 w-[16rem] xl:w-[18rem] h-[22rem] xl:h-[25rem] pointer-events-none ${
                hoveredIdx < 3
                  ? "left-[clamp(2rem,4vw,4rem)]"
                  : "right-[7%]"
              }`}
            >
              <SubtracksPanel subtracks={activeDesktopTrack.subtracks} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-[min(92vw,1320px,calc((100dvh-320px)*1432/611))] max-w-[1320px] flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[1432/611]">
          {tracks.map((track, i) => {
            const isHovered = hoveredIdx === i;
            const isAnyHovered = hoveredIdx !== null;
            const hover = getDesktopHover(i, tracks.length);
            const stripOnly = track.id === 1 || track.id === 6;

            return (
              <motion.div
                key={track.id}
                style={{
                  left: track.left,
                  width: track.width,
                  zIndex: isHovered ? 30 : getZIndex(i, tracks.length),
                }}
                animate={{
                  x: isHovered ? hover.x : 0,
                  y: isHovered ? hover.y : 0,
                  scale: stripOnly ? 1 : (isHovered ? 1.03 : 1),
                  opacity: isAnyHovered && !isHovered ? 0.65 : 1,
                  filter: isAnyHovered && !isHovered ? "brightness(0.85) blur(0px)" : "brightness(1) blur(0px)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="absolute bottom-0 h-[101%] origin-bottom select-none pointer-events-none"
              >
                <div className="relative w-full h-full">
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: stripOnly && isHovered ? 1.03 : 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <Image
                      src={track.bladeSvg}
                      alt=""
                      fill
                      draggable={false}
                      className="object-contain pointer-events-none"
                    />
                  </motion.div>

                  <div
                    style={{
                      left: track.titlePos.left,
                      top: track.titlePos.top,
                      width: track.titleWidth,
                      aspectRatio: track.titleAspect,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                  >
                    <Image
                      src={track.titleImg}
                      alt={track.title}
                      fill
                      draggable={false}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}

            {/* Native SVG hit overlay for pixel-perfect hover & click detection with zero gaps */}
            <svg
              viewBox="0 0 1432 611"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full z-30 pointer-events-none select-none"
            >
              {DESKTOP_HIT_PATHS.map((pathD, i) => (
                <path
                  key={i}
                  d={pathD}
                  fill="rgba(0,0,0,0.001)"
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              ))}
            </svg>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-8 -mt-2 sm:-mt-3 z-20 select-none pointer-events-none">
          <div className="relative w-[190px] xl:w-[220px] aspect-[508/451]">
            <Image src="/tracks/image-16.webp" alt="" fill draggable={false} className="object-contain" />
          </div>

          <div className="relative w-[240px] xl:w-[280px] h-[164px] xl:h-[190px]">
            <Image src="/tracks/Brain.svg.webp" alt="Brain Scribble" fill draggable={false} className="object-contain" />
          </div>

          <div className="relative w-[190px] xl:w-[220px] aspect-[382/258]">
            <Image src="/tracks/image-15.webp" alt="" fill draggable={false} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}