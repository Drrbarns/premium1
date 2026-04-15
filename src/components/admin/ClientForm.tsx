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
    tier?: string | null;
    industry?: string | null;
    credit_limit?: number | null;
    payment_terms?: string | null;
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

  const inputClass = "w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-600 block mb-1">Company Name *</label>
        <input name="company_name" required defaultValue={client?.company_name} className={inputClass} />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 block mb-1">Contact Name *</label>
        <input name="contact_name" required defaultValue={client?.contact_name} className={inputClass} />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 block mb-1">Email *</label>
        <input name="email" type="email" required defaultValue={client?.email} className={inputClass} />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 block mb-1">Phone *</label>
        <input name="phone" required defaultValue={client?.phone} className={inputClass} />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 block mb-1">Address</label>
        <input name="address" defaultValue={client?.address || ""} className={inputClass} />
      </div>

      {/* New CRM fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Tier</label>
          <select name="tier" defaultValue={client?.tier || "standard"} className={inputClass}>
            <option value="new">New</option>
            <option value="standard">Standard</option>
            <option value="vip">VIP</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Industry</label>
          <input name="industry" defaultValue={client?.industry || ""} placeholder="e.g. Manufacturing" className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Credit Limit ($)</label>
          <input name="credit_limit" type="number" step="0.01" defaultValue={client?.credit_limit || ""} className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Payment Terms</label>
          <select name="payment_terms" defaultValue={client?.payment_terms || "net_30"} className={inputClass}>
            <option value="prepaid">Prepaid</option>
            <option value="net_15">Net 15</option>
            <option value="net_30">Net 30</option>
            <option value="net_60">Net 60</option>
          </select>
        </div>
      </div>

      {client && (
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">General Notes</label>
          <textarea name="notes" rows={3} defaultValue={client?.notes || ""} className={`${inputClass} resize-none`} />
        </div>
      )}

      <button type="submit" disabled={pending} className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-colors">
        {pending ? "Saving…" : client ? "Update Client" : "Create Client"}
      </button>
    </form>
  );
}
