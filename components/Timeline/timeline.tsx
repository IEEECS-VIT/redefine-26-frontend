"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TimelineThreads from "./TimelineThreads";

type Phase = {
  id: number;
  label: string;
  asset: string;
  date: string;
};

type DecorativeNote = {
  id: string;
  top: string;
  left: string;
  width: string;
  height: string;
  rotate: number;
  color: string;
  lines: number;
  pin: "left" | "center" | "right";
};

const phases: Phase[] = [
  { id: 1, label: "Phase 01", asset: "/timeline/Phase 01.svg", date: "XX Aug 2026 - YY Aug 2026" },
  { id: 2, label: "Phase 02", asset: "/timeline/Phase 02.svg", date: "XX Aug 2026 - YY Aug 2026" },
  { id: 3, label: "Phase 03", asset: "/timeline/Phase 03.svg", date: "XX Aug 2026 - YY Aug 2026" },
  { id: 4, label: "Phase 04", asset: "/timeline/Phase 04.svg", date: "XX Aug 2026 - YY Aug 2026" },
  { id: 5, label: "Phase 05", asset: "/timeline/Phase 05.svg", date: "XX Aug 2026 - YY Aug 2026" },
];

const outerNotes: DecorativeNote[] = [
  { id: "top-gap-left", top: "14%", left: "35.5%", width: "7.5%", height: "17%", rotate: -2, color: "#E57E96", lines: 5, pin: "center" },
  { id: "top-gap-right", top: "15%", left: "81.5%", width: "8%", height: "16%", rotate: 3, color: "#D04C6B", lines: 4, pin: "center" },
  { id: "bottom-gap-right", top: "76%", left: "68.5%", width: "8%", height: "17%", rotate: -3, color: "#F5B7C7", lines: 5, pin: "right" },
  { id: "west-lower", top: "61%", left: "0.5%", width: "7%", height: "10%", rotate: -4, color: "#F5B7C7", lines: 3, pin: "right" },
  { id: "east-upper", top: "38%", left: "92.5%", width: "7%", height: "11%", rotate: 4, color: "#F5B7C7", lines: 4, pin: "left" },
  { id: "west-bottom", top: "89%", left: "1%", width: "8%", height: "9%", rotate: 3, color: "#E57E96", lines: 3, pin: "center" },
  { id: "east-bottom", top: "90%", left: "92%", width: "7%", height: "9%", rotate: -3, color: "#F5B7C7", lines: 3, pin: "center" },
];

function Pin({ className = "", anchor }: { className?: string; anchor?: number }) {
  return (
    <div
      data-timeline-anchor={anchor}
      className={`w-3 h-3 md:w-3.5 md:h-3.5 bg-black rounded-full shadow-sm shrink-0 z-10 ${className}`}
    />
  );
}

function NotebookLines({ count = 7, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex flex-col justify-between w-full h-full py-3.5 px-3 pointer-events-none opacity-50 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-[1.5px] bg-black/70" />
      ))}
    </div>
  );
}

