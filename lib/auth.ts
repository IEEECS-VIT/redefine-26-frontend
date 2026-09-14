import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "./firebase";
import {
  isEmailAllowedForStudentType,
  type StudentType,
} from "./authPolicy";

export { isEmailAllowedForStudentType, type StudentType } from "./authPolicy";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  type: StudentType;
  avatarUrl?: string;
  isInTeam: boolean;
}

type SignInResponse = {
  isInTeam: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
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

function storeUser(user: AuthUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }
}

function toAuthUser(user: User, type: StudentType, isInTeam: boolean): AuthUser {
  return {
    id: user.uid,
    name: user.displayName ?? user.email ?? "Participant",
    email: user.email ?? "",
    type,
    avatarUrl: user.photoURL ?? undefined,
    isInTeam,
  };
}

async function verifyWithBackend(user: User): Promise<SignInResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const idToken = await user.getIdToken();
  const response = await fetch(`${API_URL}/signin`, {
    method: "GET",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  if (response.status === 404) {
    throw new Error("This Google account is not registered for the event.");
  }
  if (!response.ok) {
    throw new Error("The server could not verify this account. Please try again.");
  }

  return response.json() as Promise<SignInResponse>;
}

export async function initiateGoogleSignIn(type: StudentType): Promise<AuthUser> {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const credential = await signInWithPopup(auth, provider);
  const email = credential.user.email ?? "";

  if (!isEmailAllowedForStudentType(email, type)) {
    await signOut(auth);
    clearStoredUser();
    throw new Error("Internal registration requires a @vitstudent.ac.in Google account.");
  }

  try {
    const { isInTeam } = await verifyWithBackend(credential.user);
    const user = toAuthUser(credential.user, type, isInTeam);
    storeUser(user);
    return user;
  } catch (error) {
    await signOut(auth);
    clearStoredUser();
    throw error;
  }
}

export function subscribeToAuthState(callback: (user: AuthUser | null) => void): () => void {
  const auth = getFirebaseAuth();

  return onAuthStateChanged(auth, (firebaseUser) => {
    if (!firebaseUser) {
      clearStoredUser();
      callback(null);
      return;
    }

    const storedUser = getStoredUser();
    if (storedUser?.id === firebaseUser.uid) {
      callback(storedUser);
      return;
    }

    callback(toAuthUser(firebaseUser, "external", false));
  });
}

export async function signOutUser(): Promise<void> {
  await signOut(getFirebaseAuth());
  clearStoredUser();
}
