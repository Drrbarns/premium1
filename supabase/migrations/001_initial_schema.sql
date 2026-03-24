-- Premium 1 Logistics LTD - Initial Schema

-- admins (email pk) - for admin-level access
CREATE TABLE IF NOT EXISTS admins (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- staff_users
CREATE TABLE IF NOT EXISTS staff_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'operations', 'documentation', 'customer_service')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- services (CMS for service pages)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_no TEXT UNIQUE NOT NULL,
  company_name TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  cargo JSONB DEFAULT '{}',
  method TEXT NOT NULL,
  requirements TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'won', 'lost')),
  assigned_to UUID REFERENCES staff_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);

-- inquiry_files
CREATE TABLE IF NOT EXISTS inquiry_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiry_files_inquiry_id ON inquiry_files(inquiry_id);

-- clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- shipments
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_no TEXT UNIQUE NOT NULL,
  inquiry_id UUID REFERENCES inquiries(id),
  client_id UUID NOT NULL REFERENCES clients(id),
  method TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  cargo JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'booked', 'in_transit', 'arrived', 'clearing', 'out_for_delivery', 'delivered')),
  assigned_to UUID REFERENCES staff_users(id),
  key_dates JSONB DEFAULT '{}',
  cost_notes TEXT,
  service_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_shipments_client_id ON shipments(client_id);

-- shipment_events
CREATE TABLE IF NOT EXISTS shipment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES staff_users(id)
);

CREATE INDEX idx_shipment_events_shipment_id ON shipment_events(shipment_id);

-- shipment_documents
CREATE TABLE IF NOT EXISTS shipment_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shipment_documents_shipment_id ON shipment_documents(shipment_id);

-- notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms')),
  recipient TEXT NOT NULL,
  template_key TEXT NOT NULL,
  payload JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  provider_ref TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- notification_templates
CREATE TABLE IF NOT EXISTS notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms')),
  subject TEXT,
  body TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- site_settings (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT,
  tagline TEXT,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  address TEXT,
  social_whatsapp TEXT,
  social_facebook TEXT,
  social_instagram TEXT,
  social_linkedin TEXT,
  seo_default_title TEXT,
  seo_default_description TEXT,
  analytics_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- inquiry_no sequence
CREATE SEQUENCE IF NOT EXISTS inquiry_no_seq START 1000;
CREATE SEQUENCE IF NOT EXISTS shipment_no_seq START 1000;

-- Function to generate inquiry_no
CREATE OR REPLACE FUNCTION gen_inquiry_no() RETURNS TEXT AS $$
  SELECT 'INQ-' || to_char(NOW(), 'YYYYMMDD') || '-' || lpad(nextval('inquiry_no_seq')::text, 4, '0');
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION gen_shipment_no() RETURNS TEXT AS $$
  SELECT 'SHP-' || to_char(NOW(), 'YYYYMMDD') || '-' || lpad(nextval('shipment_no_seq')::text, 4, '0');
$$ LANGUAGE SQL;
