import { NextResponse, type NextRequest } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref")?.trim();

  if (!ref || ref.length < 3) {
    return NextResponse.json({ error: "Please provide a valid reference number." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Tracking service unavailable." }, { status: 503 });
  }

  // Look up by shipment_no first, then inquiry_no
  let shipment: Record<string, unknown> | null = null;

  const { data: byShip } = await supabase
    .from("shipments")
    .select("id, shipment_no, origin, destination, method, status, key_dates, created_at")
    .eq("shipment_no", ref)
    .single();

  if (byShip) {
    shipment = byShip;
  } else {
    // Try via inquiry_no → shipment
    const { data: inq } = await supabase
      .from("inquiries")
      .select("id")
      .eq("inquiry_no", ref)
      .single();

    if (inq) {
      const { data: byInq } = await supabase
        .from("shipments")
        .select("id, shipment_no, origin, destination, method, status, key_dates, created_at")
        .eq("inquiry_id", inq.id)
        .single();
      shipment = byInq;
    }
  }

  if (!shipment) {
    return NextResponse.json({ error: "No shipment found for this reference." }, { status: 404 });
  }

  // Fetch events
  const { data: events } = await supabase
    .from("shipment_events")
    .select("id, event_type, message, created_at")
    .eq("shipment_id", shipment.id as string)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    shipment_no: shipment.shipment_no,
    origin: shipment.origin,
    destination: shipment.destination,
    method: shipment.method,
    status: shipment.status,
    key_dates: shipment.key_dates || {},
    created_at: shipment.created_at,
    events: events || [],
  });
}
