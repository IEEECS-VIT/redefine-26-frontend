export interface NavLink {
  label: string;
  href: string;
  img: string;
  width: string;
}

const SHARED_LINKS: NavLink[] = [
  { label: "Timeline", href: "/timeline", img: "/tracks/TIMELINE.svg", width: "135px" },
  { label: "Tracks", href: "/tracks", img: "/tracks/TRACKS.svg", width: "118px" },
];

const SIGNED_OUT_LINK: NavLink = {
  label: "FAQ",
  href: "/faq",
  img: "/tracks/FAQ.svg",
  width: "70px",
};

const SIGNED_IN_LINK: NavLink = {
  label: "Team",
  href: "/team",
  img: "/tracks/TEAM.svg",
  width: "75px",
};

export function getHeaderNavLinks(isSignedIn: boolean): NavLink[] {
  return [...SHARED_LINKS, isSignedIn ? SIGNED_IN_LINK : SIGNED_OUT_LINK];
}

export function getHeaderAction(isSignedIn: boolean): { label: string; href: string } {
  return isSignedIn
    ? { label: "Submit", href: "/submit" }
    : { label: "Sign In", href: "/signin" };
}
