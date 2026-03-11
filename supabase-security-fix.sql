-- =====================================================
-- SUPABASE SECURITY FIX FOR PDC-CONSULT
-- Run this in Supabase Dashboard → SQL Editor
-- =====================================================

-- 1. Enable Row Level Security on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 2. Policies for 'projects' table
-- Service role (backend API) has full access
CREATE POLICY "Service role has full access to projects"
ON projects FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow public read access (for website visitors)
CREATE POLICY "Public can read projects"
ON projects FOR SELECT
TO anon
USING (true);

-- Block anon from modifying data
CREATE POLICY "Anon cannot insert projects"
ON projects FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Anon cannot update projects"
ON projects FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Anon cannot delete projects"
ON projects FOR DELETE
TO anon
USING (false);

-- 3. Policies for 'services' table
CREATE POLICY "Service role has full access to services"
ON services FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Public can read services"
ON services FOR SELECT
TO anon
USING (true);

-- Block anon from modifying data
CREATE POLICY "Anon cannot insert services"
ON services FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Anon cannot update services"
ON services FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Anon cannot delete services"
ON services FOR DELETE
TO anon
USING (false);

-- =====================================================
-- STORAGE SECURITY (for images bucket)
-- =====================================================

-- If you have an 'images' bucket, run these:
-- Allow public to view images
-- INSERT INTO storage.policies (name, bucket_id, definition)
-- VALUES ('Public can view images', 'images', '{"operation": "SELECT", "role": "anon"}');

-- =====================================================
-- VERIFY RLS IS ENABLED
-- =====================================================
-- SELECT tablename, rowsecurity FROM pg_tables
-- WHERE schemaname = 'public' AND tablename IN ('projects', 'services');
