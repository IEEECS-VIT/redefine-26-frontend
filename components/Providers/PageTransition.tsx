"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="h-dvh w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}