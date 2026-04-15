import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Inbox, Truck, Users, Plus, ArrowRight } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = createServiceRoleClient();
  let stats = { inquiries: 0, shipments: 0, clients: 0 };
  let pipeline: Record<string, number> = {};
  let recentInquiries: { id: string; inquiry_no: string; full_name: string; status: string; created_at: string }[] = [];
  let recentShipments: { id: string; shipment_no: string; origin: string; destination: string; status: string; created_at: string }[] = [];

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

    // Pipeline counts
    const { data: pipeData } = await supabase
      .from("inquiries")
      .select("status");
    if (pipeData) {
      pipeData.forEach((r) => {
        pipeline[r.status] = (pipeline[r.status] || 0) + 1;
      });
    }

    // Recent items
    const { data: ri } = await supabase
      .from("inquiries")
      .select("id, inquiry_no, full_name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);
    recentInquiries = ri || [];

    const { data: rs } = await supabase
      .from("shipments")
      .select("id, shipment_no, origin, destination, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);
    recentShipments = rs || [];
  }

  const STAT_CARDS = [
    { label: "Inquiries", value: stats.inquiries, href: "/admin/inquiries", icon: Inbox, color: "bg-blue-50 text-blue-600" },
    { label: "Shipments", value: stats.shipments, href: "/admin/shipments", icon: Truck, color: "bg-amber-50 text-amber-600" },
    { label: "Clients", value: stats.clients, href: "/admin/clients", icon: Users, color: "bg-green-50 text-green-600" },
  ];

  const PIPELINE_STAGES = [
    { key: "new", label: "New", color: "bg-blue-500" },
    { key: "contacted", label: "Contacted", color: "bg-amber-500" },
    { key: "quoted", label: "Quoted", color: "bg-purple-500" },
    { key: "won", label: "Won", color: "bg-green-500" },
    { key: "lost", label: "Lost", color: "bg-slate-400" },
  ];

  const STATUS_COLORS: Record<string, string> = {
    new: "bg-blue-50 text-blue-700",
    contacted: "bg-amber-50 text-amber-700",
    quoted: "bg-purple-50 text-purple-700",
    won: "bg-green-50 text-green-700",
    lost: "bg-slate-100 text-slate-600",
    draft: "bg-slate-100 text-slate-600",
    booked: "bg-blue-50 text-blue-700",
    in_transit: "bg-amber-50 text-amber-700",
    arrived: "bg-cyan-50 text-cyan-700",
    clearing: "bg-purple-50 text-purple-700",
    out_for_delivery: "bg-orange-50 text-orange-700",
    delivered: "bg-green-50 text-green-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/shipments/new"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
          >
            <Plus size={16} />
            New Shipment
          </Link>
          <Link
            href="/admin/clients/new"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50"
          >
            <Plus size={16} />
            New Client
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {STAT_CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center`}>
                <Icon size={22} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{c.value}</div>
                <div className="text-sm text-slate-500">{c.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pipeline */}
      {Object.keys(pipeline).length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Inquiry Pipeline</h2>
          <div className="flex gap-3">
            {PIPELINE_STAGES.map((stage) => {
              const count = pipeline[stage.key] || 0;
              return (
                <div key={stage.key} className="flex-1 text-center">
                  <div className={`h-2 rounded-full ${stage.color} mb-2`} style={{ opacity: count > 0 ? 1 : 0.2 }} />
                  <div className="text-xl font-bold text-slate-900">{count}</div>
                  <div className="text-xs text-slate-500 capitalize">{stage.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recentInquiries.length > 0 ? (
            <div className="space-y-2">
              {recentInquiries.map((inq) => (
                <Link
                  key={inq.id}
                  href={`/admin/inquiries/${inq.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{inq.inquiry_no}</p>
                    <p className="text-xs text-slate-500">{inq.full_name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[inq.status] || "bg-slate-100"}`}>
                      {inq.status}
                    </span>
                    <span className="text-xs text-slate-400">{new Date(inq.created_at).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No inquiries yet.</p>
          )}
        </div>

        {/* Recent Shipments */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Recent Shipments</h2>
            <Link href="/admin/shipments" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recentShipments.length > 0 ? (
            <div className="space-y-2">
              {recentShipments.map((s) => (
                <Link
                  key={s.id}
                  href={`/admin/shipments/${s.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{s.shipment_no}</p>
                    <p className="text-xs text-slate-500">{s.origin} → {s.destination}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[s.status] || "bg-slate-100"}`}>
                      {s.status.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs text-slate-400">{new Date(s.created_at).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No shipments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
