"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { initiateGoogleSignIn, getStoredUser, type StudentType } from "@/lib/auth";
import WigglyCurvesBackground from "./WigglyCurvesBackground";

export default function RegisterPortal() {
  const router = useRouter();
  const [loadingType, setLoadingType] = useState<StudentType | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async (type: StudentType) => {
    setErrorMsg("");
    setLoadingType(type);
    try {
      await initiateGoogleSignIn(type);
      const user = getStoredUser();
      if (user) {
        router.push("/team-up");
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to initiate sign in. Please try again."
      );
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center px-4 py-8 select-none overflow-hidden">
      {/* Random Wiggly Curve Lines Background */}
      <WigglyCurvesBackground />

      {/* Participate Collage Background */}
      <ParticipateBackground />
      
      {/* Background ambient decorative glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] sm:h-[45vw] sm:w-[45vw] max-h-[500px] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/[0.08] blur-[80px] sm:blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-6 w-full max-w-3xl translate-y-[6vh] sm:translate-y-[20vh]">
        {/* Two Buttons: External & Internal */}
        <div className="flex flex-col sm:flex-row items-center justify-center -space-y-4 sm:space-y-0 sm:gap-6 w-full">
          <RegisterSVGButton
            label="EXTERNAL"
            onClick={() => handleSignIn("external")}
            disabled={loadingType !== null}
            isLoading={loadingType === "external"}
          />
          <RegisterSVGButton
            label="INTERNAL"
            onClick={() => handleSignIn("internal")}
            disabled={loadingType !== null}
            isLoading={loadingType === "internal"}
          />
        </div>

        {errorMsg && (
          <p role="alert" className="text-center font-sans text-sm text-pink-300">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
}

function RegisterSVGButton({
  label,
  onClick,
  disabled,
  isLoading,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}) {
  const filterGlowId = `filter_glow_${label}`;
  const filterShadowId = `filter_shadow_${label}`;
  
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex cursor-pointer select-none disabled:opacity-50 transition-all duration-300 hover:drop-shadow-[0_0_18px_rgba(222,82,126,0.4)]"
      aria-label={`${label} Google Sign-In`}
    >
      <div className="relative w-[240px] sm:w-[320px] md:w-[340px]">
        <svg width="100%" viewBox="0 0 253 121" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter={`url(#${filterGlowId})`}>
            <g filter={`url(#${filterShadowId})`}>
              <rect x="30" y="26" width="193" height="61" rx="19" className="fill-black group-hover:fill-[#DE527E] transition-colors duration-300"/>
            </g>
            <text 
              x="126.5" 
              y="67" 
              textAnchor="middle" 
              className="fill-[#F7F1F1] group-hover:fill-black transition-colors duration-300" 
              fontSize="37.62" 
              letterSpacing="0"
              style={{ fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif' }}
            >
              {isLoading ? "WAIT..." : label}
            </text>
          </g>
          <defs>
            <filter id={filterGlowId} x="0" y="0" width="253" height="121" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="15"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.759081 0 0 0 0 0.811837 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <filter id={filterShadowId} x="30" y="26" width="199" height="67" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5" dy="5"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.980392 0 0 0 0 0.760784 0 0 0 0 0.811765 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
          </defs>
        </svg>
      </div>
    </motion.button>
  );
}

function ParticipateBackground() {
  const letters = [
    { char: "P", left: "0em", top: "0.27em", width: "0.625em", rot: "-rotate-[3deg]" },
    { char: "A", left: "0.67em", top: "0em", width: "0.708em", rot: "rotate-[2deg]" },
    { char: "R", left: "1.42em", top: "0.31em", width: "0.666em", rot: "-rotate-[1deg]" },
    { char: "T", left: "2.13em", top: "0.48em", width: "0.583em", rot: "rotate-[3deg]" },
    { char: "I", left: "2.75em", top: "0.10em", width: "0.333em", rot: "-rotate-[2deg]" },
    { char: "C", left: "3.13em", top: "0.38em", width: "0.666em", rot: "rotate-[1deg]" },
    { char: "I", left: "3.83em", top: "0.04em", width: "0.333em", rot: "-rotate-[4deg]" },
    { char: "P", left: "4.21em", top: "0.25em", width: "0.625em", rot: "rotate-[2deg]" },
    { char: "A", left: "4.88em", top: "0.42em", width: "0.708em", rot: "-rotate-[2deg]" },
    { char: "T", left: "5.63em", top: "0.15em", width: "0.583em", rot: "rotate-[4deg]" },
    { char: "E", left: "6.25em", top: "0.33em", width: "0.604em", rot: "-rotate-[1deg]" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
      <div 
        className="relative font-zilla text-white -translate-y-[13vh] sm:-translate-y-[15vh]"
        style={{ 
          fontFamily: "'Zilla Slab Highlight', 'Zilla Slab', serif",
          fontSize: "clamp(34px, 11.5vw, 170px)", 
          width: "7.08em", 
          height: "1.69em" 
        }}
      >
        {letters.map((item, idx) => (
          <span
            key={idx}
            className={`absolute flex items-center justify-center bg-black text-white font-normal ${item.rot}`}
            style={{ 
              fontFamily: "'Zilla Slab Highlight', 'Zilla Slab', serif",
              left: item.left, 
              top: item.top,
              width: item.width,
              height: "1.208em", // 58px / 48px
              lineHeight: "1.208em",
            }}
          >
            {item.char}
          </span>
        ))}
      </div>
    </div>
  );
}
