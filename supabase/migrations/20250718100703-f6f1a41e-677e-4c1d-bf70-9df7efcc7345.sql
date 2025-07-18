
-- Enable Row Level Security on quotes_dfw table
-- This will allow the existing RLS policies to work properly
-- and prevent silent insert failures that cause fallback to Houston table
ALTER TABLE public.quotes_dfw ENABLE ROW LEVEL SECURITY;
