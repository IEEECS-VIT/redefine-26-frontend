"use client";

import Image from "@/components/Layout/Image";
import { motion } from "framer-motion";
import DesktopBackgroundThreads from "@/components/Team/DesktopBackgroundThreads";
import DynamicStringsBackground from "@/components/Background/DynamicStringsBackground";

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

export default function TeamSection({
  teamName = "TEAM NAME",
  members = DEFAULT_MEMBERS,
}: TeamSectionProps) {
  const displayMembers = members.slice(0, 4);

  return (
    <section className="relative flex h-full w-full max-w-none flex-col items-center justify-between bg-black text-white select-none overflow-hidden px-0 mx-0">
      <DesktopBackgroundThreads />
      {/* Mobile view */}
      <div className="flex flex-col lg:hidden w-full h-full min-h-screen bg-black relative isolate pb-2">
        <DynamicStringsBackground opacity={0.5} />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex flex-col items-center justify-center pt-3 pb-0 px-4 text-center shrink-0"
        >
          {teamName === "TEAM NAME" ? (
            <div className="relative w-[180px] sm:w-[240px] md:w-[300px] h-8 sm:h-11 md:h-14">
              <Image
                src="/team/TEAM NAME.webp"
                alt="Team Name"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]"
              />
            </div>
          ) : (
            <h2 className="font-extrabold uppercase tracking-widest text-xl sm:text-3xl md:text-4xl text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
              {teamName}
            </h2>
          )}
        </motion.div>

        {/* Mobile member artwork container */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-start px-2 pt-1 pb-2">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] max-h-[70vh] aspect-[402/672] mx-auto overflow-hidden">
            <Image
              src="/teammoobile.svg"
              alt="Team Mobile Artwork"
              fill
              unoptimized
              className="object-contain pointer-events-none select-none relative z-10"
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
                    <div className="font-extrabold uppercase text-white text-[clamp(0.8rem,3.2vw,1.15rem)] leading-snug tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-left">
                      {member.name.split(" ").map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))}
                    </div>
                    {member.rollNo ? (
                      <div className="font-mono font-bold text-white/95 text-[clamp(0.6rem,2.2vw,0.85rem)] tracking-widest mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] text-left">
                        {member.rollNo}
                      </div>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
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
                src="/team/TEAM NAME.webp"
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
        </motion.div>

        {/* Team artwork container */}
        <div className="relative w-full flex-1 min-h-0 flex flex-col justify-end items-center overflow-hidden p-0 m-0">
          <div className="relative h-full w-full max-h-full aspect-[1440/685] mx-auto flex items-end justify-center">
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
        </div>
      </div>
    </section>
  );
}
