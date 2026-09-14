"use client";

import { motion } from "framer-motion";
import SpinningLoader from "./SpinningLoader";

export default function RouteLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505]"
      role="status"
      aria-label="Loading Redefine"
    >
      <SpinningLoader label="Redefine · 2026" />
    </motion.div>
  );
}