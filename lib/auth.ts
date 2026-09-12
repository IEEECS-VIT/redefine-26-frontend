// Authentication data layer — single seam between the UI and backend OAuth.
//
// Supports "internal" and "external" student authentication flows.
// When NEXT_PUBLIC_API_URL is configured, redirects to the backend's Google OAuth endpoint.
// When unconfigured, provides a deterministic mock simulation for local development.

export type StudentType = "internal" | "external";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  type: StudentType;
  avatarUrl?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_STORAGE_KEY = "redefine_user_session";

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function initiateGoogleSignIn(type: StudentType): Promise<void> {
  if (API_URL) {
    // Redirect to the dedicated backend OAuth route
    window.location.href = `${API_URL}/auth/google/${type}`;
    return;
  }

  // Standalone simulation mode
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockUser: AuthUser = {
    id: `user_${Date.now()}`,
    name: type === "internal" ? "Internal Participant" : "External Participant",
    email:
      type === "internal"
        ? "participant@vitstudent.ac.in"
        : "participant@gmail.com",
    type,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
  }
}
