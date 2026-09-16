"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/Layout/Image";
import { motion } from "framer-motion";
import DesktopBackgroundThreads from "@/components/Team/DesktopBackgroundThreads";
import DynamicStringsBackground from "@/components/Background/DynamicStringsBackground";

const ART_WIDTH = 402;
const ART_HEIGHT = 672;
const DESKTOP_ART_WIDTH = 1440;
const DESKTOP_ART_HEIGHT = 685;

export interface TeamMember {
  id: string;
  name: string;
  rollNo: string;
  regNo?: string;
  silhouette?: string;
  layout?: "silhouette-left" | "silhouette-right";
  isLeader?: boolean;
}

export const DEFAULT_MEMBERS: TeamMember[] = [
  { id: "member-1", name: "Shashwat Shrye", rollNo: "25BEL0010" },
  { id: "member-2", name: "Shashwat Shrye", rollNo: "25BEL0010" },
  { id: "member-3", name: "Shashwat Shrye", rollNo: "25BEL0010" },
  { id: "member-4", name: "Shashwat Shrye", rollNo: "25BEL0010" },
];

interface TeamSectionProps {
  teamName?: string;
  teamId?: string;
  members?: TeamMember[];
  onReset?: () => void;
}

const MOBILE_PANEL_POSITIONS = [
  {
    top: "0%",
    height: "27.5%",
    paddingClass: "pl-[40%] pr-[6%]",
    align: "right" as const,
  },
  {
    top: "27.5%",
    height: "24.5%",
    paddingClass: "pl-[8%] pr-[40%]",
    align: "left" as const,
  },
  {
    top: "52%",
    height: "23.5%",
    paddingClass: "pl-[40%] pr-[6%]",
    align: "right" as const,
  },
  {
    top: "75.5%",
    height: "24.5%",
    paddingClass: "pl-[8%] pr-[40%]",
    align: "left" as const,
  },
];

function CopyTeamIdButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy team ID"
      title={copied ? "Copied!" : "Copy team ID"}
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/20 text-white/60 transition hover:border-pink-400/60 hover:text-white"
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

