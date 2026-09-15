"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    className: "left-[5%] top-[29%] md:left-[10%] md:top-[42%]",
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
    className: "left-[calc(5%_+_52.5px)] sm:left-[calc(5%_+_62.5px)] top-[43%] md:left-[15%] md:top-auto md:bottom-[25%]",
    letters: [
      { src: "/redefine-2026/F.svg.webp", alt: "F", rotate: -6 },
      { src: "/redefine-2026/A.svg.webp", alt: "A", rotate: 5, y: -2 },
      { src: "/redefine-2026/Q.svg.webp", alt: "Q", rotate: -8 },
    ],
  },
  {
    id: "tracks",
    className: "right-[5%] top-[34%] md:right-[15%] md:top-[37%]",
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
  className: "right-[5%] top-[48%] md:right-[15%] md:top-auto md:bottom-[34%]",
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
  className: "right-[calc(5%_+_21px)] sm:right-[calc(5%_+_25px)] top-[48%] md:right-[15%] md:top-auto md:bottom-[34%]",
  letters: [
    { src: "/redefine-2026/T.svg.webp", alt: "T", rotate: -5 },
    { src: "/redefine-2026/E.svg.webp", alt: "E", rotate: 4 },
    { src: "/redefine-2026/A.svg.webp", alt: "A", rotate: -4 },
    { src: "/redefine-2026/M.svg.webp", alt: "M", rotate: 5 },
  ],
};

export default function SideMenu({ isSignedIn }: SideMenuProps) {
  const items = [...menu, isSignedIn ? signedInItem : signedOutItem];

  return (
    <nav className="absolute inset-0 z-40 pointer-events-none" data-home-menu-layout="responsive-sides">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href ?? `/${item.id}`}
          prefetch={true}
          aria-label={item.id === "sign-in" ? "Sign in" : item.id.replace("-", " ")}
          className={`pointer-events-auto absolute hover:z-50 flex ${item.className} cursor-pointer select-none`}
        >
          <motion.div
            className="flex items-end gap-[1px] lg:gap-[2px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {item.letters.map((letter, i) => (
              <motion.div
                key={i}
                className="relative h-8 w-[20px] sm:h-9 sm:w-6 md:h-10 md:w-7 lg:h-14 lg:w-10"
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
