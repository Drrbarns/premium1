import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Truck } from "lucide-react";
import { NoteForm } from "@/components/admin/NoteForm";
import { ClientForm } from "@/components/admin/ClientForm";
import { updateClient, addClientNote } from "../actions";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceRoleClient();
  if (!supabase) return <p className="p-8 text-slate-500">Database not configured.</p>;

  const { data: client } = await supabase.from("clients").select("*").eq("id", id).single();
  if (!client) notFound();

  const [{ data: shipments }, { data: notes }] = await Promise.all([
    supabase
      .from("shipments")
      .select("id, shipment_no, origin, destination, status, created_at")
      .eq("client_id", id)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("client_notes")
      .select("*, staff_users(full_name)")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const STATUS_COLORS: Record<string, string> = {
    draft: "bg-slate-100 text-slate-600",
    booked: "bg-blue-50 text-blue-700",
    in_transit: "bg-amber-50 text-amber-700",
    arrived: "bg-cyan-50 text-cyan-700",
    clearing: "bg-purple-50 text-purple-700",
    out_for_delivery: "bg-orange-50 text-orange-700",
    delivered: "bg-green-50 text-green-700",
  };

  return (
    <div className="max-w-5xl">
      <Link href="/admin/clients" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={16} />
        Back to clients
      </Link>

      <h1 className="text-2xl font-semibold text-slate-900 mb-2">{client.company_name}</h1>
      <p className="text-sm text-slate-500 mb-8">{client.contact_name} &middot; {client.email} &middot; {client.phone}</p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipment History */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Shipment History</h2>
            {shipments && shipments.length > 0 ? (
              <div className="space-y-2">
                {shipments.map((s) => (
                  <Link
                    key={s.id}
                    href={`/admin/shipments/${s.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Truck size={16} className="text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{s.shipment_no}</p>
                        <p className="text-xs text-slate-500">{s.origin} → {s.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[s.status] || "bg-slate-100"}`}>
                        {s.status.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs text-slate-400">{new Date(s.created_at).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No shipments for this client.</p>
            )}
          </div>

          {/* Communication Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Communication Notes</h2>
            <NoteForm action={addClientNote} entityId={id} fieldName="client_id" />
            {notes && notes.length > 0 ? (
              <div className="mt-4 space-y-3">
                {notes.map((n: Record<string, unknown>) => (
                  <div key={n.id as string} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-sm text-slate-700">{n.body as string}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {(n.staff_users as Record<string, string> | null)?.full_name || "System"} &middot;{" "}
                      {new Date(n.created_at as string).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">No notes yet.</p>
            )}
          </div>
        </div>

        {/* Sidebar - Edit Form */}
        <div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Edit Client</h2>
            <ClientForm action={updateClient} client={client} />
          </div>
        </div>
      </div>
    </div>
  );
}
