import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { getNavItems, type StaffRole } from "@/lib/auth/roles";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let userEmail: string | null = null;
  let role: StaffRole = "admin";

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;

    if (userEmail) {
      const svc = createServiceRoleClient();
      if (svc) {
        const { data: staffRow } = await svc
          .from("staff_users")
          .select("role")
          .eq("email", userEmail)
          .single();
        if (staffRow?.role) role = staffRow.role as StaffRole;
      }
    }
  }

  const navItems = getNavItems(role);

  return (
    <AdminShell navItems={navItems} userEmail={userEmail}>
      {children}
    </AdminShell>
  );
}
