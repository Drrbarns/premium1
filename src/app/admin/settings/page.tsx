import { createServiceRoleClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { SettingsForm } from "@/components/admin/SettingsForm";

async function updateSettings(formData: FormData) {
  "use server";
  const supabase = createServiceRoleClient();
  if (!supabase) return;

  const id = formData.get("id") as string;
  await supabase
    .from("site_settings")
    .update({
      company_name: formData.get("company_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: (formData.get("address") as string) || null,
      whatsapp_number: (formData.get("whatsapp_number") as string) || null,
      tagline: (formData.get("tagline") as string) || null,
    })
    .eq("id", id);

  revalidatePath("/admin/settings");
}

export default async function SettingsPage() {
  const supabase = createServiceRoleClient();
  if (!supabase) return <p className="text-slate-500">Connect Supabase.</p>;

  const { data: settings } = await supabase.from("site_settings").select("*").limit(1).single();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Company information and preferences</p>
      </div>

      {settings ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-800 mb-4">Company Information</h2>
          <SettingsForm settings={settings} action={updateSettings} />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500 text-sm">No settings found. Run seed script to populate.</p>
        </div>
      )}

      {/* System Info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800 mb-4">System</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-50">
            <span className="text-slate-500">Platform</span>
            <span className="font-medium text-slate-800">Premium 1 Operations Management System</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-50">
            <span className="text-slate-500">Framework</span>
            <span className="font-medium text-slate-800">Next.js + Supabase</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Keyboard Shortcuts</span>
            <span className="font-medium text-slate-800">⌘K — Global Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}
