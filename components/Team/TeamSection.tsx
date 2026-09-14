"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import DesktopBackgroundThreads from "@/components/Team/DesktopBackgroundThreads";
import DynamicStringsBackground from "@/components/Background/DynamicStringsBackground";

export interface TeamMember {
  id: string;
  name: string;
  rollNo: string;
  silhouette?: string;
  layout?: "silhouette-left" | "silhouette-right";
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

const MOBILE_PANEL_CONFIGS = [
  {
    silhouette: "/team/image 30.png",
    align: "left" as const,
    silhouetteClass: "left-1 sm:left-4 md:left-8 bottom-0 w-[95px] sm:w-[130px] md:w-[160px] h-[135px] sm:h-[175px] md:h-[210px]",
    brainClass: "left-[50px] sm:left-[70px] md:left-[90px] top-[10px] sm:top-[16px] w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9",
    textClass: "pl-[105px] sm:pl-[150px] md:pl-[190px] pr-4 items-start text-left",
  },
  {
    silhouette: "/team/image 34.png",
    align: "right" as const,
    silhouetteClass: "right-1 sm:right-4 md:right-8 bottom-0 w-[95px] sm:w-[130px] md:w-[160px] h-[135px] sm:h-[175px] md:h-[210px]",
    brainClass: "right-[50px] sm:right-[70px] md:right-[90px] top-[8px] sm:top-[14px] w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9",
    textClass: "pl-6 sm:pl-12 md:pl-16 pr-[105px] sm:pr-[150px] md:pr-[190px] items-start text-left",
  },
  {
    silhouette: "/team/image 33.png",
    align: "left" as const,
    silhouetteClass: "left-1 sm:left-4 md:left-8 bottom-0 w-[100px] sm:w-[135px] md:w-[165px] h-[135px] sm:h-[175px] md:h-[210px]",
    brainClass: "left-[50px] sm:left-[70px] md:left-[90px] top-[8px] sm:top-[14px] w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9",
    textClass: "pl-[105px] sm:pl-[150px] md:pl-[190px] pr-4 items-start text-left",
  },
  {
    silhouette: "/team/image 31.png",
    align: "right" as const,
    silhouetteClass: "right-1 sm:right-4 md:right-8 bottom-0 w-[95px] sm:w-[130px] md:w-[160px] h-[135px] sm:h-[175px] md:h-[210px]",
    brainClass: "right-[50px] sm:right-[70px] md:right-[90px] top-[8px] sm:top-[14px] w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9",
    textClass: "pl-6 sm:pl-12 md:pl-16 pr-[105px] sm:pr-[150px] md:pr-[190px] items-start text-left",
  },
];

export default function TeamSection({
  teamName = "TEAM NAME",
  members = DEFAULT_MEMBERS,
}: TeamSectionProps) {
  const displayMembers = members.length > 0 ? members.slice(0, 4) : DEFAULT_MEMBERS;

  return (
    <section className="relative flex h-full w-full max-w-none flex-col items-center justify-between bg-black text-white select-none overflow-hidden px-0 mx-0">
      <DesktopBackgroundThreads />
      {/* Mobile view */}
      <div className="flex flex-col lg:hidden w-full h-full min-h-screen bg-black relative isolate pb-6">
        <DynamicStringsBackground opacity={0.5} />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex flex-col items-center justify-center pt-5 pb-4 px-4 text-center"
        >
          {teamName === "TEAM NAME" ? (
            <div className="relative w-[200px] sm:w-[280px] md:w-[360px] h-10 sm:h-14 md:h-16">
              <Image
                src="/team/TEAM NAME.png"
                alt="Team Name"
                fill
                priority
                unoptimized
                className="object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]"
              />
            </div>
          ) : (
            <h2 className="font-extrabold uppercase tracking-widest text-2xl sm:text-4xl md:text-5xl text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
              {teamName}
            </h2>
          )}
        </motion.div>

        {/* Mobile member cards */}
        <div className="relative z-10 flex flex-col w-full flex-1 divide-y-4 divide-black border-y-4 border-black">
          {displayMembers.map((member, index) => {
            const config = MOBILE_PANEL_CONFIGS[index % MOBILE_PANEL_CONFIGS.length];
            return (
              <motion.div
                key={member.id || index}
                initial={{ opacity: 0, x: config.align === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative w-full h-[145px] sm:h-[185px] md:h-[225px] overflow-hidden bg-[linear-gradient(180deg,#9B1A45_0%,#CE3566_55%,#F3799D_100%)] flex items-center shadow-[inset_0_0_24px_rgba(0,0,0,0.3)]"
              >
                <div className={`absolute z-10 ${config.silhouetteClass}`}>
                  <Image
                    src={member.silhouette || config.silhouette}
                    alt={member.name}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>

                <div className={`absolute z-20 pointer-events-none ${config.brainClass}`}>
                  <Image
                    src="/team/image 35.png"
                    alt=""
                    fill
                    className="object-contain drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                  />
                </div>

                <div className={`relative z-20 flex flex-col justify-center w-full ${config.textClass}`}>
                  <h3 className="font-extrabold uppercase text-white text-base sm:text-2xl md:text-3xl leading-snug tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    {member.name.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </h3>
                  <p className="font-mono font-bold text-white/95 text-xs sm:text-base md:text-xl tracking-widest mt-1 sm:mt-2.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                    {member.rollNo}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex relative z-10 h-full min-h-0 w-full flex-col items-center justify-between p-0 m-0 overflow-hidden">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex flex-col items-center justify-center w-full p-0 shrink-0 m-0 pt-2"
        >
          {teamName === "TEAM NAME" ? (
            <div className="relative w-[280px] sm:w-[360px] md:w-[420px] lg:w-[460px] aspect-[575/79]">
              <Image
                src="/team/TEAM NAME.png"
                alt="Team Name"
                fill
                priority
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
                src="/team.svg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-contain object-bottom pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
            </div>

            <Image
              src="/team.svg"
              alt="Team Artwork"
              fill
              priority
              sizes="100vw"
              className="object-contain object-bottom pointer-events-none select-none relative z-10"
            />

            {/* Member text overlay - Commented out */}
            {/*
            <div className="absolute inset-0 grid grid-cols-4 w-full h-full pointer-events-none z-20">
              {displayMembers.map((member, index) => {
                const isLeftPanel = index < 2;
                return (
                  <motion.div
                    key={member.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative h-full w-full flex flex-col justify-center items-start ${
                      isLeftPanel
                        ? "pl-[46%] sm:pl-[47%] lg:pl-[48%] pr-[4%]"
                        : "pl-[7%] sm:pl-[8%] lg:pl-[9%] pr-[41%]"
                    } pt-[4%]`}
                  >
                    <div className="font-extrabold text-white text-[clamp(0.875rem,1.75vw,2.25rem)] leading-[1.12] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-left">
                      {member.name.split(" ").map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))}
                    </div>
                    <div className="font-mono font-bold text-white/95 text-[clamp(0.7rem,1.15vw,1.35rem)] tracking-wider pt-1 sm:pt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-left">
                      {member.rollNo}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
