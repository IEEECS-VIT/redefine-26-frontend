// Team Up — data layer aligned with HackBattle Backend API Documentation.
//
// All team endpoints communicate with the backend using Firebase ID Token
// in the Authorization header. Fallbacks are provided when offline or in demo mode.

import { getFirebaseAuth } from "./firebase";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export type TeamMember = {
  email: string;
  name: string;
};

export type TeamResponse = {
  id: string;
  name: string;
  code: string;
  leaderId: string;
  members: TeamMember[];
  track?: string | null;
  figma_link?: string | null;
  other_links?: string[];
  submitted_at?: string | null;
  updated_at?: string | null;
  isLeader: boolean;
};

export type Track = {
  id: string;
  name: string;
};

export type Team = {
  id: string;
  name: string;
  trackId: string;
  code: string;
  createdAt: string;
};

export type CreateTeamPayload = {
  name: string;
  trackId: string;
};

export type JoinTeamPayload = {
  code: string;
};

export type SubmitProjectPayload = {
  track: string;
  figma_link: string;
  other_links?: string[];
};

export const DEFAULT_TRACKS: Track[] = [
  { id: "e-commerce", name: "E-Commerce" },
  { id: "education", name: "Smart Education" },
  { id: "healthcare", name: "Healthcare Companion" },
  { id: "travel", name: "Travel & Exploration" },
  { id: "finance", name: "Finance" },
  { id: "social-impact", name: "Social Impact Platform" },
];

const delay = <T>(value: T, ms = 650): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

// In-memory mock store used when there is no backend.
const mockTeams = new Map<string, Team>();

function makeMockCode(name: string): string {
  const safe = name.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4) || "TERM";
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${safe}-${suffix}`;
}

async function getAuthHeader(): Promise<Record<string, string>> {
  try {
    const auth = getFirebaseAuth();
    await auth.authStateReady();
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  } catch {
    // Auth not initialized or user not logged in
  }
  return {};
}

export async function fetchTracks(): Promise<Track[]> {
  return DEFAULT_TRACKS;
}

export async function createTeam(payload: CreateTeamPayload): Promise<Team> {
  const authHeader = await getAuthHeader();
  if (!API_URL || !authHeader.Authorization) {
    const team: Team = {
      id: `team_${Date.now()}`,
      name: payload.name.trim(),
      trackId: payload.trackId,
      code: makeMockCode(payload.name),
      createdAt: new Date().toISOString(),
    };
    mockTeams.set(team.code, team);
    return delay(team);
  }

  const res = await fetch(`${API_URL}/teams/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
    body: JSON.stringify({ name: payload.name.trim() }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Failed to create team.");
  }

  const team: Team = {
    id: data.code || `team_${Date.now()}`,
    name: payload.name.trim(),
    trackId: payload.trackId,
    code: data.code || "",
    createdAt: new Date().toISOString(),
  };
  return team;
}

export async function joinTeam(payload: JoinTeamPayload): Promise<Team> {
  const code = payload.code.trim().toUpperCase();
  const authHeader = await getAuthHeader();

  if (!API_URL || !authHeader.Authorization) {
    const existing = mockTeams.get(code);
    if (existing) {
      return delay(existing);
    }
    throw new Error("Team not found. Please check the code and try again.");
  }

  const res = await fetch(`${API_URL}/teams/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
    body: JSON.stringify({ team_code: code }),
  });

  if (res.status === 204) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Invalid team code or team not found.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Failed to join team.");
  }

  const team: Team = {
    id: code,
    name: "My Team",
    trackId: "general",
    code: code,
    createdAt: new Date().toISOString(),
  };
  return team;
}

export async function getMyTeam(): Promise<TeamResponse | null> {
  if (!API_URL) return null;
  const authHeader = await getAuthHeader();
  if (!authHeader.Authorization) return null;

  try {
    const res = await fetch(`${API_URL}/teams/get`, {
      method: "GET",
      headers: {
        ...authHeader,
      },
    });

    if (res.status === 204 || res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch team details.");
    }

    return (await res.json()) as TeamResponse;
  } catch {
    return null;
  }
}

export function saveCurrentTeam(team: Team): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("redefine_current_team", JSON.stringify(team));
  }
}

export async function submitProject(payload: SubmitProjectPayload): Promise<void> {
  if (!API_URL) {
    await delay(null, 800);
    return;
  }

  const auth = getFirebaseAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not signed in.");
  }
  const idToken = await user.getIdToken();

  const body: SubmitProjectPayload = {
    track: payload.track,
    figma_link: payload.figma_link,
    other_links: payload.other_links?.filter((link) => link.trim() !== "") ?? [],
  };

  const res = await fetch(`${API_URL}/teams/project/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = "The server could not record the submission. Please try again.";
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore body parse errors
    }
    throw new Error(message);
  }
}

export async function updateProject(payload: SubmitProjectPayload): Promise<void> {
  if (!API_URL) {
    await delay(null, 800);
    return;
  }

  const auth = getFirebaseAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not signed in.");
  }
  const idToken = await user.getIdToken();

  const body: SubmitProjectPayload = {
    track: payload.track,
    figma_link: payload.figma_link,
    other_links: payload.other_links?.filter((link) => link.trim() !== "") ?? [],
  };

  const res = await fetch(`${API_URL}/teams/project/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = "The server could not update the submission. Please try again.";
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore body parse errors
    }
    throw new Error(message);
  }
}

export async function fetchTeam(): Promise<TeamResponse> {
  if (!API_URL) {
    const team = getCurrentTeam();
    return delay({
      id: team?.id ?? "",
      name: team?.name ?? "",
      code: team?.code ?? "",
      leaderId: "",
      members: [],
      isLeader: false,
    });
  }

  const auth = getFirebaseAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not signed in.");
  }
  const idToken = await user.getIdToken();

  const res = await fetch(`${API_URL}/teams/get`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });

  if (res.status === 204) {
    return {
      id: "",
      name: "",
      code: "",
      leaderId: "",
      members: [],
      isLeader: false,
    };
  }
  if (!res.ok) {
    throw new Error("The server could not load the team. Please try again.");
  }
  return res.json() as Promise<TeamResponse>;
}

export function getCurrentTeam(): Team | null {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("redefine_current_team");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  }
  return null;
}
