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

export const PLACEHOLDER_MEMBER_NAME = "- -";

export const PLACEHOLDER_MEMBERS: TeamMember[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: `placeholder-${index + 1}`,
    name: PLACEHOLDER_MEMBER_NAME,
    rollNo: "",
  }),
);

interface TeamSectionProps {
  teamName?: string;
  members?: TeamMember[];
  onReset?: () => void;
}

const MOBILE_PANEL_CONFIGS = [
  {
    silhouette: "/team/image 30.webp",
    align: "left" as const,
    silhouetteClass: "left-1 sm:left-4 md:left-8 bottom-0 w-[95px] sm:w-[130px] md:w-[160px] h-[135px] sm:h-[175px] md:h-[210px]",
    brainClass: "left-[50px] sm:left-[70px] md:left-[90px] top-[10px] sm:top-[16px] w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9",
    textClass: "pl-[115px] sm:pl-[150px] md:pl-[190px] pr-4 items-start text-left",
  },
  {
    silhouette: "/team/image 34.webp",
    align: "right" as const,
    silhouetteClass: "right-1 sm:right-4 md:right-8 bottom-0 w-[95px] sm:w-[130px] md:w-[160px] h-[135px] sm:h-[175px] md:h-[210px]",
    brainClass: "right-[50px] sm:right-[70px] md:right-[90px] top-[8px] sm:top-[14px] w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9",
    textClass: "pl-[135px] sm:pl-[170px] md:pl-[210px] pr-4 items-start text-left",
  },
  {
    silhouette: "/team/image 33.webp",
    align: "left" as const,
    silhouetteClass: "left-1 sm:left-4 md:left-8 bottom-0 w-[100px] sm:w-[135px] md:w-[165px] h-[135px] sm:h-[175px] md:h-[210px]",
    brainClass: "left-[50px] sm:left-[70px] md:left-[90px] top-[8px] sm:top-[14px] w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9",
    textClass: "pl-[115px] sm:pl-[150px] md:pl-[190px] pr-4 items-start text-left",
  },
  {
    silhouette: "/team/image 31.webp",
    align: "right" as const,
    silhouetteClass: "right-1 sm:right-4 md:right-8 bottom-0 w-[95px] sm:w-[130px] md:w-[160px] h-[135px] sm:h-[175px] md:h-[210px]",
    brainClass: "right-[50px] sm:right-[70px] md:right-[90px] top-[8px] sm:top-[14px] w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9",
    textClass: "pl-[75px] sm:pl-[110px] md:pl-[150px] pr-4 items-start text-left",
  },
];

const MAX_MEMBERS = 4;

export default function TeamSection({
  teamName = "TEAM NAME",
  members = [],
}: TeamSectionProps) {
  const displayMembers = Array.from(
    { length: MAX_MEMBERS },
    (_, index) => members[index] ?? PLACEHOLDER_MEMBERS[index],
  );

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
          className="relative z-20 flex flex-col items-center justify-center pt-7 pb-4 px-4 text-center"
        >
          {teamName === "TEAM NAME" ? (
            <div className="relative w-[200px] sm:w-[280px] md:w-[360px] h-10 sm:h-14 md:h-16">
              <Image
                src="/team/TEAM NAME.webp"
                alt="Team Name"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-pink-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                Team Name
              </span>
              <h2 className="font-extrabold uppercase tracking-widest text-2xl sm:text-4xl md:text-5xl text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
                {teamName}
              </h2>
            </div>
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
                className="relative w-full h-[145px] sm:h-[185px] md:h-[225px] overflow-hidden bg-[linear-gradient(180deg,#9B1A45_0%,#CE3566_55%,#F3799D_100%)] flex items-start shadow-[inset_0_0_24px_rgba(0,0,0,0.3)]"
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
                    src="/team/image 35.webp"
                    alt=""
                    fill
                    className="object-contain drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                  />
                </div>

                <div className={`relative z-20 flex flex-col justify-start w-full pt-4 sm:pt-6 md:pt-8 ${config.textClass}`}>
                  <h3 className="font-extrabold text-white text-base sm:text-2xl md:text-3xl leading-snug tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    {member.name === PLACEHOLDER_MEMBER_NAME ? (
                      <span className="block">{member.name}</span>
                    ) : (
                      member.name.split(" ").map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))
                    )}
                  </h3>
                  {member.isLeader ? (
                    <div className="font-extrabold text-pink-200 text-xs sm:text-base md:text-lg leading-tight tracking-wide mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                      (Leader)
                    </div>
                  ) : null}
                  {member.rollNo ? (
                    <p className="font-mono font-bold text-white/95 text-xs sm:text-base md:text-xl tracking-widest mt-1.5 sm:mt-2.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                      {member.rollNo}
                    </p>
                  ) : null}
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
          className="relative z-20 flex flex-col items-center justify-center w-full p-0 shrink-0 m-0 pt-4"
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
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.3em] text-pink-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                Team Name
              </span>
              <h2 className="text-center font-extrabold uppercase tracking-widest text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.5)]">
                {teamName}
              </h2>
            </div>
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
                const isLeftPanel = index < 2;
                return (
                  <motion.div
                    key={member.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative h-full w-full flex flex-col justify-start items-start ${
                      index === 1
                        ? "pl-[52%] sm:pl-[53%] lg:pl-[54%] pr-[4%]"
                        : index === 3
                          ? "pl-[9%] sm:pl-[10%] lg:pl-[11%] pr-[36%]"
                          : isLeftPanel
                            ? "pl-[46%] sm:pl-[47%] lg:pl-[48%] pr-[4%]"
                            : "pl-[18%] sm:pl-[19%] lg:pl-[20%] pr-[36%]"
                    } pt-[80%]`}
                  >
                    <div className="font-extrabold text-white text-[clamp(0.875rem,1.75vw,2.25rem)] leading-[1.12] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-left">
                      {member.name === PLACEHOLDER_MEMBER_NAME ? (
                        <span className="block">{member.name}</span>
                      ) : (
                        member.name.split(" ").map((word, i) => (
                          <span key={i} className="block">
                            {word}
                          </span>
                        ))
                      )}
                    </div>
                    {member.isLeader ? (
                      <div className="font-extrabold text-pink-200 text-[clamp(0.75rem,1.2vw,1.35rem)] leading-none tracking-wide pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-left">
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
        </div>
      </div>
    </section>
  );
}
