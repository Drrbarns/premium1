"use client";

import { useTransition } from "react";
import { toast } from "sonner";

interface StatusSelectProps {
  currentStatus: string;
  statuses: string[];
  action: (formData: FormData) => Promise<void>;
  entityId: string;
  colors?: Record<string, string>;
}

const DEFAULT_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  quoted: "bg-purple-50 text-purple-700 border-purple-200",
  won: "bg-green-50 text-green-700 border-green-200",
  lost: "bg-slate-100 text-slate-600 border-slate-200",
  draft: "bg-slate-100 text-slate-600 border-slate-200",
  booked: "bg-blue-50 text-blue-700 border-blue-200",
  in_transit: "bg-amber-50 text-amber-700 border-amber-200",
  arrived: "bg-cyan-50 text-cyan-700 border-cyan-200",
  clearing: "bg-purple-50 text-purple-700 border-purple-200",
  out_for_delivery: "bg-orange-50 text-orange-700 border-orange-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
};

export function StatusSelect({ currentStatus, statuses, action, entityId, colors }: StatusSelectProps) {
  const [pending, startTransition] = useTransition();
  const palette = colors || DEFAULT_COLORS;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fd = new FormData();
    fd.set("id", entityId);
    fd.set("status", e.target.value);
    startTransition(async () => {
      await action(fd);
      toast.success(`Status updated to ${e.target.value.replace(/_/g, " ")}`);
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={pending}
      className={`text-sm font-medium px-3 py-1.5 rounded-lg border appearance-none cursor-pointer disabled:opacity-50 ${
        palette[currentStatus] || "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}
