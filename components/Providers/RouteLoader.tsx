"use client";

import { motion } from "framer-motion";
import SpinningLoader from "./SpinningLoader";

export default function RouteLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100]"
    >
      <SpinningLoader label="Redefine · 2026" />
    </motion.div>
  );
}
