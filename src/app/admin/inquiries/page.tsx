import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-[var(--accent-soft)] text-[var(--navy)]",
  contacted: "bg-[var(--accent-soft)] text-[var(--accent)]",
  quoted: "bg-[var(--accent-soft)] text-[var(--navy)]",
  won: "bg-[var(--accent-soft)] text-[var(--accent)]",
  lost: "bg-slate-100 text-slate-800",
};

export default async function InquiriesPage() {
  const supabase = createServiceRoleClient();
  let inquiries: { id: string; inquiry_no: string; full_name: string; company_name: string | null; email: string; status: string; created_at: string }[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("inquiries")
      .select("id, inquiry_no, full_name, company_name, email, status, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    inquiries = data || [];
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Lead & Inquiry Management</h1>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-medium">Inquiry #</th>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-left p-4 font-medium">Company</th>
              <th className="text-left p-4 font-medium">Email</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500">No inquiries yet.</td></tr>
            ) : (
              inquiries.map((i) => (
                <tr key={i.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4"><Link href={`/admin/inquiries/${i.id}`} className="text-slate-900 font-medium hover:underline">{i.inquiry_no}</Link></td>
                  <td className="p-4">{i.full_name}</td>
                  <td className="p-4">{i.company_name || "-"}</td>
                  <td className="p-4">{i.email}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[i.status] || "bg-slate-100"}`}>{i.status}</span></td>
                  <td className="p-4">{new Date(i.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
