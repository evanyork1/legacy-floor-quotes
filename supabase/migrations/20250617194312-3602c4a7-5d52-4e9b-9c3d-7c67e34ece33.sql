
-- Add archived column to quotes table
ALTER TABLE public.quotes 
ADD COLUMN archived BOOLEAN NOT NULL DEFAULT false;

-- Add comment to document the column
COMMENT ON COLUMN public.quotes.archived IS 'Indicates whether the quote/lead has been archived and should be hidden from the main view';
