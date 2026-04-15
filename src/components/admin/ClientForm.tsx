"use client";

import { useTransition } from "react";

interface ClientFormProps {
  action: (formData: FormData) => Promise<void>;
  client?: {
    id: string;
    company_name: string;
    contact_name: string;
    email: string;
    phone: string;
    address?: string | null;
    notes?: string | null;
  };
}

export function ClientForm({ action, client }: ClientFormProps) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (client) fd.set("id", client.id);
    startTransition(() => action(fd));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Company Name *</label>
          <input name="company_name" required defaultValue={client?.company_name} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Contact Name *</label>
          <input name="contact_name" required defaultValue={client?.contact_name} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Email *</label>
          <input name="email" type="email" required defaultValue={client?.email} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Phone *</label>
          <input name="phone" required defaultValue={client?.phone} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1">Address</label>
        <input name="address" defaultValue={client?.address || ""} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
      </div>
      {client && (
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">General Notes</label>
          <textarea name="notes" rows={3} defaultValue={client?.notes || ""} className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 resize-none" />
        </div>
      )}
      <button type="submit" disabled={pending} className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50">
        {pending ? "Saving..." : client ? "Update Client" : "Create Client"}
      </button>
    </form>
  );
}
