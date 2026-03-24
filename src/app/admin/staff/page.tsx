import { createServiceRoleClient } from "@/lib/supabase/server";

export default async function StaffPage() {
  const supabase = createServiceRoleClient();
  let staff: { id: string; full_name: string; email: string; role: string; is_active: boolean }[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("staff_users")
      .select("id, full_name, email, role, is_active")
      .order("full_name");
    staff = data || [];
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Staff & Role Management</h1>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-left p-4 font-medium">Email</th>
              <th className="text-left p-4 font-medium">Role</th>
              <th className="text-left p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {staff.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No staff users yet. Add via Supabase Auth + staff_users table.</td></tr>
            ) : (
              staff.map((s) => (
                <tr key={s.id} className="border-b border-slate-100">
                  <td className="p-4">{s.full_name}</td>
                  <td className="p-4">{s.email}</td>
                  <td className="p-4">{s.role}</td>
                  <td className="p-4">{s.is_active ? "Active" : "Inactive"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
