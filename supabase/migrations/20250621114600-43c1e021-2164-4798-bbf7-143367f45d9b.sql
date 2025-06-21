
-- Drop existing restrictive RLS policies if they exist
DROP POLICY IF EXISTS "Users can view their own gallery photos" ON gallery_photos;
DROP POLICY IF EXISTS "Users can create their own gallery photos" ON gallery_photos;
DROP POLICY IF EXISTS "Users can update their own gallery photos" ON gallery_photos;
DROP POLICY IF EXISTS "Users can delete their own gallery photos" ON gallery_photos;

-- Create new permissive policies for public admin access
CREATE POLICY "Allow public gallery photo access" ON gallery_photos
  FOR SELECT USING (true);

CREATE POLICY "Allow public gallery photo uploads" ON gallery_photos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public gallery photo updates" ON gallery_photos
  FOR UPDATE USING (true);

CREATE POLICY "Allow public gallery photo deletes" ON gallery_photos
  FOR DELETE USING (true);