function OuterNote({ note }: { note: DecorativeNote }) {
  const pinPosition = note.pin === "left" ? "left-3" : note.pin === "right" ? "right-3" : "left-1/2 -translate-x-1/2";

  return (
    <div
      data-timeline-decor-note={note.id}
      className="absolute overflow-hidden rounded-sm shadow-md"
      style={{
        top: note.top,
        left: note.left,
        width: note.width,
        height: note.height,
        transform: `rotate(${note.rotate}deg)`,
        backgroundColor: note.color,
        zIndex: 5,
      }}
    >
      <Pin className={`absolute top-2 ${pinPosition}`} />
      <NotebookLines count={note.lines} />
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="relative isolate flex h-full w-full items-center justify-center overflow-hidden bg-black text-white">

      {/* Desktop Collage Container (lg and up) */}
      <div
        data-timeline-layout="desktop"
        data-timeline-stage="viewport"
        data-canvas-ratio="1440/1024"
        className="relative hidden select-none overflow-hidden min-[900px]:block"
        style={{ width: "100vw", height: "100dvh" }}
      >
        
        {/* Center TIMELINE Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            data-timeline-title-size="compact"
            data-timeline-title-position="lowered"
            className="relative aspect-[565/109] w-[39vw] max-w-[500px] translate-y-[clamp(1rem,3vh,2rem)]"
          >
            <Image
              src="/timeline/TIMELINE.svg"
              alt="TIMELINE"
              fill
              priority
              className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            />
          </div>
        </div>

        {/* Extra outer notes extend the collage into the open edge space. */}
        {outerNotes.map((note) => (
          <OuterNote key={note.id} note={note} />
        ))}

        {/* --- TOP ROW CARDS --- */}
        {/* Deco Top Left Far Backer */}
        <div
          className="absolute bg-[#E57E96] rounded-sm shadow-md"
          style={{ top: '13%', left: '4%', width: '16.5%', height: '13%', transform: 'rotate(-6deg)', zIndex: 2 }}
        >
          <Pin className="absolute top-2 left-1/2 -translate-x-1/2" />
        </div>

        {/* Deco Top Left Lined */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '15%', left: '14%', width: '13.5%', height: '15%', transform: 'rotate(3deg)', zIndex: 5 }}
        >
          <Pin className="absolute top-2 right-3" />
          <NotebookLines count={5} />
        </div>

        {/* PHASE 05 CARD (Upper Left) */}
        <motion.div
          whileHover={{ scale: 1.04, zIndex: 30 }}
          className="absolute bg-[#F9CDD7] rounded-sm shadow-lg p-4 flex flex-col items-center justify-center"
          style={{ top: '21%', left: '1.5%', width: '15%', height: '38%', transform: 'rotate(-4deg)', zIndex: 15 }}
        >
          <Pin anchor={5} className="absolute top-3.5 left-1/2 -translate-x-1/2" />
          <div className="relative w-full h-10 mt-2">
            <Image src="/timeline/Phase 05.svg" alt="Phase 05" fill className="object-contain" />
          </div>
          <p className="text-[11px] xl:text-xs font-semibold text-black mt-2 text-center whitespace-nowrap">
            XX Aug 2026- YY Aug 2026
          </p>
        </motion.div>

        {/* Deco Top Center Lined (Behind Phase 01) */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '13%', left: '26.8%', width: '11.5%', height: '30%', transform: 'rotate(4deg)', zIndex: 4 }}
        >
          <Pin className="absolute top-2 right-3" />
          <NotebookLines count={10} />
        </div>

        {/* Deco Top Center Backer */}
        <div
          className="absolute bg-[#E57E96] rounded-sm shadow-md"
          style={{ top: '16.5%', left: '24%', width: '3.5%', height: '11%', transform: 'rotate(-2deg)', zIndex: 3 }}
        >
          <Pin className="absolute top-1.5 left-1/2 -translate-x-1/2" />
        </div>

        {/* PHASE 01 CARD (Top Center) */}
        <motion.div
          whileHover={{ scale: 1.04, zIndex: 30 }}
          className="absolute bg-[#F9CDD7] rounded-sm shadow-lg p-4 flex flex-col items-center justify-center"
          style={{ top: '15%', left: '40.5%', width: '15.5%', height: '19%', transform: 'rotate(0.5deg)', zIndex: 15 }}
        >
          <Pin anchor={1} className="absolute top-2.5 left-1/2 -translate-x-1/2" />
          <div className="relative w-full h-8 mt-1">
            <Image src="/timeline/Phase 01.svg" alt="Phase 01" fill className="object-contain" />
          </div>
          <p className="text-[11px] xl:text-xs font-semibold text-black mt-1.5 text-center whitespace-nowrap">
            XX Aug 2026- YY Aug 2026
          </p>
        </motion.div>

        {/* Deco Top Center-Right Backer */}
        <div
          className="absolute bg-[#E57E96] rounded-sm shadow-md"
          style={{ top: '12%', left: '54.2%', width: '7%', height: '21%', transform: 'rotate(5deg)', zIndex: 3 }}
        >
          <Pin className="absolute top-2 left-1/2 -translate-x-1/2" />
        </div>

        {/* Deco Top Right Lined */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '14%', left: '59.2%', width: '19%', height: '23%', transform: 'rotate(-2deg)', zIndex: 6 }}
        >
          <Pin className="absolute top-2.5 left-1/2 -translate-x-1/2" />
          <NotebookLines count={7} />
        </div>

        {/* PHASE 02 CARD (Upper Right) */}
        <motion.div
          whileHover={{ scale: 1.04, zIndex: 30 }}
          className="absolute bg-[#F9CDD7] rounded-sm shadow-lg p-4 flex flex-col items-center justify-center"
          style={{ top: '25%', left: '75%', width: '17%', height: '20%', transform: 'rotate(-3deg)', zIndex: 15 }}
        >
          <Pin anchor={2} className="absolute top-2.5 left-1/2 -translate-x-1/2" />
          <div className="relative w-full h-8 mt-1">
            <Image src="/timeline/Phase 02.svg" alt="Phase 02" fill className="object-contain" />
          </div>
          <p className="text-[11px] xl:text-xs font-semibold text-black mt-1.5 text-center whitespace-nowrap">
            XX Aug 2026- YY Aug 2026
          </p>
        </motion.div>

        {/* Deco Top Far Right Maroon */}
        <div
          className="absolute bg-[#B23354] rounded-sm shadow-md"
          style={{ top: '12%', left: '85.2%', width: '11%', height: '26%', transform: 'rotate(4deg)', zIndex: 2 }}
        >
          <Pin className="absolute top-2 left-1/2 -translate-x-1/2" />
        </div>

        {/* Deco Top Far Right Lined */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '14.5%', left: '87.5%', width: '9%', height: '18%', transform: 'rotate(-3deg)', zIndex: 4 }}
        >
          <Pin className="absolute top-2 left-1/2 -translate-x-1/2" />
          <NotebookLines count={6} />
        </div>

        {/* --- RIGHT SIDE CARDS --- */}
        {/* Deco Mid Right Dark Red */}
        <div
          className="absolute bg-[#A52B4B] rounded-sm shadow-md"
          style={{ top: '36%', left: '84.6%', width: '14.5%', height: '19%', transform: 'rotate(-5deg)', zIndex: 3 }}
        >
          <Pin className="absolute top-2 left-3" />
        </div>

        {/* Deco Mid Right Lined */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '50%', left: '87.1%', width: '12%', height: '22%', transform: 'rotate(2deg)', zIndex: 5 }}
        >
          <Pin className="absolute top-2 left-3" />
          <NotebookLines count={7} />
        </div>

        {/* PHASE 03 CARD (Bottom Right) */}
        <motion.div
          whileHover={{ scale: 1.04, zIndex: 30 }}
          className="absolute bg-[#F9CDD7] rounded-sm shadow-lg p-4 flex flex-col items-center justify-center"
          style={{ top: '70.5%', left: '75.5%', width: '19%', height: '23%', transform: 'rotate(2deg)', zIndex: 15 }}
        >
          <Pin anchor={3} className="absolute top-2.5 left-1/2 -translate-x-1/2" />
          <div className="relative w-full h-9 mt-1">
            <Image src="/timeline/Phase 03.svg" alt="Phase 03" fill className="object-contain" />
          </div>
          <p className="text-[11px] xl:text-xs font-semibold text-black mt-2 text-center whitespace-nowrap">
            XX Aug 2026- YY Aug 2026
          </p>
        </motion.div>

        {/* Deco Far Bottom-Right Maroon */}
        <div
          className="absolute bg-[#8E213D] rounded-sm shadow-md"
          style={{ top: '64.5%', left: '84.8%', width: '14.5%', height: '19%', transform: 'rotate(-4deg)', zIndex: 2 }}
        />

        {/* --- BOTTOM ROW CARDS --- */}
        {/* Deco Bottom Right Maroon */}
        <div
          className="absolute bg-[#B23354] rounded-sm shadow-md"
          style={{ top: '86.5%', left: '72.8%', width: '10%', height: '14%', transform: 'rotate(3deg)', zIndex: 3 }}
        >
          <Pin className="absolute top-2 left-1/2 -translate-x-1/2" />
        </div>

        {/* Deco Bottom Right Mini */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md"
          style={{ top: '92.5%', left: '69.5%', width: '4%', height: '7.5%', transform: 'rotate(-2deg)', zIndex: 8 }}
        >
          <Pin className="absolute top-1 left-1/2 -translate-x-1/2" />
        </div>

        {/* Deco Bottom Center-Right Lined */}
        <div
          data-timeline-bottom-palette="varied"
          className="absolute overflow-hidden rounded-sm bg-[#E99AB0] shadow-md"
          style={{ top: '70.5%', left: '49.5%', width: '21.5%', height: '31%', transform: 'rotate(1deg)', zIndex: 6 }}
        >
          <Pin className="absolute top-2.5 left-1/2 -translate-x-1/2" />
          <NotebookLines count={9} />
        </div>

        {/* Deco Bottom Center Maroon Backer */}
        <div
          className="absolute bg-[#8E213D] rounded-sm shadow-md"
          style={{ top: '66%', left: '58.5%', width: '9.8%', height: '8.5%', transform: 'rotate(3deg)', zIndex: 2 }}
        >
          <Pin className="absolute top-1.5 left-1/2 -translate-x-1/2" />
        </div>

        {/* Deco Bottom Center Pink Vertical */}
        <div
          className="absolute bg-[#E57E96] rounded-sm shadow-md"
          style={{ top: '76.5%', left: '36.5%', width: '10%', height: '26%', transform: 'rotate(-1deg)', zIndex: 3 }}
        />

        {/* PHASE 04 CARD (Lower Left) */}
        <motion.div
          whileHover={{ scale: 1.04, zIndex: 30 }}
          className="absolute bg-[#F9CDD7] rounded-sm shadow-lg p-5 flex flex-col items-center justify-center"
          style={{ top: '68.5%', left: '11.5%', width: '23.5%', height: '26%', transform: 'rotate(-3deg)', zIndex: 15 }}
        >
          <Pin anchor={4} className="absolute top-3 right-6" />
          <div className="relative w-full h-10 mt-1">
            <Image src="/timeline/Phase 04.svg" alt="Phase 04" fill className="object-contain" />
          </div>
          <p className="text-xs xl:text-sm font-semibold text-black mt-2 text-center whitespace-nowrap">
            XX Aug 2026- YY Aug 2026
          </p>
        </motion.div>

        {/* Deco Bottom Center-Left Pink Square */}
        <div
          className="absolute bg-[#E57E96] rounded-sm shadow-md"
          style={{ top: '76%', left: '34.5%', width: '15.5%', height: '18%', transform: 'rotate(4deg)', zIndex: 2 }}
        >
          <Pin className="absolute top-2 right-3" />
        </div>

        {/* Deco Bottom Center-Left Lined */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '68.5%', left: '34.5%', width: '9.2%', height: '9%', transform: 'rotate(-2deg)', zIndex: 5 }}
        >
          <Pin className="absolute top-1.5 left-1/2 -translate-x-1/2" />
          <NotebookLines count={3} />
        </div>

        {/* Deco Bottom Far-Left Maroon */}
        <div
          className="absolute bg-[#B23354] rounded-sm shadow-md"
          style={{ top: '75.5%', left: '7.2%', width: '9%', height: '11%', transform: 'rotate(3deg)', zIndex: 3 }}
        >
          <Pin className="absolute top-1.5 left-2" />
        </div>

        {/* Deco Bottom-Left Dark Red */}
        <div
          className="absolute bg-[#8E213D] rounded-sm shadow-md"
          style={{ top: '85.5%', left: '1.8%', width: '10.5%', height: '11%', transform: 'rotate(-2deg)', zIndex: 2 }}
        >
          <Pin className="absolute top-1.5 left-1/2 -translate-x-1/2" />
        </div>

        {/* Deco Bottom-Left Lined Mini */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '80.5%', left: '2.5%', width: '5.5%', height: '7%', transform: 'rotate(5deg)', zIndex: 6 }}
        >
          <Pin className="absolute top-1 left-1/2 -translate-x-1/2" />
          <NotebookLines count={2} />
        </div>

        {/* Deco Bottom Sticking Lined */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '88%', left: '17.2%', width: '10.5%', height: '12%', transform: 'rotate(0deg)', zIndex: 2 }}
        >
          <NotebookLines count={4} />
        </div>

        {/* --- LEFT SIDE CARDS --- */}
        {/* Deco Mid Left Pink */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md"
          style={{ top: '51.5%', left: '4.5%', width: '14.7%', height: '16.5%', transform: 'rotate(-2deg)', zIndex: 5 }}
        >
          <Pin className="absolute top-2 right-3" />
        </div>

        {/* Deco Lower Left Lined Backer */}
        <div
          className="absolute bg-[#F5B7C7] rounded-sm shadow-md overflow-hidden"
          style={{ top: '63.5%', left: '2.5%', width: '12%', height: '10.5%', transform: 'rotate(3deg)', zIndex: 2 }}
        >
          <NotebookLines count={3} />
        </div>

      </div>

      {/* Mobile / Tablet collage (< lg) */}
      <div
        data-timeline-layout="mobile"
        data-canvas-ratio="402/874"
        className="relative overflow-hidden min-[900px]:hidden"
        style={{
          width: "min(100vw, calc(100dvh * 0.459954))",
          height: "min(100dvh, calc(100vw / 0.459954))",
        }}
      >
        <TimelineThreads />

        <div className="absolute inset-0 z-10">
          {phases.map((phase, idx) => (
            <div
              key={phase.id}
              data-mobile-phase-card="expanded"
              className="absolute left-1/2 flex h-[10.5%] w-[48%] -translate-x-1/2 flex-col items-center justify-center rounded-sm shadow-xl"
              style={{
                top: `${[18, 33, 48, 63, 78][idx]}%`,
                rotate: `${[-4, 3, -3, 2, -2][idx]}deg`,
                backgroundColor: ["#fac2cf", "#fac2cf", "#df6989", "#d04c6b", "#c1325f"][idx],
              }}
            >
              <Pin anchor={idx + 1} className="absolute left-1/2 top-1 -translate-x-1/2 scale-75" />
              <div className="relative h-[42%] w-[78%]">
                <Image src={phase.asset} alt={phase.label} fill className="object-contain" />
              </div>
              <p className="mt-[2%] whitespace-nowrap text-center text-[clamp(5px,1.55vw,8px)] font-semibold text-black">
                {phase.date}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

