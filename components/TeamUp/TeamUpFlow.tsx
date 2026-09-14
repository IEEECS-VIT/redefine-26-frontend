"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  createTeam,
  fetchTracks,
  joinTeam,
  saveCurrentTeam,
  DEFAULT_TRACKS,
  type Team,
  type Track,
} from "@/lib/teamup";

type Step = "choose" | "build" | "join";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const INPUT_TAIL =
  "h-12 w-full rounded-xl border border-pink-600 bg-transparent px-4 sm:px-5 text-base text-white outline-none transition placeholder:text-white/55 focus:border-pink-300 focus:ring-2 focus:ring-pink-300/20";

function FieldLabel({ icon, label, alt }: { icon: string; label: string; alt: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0">
        <Image src={icon} alt="" fill className="object-contain" />
      </div>
      <div className="relative h-6 sm:h-7 w-auto" style={{ aspectRatio: label.includes("TEAM") ? "155 / 26" : "84 / 26" }}>
        <Image src={label} alt={alt} fill className="object-contain object-left" />
      </div>
    </div>
  );
}

function TeamIllustration() {
  return (
    <div className="relative h-full w-[108%] max-w-[540px] lg:w-auto lg:max-w-full aspect-[899/1024] overflow-hidden">
      <Image
        src="/teamupart.svg"
        alt="Team Up Artwork"
        fill
        priority
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="object-contain object-bottom scale-110 sm:scale-105 origin-bottom lg:scale-100 lg:object-bottom"
      />
    </div>
  );
}

