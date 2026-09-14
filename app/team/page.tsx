import type { Metadata } from "next";
import TeamClientPage from "@/components/Team/TeamClientPage";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return <TeamClientPage />;
}
