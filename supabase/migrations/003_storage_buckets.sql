-- Storage buckets (run via Supabase Dashboard or API)
-- inquiry-uploads: public upload via signed URL
-- shipment-documents: authenticated staff only
-- blog-covers: authenticated staff only

-- Note: Storage policies are typically set via Supabase Dashboard or JS.
-- Bucket creation:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('inquiry-uploads', 'inquiry-uploads', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('shipment-documents', 'shipment-documents', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-covers', 'blog-covers', false);
