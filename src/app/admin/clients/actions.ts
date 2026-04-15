"use server";

import { createServiceRoleClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateClient(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = createServiceRoleClient();
  if (!supabase) return;

  await supabase
    .from("clients")
    .update({
      company_name: formData.get("company_name") as string,
      contact_name: formData.get("contact_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: (formData.get("address") as string) || null,
      notes: (formData.get("notes") as string) || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath(`/admin/clients/${id}`);
  revalidatePath("/admin/clients");
}

export async function addClientNote(formData: FormData) {
  const client_id = formData.get("client_id") as string;
  const body = formData.get("body") as string;
  const supabase = createServiceRoleClient();
  if (!supabase || !body?.trim()) return;

  await supabase.from("client_notes").insert({ client_id, body: body.trim() });
  revalidatePath(`/admin/clients/${client_id}`);
}

export async function createClient(formData: FormData) {
  const supabase = createServiceRoleClient();
  if (!supabase) return;

  await supabase.from("clients").insert({
    company_name: formData.get("company_name") as string,
    contact_name: formData.get("contact_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: (formData.get("address") as string) || null,
  });

  revalidatePath("/admin/clients");
}
