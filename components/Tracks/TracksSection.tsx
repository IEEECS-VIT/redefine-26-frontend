"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

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
    title: "E-Commerce",
    titleImg: "/tracks/01\u2028E-Commerce.png",
    bladeSvg: "/tracks/Mask group.svg",
    illustration: "/tracks/illustration_1.png",
    left: "-0.7%",
    width: "50.56%",
    titlePos: { left: "26%", top: "16%" },
    titleWidth: "16%",
    titleAspect: "149/75",

    mobileBlade: "/tracks mobile/Mask group.png",
    mobileTitle: "/tracks mobile/01\u2028E-Commerce.png",
    mobileTitlePos: { left: "72.1%", top: "24.1%" },
    mobileTitleWidth: "24.5%",
    mobileTitleAspect: "73/36",
    mobileTop: "0%",
    mobileHeight: "50.5%",
  },
  {
    id: 2,
    title: "Smart Education",
    titleImg: "/tracks/02\u2028Smart Education.png",
    bladeSvg: "/tracks/Mask group-1.svg",
    illustration: "/tracks/illustration_2.png",
    left: "18.3%",
    width: "31.28%",
    titlePos: { left: "30%", top: "15%" },
    titleWidth: "18%",
    titleAspect: "119/113",

    mobileBlade: "/tracks mobile/Mask group-1.png",
    mobileTitle: "/tracks mobile/02\u2028Smart Education.png",
    mobileTitlePos: { left: "74.2%", top: "22.4%" },
    mobileTitleWidth: "19.5%",
    mobileTitleAspect: "58/54",
    mobileTop: "18.74%",
    mobileHeight: "31.33%",
  },
  {
    id: 3,
    title: "Healthcare Companion",
    titleImg: "/tracks/03\u2028Healthcare Companion.png",
    bladeSvg: "/tracks/Mask group-2.svg",
    illustration: "/tracks/illustration_3.png",
    left: "34.5%",
    width: "17.81%",
    titlePos: { left: "49.8%", top: "13%" },
    titleWidth: "36%",
    titleAspect: "136/118",

    mobileBlade: "/tracks mobile/Mask group-2.png",
    mobileTitle: "/tracks mobile/03\u2028Healthcare Companion.png",
    mobileTitlePos: { left: "73.5%", top: "36.8%" },
    mobileTitleWidth: "22.5%",
    mobileTitleAspect: "67/57",
    mobileTop: "34.48%",
    mobileHeight: "17.88%",
  },
  {
    id: 4,
    title: "Travel & Exploration",
    titleImg: "/tracks/04\u2028 Travel & Exploration.png",
    bladeSvg: "/tracks/Mask group-3.svg",
    illustration: "/tracks/illustration_4.png",
    left: "49.5%",
    width: "17.46%",
    titlePos: { left: "57%", top: "13%" },
    titleWidth: "36%",
    titleAspect: "142/118",

    mobileBlade: "/tracks mobile/Mask group-3.png",
    mobileTitle: "/tracks mobile/04\u2028 Travel & Exploration.png",
    mobileTitlePos: { left: "74.2%", top: "26.2%" },
    mobileTitleWidth: "23.5%",
    mobileTitleAspect: "70/57",
    mobileTop: "49.78%",
    mobileHeight: "17.45%",
  },
  {
    id: 5,
    title: "Finance",
    titleImg: "/tracks/05_Finance.svg",
    bladeSvg: "/tracks/Mask group-4.svg",
    illustration: "/tracks/illustration_5.png",
    left: "49.5%",
    width: "31.15%",
    titlePos: { left: "72%", top: "15%" },
    titleWidth: "16%",
    titleAspect: "93/75",

    mobileBlade: "/tracks mobile/Mask group-4.png",
    mobileTitle: "/tracks mobile/05\u2028Finance.png",
    mobileTitlePos: { left: "75.8%", top: "56.4%" },
    mobileTitleWidth: "15.4%",
    mobileTitleAspect: "46/36",
    mobileTop: "49.78%",
    mobileHeight: "31.18%",
  },
  {
    id: 6,
    title: "Social Impact Platform",
    titleImg: "/tracks/06\u2028Social Impact Platform.png",
    bladeSvg: "/tracks/Mask group-5.svg",
    illustration: "/tracks/illustration_6.png",
    left: "49.5%",
    width: "50.0%",
    titlePos: { left: "74%", top: "16%" },
    titleWidth: "17%",
    titleAspect: "157/113",

    mobileBlade: "/tracks mobile/Mask group-5.png",
    mobileTitle: "/tracks mobile/06\u2028Social Impact Platform.png",
    mobileTitlePos: { left: "77.2%", top: "61.1%" },
    mobileTitleWidth: "17.4%",
    mobileTitleAspect: "52/72",
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

export default function TracksSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileHoveredIdx, setMobileHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Mobile/Tablet Fan Layout (< lg) */}
      <div
        className="lg:hidden flex items-center justify-center w-full h-full py-2 px-2 relative select-none overflow-hidden"
        onClick={() => setMobileHoveredIdx(null)}
      >
        {/* Composition wrapper: centers both the brain scribbles on the left and fan blades on the right */}
        <div className="relative w-[min(94vw,390px)] aspect-[380/699] max-h-[calc(100dvh-130px)] flex items-center justify-end">
          {/* Fan blades wrapper with locked aspect ratio matching Polygon 8 (298x699) */}
          <div className="relative w-[78.4%] h-full aspect-[298/699] shrink-0">
            {/* Background Polygon */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/tracks mobile/Polygon 8.png"
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
                      className="absolute"
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
                src="/tracks mobile/scribble_figma.png"
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
      <div className="hidden lg:flex flex-col items-center justify-center w-full h-full">
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
                  zIndex: getZIndex(i, tracks.length),
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

            {/* Native SVG hit overlay for pixel-perfect hover detection with zero gaps */}
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
            <Image src="/tracks/image 16.png" alt="" fill draggable={false} className="object-contain" />
          </div>

          <div className="relative w-[240px] xl:w-[280px] h-[164px] xl:h-[190px]">
            <Image src="/tracks/Brain.svg" alt="Brain Scribble" fill draggable={false} className="object-contain" />
          </div>

          <div className="relative w-[190px] xl:w-[220px] aspect-[382/258]">
            <Image src="/tracks/image 15.png" alt="" fill draggable={false} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}