function KindButton({
  icon,
  label,
  alt,
  onClick,
}: {
  icon: string;
  label: string;
  alt: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      onClick={onClick}
      className="w-full"
    >
      <button
        type="button"
        aria-label={alt}
        className="group block w-full rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
      >
        <motion.div
          whileHover={{ scale: 1.025, y: -3 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.2 }}
          className="flex w-full flex-col items-center justify-center rounded-lg border border-pink-600/90 bg-black transition duration-200 group-hover:-translate-y-1 group-hover:bg-pink-500/10 sm:rounded-xl h-[clamp(5.5rem,14vh,7.5rem)] px-4 py-3 gap-2.5 lg:h-auto lg:aspect-[371/139] lg:gap-[clamp(0.45rem,1.2vw,0.8rem)] lg:px-5 lg:py-4"
        >
          <div className="relative aspect-square w-8 sm:w-10 lg:w-[16%] lg:min-w-8">
            <Image src={icon} alt="" fill className="object-contain" />
          </div>
          <div className="relative aspect-[307/34] w-[82%] sm:w-[83%]">
            <Image src={label} alt={alt} fill className="object-contain" />
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

function PanelFrame({
  children,
  onSubmit,
  onBack,
}: {
  children: React.ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onBack?: () => void;
}) {
  const className =
    "relative flex h-full min-h-0 w-full flex-col overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-xl border border-pink-600/90 bg-black/95 px-5 py-[clamp(1rem,2.5vh,1.75rem)] sm:px-8 sm:rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_32px_rgba(236,72,153,0.2)] lg:max-w-[32.875rem] lg:bg-black lg:px-[clamp(1.25rem,5vw,3rem)] lg:pb-[clamp(1.5rem,4vh,2.5rem)] lg:pt-[clamp(1rem,2vh,1.5rem)] lg:shadow-[0_0_32px_rgba(236,72,153,0.13)]";

  const backButton = onBack ? (
    <button
      type="button"
      onClick={onBack}
      className="absolute left-3 top-3 z-30 flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 text-xs text-white/90 transition hover:bg-pink-500/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-300 sm:left-4 sm:top-4 sm:text-sm"
    >
      <span aria-hidden>&larr;</span> Back
    </button>
  ) : null;

  if (onSubmit) {
    return (
      <form noValidate onSubmit={onSubmit} className={className}>
        {backButton}
        {children}
      </form>
    );
  }
  return (
    <div className={className}>
      {backButton}
      {children}
    </div>
  );
}

interface TeamUpFlowProps {
  onTeamFormed?: (team: Team) => void;
}

import DesktopBackgroundThreads from "@/components/Team/DesktopBackgroundThreads";

export default function TeamUpFlow({ onTeamFormed }: TeamUpFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("choose");
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);

  const [teamName, setTeamName] = useState("");
  const [trackId, setTrackId] = useState("");
  const [teamCode, setTeamCode] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    fetchTracks()
      .then((remoteTracks) => {
        if (active && remoteTracks.length) setTracks(remoteTracks);
      })
      .catch(() => {
        /* keep bundled tracks */
      });
    return () => {
      active = false;
    };
  }, []);

  const go = (next: Step) => {
    setError("");
    setStep(next);
  };

  const back = () => {
    setError("");
    setStep("choose");
  };

  const handleFinalize = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!teamName.trim() || !trackId) {
      setError("Add a team name and select a track to continue.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const team = await createTeam({ name: teamName, trackId });
      saveCurrentTeam(team);
      onTeamFormed?.(team);
      router.push("/team");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!teamCode.trim()) {
      setError("Enter your team code to continue.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const team = await joinTeam({ code: teamCode });
      saveCurrentTeam(team);
      onTeamFormed?.(team);
      router.push("/team");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative isolate flex h-full w-full flex-col overflow-hidden bg-black text-white select-none"
    >
      <DesktopBackgroundThreads />
      <div className="relative z-10 flex h-full w-full flex-col items-center p-0 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:grid-rows-1 lg:gap-4">
        {/* Interactive panel: Top on mobile, Right on desktop */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          className="order-1 relative z-20 flex min-h-0 w-[88vw] max-w-[350px] sm:max-w-[420px] md:max-w-[460px] lg:w-full lg:max-w-[32.875rem] h-[clamp(20rem,54vh,32rem)] min-h-[340px] lg:h-full lg:max-h-none items-center justify-center py-1 sm:py-2 lg:order-2 lg:justify-end shrink-0"
        >
          <AnimatePresence mode="wait">
            {step === "choose" && (
              <motion.div
                key="choose"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="h-full w-full min-h-0 flex items-center justify-center"
              >
                <div className="flex h-full min-h-0 w-full flex-col justify-center items-center overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-xl border border-pink-600/90 bg-black/95 px-4 sm:px-6 py-[clamp(1rem,2.5vh,2rem)] shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_32px_rgba(236,72,153,0.2)] sm:rounded-2xl lg:bg-black lg:px-[14%] lg:py-6 lg:shadow-[0_0_32px_rgba(236,72,153,0.13)]">
                  <div className="flex w-full flex-col gap-[clamp(0.85rem,2.5vh,2rem)] lg:gap-[clamp(1rem,3vh,2.25rem)] my-auto">
                    <KindButton
                      icon="/teamup/image 24.png"
                      label="/teamup/BUILD YOUR TEAM.png"
                      alt="Build your team"
                      onClick={() => go("build")}
                    />
                    <KindButton
                      icon="/teamup/image 25.png"
                      label="/teamup/JOIN A TEAM.png"
                      alt="Join a team"
                      onClick={() => go("join")}
                    />
                    <motion.button
                      type="button"
                      onClick={() => router.push("/team")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-xs sm:text-sm font-semibold text-pink-300 hover:text-white underline tracking-wider transition-colors pt-1 text-center"
                    >
                      View Team Page Directly &rarr;
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "build" && (
              <motion.div
                key="build"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="h-full w-full min-h-0"
              >
                <PanelFrame onSubmit={handleFinalize} onBack={back}>
                  <div className="flex flex-1 flex-col gap-[clamp(0.6rem,2vh,1.75rem)] justify-center">
                    <div className="flex flex-col items-center gap-2.5 sm:gap-4">
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                        <Image src="/buildteam/image 24.svg" alt="" fill className="object-contain" />
                      </div>
                      <div className="relative aspect-[307/34] w-full max-w-[17rem] sm:max-w-[19.2rem]">
                        <Image src="/buildteam/BUILD YOUR TEAM.svg" alt="Build your team" fill className="object-contain" />
                      </div>
                    </div>

                    <div className="space-y-2.5 sm:space-y-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <FieldLabel icon="/buildteam/image 27.svg" label="/buildteam/TEAM NAME.svg" alt="Team name" />
                        <input
                          value={teamName}
                          onChange={(event) => setTeamName(event.target.value)}
                          placeholder="Enter your team name"
                          maxLength={48}
                          className={INPUT_TAIL}
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <FieldLabel icon="/buildteam/image 27.svg" label="/buildteam/TRACK.svg" alt="Track" />
                        <div className="relative">
                          <select
                            value={trackId}
                            onChange={(event) => setTrackId(event.target.value)}
                            className="h-11 sm:h-12 w-full appearance-none rounded-xl border border-pink-600 bg-black px-4 sm:px-5 pr-10 text-sm sm:text-base text-white outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-300/20"
                          >
                            <option value="" disabled>
                              Select a track
                            </option>
                            {tracks.map((track) => (
                              <option key={track.id} value={track.id}>
                                {track.name}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <Image src="/buildteam/Polygon 10.svg" alt="" width={16} height={11} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {error && <p role="alert" className="text-xs sm:text-sm text-pink-200 text-center">{error}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.2 }}
                    disabled={loading}
                    className="relative mt-3 sm:mt-6 flex h-12 sm:h-16 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-pink-400 font-bold shadow-[0_8px_24px_rgba(236,72,153,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-200 disabled:opacity-60"
                  >
                    <Image src="/buildteam/FINALISE TEAM.svg" alt="Finalise team" width={128} height={17} />
                  </motion.button>
                </PanelFrame>
              </motion.div>
            )}

            {step === "join" && (
              <motion.div
                key="join"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="h-full w-full min-h-0"
              >
                <PanelFrame onSubmit={handleJoin} onBack={back}>
                  <div className="flex flex-1 flex-col items-center justify-center gap-[clamp(0.6rem,2vh,1.75rem)]">
                    <div className="space-y-3 sm:space-y-5 w-full">
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0">
                          <Image src="/teamcode/image 27.svg" alt="" fill className="object-contain" />
                        </div>
                        <div className="relative aspect-[155/26] h-6 sm:h-7 w-auto">
                          <Image src="/teamcode/TEAM CODE.svg" alt="Team code" fill className="object-contain object-left" />
                        </div>
                      </div>
                      <input
                        value={teamCode}
                        onChange={(event) => setTeamCode(event.target.value)}
                        aria-label="Team code"
                        placeholder="e.g. TERM-AB12"
                        maxLength={20}
                        className="h-14 sm:h-20 w-full rounded-xl border border-pink-600 bg-transparent px-4 text-center text-base sm:text-xl uppercase tracking-[0.15em] text-white outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-300/20"
                      />
                    </div>
                    {error && <p role="alert" className="text-xs sm:text-sm text-pink-200 text-center">{error}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.2 }}
                    disabled={loading}
                    className="relative mt-3 sm:mt-6 flex h-12 sm:h-16 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-pink-400 font-bold shadow-[0_8px_24px_rgba(236,72,153,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-200 disabled:opacity-60"
                  >
                    <Image src="/teamcode/DONE.svg" alt="Done" width={64} height={17} />
                  </motion.button>
                </PanelFrame>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Illustration: Bottom on mobile, Left on desktop */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="order-2 relative z-10 -mt-[clamp(2.5rem,7vh,5rem)] lg:mt-0 flex flex-1 h-[clamp(15rem,46vh,30rem)] min-h-[220px] lg:h-full w-full shrink-0 items-end justify-center overflow-hidden lg:order-1 lg:w-auto lg:justify-center"
        >
          <TeamIllustration />
        </motion.section>
      </div>
    </section>
  );
}



