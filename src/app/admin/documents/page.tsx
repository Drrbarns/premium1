import { createServiceRoleClient } from "@/lib/supabase/server";

export default async function DocumentsPage() {
  const supabase = createServiceRoleClient();
  let docs: { id: string; doc_type: string; file_url: string; shipment_id: string; created_at: string }[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("shipment_documents")
      .select("id, doc_type, file_url, shipment_id, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    docs = data || [];
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Document Management</h1>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-medium">Type</th>
              <th className="text-left p-4 font-medium">Shipment</th>
              <th className="text-left p-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {docs.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-slate-500">No documents yet.</td></tr>
            ) : (
              docs.map((d) => (
                <tr key={d.id} className="border-b border-slate-100">
                  <td className="p-4">{d.doc_type}</td>
                  <td className="p-4">{d.shipment_id}</td>
                  <td className="p-4">{new Date(d.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
