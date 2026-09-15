"use client";

import { useState } from "react";
import Image from "@/components/Layout/Image";
import { motion, AnimatePresence } from "framer-motion";
import DynamicStringsBackground from "@/components/Background/DynamicStringsBackground";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Is there a specific application or software to be used for the design?",
    answer:
      "While we recommend and appreciate the use of Figma, there are no restrictions on the application you choose. What matters most is your idea and how you bring it to life. Happy designing!",
  },
  {
    question: "Are we allowed to use AI for the Designathon?",
    answer:
      "Yes, AI tools are allowed, but we encourage participants to use them judiciously as a supporting tool, rather than a substitute for creativity. Use the 24 hours to explore your ideas, experiment, and let your own creative process take the lead.",
  },
  {
    question: "Do we have to strictly follow the subtracks provided within our chosen track?",
    answer:
      "Not at all! The subtracks are provided as references and sources of inspiration for the creative direction. You're free to interpret your chosen track and take your design in your own direction.",
  },
  {
    question: "What are the judging criteria?",
    answer:
      "Your design will be evaluated on creativity, visual execution, user experience, and relevance to the chosen track. We also want to understand the thought process behind your design and how effectively it considers the user's perspective.",
  },
  {
    question: "Is there a specific type of website we need to design?",
    answer:
      "The choice is entirely yours! While the visual direction should align with your selected track, you're free to design any type of website, from e-commerce and social platforms to something completely original. The idea is yours to explore.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-pink-600/70 bg-black/30 lg:bg-black/85 backdrop-blur-md lg:backdrop-blur-sm transition duration-200 hover:border-pink-400">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4.5 text-left text-base font-semibold text-white transition hover:bg-pink-500/10 sm:px-7 sm:py-5 sm:text-lg md:text-xl lg:text-2xl"
      >
        <span>{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-5 shrink-0 text-2xl text-pink-400 sm:text-3xl lg:text-4xl"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-sm text-white/75 sm:px-7 sm:pb-6 sm:text-base md:text-lg leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative isolate flex h-full w-full flex-col overflow-x-hidden overflow-y-auto bg-black text-white select-none">
      {/* Dynamic Background Strings */}
      <DynamicStringsBackground opacity={0.4} />

      {/* Mobile Background Artwork dynamically centered behind questions for < lg screens */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none lg:hidden">
        <div className="relative h-full w-full opacity-80 sm:opacity-90">
          <Image
            src="/faqart-mobile.svg.webp"
            alt="FAQ Question Mark Background"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-contain object-center scale-150"
          />
        </div>
      </div>

      <div className="relative z-10 flex min-h-full w-full flex-col px-4 py-4 sm:px-8 lg:px-16 lg:py-6">
        <div className="mx-auto my-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 lg:flex-row lg:gap-10">
          {/* Desktop Left Side Artwork with the original desktop settings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:flex w-full flex-1 items-center justify-center lg:w-[48%] lg:justify-end min-h-[310px] lg:min-h-0 h-[54vh] sm:h-[64vh] lg:h-[92vh] max-h-[900px] shrink-0 lg:translate-x-20"
          >
            <div className="relative h-full w-full aspect-[1440/1024] overflow-visible">
              <Image
                src="/faqart.svg.webp"
                alt="FAQ Question Mark Artwork"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain object-center lg:object-right scale-[1.6] sm:scale-[1.62] lg:scale-[1.67] origin-center lg:origin-right translate-x-[25%] lg:translate-x-[45%]"
              />
            </div>
          </motion.div>

          {/* Right Side FAQ Accordion List - shifted slightly left */}
          <div className="relative flex w-full flex-col justify-center -translate-x-1.5 sm:-translate-x-2 lg:translate-x-0 xl:translate-x-[3%] lg:w-[52%] xl:w-[48%] max-w-3xl lg:max-w-none">
            <div className="flex flex-col gap-3.5 sm:gap-4.5">
              {FAQ_DATA.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                >
                  <AccordionItem
                    item={item}
                    isOpen={openIdx === idx}
                    onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


