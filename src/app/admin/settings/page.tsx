import { createServiceRoleClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = createServiceRoleClient();
  let settings: { company_name: string; email: string; phone: string } | null = null;

  if (supabase) {
    const { data } = await supabase.from("site_settings").select("company_name, email, phone").limit(1).single();
    settings = data;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Site Settings</h1>
      <div className="bg-white rounded-lg border border-slate-200 p-6 max-w-xl">
        {settings ? (
          <dl className="space-y-4">
            <div><dt className="text-sm text-slate-500">Company Name</dt><dd className="font-medium">{settings.company_name}</dd></div>
            <div><dt className="text-sm text-slate-500">Email</dt><dd className="font-medium">{settings.email}</dd></div>
            <div><dt className="text-sm text-slate-500">Phone</dt><dd className="font-medium">{settings.phone}</dd></div>
          </dl>
        ) : (
          <p className="text-slate-500">No settings found. Run seed script to populate.</p>
        )}
      </div>
    </div>
  );
}
