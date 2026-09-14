import type { Metadata } from "next";
import SectionPage from "@/components/Layout/SectionPage";
import TeamUpFlow from "@/components/TeamUp/TeamUpFlow";

export const metadata: Metadata = {
  title: "Team Up",
};

export default function TeamUpPage() {
  return (
    <SectionPage>
      <TeamUpFlow />
    </SectionPage>
  );
}