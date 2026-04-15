import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InvoiceForm } from "@/components/admin/InvoiceForm";
import { createInvoice } from "../actions";
import { redirect } from "next/navigation";

async function handleCreate(formData: FormData) {
  "use server";
  const id = await createInvoice(formData);
  redirect(id ? `/admin/finance/${id}` : "/admin/finance");
}

export default async function NewInvoicePage() {
  const supabase = createServiceRoleClient();
  const { data: clients } = await supabase
    ?.from("clients")
    .select("id, company_name")
    .order("company_name") || { data: [] };

  const { data: shipments } = await supabase
    ?.from("shipments")
    .select("id, shipment_no")
    .order("created_at", { ascending: false })
    .limit(50) || { data: [] };

  return (
    <div className="max-w-3xl">
      <Link href="/admin/finance" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={16} /> Back to finance
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Create Invoice</h1>
      <InvoiceForm
        action={handleCreate}
        clients={clients || []}
        shipments={shipments || []}
      />
    </div>
  );
}
