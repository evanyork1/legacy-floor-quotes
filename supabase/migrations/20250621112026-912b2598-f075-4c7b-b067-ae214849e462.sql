
-- Create gallery_photos table
CREATE TABLE public.gallery_photos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('Commercial', 'Residential', 'Industrial', 'Garage')),
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for better performance on queries
CREATE INDEX idx_gallery_photos_category ON public.gallery_photos(category);
CREATE INDEX idx_gallery_photos_display_order ON public.gallery_photos(display_order);
CREATE INDEX idx_gallery_photos_is_featured ON public.gallery_photos(is_featured);

-- Enable RLS
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Allow public read access for gallery photos (public gallery)
CREATE POLICY "Allow public read access for gallery photos"
ON public.gallery_photos
FOR SELECT
USING (true);

-- Allow authenticated users to manage gallery photos (admin functionality)
CREATE POLICY "Allow admin access to manage gallery photos"
ON public.gallery_photos
FOR ALL
USING (auth.role() = 'authenticated');

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for gallery images
CREATE POLICY "Allow public reads for gallery images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow authenticated uploads to gallery images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Allow authenticated updates to gallery images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow authenticated deletes for gallery images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-images');
