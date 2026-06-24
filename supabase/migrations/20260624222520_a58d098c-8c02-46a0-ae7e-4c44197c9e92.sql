
REVOKE EXECUTE ON FUNCTION public.get_prospecting_leaderboard(date, date) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.get_sales_leaderboard(date, date) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.get_crm_leaderboard(date, date) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.check_duplicate_lead(text, text) FROM authenticated;
