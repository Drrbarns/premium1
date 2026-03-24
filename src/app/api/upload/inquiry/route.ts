import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const inquiryId = formData.get("inquiry_id") as string | null;

    if (!file || !inquiryId) {
      return NextResponse.json(
        { error: "Missing file or inquiry_id" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();
    if (!supabase) {
      return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
    }

    const ext = file.name.split(".").pop() || "bin";
    const path = `${inquiryId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("inquiry-uploads")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from("inquiry-uploads").getPublicUrl(uploadData.path);

    const { error: dbError } = await supabase.from("inquiry_files").insert({
      inquiry_id: inquiryId,
      file_url: urlData.publicUrl,
      file_type: ext,
    });

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, path: uploadData.path });
  } catch (e) {
    console.error("Upload API error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
