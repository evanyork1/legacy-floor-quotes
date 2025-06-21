
-- Create the gallery-images storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images', 
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow anyone to upload files (since bucket is public)
CREATE POLICY "Allow public uploads" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images');

-- Create policy to allow anyone to view files  
CREATE POLICY "Allow public access" ON storage.objects 
  FOR SELECT USING (bucket_id = 'gallery-images');

-- Create policy to allow anyone to delete files (for admin functionality)
CREATE POLICY "Allow public deletes" ON storage.objects 
  FOR DELETE USING (bucket_id = 'gallery-images');
