import type { Metadata } from "next";
import RequireAuth from "@/components/Providers/RequireAuth";
import SectionPage from "@/components/Layout/SectionPage";
import TeamUpFlow from "@/components/TeamUp/TeamUpFlow";

export const metadata: Metadata = {
  title: "Team Up",
};

export default function TeamUpPage() {
  return (
    <RequireAuth>
      <SectionPage>
        <TeamUpFlow />
      </SectionPage>
    </RequireAuth>
  );
}
