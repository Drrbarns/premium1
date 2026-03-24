"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "@/components/design-system/CTAButton";

export function ThanksClient({ inquiryNo }: { inquiryNo: string }) {
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    try {
      const id = sessionStorage.getItem("lastInquiryId");
      const d = sessionStorage.getItem("lastInquiryDemo") === "1";
      setInquiryId(id && id !== "demo" ? id : null);
      setDemo(d || id === "demo");
    } catch {
      /* */
    }
  }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !inquiryId) return;
    setStatus("Uploading…");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("inquiry_id", inquiryId);
    const res = await fetch("/api/upload/inquiry", { method: "POST", body: fd });
    if (res.ok) setStatus("Uploaded successfully. Our team will link it to your file.");
    else setStatus("Upload failed—email documents to " + (process.env.NEXT_PUBLIC_SITE_EMAIL || "info@premium1logistics.com"));
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-8 md:p-10 max-w-xl mx-auto">
      <p className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">Reference</p>
      <p className="font-display font-bold text-3xl text-[var(--ink)] mt-2">{inquiryNo}</p>
      <p className="mt-6 text-slate-600 leading-relaxed">
        We have received your enquiry. A specialist will respond within <strong>24–48 business hours</strong> with a structured
        quote or follow-up questions.
      </p>
      {demo && (
        <p className="mt-4 text-sm text-[var(--navy)] bg-[var(--accent-soft)] border border-[var(--accent)]/30 rounded-xl p-4">
          Demo mode: connect Supabase to store inquiries and enable file upload. Set <code className="text-xs">ALLOW_QUOTE_WITHOUT_DB</code> only for testing.
        </p>
      )}
      {inquiryId && !demo && (
        <div className="mt-8 pt-8 border-t border-slate-100">
          <p className="font-display font-bold text-[var(--ink)] mb-2">Upload documents (optional)</p>
          <p className="text-sm text-slate-500 mb-4">Invoice draft, packing list, or supplier specs—PDF or images up to 20MB.</p>
          <label className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer text-sm font-semibold text-[var(--ink)]">
            Choose file
            <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={upload} />
          </label>
          {status && <p className="mt-3 text-sm text-slate-600">{status}</p>}
        </div>
      )}
      <div className="mt-10 flex flex-wrap gap-4">
        <CTAButton href="/">Back to home</CTAButton>
        <CTAButton href="/contact" variant="outline">
          Contact us
        </CTAButton>
      </div>
    </div>
  );
}
