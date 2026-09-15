export interface Subtrack {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TrackSubtracksConfig {
  trackId: number;
  trackName: string;
  subtracks: Subtrack[];
}

export const TRACK_SUBTRACKS: Record<number, TrackSubtracksConfig> = {
  1: {
    trackId: 1,
    trackName: "Brutalism",
    subtracks: [
      {
        id: "brutalism-1a",
        number: "1a",
        title: "Neo-Brutalism",
        description: "Bold flat colors, thick borders, offset hard shadows",
      },
      {
        id: "brutalism-1b",
        number: "1b",
        title: "Cyber Brutalism",
        description: "Terminal aesthetic: black backgrounds, neon, monospace type",
      },
      {
        id: "brutalism-1c",
        number: "1c",
        title: "Swiss Brutalism",
        description: "Brutalism locked into a strict grid, Helvetica-heavy",
      },
    ],
  },
  2: {
    trackId: 2,
    trackName: "Skeuomorphism",
    subtracks: [
      {
        id: "skeuomorphism-2a",
        number: "2a",
        title: "Classic Skeuomorphism",
        description: "Real-world texture mimicry: leather, metal, stitching",
      },
      {
        id: "skeuomorphism-2b",
        number: "2b",
        title: "Neumorphism",
        description: "Soft extruded shapes, monochrome, subtle dual shadows",
      },
      {
        id: "skeuomorphism-2c",
        number: "2c",
        title: "Glassmorphism",
        description: "Frosted glass panels, blur, light borders",
      },
    ],
  },
  3: {
    trackId: 3,
    trackName: "Swiss / International Style",
    subtracks: [
      {
        id: "swiss-3a",
        number: "3a",
        title: "Classic Swiss",
        description: "Strict grid, Helvetica, red/black/white hierarchy",
      },
      {
        id: "swiss-3b",
        number: "3b",
        title: "Editorial Swiss",
        description: "Grid discipline with magazine-style layout and pull quotes",
      },
    ],
  },
  4: {
    trackId: 4,
    trackName: "Maximalism",
    subtracks: [
      {
        id: "maximalism-4a",
        number: "4a",
        title: "Y2K Maximalism",
        description: "Glossy gradients, chrome text, early-2000s excess",
      },
      {
        id: "maximalism-4b",
        number: "4b",
        title: "Memphis Maximalism",
        description: "Bold geometric shapes, squiggles, clashing primaries",
      },
      {
        id: "maximalism-4c",
        number: "4c",
        title: "Vaporwave Maximalism",
        description: "Pastel/neon retro-futurism, grids, glitch type",
      },
    ],
  },
  5: {
    trackId: 5,
    trackName: "Retro / Nostalgic UI",
    subtracks: [
      {
        id: "retro-5a",
        number: "5a",
        title: "Windows 95/98 UI",
        description: "Beveled buttons, title bars, gray panels",
      },
      {
        id: "retro-5b",
        number: "5b",
        title: "Y2K Web UI",
        description: "Early internet look: tiled backgrounds, visitor counters",
      },
    ],
  },
  6: {
    trackId: 6,
    trackName: "Dark Mode / Low-Light Design",
    subtracks: [
      {
        id: "dark-6a",
        number: "6a",
        title: "Cyberpunk Dark",
        description: "Neon glow accents on true black, futuristic type",
      },
      {
        id: "dark-6b",
        number: "6b",
        title: "Minimal Dark (OLED)",
        description: "True black, monochrome, restrained accent color",
      },
    ],
  },
};

/**
 * Dynamically compute font sizing classes based on title length
 * Ensures text adjusts smoothly, remains legible, and keeps cards compact.
 */
export function getSubtrackTitleSize(text: string): string {
  const len = text.length;
  if (len < 24) {
    return "text-xs sm:text-sm xl:text-[15px]";
  }
  if (len < 36) {
    return "text-[11px] sm:text-xs xl:text-sm";
  }
  return "text-[10px] sm:text-[11px] xl:text-xs";
}
