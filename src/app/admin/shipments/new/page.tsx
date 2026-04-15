import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createShipment } from "../actions";
import { redirect } from "next/navigation";

async function handleCreate(formData: FormData) {
  "use server";
  await createShipment(formData);
  redirect("/admin/shipments");
}

export default async function NewShipmentPage() {
  const supabase = createServiceRoleClient();
  let clients: { id: string; company_name: string }[] = [];

  if (supabase) {
    const { data } = await supabase.from("clients").select("id, company_name").order("company_name");
    clients = data || [];
  }

  return (
    <div className="max-w-2xl">
      <Link href="/admin/shipments" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={16} />
        Back to shipments
      </Link>

      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Create Shipment</h1>

      <form action={handleCreate} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Client *</label>
          <select name="client_id" required className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200">
            <option value="">Select client...</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.company_name}</option>
            ))}
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Origin *</label>
            <input name="origin" required className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Destination *</label>
            <input name="destination" required className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Method</label>
          <select name="method" className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200">
            <option value="sea">Sea</option>
            <option value="air">Air</option>
            <option value="road">Road</option>
            <option value="multimodal">Multimodal</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
        >
          Create Shipment
        </button>
      </form>
    </div>
  );
}
