"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload, X, FileText, Loader2 } from "lucide-react";

const DOC_TYPES = [
  { value: "bill_of_lading", label: "Bill of Lading" },
  { value: "commercial_invoice", label: "Commercial Invoice" },
  { value: "packing_list", label: "Packing List" },
  { value: "certificate_of_origin", label: "Certificate of Origin" },
  { value: "customs_declaration", label: "Customs Declaration" },
  { value: "insurance_certificate", label: "Insurance Certificate" },
  { value: "delivery_note", label: "Delivery Note" },
  { value: "other", label: "Other" },
];

export function DocumentUpload({
  shipments,
}: {
  shipments: { id: string; shipment_no: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [shipmentId, setShipmentId] = useState("");
  const [docType, setDocType] = useState("other");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    setFiles((prev) => [...prev, ...arr]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = async () => {
    if (!shipmentId || files.length === 0) {
      toast.error("Select a shipment and at least one file");
      return;
    }

    setUploading(true);
    let success = 0;
    let failed = 0;

    for (const file of files) {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("shipment_id", shipmentId);
      fd.set("doc_type", docType);

      try {
        const res = await fetch("/api/upload/document", { method: "POST", body: fd });
        if (res.ok) {
          success++;
        } else {
          const data = await res.json();
          console.error("Upload failed:", data.error);
          failed++;
        }
      } catch {
        failed++;
      }
    }

    setUploading(false);

    if (success > 0) {
      toast.success(`${success} document${success > 1 ? "s" : ""} uploaded`);
      setFiles([]);
      setOpen(false);
      router.refresh();
    }
    if (failed > 0) {
      toast.error(`${failed} upload${failed > 1 ? "s" : ""} failed`);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm"
      >
        <Upload size={16} /> Upload Documents
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">Upload Documents</h2>
        <button
          onClick={() => {
            setOpen(false);
            setFiles([]);
          }}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
        >
          <X size={16} />
        </button>
      </div>

      {/* Shipment + Type selection */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Shipment *</label>
          <select
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            <option value="">Select shipment</option>
            {shipments.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shipment_no}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Document Type</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {DOC_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-[var(--accent)] bg-[var(--accent)]/5"
            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
        }`}
      >
        <Upload
          size={28}
          className={`mx-auto mb-3 ${dragOver ? "text-[var(--accent)]" : "text-slate-300"}`}
        />
        <p className="text-sm font-semibold text-slate-600">
          Drop files here or click to browse
        </p>
        <p className="text-xs text-slate-400 mt-1">
          PDF, images, documents — up to 10MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <FileText size={16} className="text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{f.name}</p>
                <p className="text-[11px] text-slate-400">
                  {(f.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                onClick={() => removeFile(i)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0 || !shipmentId}
        className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Uploading…
          </>
        ) : (
          <>
            <Upload size={16} /> Upload {files.length} file{files.length !== 1 ? "s" : ""}
          </>
        )}
      </button>
    </div>
  );
}
