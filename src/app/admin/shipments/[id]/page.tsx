import { createServiceRoleClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Ship, FileIcon, User } from "lucide-react";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { AssignSelect } from "@/components/admin/AssignSelect";
import { NoteForm } from "@/components/admin/NoteForm";
import { ShipmentTimeline } from "@/components/admin/ShipmentTimeline";
import { KeyDatesEditor } from "@/components/admin/KeyDatesEditor";
import { NotesEditor } from "@/components/admin/NotesEditor";
import {
  updateShipmentStatus,
  assignShipment,
  addShipmentEvent,
  updateKeyDates,
  updateShipmentNotes,
} from "../actions";

const STATUSES = ["draft", "booked", "in_transit", "arrived", "clearing", "out_for_delivery", "delivered"];

export default async function ShipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceRoleClient();
  if (!supabase) return <p className="p-8 text-slate-500">Database not configured.</p>;

  const { data: shipment } = await supabase
    .from("shipments")
    .select("*, clients(id, company_name, contact_name, email, phone)")
    .eq("id", id)
    .single();

  if (!shipment) notFound();

  const [{ data: events }, { data: docs }, { data: staff }] = await Promise.all([
    supabase.from("shipment_events").select("*").eq("shipment_id", id).order("created_at", { ascending: false }),
    supabase.from("shipment_documents").select("*").eq("shipment_id", id).order("created_at", { ascending: false }),
    supabase.from("staff_users").select("id, full_name").eq("is_active", true).order("full_name"),
  ]);

  const keyDates = (shipment.key_dates && typeof shipment.key_dates === "object")
    ? shipment.key_dates as Record<string, string>
    : {};
  const client = shipment.clients as Record<string, string> | null;
  const cargo = (shipment.cargo && typeof shipment.cargo === "object") ? shipment.cargo as Record<string, string> : {};

  return (
    <div className="max-w-5xl">
      <Link href="/admin/shipments" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={16} />
        Back to shipments
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{shipment.shipment_no}</h1>
          <p className="text-sm text-slate-500 mt-1">
            Created {new Date(shipment.created_at).toLocaleString()}
          </p>
        </div>
        <StatusSelect
          currentStatus={shipment.status}
          statuses={STATUSES}
          action={updateShipmentStatus}
          entityId={id}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Route & Cargo</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Origin</p>
                  <p className="font-medium text-slate-900">{shipment.origin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Destination</p>
                  <p className="font-medium text-slate-900">{shipment.destination}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ship size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Method</p>
                  <p className="font-medium text-slate-900 capitalize">{shipment.method}</p>
                </div>
              </div>
              {Object.keys(cargo).length > 0 && (
                <div className="flex items-start gap-3">
                  <Ship size={18} className="text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500">Cargo</p>
                    {Object.entries(cargo).map(([k, v]) =>
                      v ? <p key={k} className="text-sm text-slate-700"><span className="text-slate-500 capitalize">{k}:</span> {v}</p> : null
                    )}
                  </div>
                </div>
              )}
            </div>
            {shipment.inquiry_id && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link href={`/admin/inquiries/${shipment.inquiry_id}`} className="text-sm text-blue-600 hover:underline">
                  View linked inquiry →
                </Link>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Documents</h2>
            {docs && docs.length > 0 ? (
              <div className="space-y-2">
                {docs.map((d) => (
                  <a
                    key={d.id}
                    href={d.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <FileIcon size={18} className="text-slate-400" />
                    <span className="text-sm text-slate-700 flex-1 truncate">{d.file_url.split("/").pop()}</span>
                    <span className="text-xs text-slate-400 uppercase">{d.doc_type}</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No documents uploaded.</p>
            )}
          </div>

          {/* Event Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Activity Log</h2>
            <NoteForm action={addShipmentEvent} entityId={id} fieldName="shipment_id" />
            <div className="mt-4">
              <ShipmentTimeline events={events || []} />
            </div>
          </div>

          {/* Cost & Service Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Cost & Service Notes</h2>
            <NotesEditor
              action={updateShipmentNotes}
              entityId={id}
              costNotes={shipment.cost_notes || ""}
              serviceNotes={shipment.service_notes || ""}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Client</h2>
            {client ? (
              <div className="space-y-2 text-sm">
                <Link href={`/admin/clients/${client.id}`} className="font-medium text-blue-600 hover:underline block">
                  {client.company_name}
                </Link>
                <p className="text-slate-600">{client.contact_name}</p>
                <p className="text-slate-500">{client.email}</p>
                <p className="text-slate-500">{client.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No client linked.</p>
            )}
          </div>

          {/* Assignment */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Assigned To</h2>
            <AssignSelect
              currentAssignee={shipment.assigned_to}
              staff={staff || []}
              action={assignShipment}
              entityId={id}
            />
          </div>

          {/* Key Dates */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Key Dates</h2>
            <KeyDatesEditor action={updateKeyDates} entityId={id} current={keyDates} />
          </div>
        </div>
      </div>
    </div>
  );
}
