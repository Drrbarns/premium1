"use client";

import { useTransition } from "react";
import { CalendarClock } from "lucide-react";

export function FollowUpForm({
  action,
  entityId,
  current,
}: {
  action: (formData: FormData) => Promise<void>;
  entityId: string;
  current: string | null;
}) {
  const [pending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fd = new FormData();
    fd.set("id", entityId);
    fd.set("follow_up_at", e.target.value);
    startTransition(() => action(fd));
  };

  return (
    <div className="flex items-center gap-2">
      <CalendarClock size={16} className="text-slate-400" />
      <input
        type="datetime-local"
        defaultValue={current ? current.slice(0, 16) : ""}
        onChange={handleChange}
        disabled={pending}
        className="text-sm px-2 py-1 rounded border border-slate-200 bg-white disabled:opacity-50"
      />
    </div>
  );
}
