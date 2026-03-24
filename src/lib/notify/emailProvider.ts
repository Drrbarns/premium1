import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEmail(to: string, subject: string, body: string): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn("Resend not configured. Email not sent:", { to, subject });
    return { success: true };
  }
  try {
    const from = process.env.EMAIL_FROM || "noreply@premium1logistics.com";
    const { error } = await resend.emails.send({ from, to, subject, html: body });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    const err = e instanceof Error ? e.message : "Unknown error";
    return { success: false, error: err };
  }
}
