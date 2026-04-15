import { createServiceRoleClient } from "@/lib/supabase/server";

export async function logActivity(opts: {
  entityType: string;
  entityId?: string;
  action: string;
  actorEmail?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    const supabase = createServiceRoleClient();
    if (!supabase) return;
    await supabase.from("activity_log").insert({
      entity_type: opts.entityType,
      entity_id: opts.entityId || null,
      action: opts.action,
      actor_email: opts.actorEmail || "system",
      metadata: opts.metadata || {},
    });
  } catch {
    // Non-critical — don't break the calling action
  }
}
