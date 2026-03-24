import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, phone, company, website } = body;

    if (website) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    if (!name || !email || !message || message.length < 10) {
      return NextResponse.json({ error: "Name, email, and message (10+ chars) required" }, { status: 400 });
    }

    const staffEmail = process.env.NOTIFY_STAFF_EMAIL || process.env.EMAIL_FROM;
    if (staffEmail) {
      try {
        const { sendNotification } = await import("@/lib/notify");
        await sendNotification({
          channel: "email",
          recipient: staffEmail,
          subject: `Website contact: ${name}`,
          body: `From: ${name} <${email}>\nPhone: ${phone || "—"}\nCompany: ${company || "—"}\n\n${message}`,
        });
      } catch (e) {
        console.error("Contact email error:", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
