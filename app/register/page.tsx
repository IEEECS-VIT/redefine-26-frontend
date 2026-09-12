import type { Metadata } from "next";
import SectionPage from "@/components/Layout/SectionPage";
import RegisterPortal from "@/components/Register/RegisterPortal";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <SectionPage hideRegisterButton>
      <RegisterPortal />
    </SectionPage>
  );
}
