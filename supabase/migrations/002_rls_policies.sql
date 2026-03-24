-- RLS Policies for Premium 1 Logistics

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read: services, published blog_posts, testimonials, site_settings
CREATE POLICY "public_read_services" ON services FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "public_read_blog_posts" ON blog_posts FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT TO anon;

-- Public insert: inquiries only
CREATE POLICY "public_insert_inquiries" ON inquiries FOR INSERT TO anon WITH CHECK (true);

-- admins: full access (use service_role in app for admin operations)
-- staff: authenticated users in staff_users can read/update based on role
-- For now: use service_role for admin dashboard; add auth later

-- Deny anon from other tables
CREATE POLICY "admins_no_anon" ON admins FOR ALL TO anon USING (false);
CREATE POLICY "staff_users_no_anon" ON staff_users FOR ALL TO anon USING (false);
CREATE POLICY "inquiries_no_anon_update" ON inquiries FOR UPDATE TO anon USING (false);
CREATE POLICY "inquiries_no_anon_delete" ON inquiries FOR DELETE TO anon USING (false);
CREATE POLICY "inquiry_files_no_anon" ON inquiry_files FOR ALL TO anon USING (false);
CREATE POLICY "clients_no_anon" ON clients FOR ALL TO anon USING (false);
CREATE POLICY "shipments_no_anon" ON shipments FOR ALL TO anon USING (false);
CREATE POLICY "shipment_events_no_anon" ON shipment_events FOR ALL TO anon USING (false);
CREATE POLICY "shipment_documents_no_anon" ON shipment_documents FOR ALL TO anon USING (false);
CREATE POLICY "notifications_no_anon" ON notifications FOR ALL TO anon USING (false);
CREATE POLICY "notification_templates_no_anon" ON notification_templates FOR ALL TO anon USING (false);
