-- God-Level OMS Schema Upgrades
-- New columns on inquiries
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS estimated_value NUMERIC(12,2);
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website' CHECK (source IN ('website','email','phone','referral','other'));
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent'));

-- New columns on clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS credit_limit NUMERIC(12,2);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS payment_terms TEXT DEFAULT 'net_30';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'standard' CHECK (tier IN ('vip','standard','new'));

-- New columns on shipments
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS vessel_name TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS voyage_no TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS bl_no TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS container_nos JSONB DEFAULT '[]';
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS estimated_departure TIMESTAMPTZ;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS estimated_arrival TIMESTAMPTZ;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS actual_departure TIMESTAMPTZ;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS actual_arrival TIMESTAMPTZ;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS demurrage_starts TIMESTAMPTZ;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS storage_notes TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS total_cost NUMERIC(12,2) DEFAULT 0;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS total_revenue NUMERIC(12,2) DEFAULT 0;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';

-- Invoices
CREATE SEQUENCE IF NOT EXISTS invoice_no_seq START 1000;

CREATE OR REPLACE FUNCTION gen_invoice_no() RETURNS TEXT AS $$
  SELECT 'INV-' || to_char(NOW(), 'YYYYMMDD') || '-' || lpad(nextval('invoice_no_seq')::text, 4, '0');
$$ LANGUAGE SQL;

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no TEXT UNIQUE NOT NULL,
  shipment_id UUID REFERENCES shipments(id),
  client_id UUID NOT NULL REFERENCES clients(id),
  currency TEXT DEFAULT 'USD',
  subtotal NUMERIC(12,2) DEFAULT 0,
  tax NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','sent','paid','overdue','void')),
  due_date DATE,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_shipment ON invoices(shipment_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);

-- Invoice line items
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  charge_type TEXT,
  quantity NUMERIC(10,2) DEFAULT 1,
  unit_price NUMERIC(12,2) DEFAULT 0,
  amount NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON invoice_items(invoice_id);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  method TEXT,
  reference TEXT,
  paid_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_invoice ON payments(invoice_id);

-- Customs declarations
CREATE TABLE IF NOT EXISTS customs_declarations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  declaration_no TEXT,
  hs_codes JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','submitted','query','amended','released')),
  submitted_at TIMESTAMPTZ,
  released_at TIMESTAMPTZ,
  duty_amount NUMERIC(12,2),
  tax_amount NUMERIC(12,2),
  notes TEXT,
  query_details TEXT,
  query_deadline TIMESTAMPTZ,
  assigned_to UUID REFERENCES staff_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customs_shipment ON customs_declarations(shipment_id);
CREATE INDEX IF NOT EXISTS idx_customs_status ON customs_declarations(status);

-- Activity log (universal audit trail)
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID,
  action TEXT NOT NULL,
  actor_email TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON activity_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created ON activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_log_actor ON activity_log(actor_email);

-- RLS on new tables
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customs_declarations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invoices_no_anon" ON invoices FOR ALL TO anon USING (false);
CREATE POLICY "invoice_items_no_anon" ON invoice_items FOR ALL TO anon USING (false);
CREATE POLICY "payments_no_anon" ON payments FOR ALL TO anon USING (false);
CREATE POLICY "customs_no_anon" ON customs_declarations FOR ALL TO anon USING (false);
CREATE POLICY "activity_log_no_anon" ON activity_log FOR ALL TO anon USING (false);

CREATE POLICY "staff_all_invoices" ON invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "staff_all_invoice_items" ON invoice_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "staff_all_payments" ON payments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "staff_all_customs" ON customs_declarations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "staff_all_activity_log" ON activity_log FOR ALL TO authenticated USING (true) WITH CHECK (true);