export default function TeamSection({
  teamName = "TEAM NAME",
  teamId = "",
  members = DEFAULT_MEMBERS,
}: TeamSectionProps) {
  const displayMembers = members.slice(0, 4);

  // Fit geometry for the mobile artwork: the whole art stays visible (never
  // cropped) with a margin on each side, and the overlay names use the art's
  // own coordinates so they stay locked to the silhouettes.
  const artRef = useRef<HTMLDivElement | null>(null);
  const [artSize, setArtSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const container = artRef.current;
    if (!container) return;

    const update = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.min(width / ART_WIDTH, height / ART_HEIGHT);
      setArtSize({ width: ART_WIDTH * scale, height: ART_HEIGHT * scale });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const desktopArtRef = useRef<HTMLDivElement | null>(null);
  const [desktopArtSize, setDesktopArtSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const container = desktopArtRef.current;
    if (!container) return;

    const update = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.min(width / DESKTOP_ART_WIDTH, height / DESKTOP_ART_HEIGHT);
      setDesktopArtSize({ width: DESKTOP_ART_WIDTH * scale, height: DESKTOP_ART_HEIGHT * scale });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="relative flex h-full w-full max-w-none flex-col items-center justify-between bg-black text-white select-none overflow-hidden px-0 mx-0">
      <DesktopBackgroundThreads />
      {/* Mobile view */}
      <div className="relative isolate flex h-full w-full flex-col overflow-hidden bg-black lg:hidden">
        <DynamicStringsBackground opacity={0.5} />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex shrink-0 flex-col items-center justify-center px-4 pb-1 pt-3 text-center"
        >
          {teamName === "TEAM NAME" ? (
            <div className="relative w-[220px] sm:w-[280px] md:w-[340px] h-10 sm:h-12 md:h-16">
              <Image
                src="/team/TEAM-NAME.webp"
                alt="Team Name"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]"
              />
            </div>
          ) : (
            <h2 className="font-extrabold uppercase tracking-widest text-2xl sm:text-4xl md:text-5xl text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
              {teamName}
            </h2>
          )}
          {teamId ? (
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-mono text-[clamp(0.65rem,2.4vw,0.85rem)] uppercase tracking-[0.25em] text-white/60">
                {teamId}
              </span>
              <CopyTeamIdButton value={teamId} />
            </div>
          ) : null}
        </motion.div>

        {/* Member artwork: full art visible, inset from the sides. */}
        <div className="relative z-10 min-h-0 w-full flex-1 overflow-hidden">
          <div ref={artRef} className="absolute inset-x-3 inset-y-0">
            {artSize && (
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: artSize.width, height: artSize.height }}
              >
                <Image
                  src="/teammoobile.svg"
                  alt="Team Mobile Artwork"
                  fill
                  unoptimized
                  className="object-contain pointer-events-none select-none"
                />

                <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  {displayMembers.map((member, index) => {
                    const config = MOBILE_PANEL_POSITIONS[index % MOBILE_PANEL_POSITIONS.length];
                    return (
                      <motion.div
                        key={member.id || index}
                        initial={{ opacity: 0, x: config.align === "left" ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`absolute w-full flex flex-col justify-center items-start ${config.paddingClass}`}
                        style={{ top: config.top, height: config.height }}
                      >
                        <div className="font-extrabold uppercase text-white text-[clamp(1.05rem,4.4vw,1.6rem)] leading-snug tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-left">
                          {member.name.split(" ").map((word, i) => (
                            <span key={i} className="block">
                              {word}
                            </span>
                          ))}
                        </div>
                        {member.isLeader ? (
                          <div className="mt-0.5 font-bold uppercase tracking-[0.2em] text-pink-300 text-[clamp(0.6rem,2vw,0.78rem)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] text-left">
                            (Leader)
                          </div>
                        ) : null}
                        {member.rollNo ? (
                          <div className="font-mono font-bold text-white/95 text-[clamp(0.78rem,2.9vw,1.1rem)] tracking-widest mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] text-left">
                            {member.rollNo}
                          </div>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex relative z-10 h-full min-h-0 w-full flex-col items-center justify-between p-0 m-0 overflow-hidden">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex flex-col items-center justify-center w-full p-0 shrink-0 m-0 pt-2"
        >
          {teamName === "TEAM NAME" ? (
            <div className="relative w-[280px] sm:w-[360px] md:w-[420px] lg:w-[460px] aspect-[575/79]">
              <Image
                src="/team/TEAM-NAME.webp"
                alt="Team Name"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.45)]"
              />
            </div>
          ) : (
            <h2 className="text-center font-extrabold uppercase tracking-widest text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.5)]">
              {teamName}
            </h2>
          )}
          {teamId ? (
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-[clamp(0.8rem,1.1vw,1.05rem)] uppercase tracking-[0.3em] text-white/60">
                {teamId}
              </span>
              <CopyTeamIdButton value={teamId} />
            </div>
          ) : null}
        </motion.div>

        {/* Team artwork container */}
        <div className="relative w-full flex-1 min-h-0 flex flex-col justify-end items-center overflow-hidden p-0 m-0">
          <div ref={desktopArtRef} className="relative h-full w-full flex items-end justify-center">
            {desktopArtSize && (
              <div
                className="relative"
                style={{ width: desktopArtSize.width, height: desktopArtSize.height }}
              >
            {/* Mirror Floor Reflection (dark reflection on black floor plane) */}
            <div className="absolute top-[96%] left-0 w-full h-[32%] overflow-hidden pointer-events-none opacity-30 scale-y-[-1] origin-top blur-[0.5px] z-0">
              <Image
                src="/team.svg.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-bottom pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
            </div>

            <Image
                src="/team.svg.webp"
              alt="Team Artwork"
              fill
              sizes="100vw"
              className="object-contain object-bottom pointer-events-none select-none relative z-10"
            />
            
            <div className="absolute inset-0 grid grid-cols-4 w-full h-full pointer-events-none z-20">
              {displayMembers.map((member, index) => {
                const desktopPadding = [
                  "pl-[46%] sm:pl-[47%] lg:pl-[48%] pr-[4%]",
                  "pl-[49%] sm:pl-[50%] lg:pl-[51%] pr-[4%]",
                  "pl-[12%] sm:pl-[13%] lg:pl-[14%] pr-[41%]",
                  "pl-[7%] sm:pl-[8%] lg:pl-[9%] pr-[41%]",
                ][index % 4];
                return (
                  <motion.div
                    key={member.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative h-full w-full flex flex-col justify-center items-start ${desktopPadding} pt-[4%]`}
                  >
                    <div className="font-extrabold text-white text-[clamp(0.875rem,1.75vw,2.25rem)] leading-[1.12] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-left">
                      {member.name.split(" ").map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))}
                    </div>
                    {member.isLeader ? (
                      <div className="mt-0.5 font-bold uppercase tracking-[0.2em] text-pink-300 text-[clamp(0.55rem,0.8vw,0.85rem)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-left">
                        (Leader)
                      </div>
                    ) : null}
                    {member.rollNo ? (
                      <div className="font-mono font-bold text-white/95 text-[clamp(0.7rem,1.15vw,1.35rem)] tracking-wider pt-1 sm:pt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-left">
                        {member.rollNo}
                      </div>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
           
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
