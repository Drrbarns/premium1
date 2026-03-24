import { LegalDocument } from "@/components/page/LegalDocument";
import { privacySections } from "@/lib/legalContent";

export const metadata = {
  title: "Privacy Policy | Premium 1 Logistics LTD",
  description: "How Premium 1 Logistics collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" updated="18 March 2025" sections={privacySections} />;
}
