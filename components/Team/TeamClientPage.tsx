"use client";

import { useEffect, useState } from "react";
import SectionPage from "@/components/Layout/SectionPage";
import TeamSection, { type TeamMember } from "@/components/Team/TeamSection";
import SpinningLoader from "@/components/Providers/SpinningLoader";
import { fetchTeam, getCurrentTeam, type TeamResponse } from "@/lib/teamup";
import { getStoredUser } from "@/lib/auth";
import { getFirebaseAuth } from "@/lib/firebase";

function parseTeamMembers(
  rawMembers: any[],
  team: TeamResponse,
  currentUser: { id?: string; email?: string } | null
): TeamMember[] {
  if (!rawMembers || rawMembers.length === 0) return [];

  const leaderEmail =
    (team as any).leaderEmail ||
    (typeof (team as any).leader === "string" && (team as any).leader.includes("@")
      ? (team as any).leader
      : undefined) ||
    (typeof (team as any).leader === "object" && (team as any).leader?.email
      ? (team as any).leader.email
      : undefined);

  const rawLeaderId =
    team.leaderId ||
    (team as any).leader_id ||
    (typeof (team as any).leader === "string" ? (team as any).leader : undefined) ||
    (typeof (team as any).leader === "object"
      ? (team as any).leader?.id || (team as any).leader?._id || (team as any).leader?.uid
      : undefined);

  let leaderFound = false;
  const mapped: TeamMember[] = rawMembers.map((m, index) => {
    let isLeader = false;

    if (m.isLeader === true || m.is_leader === true) {
      isLeader = true;
    } else if (typeof m.role === "string" && m.role.toLowerCase() === "leader") {
      isLeader = true;
    } else if (leaderEmail && m.email && m.email.toLowerCase() === leaderEmail.toLowerCase()) {
      isLeader = true;
    } else if (rawLeaderId) {
      const lid = String(rawLeaderId).trim().toLowerCase();
      const mId = m.id ? String(m.id).trim().toLowerCase() : "";
      const mUid = m.uid ? String(m.uid).trim().toLowerCase() : "";
      const m_Id = m._id ? String(m._id).trim().toLowerCase() : "";
      const mUserId = m.userId ? String(m.userId).trim().toLowerCase() : "";
      const mEmail = m.email ? String(m.email).trim().toLowerCase() : "";
      const mRegNo = (m.regNo || m.rollNo) ? String(m.regNo || m.rollNo).trim().toLowerCase() : "";

      if (
        (mId && mId === lid) ||
        (mUid && mUid === lid) ||
        (m_Id && m_Id === lid) ||
        (mUserId && mUserId === lid) ||
        (mEmail && mEmail === lid) ||
        (mRegNo && mRegNo === lid)
      ) {
        isLeader = true;
      }
    } else if (team.isLeader && currentUser) {
      if (currentUser.email && m.email && currentUser.email.toLowerCase() === m.email.toLowerCase()) {
        isLeader = true;
      } else if (
        currentUser.id &&
        (m.id === currentUser.id || m.uid === currentUser.id || m._id === currentUser.id)
      ) {
        isLeader = true;
      }
    }

    if (isLeader) leaderFound = true;

    return {
      id: m.email || m.id || `member-${index}`,
      name: m.name || "Member",
      rollNo: m.regNo || m.rollNo || "",
      isLeader,
    };
  });

  if (!leaderFound && mapped.length > 0) {
    if (team.isLeader && currentUser?.email) {
      const userIdx = mapped.findIndex(
        (m, idx) => rawMembers[idx]?.email?.toLowerCase() === currentUser.email?.toLowerCase()
      );
      if (userIdx !== -1) {
        mapped[userIdx].isLeader = true;
        leaderFound = true;
      }
    }

    if (!leaderFound) {
      if (
        !team.isLeader &&
        currentUser?.email &&
        rawMembers[0]?.email?.toLowerCase() === currentUser.email.toLowerCase() &&
        mapped.length > 1
      ) {
        mapped[1].isLeader = true;
      } else {
        mapped[0].isLeader = true;
      }
    }
  }

  return mapped;
}

export default function TeamClientPage() {
  const [teamName, setTeamName] = useState<string>("TEAM NAME");
  const [teamId, setTeamId] = useState<string>("");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const activeTeam = getCurrentTeam();
      if (activeTeam?.name) {
        setTeamName(activeTeam.name);
      }
      if (activeTeam?.id || activeTeam?.code) {
        setTeamId(activeTeam.id || activeTeam.code);
      }

      const stored = getStoredUser();
      let firebaseUid = stored?.id;
      let firebaseEmail = stored?.email;
      try {
        const auth = getFirebaseAuth();
        if (auth.currentUser) {
          firebaseUid = auth.currentUser.uid;
          if (auth.currentUser.email) firebaseEmail = auth.currentUser.email;
        }
      } catch {
        // ignore
      }
      const currentUser = { id: firebaseUid, email: firebaseEmail };

      let fetchedMembers: TeamMember[] = [];
      try {
        const team = await fetchTeam();
        if (cancelled) return;
        if (team.name) {
          setTeamName(team.name);
        }
        if (team.id || team.code) {
          setTeamId(team.id || team.code);
        }
        fetchedMembers = parseTeamMembers(team.members, team, currentUser);
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
        <TeamSection teamName={teamName} teamId={teamId} members={members} />
      ) : (
        <SpinningLoader label="Loading your team…" />
      )}
    </SectionPage>
  );
}