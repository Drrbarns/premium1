export type StaffRole = "admin" | "operations" | "documentation" | "customer_service";

export type InquiryStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type ShipmentStatus =
  | "draft"
  | "booked"
  | "in_transit"
  | "arrived"
  | "clearing"
  | "out_for_delivery"
  | "delivered";

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
}

export interface Inquiry {
  id: string;
  inquiry_no: string;
  company_name: string | null;
  full_name: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  cargo: Record<string, unknown>;
  method: string;
  requirements: string | null;
  notes: string | null;
  status: InquiryStatus;
  assigned_to: string | null;
  created_at: string;
}

export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string | null;
  notes: string | null;
  created_at: string;
}

export interface Shipment {
  id: string;
  shipment_no: string;
  inquiry_id: string | null;
  client_id: string;
  method: string;
  origin: string;
  destination: string;
  cargo: Record<string, unknown>;
  status: ShipmentStatus;
  assigned_to: string | null;
  key_dates: Record<string, string | null>;
  cost_notes: string | null;
  service_notes: string | null;
  created_at: string;
}
