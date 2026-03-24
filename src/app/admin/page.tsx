import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = createServiceRoleClient();
  let stats = { inquiries: 0, shipments: 0, clients: 0 };

  if (supabase) {
    const [i, s, c] = await Promise.all([
      supabase.from("inquiries").select("id", { count: "exact", head: true }),
      supabase.from("shipments").select("id", { count: "exact", head: true }),
      supabase.from("clients").select("id", { count: "exact", head: true }),
    ]);
    stats = {
      inquiries: i.count ?? 0,
      shipments: s.count ?? 0,
      clients: c.count ?? 0,
    };
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/inquiries" className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300">
          <div className="text-3xl font-bold text-slate-900">{stats.inquiries}</div>
          <div className="text-slate-600 mt-1">Inquiries</div>
        </Link>
        <Link href="/admin/shipments" className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300">
          <div className="text-3xl font-bold text-slate-900">{stats.shipments}</div>
          <div className="text-slate-600 mt-1">Shipments</div>
        </Link>
        <Link href="/admin/clients" className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300">
          <div className="text-3xl font-bold text-slate-900">{stats.clients}</div>
          <div className="text-slate-600 mt-1">Clients</div>
        </Link>
      </div>
    </div>
  );
}
