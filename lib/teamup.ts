// Team Up — data layer.
//
// Every function here is the single seam between the UI and the backend.
// When a real API is available set NEXT_PUBLIC_API_URL and these helpers
// will use it. Without it they fall back to deterministic mock data so the
// flow can be built and demoed end-to-end right now.

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

// In-memory mock store used when there is no backend. Keyed by team code so
// a built team can be "found" again by somebody who joins with the code.
const mockTeams = new Map<string, Team>();

function makeMockCode(name: string): string {
  const safe = name.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4) || "TERM";
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${safe}-${suffix}`;
}

export async function fetchTracks(): Promise<Track[]> {
  if (!API_URL) {
    return delay(DEFAULT_TRACKS);
  }
  const res = await fetch(`${API_URL}/tracks`);
  return res.json();
}

export async function createTeam(payload: CreateTeamPayload): Promise<Team> {
  if (!API_URL) {
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
  const res = await fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function joinTeam(payload: JoinTeamPayload): Promise<Team> {
  const code = payload.code.trim().toUpperCase();

  if (!API_URL) {
    const existing = mockTeams.get(code);
    if (existing) {
      return delay(existing);
    }
    // Unknown code against a mock backend -> reject with a team-shaped error.
    throw new Error("Team not found. Please check the code and try again.");
  }

  const res = await fetch(`${API_URL}/teams/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Team not found. Please check the code and try again.");
  }
  return res.json();
}

export function saveCurrentTeam(team: Team): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("redefine_current_team", JSON.stringify(team));
  }
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

