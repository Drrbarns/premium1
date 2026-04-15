import { createServiceRoleClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RoleSelect, ToggleActiveButton } from "@/components/admin/StaffActions";
import { createStaff, updateStaffRole, toggleStaffActive } from "./actions";

async function handleCreate(formData: FormData) {
  "use server";
  await createStaff(formData);
  redirect("/admin/staff");
}

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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Staff & Role Management</h1>
      </div>

      {/* Add Staff Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 max-w-2xl">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Add Staff Member</h2>
        <form action={handleCreate} className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="text-xs text-slate-500 block mb-1">Full Name</label>
            <input name="full_name" required className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="text-xs text-slate-500 block mb-1">Email</label>
            <input name="email" type="email" required className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200" />
          </div>
          <div className="w-40">
            <label className="text-xs text-slate-500 block mb-1">Role</label>
            <select name="role" className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200">
              <option value="operations">Operations</option>
              <option value="documentation">Documentation</option>
              <option value="customer_service">Customer Service</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
            Add
          </button>
        </form>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-left p-4 font-medium">Email</th>
              <th className="text-left p-4 font-medium">Role</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No staff members yet. Add one above.
                </td>
              </tr>
            ) : (
              staff.map((s) => (
                <tr key={s.id} className="border-b border-slate-100">
                  <td className="p-4 font-medium text-slate-900">{s.full_name}</td>
                  <td className="p-4 text-slate-600">{s.email}</td>
                  <td className="p-4">
                    <RoleSelect staffId={s.id} currentRole={s.role} action={updateStaffRole} />
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.is_active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {s.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <ToggleActiveButton staffId={s.id} isActive={s.is_active} action={toggleStaffActive} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
