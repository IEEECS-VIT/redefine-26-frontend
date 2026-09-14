"use client";

import { useEffect, useState } from "react";
import SectionPage from "@/components/Layout/SectionPage";
import TeamSection, { type TeamMember } from "@/components/Team/TeamSection";
import SpinningLoader from "@/components/Providers/SpinningLoader";
import { fetchTeam, getCurrentTeam } from "@/lib/teamup";

function toTeamMember(member: { email: string; name: string; regNo?: string }): TeamMember {
  return {
    id: member.email,
    name: member.name,
    rollNo: member.regNo ?? "",
  };
}

export default function TeamClientPage() {
  const [teamName, setTeamName] = useState<string>("TEAM NAME");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const activeTeam = getCurrentTeam();
      if (activeTeam?.name) {
        setTeamName(activeTeam.name);
      }

      let fetchedMembers: TeamMember[] = [];
      try {
        const team = await fetchTeam();
        if (cancelled) return;
        if (team.name) {
          setTeamName(team.name);
        }
        fetchedMembers = team.members.map(toTeamMember);
      } catch {
        // fall back to stored/mock team (empty members shows placeholders)
      }

      if (!cancelled) {
        setMembers(fetchedMembers);
        setLoaded(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SectionPage>
      {loaded ? (
        <TeamSection teamName={teamName} members={members} />
      ) : (
        <SpinningLoader label="Loading your team…" />
      )}
    </SectionPage>
  );
}