-- Reset all DFW quotes that were incorrectly marked as archived
UPDATE quotes_dfw 
SET archived = false 
WHERE archived = true;