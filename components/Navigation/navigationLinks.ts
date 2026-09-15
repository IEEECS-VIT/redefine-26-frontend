export interface NavLink {
  label: string;
  href: string;
  img: string;
  w: number;
  h: number;
}

const SHARED_LINKS: NavLink[] = [
  { label: "Timeline", href: "/timeline", img: "/tracks/TIMELINE.svg", w: 121, h: 17 },
  { label: "Tracks", href: "/tracks", img: "/tracks/TRACKS.svg", w: 109, h: 17 },
];

const SIGNED_OUT_LINK: NavLink = {
  label: "FAQ",
  href: "/faq",
  img: "/tracks/FAQ.svg",
  w: 54,
  h: 20,
};

const SIGNED_IN_LINK: NavLink = {
  label: "Team",
  href: "/team",
  img: "/tracks/TEAM.svg",
  w: 76,
  h: 17,
};

export function getHeaderNavLinks(isSignedIn: boolean): NavLink[] {
  return [...SHARED_LINKS, isSignedIn ? SIGNED_IN_LINK : SIGNED_OUT_LINK];
}

export function getHeaderAction(isSignedIn: boolean): { label: string; href: string } {
  return isSignedIn
    ? { label: "Submit", href: "/submit" }
    : { label: "Sign In", href: "/signin" };
}
