"use client";

import { useTransition } from "react";

const DATE_FIELDS = [
  { key: "dispatch", label: "Dispatch Date" },
  { key: "arrival", label: "Arrival Date" },
  { key: "clearance", label: "Clearance Date" },
  { key: "delivery", label: "Delivery Date" },
];

export function KeyDatesEditor({
  action,
  entityId,
  current,
}: {
  action: (formData: FormData) => Promise<void>;
  entityId: string;
  current: Record<string, string>;
}) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("id", entityId);
    startTransition(() => action(fd));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {DATE_FIELDS.map((f) => (
        <div key={f.key}>
          <label className="text-xs text-slate-500 block mb-1">{f.label}</label>
          <input
            type="date"
            name={`date_${f.key}`}
            defaultValue={current[f.key] || ""}
            className="text-sm px-2 py-1.5 rounded border border-slate-200 bg-white w-full"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={pending}
        className="w-full text-sm py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save Dates"}
      </button>
    </form>
  );
}
