import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      origin,
      destination,
      cargo,
      method,
      requirements,
      full_name,
      company_name,
      email,
      phone,
      website,
      _hp,
    } = body;

    if (website || _hp) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    if (!origin || !destination || !full_name || !email || !phone || !method) {
      return NextResponse.json(
        { error: "Missing required fields: origin, destination, full_name, email, phone, method" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();
    if (!supabase) {
      if (process.env.ALLOW_QUOTE_WITHOUT_DB === "true") {
        const no = `INQ-DEMO-${Date.now().toString(36).toUpperCase()}`;
        try {
          const staffEmail = process.env.NOTIFY_STAFF_EMAIL || process.env.EMAIL_FROM;
          if (staffEmail) {
            const { sendNotification } = await import("@/lib/notify");
            await sendNotification({
              channel: "email",
              recipient: staffEmail,
              subject: `Quote request (demo) ${no}`,
              body: `${full_name} ${email} ${phone}\n${origin} → ${destination}\n${method}`,
            });
          }
        } catch {
          /* optional */
        }
        return NextResponse.json({ success: true, id: "demo", inquiry_no: no, demo: true });
      }
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { data: inquiryNoRes } = await supabase.rpc("gen_inquiry_no");
    const inquiryNoVal = (Array.isArray(inquiryNoRes) ? inquiryNoRes[0] : inquiryNoRes) || `INQ-${Date.now()}`;

    const { data, error } = await supabase
      .from("inquiries")
      .insert({
        inquiry_no: inquiryNoVal,
        company_name: company_name || null,
        full_name: full_name,
        email,
        phone,
        origin,
        destination,
        cargo: cargo || {},
        method: method || "sea",
        requirements: requirements || null,
        status: "new",
      })
      .select("id, inquiry_no")
      .single();

    if (error) {
      console.error("Inquiry insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Optional: trigger notification (requires notify + templates)
    try {
      const { sendNotification } = await import("@/lib/notify");
      const staffEmail = process.env.NOTIFY_STAFF_EMAIL || process.env.EMAIL_FROM;
      if (staffEmail) {
        await sendNotification({
          channel: "email",
          recipient: staffEmail,
          subject: "New Inquiry - Premium 1 Logistics",
          body: `New inquiry ${data.inquiry_no} from ${full_name} (${email}). Origin: ${origin} → ${destination}. Check admin dashboard.`,
        });
      }
    } catch (_) {
      // Notifications are optional
    }

    return NextResponse.json({ success: true, id: data.id, inquiry_no: data.inquiry_no });
  } catch (e) {
    console.error("Inquiry API error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
