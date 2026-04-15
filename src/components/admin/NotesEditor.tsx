"use client";

import { useTransition } from "react";

export function NotesEditor({
  action,
  entityId,
  costNotes,
  serviceNotes,
}: {
  action: (formData: FormData) => Promise<void>;
  entityId: string;
  costNotes: string;
  serviceNotes: string;
}) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("id", entityId);
    startTransition(() => action(fd));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs text-slate-500 block mb-1">Cost Notes</label>
        <textarea
          name="cost_notes"
          rows={3}
          defaultValue={costNotes}
          className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <div>
        <label className="text-xs text-slate-500 block mb-1">Service Notes</label>
        <textarea
          name="service_notes"
          rows={3}
          defaultValue={serviceNotes}
          className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full text-sm py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save Notes"}
      </button>
    </form>
  );
}
