import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activity";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const shipmentId = formData.get("shipment_id") as string | null;
    const docType = (formData.get("doc_type") as string) || "other";

    if (!file || !shipmentId) {
      return NextResponse.json({ error: "Missing file or shipment_id" }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    if (!supabase) {
      return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storagePath = `${shipmentId}/${Date.now()}-${safeName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("shipment-documents")
      .upload(storagePath, file, { upsert: false });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("shipment-documents")
      .getPublicUrl(uploadData.path);

    const { error: dbError } = await supabase.from("shipment_documents").insert({
      shipment_id: shipmentId,
      doc_type: docType,
      file_url: urlData.publicUrl,
    });

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    await logActivity({
      entityType: "document",
      entityId: shipmentId,
      action: `uploaded ${docType.replace(/_/g, " ")}`,
      metadata: { filename: file.name },
    });

    return NextResponse.json({ success: true, path: uploadData.path });
  } catch (e) {
    console.error("Document upload error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
