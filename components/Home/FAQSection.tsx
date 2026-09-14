"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import DynamicStringsBackground from "@/components/Background/DynamicStringsBackground";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "What is Redefine?",
    answer:
      "Redefine is a designathon organized by IEEE CS VIT where participants solve real-world problems through innovative design and technology.",
  },
  {
    question: "How many members per team?",
    answer:
      "Teams can have up to 4 members. You can build your own team or join an existing one using a team code.",
  },
  {
    question: "What are the tracks?",
    answer:
      "There are 6 tracks: E-Commerce, Smart Education, Healthcare Companion, Travel & Exploration, Finance, and Social Impact Platform.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No, participation is completely free. Register through the button on the top right.",
  },
  {
    question: "When does the event take place?",
    answer:
      "The event spans multiple phases. Check the Timeline section for exact dates.",
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
    <div className="overflow-hidden rounded-xl border border-pink-600/70 bg-black/30 lg:bg-black/85 backdrop-blur-md lg:backdrop-blur-sm transition duration-200 hover:border-pink-400 shadow-[0_4px_20px_rgba(236,72,153,0.15)]">
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
    <section className="relative isolate flex h-full w-full flex-col overflow-hidden bg-black text-white select-none">
      {/* Dynamic Background Strings */}
      <DynamicStringsBackground opacity={0.4} />

      {/* Mobile Background Artwork (faqart-mobile.svg dynamically centered behind questions for < lg screens) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none lg:hidden">
        <div className="relative h-full w-full opacity-80 sm:opacity-90">
          <Image
            src="/faqart-mobile.svg"
            alt="FAQ Question Mark Background"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-center px-4 py-4 sm:px-8 lg:px-16 lg:py-6">
        <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-8 lg:flex-row lg:gap-10">
          {/* Desktop Left Side Artwork: faqart.svg - exact original desktop settings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:flex w-full flex-1 items-center justify-center lg:w-[48%] lg:justify-end min-h-[310px] lg:min-h-0 h-[54vh] sm:h-[64vh] lg:h-[92vh] max-h-[900px] shrink-0 lg:translate-x-20"
          >
            <div className="relative h-full w-full aspect-[1440/1024] overflow-visible">
              <Image
                src="/faqart.svg"
                alt="FAQ Question Mark Artwork"
                fill
                priority
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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




