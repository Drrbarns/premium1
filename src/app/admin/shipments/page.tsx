import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-800",
  booked: "bg-[var(--accent-soft)] text-[var(--accent)]",
  in_transit: "bg-[var(--accent-soft)] text-[var(--navy)]",
  arrived: "bg-[var(--accent-soft)] text-[var(--navy)]",
  clearing: "bg-[var(--accent-soft)] text-[var(--navy)]",
  out_for_delivery: "bg-[var(--accent-soft)] text-[var(--accent)]",
  delivered: "bg-[var(--accent-soft)] text-[var(--accent)]",
};

export default async function ShipmentsPage() {
  const supabase = createServiceRoleClient();
  let shipments: { id: string; shipment_no: string; origin: string; destination: string; status: string; created_at: string }[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("shipments")
      .select("id, shipment_no, origin, destination, status, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    shipments = data || [];
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Shipment Management</h1>
        <Link href="/admin/shipments/new" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
          + New Shipment
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-medium">Shipment #</th>
              <th className="text-left p-4 font-medium">Origin</th>
              <th className="text-left p-4 font-medium">Destination</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {shipments.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No shipments yet.</td></tr>
            ) : (
              shipments.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4"><Link href={`/admin/shipments/${s.id}`} className="text-slate-900 font-medium hover:underline">{s.shipment_no}</Link></td>
                  <td className="p-4">{s.origin}</td>
                  <td className="p-4">{s.destination}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[s.status] || "bg-slate-100"}`}>{s.status.replace(/_/g, " ")}</span></td>
                  <td className="p-4">{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
