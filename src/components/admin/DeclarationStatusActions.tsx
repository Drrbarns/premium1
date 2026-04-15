"use client";

import { useTransition } from "react";
import { updateDeclarationStatus } from "@/app/admin/customs/actions";

const TRANSITIONS: Record<string, { label: string; next: string; color: string }[]> = {
  draft: [{ label: "Submit", next: "submitted", color: "bg-blue-600 text-white hover:bg-blue-700" }],
  submitted: [
    { label: "Mark Query", next: "query", color: "bg-amber-600 text-white hover:bg-amber-700" },
    { label: "Release", next: "released", color: "bg-emerald-600 text-white hover:bg-emerald-700" },
  ],
  query: [
    { label: "Amend & Resubmit", next: "amended", color: "bg-purple-600 text-white hover:bg-purple-700" },
  ],
  amended: [
    { label: "Mark Query", next: "query", color: "bg-amber-600 text-white hover:bg-amber-700" },
    { label: "Release", next: "released", color: "bg-emerald-600 text-white hover:bg-emerald-700" },
  ],
};

export function DeclarationStatusActions({
  declarationId,
  currentStatus,
}: {
  declarationId: string;
  currentStatus: string;
}) {
  const [pending, startTransition] = useTransition();
  const actions = TRANSITIONS[currentStatus] || [];
  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((a) => (
        <button
          key={a.next}
          disabled={pending}
          onClick={() => {
            const fd = new FormData();
            fd.set("id", declarationId);
            fd.set("status", a.next);
            startTransition(() => updateDeclarationStatus(fd));
          }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${a.color}`}
        >
          {pending ? "Updating…" : a.label}
        </button>
      ))}
    </div>
  );
}
