-- Add is_active and deactivated_at columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN is_active boolean NOT NULL DEFAULT true;

ALTER TABLE public.profiles 
ADD COLUMN deactivated_at timestamp with time zone;