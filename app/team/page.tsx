"use client";

import { useEffect, useState } from "react";
import SectionPage from "@/components/Layout/SectionPage";
import TeamSection from "@/components/Team/TeamSection";
import { getCurrentTeam } from "@/lib/teamup";

export default function TeamPage() {
  const [teamName, setTeamName] = useState<string>("TEAM NAME");

  useEffect(() => {
    const activeTeam = getCurrentTeam();
    if (activeTeam?.name) {
      setTeamName(activeTeam.name);
    }
  }, []);

  return (
    <SectionPage>
      <TeamSection teamName={teamName} />
    </SectionPage>
  );
}
