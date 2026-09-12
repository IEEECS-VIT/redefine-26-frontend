"use client";

import { useState } from "react";
import GoogleIcon from "./GoogleIcon";
import { initiateGoogleSignIn, type StudentType } from "@/lib/auth";

interface GoogleSignInButtonProps {
  type?: StudentType;
  label?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

/**
 * Pure Google OAuth sign-in button component for initiating Google OAuth flows.
 */
export default function GoogleSignInButton({
  type = "external",
  label,
  className = "",
  onSuccess,
  onError,
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await initiateGoogleSignIn(type);
      onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to sign in with Google");
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const defaultLabel = label ?? (loading ? "Signing in..." : "Continue with Google");

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-3 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-100 disabled:opacity-50 ${className}`}
      aria-label="Sign in with Google"
    >
      <GoogleIcon className="h-5 w-5 shrink-0" />
      <span>{defaultLabel}</span>
    </button>
  );
}
