-- Clean up stale appointment_booked entries that have no related_lead_id
-- These were created by the old rapid-fire log button behavior
DELETE FROM crm_activity_log 
WHERE activity_type = 'appointment_booked' 
AND related_lead_id IS NULL;