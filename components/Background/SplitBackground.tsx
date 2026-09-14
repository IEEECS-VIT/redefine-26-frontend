import Image from "next/image";
import NoiseOverlay from "./NoiseOverlay";

export default function SplitBackground() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Mobile design — below the md breakpoint */}
      <div className="absolute inset-0 bg-[#CF3A6E] md:hidden">
        <Image
          src="/redefine-2026/Homepage_mobile.svg"
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top select-none"
        />
      </div>

      {/* Desktop design — md breakpoint and up */}
      <div className="absolute inset-0 hidden bg-[#C1325F] md:block">
        <Image
          src="/redefine-2026/Homepage.svg"
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </div>

      <NoiseOverlay />
    </section>
  );
}
