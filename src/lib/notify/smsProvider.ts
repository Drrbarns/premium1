// Abstracted SMS provider - Hubtel (Ghana) or Twilio
// Configure via SMS_PROVIDER env: "hubtel" | "twilio"

export async function sendSMS(to: string, message: string): Promise<{ success: boolean; error?: string }> {
  const provider = process.env.SMS_PROVIDER || "hubtel";
  const key = process.env.SMS_PROVIDER_KEY;
  const secret = process.env.SMS_PROVIDER_SECRET;

  if (!key || !secret) {
    console.warn("SMS provider not configured. SMS not sent:", { to });
    return { success: true };
  }

  try {
    if (provider === "twilio") {
      const from = process.env.TWILIO_PHONE;
      const toFormatted = /^\+/.test(to) ? to : `+${to.replace(/^0/, "233")}`;
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${key}/Messages.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
        },
        body: new URLSearchParams({ To: toFormatted, From: from || "", Body: message }),
      });
      if (!res.ok) {
        const err = await res.text();
        return { success: false, error: err };
      }
      return { success: true };
    }

    if (provider === "hubtel") {
      const res = await fetch("https://api.hubtel.com/v1/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
        },
        body: JSON.stringify({
          From: process.env.HUBTEL_SENDER_ID || "Premium1",
          To: to,
          Content: message,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        return { success: false, error: err };
      }
      return { success: true };
    }

    return { success: false, error: "Unknown SMS provider" };
  } catch (e) {
    const err = e instanceof Error ? e.message : "Unknown error";
    return { success: false, error: err };
  }
}
