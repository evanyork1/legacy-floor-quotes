-- Add columns to Lead Form Subissions table to track floor visualizer photos and color selection
ALTER TABLE "Lead Form Subissions"
ADD COLUMN IF NOT EXISTS original_photo_url TEXT,
ADD COLUMN IF NOT EXISTS rendered_photo_url TEXT,
ADD COLUMN IF NOT EXISTS selected_color TEXT;