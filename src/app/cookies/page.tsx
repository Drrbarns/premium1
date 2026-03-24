import { LegalDocument } from "@/components/page/LegalDocument";
import { cookieSections } from "@/lib/legalContent";

export const metadata = {
  title: "Cookie Policy | Premium 1 Logistics LTD",
  description: "How Premium 1 Logistics uses cookies on this website.",
};

export default function CookiesPage() {
  return <LegalDocument title="Cookie Policy" updated="18 March 2025" sections={cookieSections} />;
}
