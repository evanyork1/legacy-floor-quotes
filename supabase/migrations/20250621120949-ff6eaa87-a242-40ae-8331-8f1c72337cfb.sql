
-- Remove the category check constraint that's preventing uploads
ALTER TABLE gallery_photos DROP CONSTRAINT IF EXISTS gallery_photos_category_check;
