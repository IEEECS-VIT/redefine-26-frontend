import type { Metadata } from "next";
import SectionPage from "@/components/Layout/SectionPage";
import RegisterPortal from "@/components/Register/RegisterPortal";
import GuestOnly from "@/components/Providers/GuestOnly";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <GuestOnly>
      <SectionPage hideRegisterButton>
        <RegisterPortal />
      </SectionPage>
    </GuestOnly>
  );
}
