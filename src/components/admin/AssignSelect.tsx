"use client";

import { useTransition } from "react";

interface AssignSelectProps {
  currentAssignee: string | null;
  staff: { id: string; full_name: string }[];
  action: (formData: FormData) => Promise<void>;
  entityId: string;
}

export function AssignSelect({ currentAssignee, staff, action, entityId }: AssignSelectProps) {
  const [pending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fd = new FormData();
    fd.set("id", entityId);
    fd.set("assigned_to", e.target.value);
    startTransition(() => {
      action(fd);
    });
  };

  return (
    <select
      value={currentAssignee || ""}
      onChange={handleChange}
      disabled={pending}
      className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-50"
    >
      <option value="">Unassigned</option>
      {staff.map((s) => (
        <option key={s.id} value={s.id}>
          {s.full_name}
        </option>
      ))}
    </select>
  );
}
