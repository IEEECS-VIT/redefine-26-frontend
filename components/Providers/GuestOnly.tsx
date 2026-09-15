"use client";

import AuthGate from "@/components/Providers/AuthGate";

export default function GuestOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate mode="require-guest">{children}</AuthGate>;
}
