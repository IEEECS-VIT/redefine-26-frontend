"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  TRACK_SUBTRACKS,
  getSubtrackTitleSize,
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
    bladeSvg: "/tracks/Mask group.svg",
    illustration: "/tracks/illustration_1.png",
    left: "-0.7%",
    width: "50.56%",
    titlePos: { left: "26%", top: "16%" },
    titleWidth: "22%",
    titleAspect: "140/76",

    mobileBlade: "/tracks mobile/Mask group.png",
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
    bladeSvg: "/tracks/Mask group-1.svg",
    illustration: "/tracks/illustration_2.png",
    left: "18.3%",
    width: "31.28%",
    titlePos: { left: "33.5%", top: "15%" },
    titleWidth: "33%",
    titleAspect: "150/76",

    mobileBlade: "/tracks mobile/Mask group-1.png",
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
    bladeSvg: "/tracks/Mask group-2.svg",
    illustration: "/tracks/illustration_3.png",
    left: "34.5%",
    width: "17.81%",
    titlePos: { left: "51%", top: "13%" },
    titleWidth: "56%",
    titleAspect: "140/110",

    mobileBlade: "/tracks mobile/Mask group-2.png",
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
    bladeSvg: "/tracks/Mask group-3.svg",
    illustration: "/tracks/illustration_4.png",
    left: "49.5%",
    width: "17.46%",
    titlePos: { left: "52.5%", top: "13%" },
    titleWidth: "54%",
    titleAspect: "140/76",

    mobileBlade: "/tracks mobile/Mask group-3.png",
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
    bladeSvg: "/tracks/Mask group-4.svg",
    illustration: "/tracks/illustration_5.png",
    left: "49.5%",
    width: "31.15%",
    titlePos: { left: "67.5%", top: "15%" },
    titleWidth: "31%",
    titleAspect: "140/96",

    mobileBlade: "/tracks mobile/Mask group-4.png",
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
    bladeSvg: "/tracks/Mask group-5.svg",
    illustration: "/tracks/illustration_6.png",
    left: "49.5%",
    width: "50.0%",
    titlePos: { left: "71.5%", top: "16%" },
    titleWidth: "23%",
    titleAspect: "160/96",

    mobileBlade: "/tracks mobile/Mask group-5.png",
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
  trackName,
  trackNumber,
  subtracks,
  onClose,
}: {
  trackName: string;
  trackNumber: string;
  subtracks: Subtrack[];
  onClose?: () => void;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-none border border-pink-500/80 bg-black/95 p-3 sm:p-3.5 xl:p-4 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_28px_rgba(236,72,153,0.22)] select-none">
      {/* Top ambient highlight */}
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-pink-400/80 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2.5 border-b border-pink-500/25 pb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-pink-400">
              TRACK {trackNumber}
            </span>
            <span className="rounded-none bg-pink-500/20 px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-pink-300">
              SUBTRACKS
            </span>
          </div>
          <h3 className="mt-0.5 font-[var(--font-bebas-neue)] text-base sm:text-xl xl:text-2xl uppercase tracking-wider text-white drop-shadow-[0_0_12px_rgba(236,72,153,0.4)] leading-tight">
            {trackName}
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="shrink-0 rounded-none p-1 text-white/60 hover:bg-pink-500/20 hover:text-white transition-colors cursor-pointer"
            aria-label="Close subtracks panel"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Subtracks List - all points visible */}
      <div className="mt-2 flex flex-col gap-1.5 sm:gap-2">
        {subtracks.map((sub) => {
          const titleSize = getSubtrackTitleSize(sub.title);
          return (
            <div
              key={sub.id}
              className="relative rounded-none border border-pink-500/30 bg-pink-500/[0.04] p-1.5 sm:p-2"
            >
              <div className="flex items-start gap-2">
                <span className="shrink-0 font-mono text-[11px] sm:text-xs font-bold text-pink-400/90 pt-0.5">
                  {sub.number}.
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-white tracking-wide leading-snug ${titleSize}`}>
                    {sub.title}
                  </h4>
                  {sub.description && (
                    <p className="mt-0.5 text-[10px] sm:text-[11px] xl:text-xs text-white/70 leading-snug font-normal">
                      {sub.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TracksSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [mobileHoveredIdx, setMobileHoveredIdx] = useState<number | null>(null);

  const activeDesktopIdx = selectedIdx !== null ? selectedIdx : hoveredIdx;
  const activeDesktopTrack =
    activeDesktopIdx !== null ? TRACK_SUBTRACKS[activeDesktopIdx + 1] : null;

  const activeMobileTrack =
    mobileHoveredIdx !== null ? TRACK_SUBTRACKS[mobileHoveredIdx + 1] : null;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Mobile/Tablet Fan Layout (< lg) */}
      <div
        className="lg:hidden flex items-center justify-center w-full h-full py-2 px-2 relative select-none overflow-hidden"
        onClick={() => setMobileHoveredIdx(null)}
      >
        {/* Mobile Top Subtracks Panel (Tracks 1, 2, 3) */}
        <AnimatePresence>
          {activeMobileTrack && mobileHoveredIdx !== null && mobileHoveredIdx < 3 && (
            <motion.div
              key={`mobile-top-${mobileHoveredIdx}`}
              initial={{ opacity: 0, y: -25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-2 inset-x-3 z-40 max-w-sm mx-auto flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <SubtracksPanel
                trackName={activeMobileTrack.trackName}
                trackNumber={String(activeMobileTrack.trackId).padStart(2, "0")}
                subtracks={activeMobileTrack.subtracks}
                onClose={() => setMobileHoveredIdx(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Bottom Subtracks Panel (Tracks 4, 5, 6) */}
        <AnimatePresence>
          {activeMobileTrack && mobileHoveredIdx !== null && mobileHoveredIdx >= 3 && (
            <motion.div
              key={`mobile-bottom-${mobileHoveredIdx}`}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-2 inset-x-3 z-40 max-w-sm mx-auto flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <SubtracksPanel
                trackName={activeMobileTrack.trackName}
                trackNumber={String(activeMobileTrack.trackId).padStart(2, "0")}
                subtracks={activeMobileTrack.subtracks}
                onClose={() => setMobileHoveredIdx(null)}
              />
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
                src="/tracks mobile/Polygon 8.webp"
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
                src="/tracks mobile/scribble_figma.webp"
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
      <div
        className="hidden lg:flex flex-col items-center justify-center w-full h-full relative"
        onClick={() => setSelectedIdx(null)}
      >
        {/* Desktop Left Subtracks Panel (Tracks 1, 2, 3) */}
        <AnimatePresence>
          {activeDesktopTrack && activeDesktopIdx !== null && activeDesktopIdx < 3 && (
            <motion.div
              key={`desktop-left-${activeDesktopIdx}`}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute left-4 xl:left-8 bottom-6 lg:bottom-8 xl:bottom-12 z-40 w-[290px] xl:w-[330px] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <SubtracksPanel
                trackName={activeDesktopTrack.trackName}
                trackNumber={String(activeDesktopTrack.trackId).padStart(2, "0")}
                subtracks={activeDesktopTrack.subtracks}
                onClose={() => {
                  setSelectedIdx(null);
                  setHoveredIdx(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Right Subtracks Panel (Tracks 4, 5, 6) */}
        <AnimatePresence>
          {activeDesktopTrack && activeDesktopIdx !== null && activeDesktopIdx >= 3 && (
            <motion.div
              key={`desktop-right-${activeDesktopIdx}`}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute right-4 xl:right-8 bottom-6 lg:bottom-8 xl:bottom-12 z-40 w-[290px] xl:w-[330px] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <SubtracksPanel
                trackName={activeDesktopTrack.trackName}
                trackNumber={String(activeDesktopTrack.trackId).padStart(2, "0")}
                subtracks={activeDesktopTrack.subtracks}
                onClose={() => {
                  setSelectedIdx(null);
                  setHoveredIdx(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-[min(92vw,1320px,calc((100dvh-320px)*1432/611))] max-w-[1320px] flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[1432/611]">
          {tracks.map((track, i) => {
            const isHovered = activeDesktopIdx === i;
            const isAnyHovered = activeDesktopIdx !== null;
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx((prev) => (prev === i ? null : i));
                  }}
                />
              ))}
            </svg>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-8 -mt-2 sm:-mt-3 z-20 select-none pointer-events-none">
          <div className="relative w-[190px] xl:w-[220px] aspect-[508/451]">
            <Image src="/tracks/image 16.webp" alt="" fill draggable={false} className="object-contain" />
          </div>

          <div className="relative w-[240px] xl:w-[280px] h-[164px] xl:h-[190px]">
            <Image src="/tracks/Brain.svg.webp" alt="Brain Scribble" fill draggable={false} className="object-contain" />
          </div>

          <div className="relative w-[190px] xl:w-[220px] aspect-[382/258]">
            <Image src="/tracks/image 15.webp" alt="" fill draggable={false} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}