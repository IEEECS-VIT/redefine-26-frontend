"use client";

import Image from "@/components/Layout/Image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  DESKTOP_HOME_ARTWORK,
  MOBILE_HOME_ARTWORK,
  coverScaledLengthCss,
} from "@/lib/homeArtwork";
import LetterG from "./LetterG";

type Letter = {
  src?: string;
  component?: "G";
  alt: string;
  rotate?: number;
  y?: number;
  scale?: number;
};

type MenuItem = {
  id: string;
  href?: string;
  className: string;
  letters: Letter[];
};

type SideMenuProps = {
  isSignedIn: boolean;
};

const menu: MenuItem[] = [
  {
    id: "timeline",
    className: "left-[5%] top-[30%] md:left-[10%] md:top-[45%]",
    letters: [
      { src: "/redefine-2026/T.svg.webp", alt: "T", rotate: -6 },
      { src: "/redefine-2026/I.svg.webp", alt: "I", rotate: 3, y: -5 },
      { src: "/redefine-2026/M.svg.webp", alt: "M", rotate: -4, y: 2 },
      { src: "/redefine-2026/E.svg.webp", alt: "E", rotate: 5, y: -1 },
      { src: "/redefine-2026/L.svg.webp", alt: "L", rotate: -7, y: 3 },
      { src: "/redefine-2026/I.svg.webp", alt: "I", rotate: 4, y: -2 },
      { src: "/redefine-2026/N.svg.webp", alt: "N", rotate: -5, y: 1 },
      { src: "/redefine-2026/E.svg.webp", alt: "E", rotate: 2, y: -4 },
    ],
  },
  {
    id: "faq",
    className: "left-[calc(5%_+_var(--home-faq-inset))] top-[42%] md:left-[15%] md:top-[68%]",
    letters: [
      { src: "/redefine-2026/F.svg.webp", alt: "F", rotate: -6 },
      { src: "/redefine-2026/A.svg.webp", alt: "A", rotate: 5, y: -2 },
      { src: "/redefine-2026/Q.svg.webp", alt: "Q", rotate: -8 },
    ],
  },
  {
    id: "tracks",
    className: "right-[5%] top-[24%] md:right-[15%] md:top-[39%]",
    letters: [
      { src: "/redefine-2026/T.svg.webp", alt: "T", rotate: -5 },
      { src: "/redefine-2026/R.svg.webp", alt: "R", rotate: 4 },
      { src: "/redefine-2026/A.svg.webp", alt: "A", rotate: -3 },
      { src: "/redefine-2026/C.svg.webp", alt: "C", rotate: 3 },
      { src: "/redefine-2026/K.svg.webp", alt: "K", rotate: -7 },
      { src: "/redefine-2026/S.svg.webp", alt: "S", rotate: 5 },
    ],
  },
];

const signedOutItem: MenuItem = {
  id: "sign-in",
  href: "/signin",
  className: "right-[5%] top-[36%] md:right-[15%] md:top-[62%]",
  letters: [
    { src: "/redefine-2026/S.svg.webp", alt: "S", rotate: -5 },
    { src: "/redefine-2026/I.svg.webp", alt: "I", rotate: 4 },
    { component: "G", alt: "G", rotate: -4 },
    { src: "/redefine-2026/N.svg.webp", alt: "N", rotate: 5 },
    { src: "/redefine-2026/I.svg.webp", alt: "I", rotate: -6 },
    { src: "/redefine-2026/N.svg.webp", alt: "N", rotate: 7 },
  ],
};

const signedInItem: MenuItem = {
  id: "team",
  href: "/team",
  className: "right-[calc(5%_+_var(--home-team-inset))] top-[36%] md:right-[15%] md:top-[62%]",
  letters: [
    { src: "/redefine-2026/T.svg.webp", alt: "T", rotate: -5 },
    { src: "/redefine-2026/E.svg.webp", alt: "E", rotate: 4 },
    { src: "/redefine-2026/A.svg.webp", alt: "A", rotate: -4 },
    { src: "/redefine-2026/M.svg.webp", alt: "M", rotate: 5 },
  ],
};

export default function SideMenu({ isSignedIn }: SideMenuProps) {
  const items = [...menu, isSignedIn ? signedInItem : signedOutItem];
  const artworkScaleStyle = {
    "--home-letter-width": coverScaledLengthCss(20, MOBILE_HOME_ARTWORK),
    "--home-letter-height": coverScaledLengthCss(32, MOBILE_HOME_ARTWORK),
    "--home-word-gap": coverScaledLengthCss(1, MOBILE_HOME_ARTWORK),
    "--home-faq-inset": coverScaledLengthCss(52.5, MOBILE_HOME_ARTWORK),
    "--home-team-inset": coverScaledLengthCss(21, MOBILE_HOME_ARTWORK),
    "--home-desktop-letter-width": coverScaledLengthCss(40, DESKTOP_HOME_ARTWORK),
    "--home-desktop-letter-height": coverScaledLengthCss(56, DESKTOP_HOME_ARTWORK),
    "--home-desktop-word-gap": coverScaledLengthCss(2, DESKTOP_HOME_ARTWORK),
  } as CSSProperties;

  return (
    <nav
      className="pointer-events-none absolute left-1/2 top-0 z-40 h-[max(100dvh,calc(100vw*874/402))] w-[max(100vw,calc(100dvh*402/874))] -translate-x-1/2 md:top-1/2 md:h-[max(100dvh,calc(100vw*982/1512))] md:w-[max(100vw,calc(100dvh*1512/982))] md:-translate-y-1/2"
      data-home-menu-layout="artwork-aligned"
      data-home-menu-scale="artwork-cover"
      style={artworkScaleStyle}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href ?? `/${item.id}`}
          prefetch={true}
          aria-label={item.id === "sign-in" ? "Sign in" : item.id.replace("-", " ")}
          className={`pointer-events-auto absolute hover:z-50 flex ${item.className} cursor-pointer select-none`}
        >
          <motion.div
            className="flex items-end gap-[var(--home-word-gap)] md:gap-[var(--home-desktop-word-gap)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {item.letters.map((letter, i) => (
              <motion.div
                key={i}
                className="relative h-[var(--home-letter-height)] w-[var(--home-letter-width)] md:h-[var(--home-desktop-letter-height)] md:w-[var(--home-desktop-letter-width)]"
                style={{
                  rotate: letter.rotate ?? 0,
                  y: letter.y ?? 0,
                }}
                whileHover={{
                  y: (letter.y ?? 0) - 4,
                  rotate: (letter.rotate ?? 0) + ((letter.rotate ?? 0) >= 0 ? 2 : -2),
                }}
              >
                {letter.src ? (
                  <Image
                    src={letter.src}
                    alt={letter.alt}
                    fill
                    sizes="clamp(22px, 5vw, 40px)"
                    draggable={false}
                    className="object-contain select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]"
                  />
                ) : letter.component === "G" ? (
                  <LetterG className="relative h-full w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]" />
                ) : null}
              </motion.div>
            ))}
          </motion.div>
        </Link>
      ))}
    </nav>
  );
}
