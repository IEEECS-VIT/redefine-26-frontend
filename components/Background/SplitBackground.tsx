import Image from "next/image";
import NoiseOverlay from "./NoiseOverlay";

export default function SplitBackground() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Mobile design — below the md breakpoint */}
      <div className="absolute inset-0 bg-[#CF3A6E] md:hidden">
        <Image
          src="/homepagemobile.svg"
          alt="Background"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className="object-cover select-none -translate-y-[20%] scale-85"
        />
      </div>

      {/* Desktop design — md breakpoint and up */}
      <div className="absolute inset-0 hidden bg-[#C1325F] md:block">
        <Image
          src="/home.svg"
          alt="Background"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 0px"
          className="object-cover object-[center_40%] select-none"
        />
      </div>

      <NoiseOverlay />
    </section>
  );
}
