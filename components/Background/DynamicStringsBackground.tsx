"use client";

import { motion } from "framer-motion";

const STRING_PATHS = [
  {
    id: "string-1",
    d: "M784.5 0C802.15 12.4221 819.8 24.8443 846.962 44.7618C874.125 64.6793 910.265 91.7157 939.388 119.892C968.512 148.069 989.523 176.567 1003.29 202.209C1017.06 227.85 1022.94 249.771 1027.23 278.601C1036.7 342.249 1038.32 384.489 1045.49 400.653C1069.73 455.299 1115.49 475.274 1150.66 490.763C1203.74 520.246 1239.47 554.191 1258.14 585.501C1263.26 600.559 1268.3 625.403 1273.5 651",
    strokeWidth: 2.5,
    floatDuration: 10,
    delay: 0,
  },
  {
    id: "string-2",
    d: "M1287.5 287.721C1245.83 285.143 1197.18 283.815 1146.03 286.393C1074.69 289.988 1052.49 317.562 1028.13 334.534C1010.69 346.68 1017.52 392.831 1025.71 434.996C1028.74 450.548 1041.13 475.989 1047.17 502.482C1059.14 555.006 1054.17 591.646 1044.62 614.984C1030.49 649.482 1003.93 680.156 972.041 706.755C953.135 722.527 923.846 739.8 892.164 756.186C860.482 772.571 826.055 786.75 787.483 806.299C748.91 825.849 707.235 850.34 679.424 868.434C636.986 896.045 618.614 917.151 605.82 932.746C582.951 964.629 559.094 998.533 549.938 1012.23C548.085 1015.5 547.179 1018.73 543.5 1024",
    strokeWidth: 2,
    floatDuration: 13,
    delay: 0.3,
  },
  {
    id: "string-3",
    d: "M1045.1 1065C1058.1 1028.93 1065.73 988.18 1059.01 953.725C1051.37 914.588 1031.02 886.291 1022.89 873.578C1011.67 856.048 993.57 849.476 968.066 833.946C961.613 830.016 956.121 827.988 936.141 816.472C916.162 804.956 881.744 784.232 862.4 772.155C839.49 757.853 830.052 745.431 819.198 729.892C812.126 719.768 807.204 696.311 802.046 663.256C798.572 640.988 795.259 617.064 786.328 588.549C770.411 537.725 740.943 518.501 728.729 506.917C721.878 500.42 695.492 486.898 661.009 469.645C639.864 459.065 625.239 452.307 612.756 446.357C593.986 437.412 574.785 415.611 562.489 394.921C551.919 377.134 543.235 357.325 523.997 320.918C515.916 305.625 498.942 286.344 474.774 262.514C450.606 238.684 418.34 211.798 398.759 195.988C379.179 180.177 373.264 176.257 347.361 164.715C321.458 153.173 275.746 134.13 248.433 123.199C221.121 112.268 213.592 110.028 196.269 107.193C152.199 99.9823 120.588 95.8553 113.54 92.4692C101.821 86.8391 81.5909 73.8752 52.233 48.4411C42.4633 38.2827 29.0187 23.1597 19.6727 13.1286C10.3268 3.09755 5.48675 -1.38333 0.500044 -6",
    strokeWidth: 2,
    floatDuration: 15,
    delay: 0.6,
  },
];

interface DynamicStringsBackgroundProps {
  className?: string;
  opacity?: number;
}

export default function DynamicStringsBackground({
  className = "",
  opacity = 0.5,
}: DynamicStringsBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1274 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Soft Pink Glow Filter */}
          <filter id="string-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dynamic Gradient for Stroke */}
          <linearGradient id="stringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAC2CF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F48AB0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#BE265D" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {STRING_PATHS.map((item) => (
          <motion.g
            key={item.id}
            animate={{
              y: [0, -12, 6, -8, 0],
              x: [0, 8, -6, 4, 0],
              rotate: [0, 0.4, -0.4, 0],
            }}
            transition={{
              duration: item.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {/* Soft Glow Layer */}
            <motion.path
              d={item.d}
              stroke="#FAC2CF"
              strokeWidth={item.strokeWidth * 2.5}
              strokeLinecap="round"
              filter="url(#string-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.2, 0.45, 0.3],
              }}
              transition={{
                pathLength: { duration: 2.2, ease: "easeOut", delay: item.delay },
                opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Sharp Main Path */}
            <motion.path
              d={item.d}
              stroke="url(#stringGradient)"
              strokeWidth={item.strokeWidth}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.6, 0.95, 0.7],
              }}
              transition={{
                pathLength: { duration: 2.5, ease: "easeOut", delay: item.delay },
                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
