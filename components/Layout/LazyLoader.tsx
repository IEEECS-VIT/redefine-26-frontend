"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import SpinningLoader from "@/components/Providers/SpinningLoader";

interface LazyLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animate?: boolean;
  priority?: boolean;
}

export default function LazyLoader({
  children,
  fallback = <SpinningLoader />,
  threshold = 0,
  rootMargin = "200px",
  className = "",
  animate = true,
  priority = false,
}: LazyLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || isLoaded) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin, priority, isLoaded]);

  return (
    <div ref={ref} className={className}>
      {isLoaded ? (
        animate ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )
      ) : (
        fallback
      )}
    </div>
  );
}
