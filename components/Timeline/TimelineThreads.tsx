"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  buildTimelineThreadPath,
  type TimelinePoint,
} from "./timelineThreadGeometry";

function TimelineThread({ path }: { path: string }) {
  return (
    <path
      d={path}
      fill="none"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className="drop-shadow-[0_0_2px_rgba(255,255,255,0.65)]"
    />
  );
}

export default function TimelineThreads() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [pins, setPins] = useState<TimelinePoint[]>([]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const stage = svg?.closest<HTMLElement>('[data-timeline-layout="mobile"]');
    if (!svg || !stage) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const stageRect = stage.getBoundingClientRect();
        const anchors = Array.from(stage.querySelectorAll<HTMLElement>("[data-timeline-anchor]"))
          .sort((a, b) => Number(a.dataset.timelineAnchor) - Number(b.dataset.timelineAnchor));
        setSize({ width: stageRect.width, height: stageRect.height });
        setPins(anchors.map((anchor) => {
          const rect = anchor.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - stageRect.left,
            y: rect.top + rect.height / 2 - stageRect.top,
          };
        }));
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener("resize", measure);
    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const path = buildTimelineThreadPath(pins, size.width);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      data-timeline-thread-component="mobile"
      data-timeline-threads="pin-to-pin"
      data-thread-nav-clip="responsive"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    >
      {path ? <TimelineThread path={path} /> : null}
      {pins.map((pin, index) => (
        <circle key={index} cx={pin.x} cy={pin.y} r={3.5} fill="black" />
      ))}
    </svg>
  );
}
