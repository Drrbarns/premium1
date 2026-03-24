import { Container } from "@/components/design-system/Container";
import { ThanksClient } from "./ThanksClient";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Thank You | Premium 1 Logistics",
  description: "Your quote request was received.",
};

export default async function QuoteThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ no?: string }>;
}) {
  const { no } = await searchParams;
  const ref = no || "Pending";

  return (
    <div className="min-h-screen bg-[var(--surface-warm)] py-16 md:py-24">
      <Container size="narrow">
        <div className="text-center mb-10">
          <CheckCircle2 className="mx-auto text-[var(--accent)] mb-4" size={56} strokeWidth={1.25} />
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">Thank you</h1>
          <p className="mt-2 text-slate-600">Your logistics enquiry is in the queue.</p>
        </div>
        <ThanksClient inquiryNo={ref} />
      </Container>
    </div>
  );
}
