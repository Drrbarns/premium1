"use client";

import { useTransition } from "react";
import { updateInvoiceStatus } from "@/app/admin/finance/actions";
import { CheckCircle, Send, XCircle } from "lucide-react";

const ICONS = { send: Send, check: CheckCircle, x: XCircle };

export function InvoiceStatusButton({
  invoiceId,
  newStatus,
  label,
  icon,
  variant = "default",
}: {
  invoiceId: string;
  newStatus: string;
  label: string;
  icon: "send" | "check" | "x";
  variant?: "default" | "danger";
}) {
  const [pending, startTransition] = useTransition();
  const Icon = ICONS[icon];

  return (
    <button
      disabled={pending}
      onClick={() => {
        const fd = new FormData();
        fd.set("id", invoiceId);
        fd.set("status", newStatus);
        startTransition(() => updateInvoiceStatus(fd));
      }}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${
        variant === "danger"
          ? "border border-red-200 text-red-600 hover:bg-red-50"
          : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
      }`}
    >
      <Icon size={14} />
      {pending ? "Updating…" : label}
    </button>
  );
}
