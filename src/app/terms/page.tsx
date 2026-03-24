import { LegalDocument } from "@/components/page/LegalDocument";
import { termsSections } from "@/lib/legalContent";

export const metadata = {
  title: "Terms of Use | Premium 1 Logistics LTD",
  description: "Terms governing use of the Premium 1 Logistics website and general engagement.",
};

export default function TermsPage() {
  return <LegalDocument title="Terms of Use" updated="18 March 2025" sections={termsSections} />;
}
