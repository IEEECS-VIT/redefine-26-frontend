"use client";

import AuthGate from "@/components/Providers/AuthGate";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate mode="require-auth">{children}</AuthGate>;
}
