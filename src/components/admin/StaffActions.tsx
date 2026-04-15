"use client";

import { useTransition } from "react";

const ROLES = ["admin", "operations", "documentation", "customer_service"];

export function RoleSelect({
  staffId,
  currentRole,
  action,
}: {
  staffId: string;
  currentRole: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fd = new FormData();
    fd.set("id", staffId);
    fd.set("role", e.target.value);
    startTransition(() => action(fd));
  };

  return (
    <select
      value={currentRole}
      onChange={handleChange}
      disabled={pending}
      className="text-sm px-2 py-1 rounded border border-slate-200 disabled:opacity-50"
    >
      {ROLES.map((r) => (
        <option key={r} value={r}>
          {r.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}

export function ToggleActiveButton({
  staffId,
  isActive,
  action,
}: {
  staffId: string;
  isActive: boolean;
  action: (formData: FormData) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    const fd = new FormData();
    fd.set("id", staffId);
    fd.set("is_active", String(isActive));
    startTransition(() => action(fd));
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`text-xs px-2.5 py-1 rounded-lg font-medium disabled:opacity-50 ${
        isActive
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-green-50 text-green-600 hover:bg-green-100"
      }`}
    >
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
}
