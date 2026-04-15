import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientForm } from "@/components/admin/ClientForm";
import { createClient } from "../actions";
import { redirect } from "next/navigation";

async function handleCreate(formData: FormData) {
  "use server";
  await createClient(formData);
  redirect("/admin/clients");
}

export default function NewClientPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/clients" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={16} />
        Back to clients
      </Link>

      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Create Client</h1>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <ClientForm action={handleCreate} />
      </div>
    </div>
  );
}
