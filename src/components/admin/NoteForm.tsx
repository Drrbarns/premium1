"use client";

import { useRef, useTransition } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

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
      toast.success("Note added");
    });
  };

  return (
    <form ref={ref} action={handleSubmit} className="flex gap-2">
      <input type="hidden" name={fieldName} value={entityId} />
      <input
        name="body"
        required
        placeholder="Add a note..."
        className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
      />
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-50 flex items-center gap-1.5 transition-colors"
      >
        <Send size={14} />
        {pending ? "..." : "Add"}
      </button>
    </form>
  );
}
