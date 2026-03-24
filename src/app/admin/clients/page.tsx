import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ClientsPage() {
  const supabase = createServiceRoleClient();
  let clients: { id: string; company_name: string; contact_name: string; email: string; phone: string }[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("clients")
      .select("id, company_name, contact_name, email, phone")
      .order("company_name")
      .limit(50);
    clients = data || [];
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Client Database</h1>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-medium">Company</th>
              <th className="text-left p-4 font-medium">Contact</th>
              <th className="text-left p-4 font-medium">Email</th>
              <th className="text-left p-4 font-medium">Phone</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No clients yet.</td></tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4"><Link href={`/admin/clients/${c.id}`} className="text-slate-900 font-medium hover:underline">{c.company_name}</Link></td>
                  <td className="p-4">{c.contact_name}</td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4">{c.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
