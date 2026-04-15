"use client";

import { useRef, useTransition } from "react";
import { Send } from "lucide-react";

interface NoteFormProps {
  action: (formData: FormData) => Promise<void>;
  entityId: string;
  fieldName?: string;
}

export function NoteForm({ action, entityId, fieldName = "inquiry_id" }: NoteFormProps) {
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (fd: FormData) => {
    startTransition(async () => {
      await action(fd);
      ref.current?.reset();
    });
  };

  return (
    <form ref={ref} action={handleSubmit} className="flex gap-2">
      <input type="hidden" name={fieldName} value={entityId} />
      <input
        name="body"
        required
        placeholder="Add a note..."
        className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
      />
      <button
        type="submit"
        disabled={pending}
        className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 flex items-center gap-1.5"
      >
        <Send size={14} />
        {pending ? "..." : "Add"}
      </button>
    </form>
  );
}
