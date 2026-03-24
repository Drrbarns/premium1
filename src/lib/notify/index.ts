import { sendEmail } from "./emailProvider";
import { sendSMS } from "./smsProvider";

export type NotificationChannel = "email" | "sms";

export interface SendNotificationParams {
  channel: NotificationChannel;
  recipient: string;
  subject?: string;
  body: string;
  templateKey?: string;
  payload?: Record<string, unknown>;
}

export async function sendNotification(params: SendNotificationParams): Promise<{ success: boolean; error?: string }> {
  const { channel, recipient, subject, body } = params;

  if (channel === "email") {
    return sendEmail(recipient, subject || "Premium 1 Logistics", body);
  }

  if (channel === "sms") {
    return sendSMS(recipient, body);
  }

  return { success: false, error: "Unknown channel" };
}

export { sendEmail } from "./emailProvider";
export { sendSMS } from "./smsProvider";
