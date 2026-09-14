"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import DynamicStringsBackground from "@/components/Background/DynamicStringsBackground";
import { DEFAULT_TRACKS, type Track } from "@/lib/teamup";

const INPUT_STYLE =
  "h-12 w-full rounded-xl border border-pink-600/90 bg-black/80 px-4 sm:px-5 text-sm sm:text-base text-white outline-none transition placeholder:text-white/45 focus:border-pink-300 focus:ring-2 focus:ring-pink-300/20";

function SectionHeaderLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-6 w-6 sm:h-7 sm:w-7 shrink-0">
        <Image src={icon} alt="" fill className="object-contain" />
      </div>
      <span className="font-extrabold uppercase tracking-wider text-white text-base sm:text-lg drop-shadow-[0_2px_8px_rgba(236,72,153,0.3)]">
        {label}
      </span>
    </div>
  );
}

export default function SubmitFlow() {
  const [tracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [trackId, setTrackId] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [additionalLinks, setAdditionalLinks] = useState<string[]>(["", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddLink = () => {
    if (additionalLinks.length < 6) {
      setAdditionalLinks((prev) => [...prev, ""]);
    }
  };

  const handleLinkChange = (index: number, value: string) => {
    setAdditionalLinks((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trackId) {
      setError("Please select a track before submitting.");
      return;
    }
    if (!figmaLink.trim()) {
      setError("Please enter your Figma link.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="relative isolate flex h-full w-full flex-col overflow-hidden bg-black text-white select-none">
      {/* Background strings */}
      <DynamicStringsBackground opacity={0.45} />

      <div className="relative z-10 flex h-full w-full max-w-[1650px] mx-auto flex-col items-center px-4 pt-3 pb-2 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-1 lg:gap-8 xl:gap-12 lg:pl-6 lg:pr-12 xl:pr-20 lg:py-4">
        {/* Submissions Form Panel (Right on Desktop) - Shifted to the right */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="order-1 relative z-20 flex min-h-0 w-full max-w-[36rem] h-full items-center justify-center py-1 sm:py-2 lg:order-2 lg:justify-end lg:ml-auto lg:translate-x-6 xl:translate-x-12 shrink-0"
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            className="relative flex h-full min-h-0 w-full flex-col overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-xl border border-pink-600/90 bg-black/95 px-5 py-[clamp(1rem,2vh,1.5rem)] sm:px-8 sm:rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_32px_rgba(236,72,153,0.2)] lg:bg-black lg:px-[clamp(1.5rem,3.5vw,2.5rem)] lg:py-[clamp(1rem,2.5vh,1.75rem)]"
          >
            <div className="flex flex-1 flex-col gap-4 sm:gap-5 justify-center">
              {/* Panel Header */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                  <Image src="/buildteam/image 24.svg" alt="" fill className="object-contain" />
                </div>
                <h2 className="text-center font-extrabold uppercase tracking-widest text-xl sm:text-2xl lg:text-3xl text-white drop-shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                  SUBMISSIONS
                </h2>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="rounded-full bg-pink-500/20 p-4 text-pink-400">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Submission Received!</h3>
                  <p className="text-sm text-white/70">Your project link and track details have been successfully recorded.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 rounded-xl border border-pink-600 bg-transparent px-6 py-2 text-sm text-white transition hover:bg-pink-500/20"
                  >
                    Edit Submission
                  </button>
                </div>
              ) : (
                <>
                  {/* Track Selection */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <SectionHeaderLabel icon="/buildteam/image 24.svg" label="TRACK" />
                    <div className="relative">
                      <select
                        value={trackId}
                        onChange={(e) => setTrackId(e.target.value)}
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
                        <Image src="/buildteam/Polygon 10.svg" alt="" width={14} height={10} />
                      </div>
                    </div>
                  </div>

                  {/* Figma Link */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <SectionHeaderLabel icon="/buildteam/image 24.svg" label="FIGMA LINK" />
                    <input
                      type="url"
                      value={figmaLink}
                      onChange={(e) => setFigmaLink(e.target.value)}
                      placeholder="Enter figma link"
                      className={INPUT_STYLE}
                    />
                  </div>

                  {/* Additional Links */}
                  <div className="space-y-2">
                    <SectionHeaderLabel icon="/buildteam/image 24.svg" label="ADDITIONAL LINKS" />
                    <div className="flex flex-col gap-2">
                      {additionalLinks.map((link, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={link}
                          onChange={(e) => handleLinkChange(idx, e.target.value)}
                          placeholder={idx === 0 ? "Enter registration number" : idx === 1 ? "Enter participant name" : "Enter additional link"}
                          className={INPUT_STYLE}
                        />
                      ))}
                    </div>

                    {additionalLinks.length < 6 && (
                      <button
                        type="button"
                        onClick={handleAddLink}
                        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-pink-500/80 bg-transparent py-2.5 text-xs sm:text-sm font-semibold text-pink-300 transition duration-200 hover:bg-pink-500/10 hover:border-pink-300"
                      >
                        <span>+</span> ADD LINKS
                      </button>
                    )}
                  </div>

                  {error && <p role="alert" className="text-xs sm:text-sm text-pink-300 text-center">{error}</p>}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.2 }}
                    disabled={loading}
                    className="relative mt-2 sm:mt-4 flex h-12 sm:h-14 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-pink-500 font-extrabold uppercase tracking-widest text-base sm:text-lg text-white shadow-[0_8px_24px_rgba(236,72,153,0.35)] transition duration-200 hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-200 disabled:opacity-60"
                  >
                    SUBMIT
                  </motion.button>
                </>
              )}
            </div>
          </form>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="order-2 relative z-10 flex flex-1 h-[clamp(16rem,50vh,34rem)] lg:h-full w-full shrink-0 items-end justify-center overflow-visible lg:order-1 lg:w-auto lg:justify-end lg:translate-x-28 xl:translate-x-40"
        >
          <div className="relative h-full w-[105%] max-w-[640px] lg:w-full lg:max-w-full aspect-[1440/1024] overflow-visible">
            <Image
              src="/submit.svg"
              alt="Submit Artwork"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain object-bottom scale-[1.2] sm:scale-[1.15] origin-bottom translate-x-[20%] lg:scale-[1.2] lg:object-bottom"
            />
          </div>
        </motion.section>
      </div>
    </section>
  );
}
