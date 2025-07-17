-- Reset all DFW quotes to ensure they are never archived
UPDATE quotes_dfw 
SET archived = false 
WHERE archived = true;

-- Ensure the default for archived is false
ALTER TABLE quotes_dfw ALTER COLUMN archived SET DEFAULT false;