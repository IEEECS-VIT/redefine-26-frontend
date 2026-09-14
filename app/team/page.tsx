import type { Metadata } from "next";
import TeamClientPage from "@/components/Team/TeamClientPage";
import RequireAuth from "@/components/Providers/RequireAuth";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return (
    <RequireAuth>
      <TeamClientPage />
    </RequireAuth>
  );
}
