import Image from "next/image";

export default function NavThread() {
  return (
    <div
      aria-hidden="true"
      data-nav-thread-component="active-nav"
      className="pointer-events-none absolute left-1/2 top-full mt-2 hidden aspect-[119/19] w-[clamp(4rem,8vw,7.4375rem)] -translate-x-1/2 min-[900px]:block"
    >
      <Image
        src="/tracks/Vector 105.svg"
        alt=""
        fill
        priority
        className="object-contain"
      />
    </div>
  );
}
