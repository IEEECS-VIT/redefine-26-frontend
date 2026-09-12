"use client";

import { motion } from "framer-motion";

/**
 * Aesthetic wiggly curve lines for the Register page background,
 * drawing inspiration from the brand's iconic vector curves and pink accents.
 */
export default function WigglyCurvesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* 1. Top-Left brand curve (Vector 31 inspired) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.35, 0.55, 0.35],
          y: [0, -12, 0],
          rotate: [0, 1.5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-12 -top-16 w-[260px] sm:w-[380px] md:w-[480px] lg:w-[560px]"
      >
        <svg
          viewBox="0 0 364 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_12px_rgba(250,194,207,0.35)]"
        >
          <path
            d="M362.571 0.5C349.503 11.0793 336.434 21.6585 316.322 38.6212C296.21 55.5838 269.451 78.6093 247.887 102.606C226.323 126.603 210.765 150.873 200.573 172.71C190.38 194.548 186.024 213.217 182.846 237.77C175.831 291.975 174.634 327.948 169.325 341.714C151.379 388.253 117.494 405.265 91.4516 418.457C52.1517 443.566 25.6941 472.475 11.8713 499.14C8.0809 511.963 4.34702 533.122 0.5 554.922"
            stroke="#FAC2CF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 2. Top-Right sweeping ribbon curve (Vector 33 inspired) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.25, 0.45, 0.25],
          y: [0, 14, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -right-24 -top-20 w-[420px] sm:w-[580px] md:w-[740px] lg:w-[860px]"
      >
        <svg
          viewBox="0 0 1062 1072"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_15px_rgba(222,82,126,0.3)]"
        >
          <path
            d="M16.9011 1071.5C3.89663 1035.43 -3.73009 994.68 2.99217 960.225C10.6278 921.088 30.9812 892.791 39.1131 880.078C50.3265 862.548 68.4303 855.976 93.9342 840.446C100.387 836.516 105.879 834.488 125.859 822.972C145.838 811.456 180.256 790.732 199.6 778.655C222.51 764.353 231.948 751.931 242.802 736.392C249.874 726.268 254.796 702.811 259.954 669.756C263.428 647.488 266.741 623.564 275.672 595.049C291.589 544.225 321.057 525.001 333.271 513.417C340.122 506.92 366.508 493.398 400.991 476.145C422.136 465.565 436.761 458.807 449.244 452.857C468.014 443.912 487.215 422.111 499.511 401.421C510.081 383.634 518.765 363.825 538.003 327.418C546.084 312.125 563.058 292.844 587.226 269.014C611.394 245.184 643.66 218.298 663.241 202.488C682.821 186.677 688.736 182.757 714.639 171.215C740.542 159.673 786.254 140.63 813.567 129.699C840.879 118.768 848.408 116.528 865.731 113.693C909.801 106.482 941.412 102.355 948.46 98.9692C960.179 93.3391 980.409 80.3752 1009.77 54.9411C1019.54 44.7827 1032.98 29.6597 1042.33 19.6286C1051.67 9.59755 1056.51 5.11667 1061.5 0.5"
            stroke="#DE527E"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 3. Bottom-Left rising S-curve (Vector 32 inspired, colored pink/blush) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          y: [0, -10, 0],
          x: [0, 6, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -left-20 -bottom-24 w-[320px] sm:w-[460px] md:w-[580px] lg:w-[680px]"
      >
        <svg
          viewBox="0 0 608 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_12px_rgba(250,194,207,0.3)]"
        >
          <path
            d="M6.20981 0.500061C3.27451 24.0521 -2.68502 81.0006 2.62522 111.673C7.16007 137.867 61.251 147.651 89.4209 157.709C99.7771 161.407 119.903 168.96 145.974 179.339C180.27 192.992 221.963 215.228 235.945 235.691C245.564 249.768 246.957 272.746 247.26 296.725C247.54 318.988 242.83 335.711 238.107 355.187C229.749 389.649 225.627 429.937 224.729 461.055C224.15 481.107 229.167 495.911 232.112 513.357C239.289 555.884 263.466 580.133 289.448 605.865C304.547 620.82 327.171 635.71 343.35 646.231C368.724 662.731 395.643 672.169 422.007 683.126C449.402 694.511 460.984 712.508 474.62 729.429C488.603 746.78 511.329 783.004 529.466 825.186C537.529 843.939 547.584 856.134 555.874 867.118C565.374 876.34 573.664 883.443 589.043 893.528C594.389 895.922 600.847 897.684 607.5 899.5"
            stroke="#FAC2CF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 4. Bottom-Right ascending curve (Vector 34 inspired) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.35, 0.6, 0.35],
          y: [0, -15, 0],
          rotate: [0, -1.5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute -right-16 -bottom-16 w-[300px] sm:w-[420px] md:w-[520px] lg:w-[600px]"
      >
        <svg
          viewBox="0 0 431 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_14px_rgba(207,58,110,0.4)]"
        >
          <path
            d="M0.5 2.70592C24.5383 0.615645 52.5989 -0.461164 82.1005 1.62913C123.247 4.54453 136.052 26.9026 150.106 40.6637C160.164 50.5121 156.227 87.9328 151.5 122.122C149.756 134.732 142.608 155.36 139.124 176.841C132.217 219.43 135.086 249.138 140.597 268.062C148.743 296.034 164.065 320.905 182.458 342.473C193.363 355.261 210.257 369.267 228.532 382.553C246.806 395.839 266.664 407.335 288.912 423.187C311.161 439.038 335.2 458.896 351.241 473.568C375.72 495.956 386.317 513.069 393.696 525.714C406.887 551.565 420.648 579.056 425.929 590.164C426.998 592.817 427.521 595.43 429.643 599.705"
            stroke="#CF3A6E"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 5. Right edge vertical squiggle (Vector 35 inspired, colored bright rose pink) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          y: [0, 16, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="hidden sm:block absolute right-0 top-1/4 w-[280px] md:w-[380px] lg:w-[460px] translate-x-1/4"
      >
        <svg
          viewBox="0 0 483 742"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_10px_rgba(250,194,207,0.3)]"
        >
          <path
            d="M482.5 0.500122C471.762 3.57597 461.023 6.65182 439.64 14.9648C418.256 23.2777 386.553 36.7346 363.062 50.2031C339.571 63.6716 325.253 76.7439 314.809 89.4376C295.504 112.901 290.373 131.713 288.815 150.25C287.713 163.377 290.326 184.166 292.395 197.553C294.463 210.94 297.02 216.322 301.15 227.746C305.279 239.17 310.904 256.471 313.546 269.998C317.954 292.567 313.104 306.489 306.17 317.126C295.861 332.941 272.925 348.397 250.743 361.394C236.223 369.901 221.744 374.472 191.706 385.849C169.41 394.294 134.567 410.683 110.766 423.033C86.9647 435.383 75.7151 443.842 66.0847 451.852C56.4543 459.862 48.7841 467.167 39.4636 479.197C30.1431 491.226 19.4048 507.759 12.5946 520.505C1.51692 541.238 0.082071 558.114 0.585624 572.264C1.26354 591.314 14.5083 598.147 28.9422 606.903C38.6061 612.765 48.0713 613.713 56.6015 615.856C66.2205 618.274 75.4362 621.472 89.6376 629.039C100.879 635.029 117.243 638.552 130.964 642.263C146.811 646.549 163.76 649.458 179.247 652.359C197.745 655.824 221.62 662.647 235.55 668.46C249.953 674.471 256.732 687.067 263.48 698.933C267.736 706.417 268.633 715.425 275.094 723.995C278.953 727.869 283.105 731.387 289.017 734.871C292.883 736.816 298.508 739.123 304.303 741.5"
            stroke="#FAC2CF"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 6. Mid-Left playful wavy loop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.25, 0.45, 0.25],
          x: [0, 10, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute left-4 top-1/3 w-[180px] sm:w-[280px] md:w-[340px]"
      >
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_10px_rgba(222,82,126,0.35)]"
        >
          <path
            d="M10 110C60 40 120 180 180 100C220 40 260 170 310 110"
            stroke="#DE527E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
        </svg>
      </motion.div>

      {/* 7. Subtle meandering stream behind center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] md:w-[1200px]"
      >
        <svg
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 200C200 120 350 280 600 200C850 120 1000 280 1200 200"
            stroke="#FAC2CF"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.3"
          />
          <path
            d="M50 240C250 160 400 320 650 240C900 160 1050 320 1250 240"
            stroke="#CF3A6E"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeOpacity="0.25"
          />
        </svg>
      </motion.div>
    </div>
  );
}
