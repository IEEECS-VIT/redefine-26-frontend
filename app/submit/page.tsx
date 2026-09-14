import type { Metadata } from "next";
import SectionPage from "@/components/Layout/SectionPage";
import SubmitFlow from "@/components/Submit/SubmitFlow";

export const metadata: Metadata = {
  title: "Submit",
};

export default function SubmitPage() {
  return (
    <SectionPage>
      <SubmitFlow />
    </SectionPage>
  );
}
