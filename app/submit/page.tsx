import type { Metadata } from "next";
import SectionPage from "@/components/Layout/SectionPage";
import SubmitFlow from "@/components/Submit/SubmitFlow";
import RequireAuth from "@/components/Providers/RequireAuth";

export const metadata: Metadata = {
  title: "Submit",
};

export default function SubmitPage() {
  return (
    <RequireAuth>
      <SectionPage>
        <SubmitFlow />
      </SectionPage>
    </RequireAuth>
  );
}
