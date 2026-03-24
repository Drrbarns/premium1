-- Seed data for Premium 1 Logistics LTD

INSERT INTO services (name, slug, description, icon, sort_order, is_active, seo_title, seo_description) VALUES
('Freight Forwarding', 'freight-forwarding', 'End-to-end freight solutions by air, sea, and road across Ghana, West Africa, and international corridors.', 'Package', 1, true, 'Freight Forwarding Ghana | Premium 1 Logistics', 'Freight forwarding by air, sea, and road across Ghana, West Africa and international corridors.'),
('Import & Export Handling', 'import-export-handling', 'Streamlined import and export documentation and coordination for seamless cross-border trade.', 'Ship', 2, true, 'Import Export Handling Ghana | Premium 1 Logistics', 'Import and export handling for Ghana and West Africa. Documentation and coordination.'),
('Customs Clearance', 'customs-clearance', 'Expert customs brokerage ensuring compliant, timely clearance at Ghana and regional ports.', 'FileCheck', 3, true, 'Customs Clearance Ghana | Premium 1 Logistics', 'Customs clearance services in Ghana and West Africa.'),
('Warehousing & Distribution', 'warehousing-distribution', 'Secure storage and efficient distribution across our network of facilities.', 'Warehouse', 4, true, 'Warehousing Distribution Ghana | Premium 1 Logistics', 'Warehousing and distribution services in Ghana.'),
('Inland Transportation & Hauls', 'inland-transportation-hauls', 'Reliable inland haulage and last-mile delivery across Ghana and the West Africa corridor.', 'Truck', 5, true, 'Inland Transportation Ghana | Premium 1 Logistics', 'Inland transportation and haulage across Ghana and West Africa.'),
('Door-to-Door Delivery', 'door-to-door-delivery', 'Complete door-to-door logistics from origin to final destination.', 'Home', 6, true, 'Door to Door Delivery Ghana | Premium 1 Logistics', 'Door-to-door delivery across Ghana and West Africa.'),
('Supply Chain Support Solutions', 'supply-chain-support-solutions', 'Integrated supply chain consulting and support for complex logistics requirements.', 'Network', 7, true, 'Supply Chain Support Ghana | Premium 1 Logistics', 'Supply chain support and consulting in Ghana.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO testimonials (client_name, company, quote, rating, is_active) VALUES
('Kwame Asante', 'Asante Trading Ltd', 'Premium 1 Logistics delivered our mining equipment from Tema to Burkina Faso ahead of schedule. Professional, transparent, and reliable.', 5, true),
('Sarah Mensah', 'Mensah Imports', 'Their customs clearance team saved us days of delays. Clear communication and documentation every step of the way.', 5, true),
('David Osei', 'Osei Industries', 'We use Premium 1 for all our West Africa shipments. Consistent quality and competitive rates.', 5, true)
;

INSERT INTO site_settings (company_name, tagline, phone, email, whatsapp, address, social_whatsapp, social_facebook, social_instagram, social_linkedin, seo_default_title, seo_default_description) VALUES
('Premium 1 Logistics LTD', 'Corporate Freight & Logistics Solutions Across Ghana, West Africa & International Corridors', '+233 XX XXX XXXX', 'info@premium1logistics.com', '+233XXXXXXXXX', 'Accra, Ghana', 'https://wa.me/233XXXXXXXXX', 'https://facebook.com/premium1logistics', 'https://instagram.com/premium1logistics', 'https://linkedin.com/company/premium1logistics', 'Premium 1 Logistics LTD | Corporate Freight Ghana West Africa', 'Corporate freight and logistics solutions across Ghana, West Africa and international corridors.')
;

INSERT INTO notification_templates (key, channel, subject, body, is_active) VALUES
('inquiry_received', 'email', 'Inquiry Received - Premium 1 Logistics', 'A new inquiry has been received. Please check the admin dashboard.', true),
('inquiry_confirmation', 'email', 'We Received Your Inquiry - Premium 1 Logistics', 'Thank you for your inquiry. We will respond within 24-48 hours.', true),
('quote_ready', 'email', 'Your Quote is Ready - Premium 1 Logistics', 'Your quotation is ready. Please log in or contact us for details.', true),
('shipment_dispatched', 'email', 'Shipment Dispatched - Premium 1 Logistics', 'Your shipment has been dispatched.', true),
('shipment_delivered', 'email', 'Shipment Delivered - Premium 1 Logistics', 'Your shipment has been delivered.', true),
('new_inquiry_alert', 'sms', NULL, 'New inquiry received. Check admin dashboard.', true)
ON CONFLICT (key) DO NOTHING;
