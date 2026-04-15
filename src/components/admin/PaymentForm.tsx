"use client";

import { useTransition } from "react";

export function PaymentForm({
  invoiceId,
  action,
}: {
  invoiceId: string;
  action: (fd: FormData) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        fd.set("invoice_id", invoiceId);
        startTransition(() => action(fd));
        e.currentTarget.reset();
      }}
      className="border-t border-slate-100 pt-4"
    >
      <h3 className="text-xs font-semibold text-slate-600 mb-3">Record Payment</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        <input
          name="amount"
          type="number"
          step="0.01"
          required
          placeholder="Amount"
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        />
        <select
          name="method"
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        >
          <option value="">Method</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="mobile_money">Mobile Money</option>
          <option value="cash">Cash</option>
          <option value="check">Check</option>
        </select>
        <input
          name="reference"
          type="text"
          placeholder="Reference #"
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Record Payment"}
      </button>
    </form>
  );
}
