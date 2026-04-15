import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileIcon, MapPin, Package, Phone, Mail, Building2, Ship } from "lucide-react";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { AssignSelect } from "@/components/admin/AssignSelect";
import { NoteForm } from "@/components/admin/NoteForm";
import { ConvertButton } from "@/components/admin/ConvertButton";
import { FollowUpForm } from "@/components/admin/FollowUpForm";
import {
  updateInquiryStatus,
  assignInquiry,
  addInquiryNote,
  setFollowUp,
  convertToShipment,
} from "../actions";

const STATUSES = ["new", "contacted", "quoted", "won", "lost"];

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceRoleClient();
  if (!supabase) return <p className="p-8 text-slate-500">Database not configured.</p>;

  const { data: inquiry } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (!inquiry) notFound();

  const [{ data: files }, { data: notes }, { data: staff }] = await Promise.all([
    supabase.from("inquiry_files").select("*").eq("inquiry_id", id).order("created_at", { ascending: false }),
    supabase.from("inquiry_notes").select("*, staff_users(full_name)").eq("inquiry_id", id).order("created_at", { ascending: false }),
    supabase.from("staff_users").select("id, full_name").eq("is_active", true).order("full_name"),
  ]);

  const cargo = (inquiry.cargo && typeof inquiry.cargo === "object") ? inquiry.cargo as Record<string, string> : {};
  const assigneeName = staff?.find((s) => s.id === inquiry.assigned_to)?.full_name;

  return (
    <div className="max-w-5xl">
      <Link href="/admin/inquiries" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={16} />
        Back to inquiries
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{inquiry.inquiry_no}</h1>
          <p className="text-sm text-slate-500 mt-1">
            Submitted {new Date(inquiry.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <StatusSelect
            currentStatus={inquiry.status}
            statuses={STATUSES}
            action={updateInquiryStatus}
            entityId={id}
          />
          {inquiry.status !== "won" && inquiry.status !== "lost" && (
            <ConvertButton action={convertToShipment} entityId={id} />
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route & Cargo */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Shipment Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Origin</p>
                  <p className="font-medium text-slate-900">{inquiry.origin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Destination</p>
                  <p className="font-medium text-slate-900">{inquiry.destination}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ship size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Method</p>
                  <p className="font-medium text-slate-900 capitalize">{inquiry.method}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Cargo</p>
                  {Object.keys(cargo).length > 0 ? (
                    <div className="space-y-0.5">
                      {Object.entries(cargo).map(([k, v]) =>
                        v ? (
                          <p key={k} className="text-sm text-slate-700">
                            <span className="text-slate-500 capitalize">{k}:</span> {v}
                          </p>
                        ) : null
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">Not specified</p>
                  )}
                </div>
              </div>
            </div>
            {inquiry.requirements && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Requirements</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{inquiry.requirements}</p>
              </div>
            )}
          </div>

          {/* Files */}
          {files && files.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Attached Files</h2>
              <div className="space-y-2">
                {files.map((f) => (
                  <a
                    key={f.id}
                    href={f.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <FileIcon size={18} className="text-slate-400" />
                    <span className="text-sm text-slate-700 flex-1 truncate">{f.file_url.split("/").pop()}</span>
                    <span className="text-xs text-slate-400 uppercase">{f.file_type}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Communication Notes</h2>
            <NoteForm action={addInquiryNote} entityId={id} fieldName="inquiry_id" />
            {notes && notes.length > 0 ? (
              <div className="mt-4 space-y-3">
                {notes.map((n: Record<string, unknown>) => (
                  <div key={n.id as string} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-sm text-slate-700">{n.body as string}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {(n.staff_users as Record<string, string> | null)?.full_name || "System"} &middot;{" "}
                      {new Date(n.created_at as string).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">No notes yet.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Contact</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Building2 size={16} className="text-slate-400" />
                <span className="text-slate-700">{inquiry.company_name || "—"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  {inquiry.full_name?.charAt(0)}
                </span>
                <span className="text-slate-700">{inquiry.full_name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-slate-400" />
                <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">{inquiry.email}</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-slate-400" />
                <span className="text-slate-700">{inquiry.phone}</span>
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Assigned To</h2>
            <AssignSelect
              currentAssignee={inquiry.assigned_to}
              staff={staff || []}
              action={assignInquiry}
              entityId={id}
            />
            {assigneeName && <p className="text-xs text-slate-500 mt-2">Current: {assigneeName}</p>}
          </div>

          {/* Follow-up */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Follow-up</h2>
            <FollowUpForm action={setFollowUp} entityId={id} current={inquiry.follow_up_at} />
          </div>
        </div>
      </div>
    </div>
  );
}
