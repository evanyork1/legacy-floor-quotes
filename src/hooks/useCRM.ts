import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { CRMLead, CRMLeadNote, CRMSalesGoal, LeaderboardEntry, SalesLeaderboardEntry, DuplicateLead, CRMUser, CRMFollowUp } from '@/types/crm';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';

export function useCRM() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdmin = async () => {
      // Check by role only — never trust client-side email comparisons
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      setIsAdmin(!!data);
    };

    checkAdmin();
  }, [user]);

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('crm_leads')
      .select(`
        *,
        created_by_profile:profiles!crm_leads_created_by_fkey(id, full_name),
        assigned_to_profile:profiles!crm_leads_assigned_to_fkey(id, full_name)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLeads(data as unknown as CRMLead[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Check for duplicate lead
  const checkDuplicate = async (phone: string | null, email: string | null): Promise<DuplicateLead | null> => {
    const { data, error } = await supabase.rpc('check_duplicate_lead', {
      check_phone: phone || '',
      check_email: email || ''
    });

    if (error || !data || data.length === 0) return null;
    return data[0] as DuplicateLead;
  };

  // Add lead
  const addLead = async (lead: Omit<CRMLead, 'id' | 'created_at' | 'updated_at' | 'created_by'>): Promise<{ success: boolean; error?: string; lead?: CRMLead }> => {
    if (!user) return { success: false, error: 'Not authenticated' };

    // Check for duplicate first
    const duplicate = await checkDuplicate(lead.phone, lead.email);
    if (duplicate) {
      return { success: false, error: 'duplicate', lead: duplicate as unknown as CRMLead };
    }

    const { data, error } = await supabase
      .from('crm_leads')
      .insert({
        ...lead,
        created_by: user.id,
        assigned_to: lead.assigned_to || user.id,
      } as any)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    // Log activity
    await supabase.from('crm_activity_log').insert({
      user_id: user.id,
      activity_type: 'lead_added',
      related_lead_id: data.id
    });

    await fetchLeads();
    return { success: true, lead: data as CRMLead };
  };

  // Update lead
  const updateLead = async (id: string, updates: Partial<CRMLead>): Promise<boolean> => {
    const { created_by_profile, assigned_to_profile, ...dbUpdates } = updates;
    const { error } = await supabase
      .from('crm_leads')
      .update(dbUpdates as any)
      .eq('id', id);

    if (!error) {
      await fetchLeads();
      return true;
    }
    return false;
  };

  // Delete lead (admin only)
  const deleteLead = async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('crm_leads')
      .delete()
      .eq('id', id);

    if (!error) {
      await fetchLeads();
      return true;
    }
    return false;
  };

  // Add note to lead
  const addNote = async (leadId: string, content: string): Promise<boolean> => {
    if (!user) return false;

    const { error } = await supabase
      .from('crm_lead_notes')
      .insert({
        lead_id: leadId,
        user_id: user.id,
        content
      });

    if (!error) {
      // Log activity
      await supabase.from('crm_activity_log').insert({
        user_id: user.id,
        activity_type: 'note_added',
        related_lead_id: leadId
      });
      return true;
    }
    return false;
  };

  // Get notes for a lead
  const getLeadNotes = async (leadId: string): Promise<CRMLeadNote[]> => {
    const { data, error } = await supabase
      .from('crm_lead_notes')
      .select(`
        *,
        user_profile:profiles!crm_lead_notes_user_id_fkey(id, full_name)
      `)
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as unknown as CRMLeadNote[];
  };


  // Get leaderboard
  const getLeaderboard = async (period: 'week' | 'lifetime'): Promise<LeaderboardEntry[]> => {
    const now = new Date();
    let startDate: string;
    let endDate: string;

    if (period === 'week') {
      startDate = format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');
      endDate = format(endOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    } else {
      startDate = '2020-01-01';
      endDate = format(now, 'yyyy-MM-dd');
    }

    const { data, error } = await supabase.rpc('get_crm_leaderboard', {
      start_date: startDate,
      end_date: endDate
    });

    if (error || !data) return [];
    return data as LeaderboardEntry[];
  };

  // Get sales leaderboard
  const getSalesLeaderboard = async (period: 'week' | 'lifetime'): Promise<SalesLeaderboardEntry[]> => {
    const now = new Date();
    let startDate: string;
    let endDate: string;

    if (period === 'week') {
      startDate = format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');
      endDate = format(endOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    } else {
      startDate = '2020-01-01';
      endDate = format(now, 'yyyy-MM-dd');
    }

    const { data, error } = await supabase.rpc('get_sales_leaderboard', {
      month_start: startDate,
      month_end: endDate
    });

    if (error || !data) return [];
    return data as SalesLeaderboardEntry[];
  };

  // Get current month sales goal
  const getCurrentGoal = async (): Promise<CRMSalesGoal | null> => {
    if (!user) return null;

    const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('crm_sales_goals')
      .select('*')
      .eq('user_id', user.id)
      .eq('month', monthStart)
      .single();

    if (error || !data) return null;
    return data as CRMSalesGoal;
  };

  // Set monthly goal
  const setMonthlyGoal = async (goalAmount: number): Promise<boolean> => {
    if (!user) return false;

    const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');

    const { error } = await supabase
      .from('crm_sales_goals')
      .upsert({
        user_id: user.id,
        month: monthStart,
        goal_amount: goalAmount
      }, {
        onConflict: 'user_id,month'
      });

    return !error;
  };

  // Admin: Update user's actual sales
  const updateUserSales = async (userId: string, actualAmount: number): Promise<boolean> => {
    if (!isAdmin) return false;

    const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');

    const { error } = await supabase
      .from('crm_sales_goals')
      .upsert({
        user_id: userId,
        month: monthStart,
        actual_amount: actualAmount,
        goal_amount: 0
      }, {
        onConflict: 'user_id,month'
      });

    return !error;
  };

  // Admin: Get all users
  const getAllUsers = async (): Promise<CRMUser[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name')
      .order('full_name');

    if (error || !data) return [];
    return data;
  };

  // Admin: Get all goals for current month
  const getAllGoals = async (): Promise<(CRMSalesGoal & { user_profile?: CRMUser })[]> => {
    if (!isAdmin) return [];

    const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');

    const { data, error } = await supabase
      .from('crm_sales_goals')
      .select(`
        *,
        user_profile:profiles!crm_sales_goals_user_id_fkey(id, full_name)
      `)
      .eq('month', monthStart);

    if (error || !data) return [];
    return data as unknown as (CRMSalesGoal & { user_profile?: CRMUser })[];
  };

  // ================ Follow-Up Functions ================

  // Fetch follow-ups
  const fetchFollowUps = async (): Promise<CRMFollowUp[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('crm_follow_ups')
      .select(`
        *,
        lead:crm_leads(id, name, phone, email)
      `)
      .order('scheduled_at', { ascending: true });

    if (error || !data) return [];
    return data as unknown as CRMFollowUp[];
  };

  // Add follow-up or appointment
  const addFollowUp = async (followUp: {
    lead_id?: string | null;
    title: string;
    notes?: string | null;
    scheduled_at: string;
    is_recurring?: boolean;
    recurrence_interval?: string | null;
    type?: 'follow_up' | 'appointment';
  }): Promise<boolean> => {
    if (!user) return false;

    const { error } = await supabase
      .from('crm_follow_ups')
      .insert({
        ...followUp,
        type: followUp.type || 'follow_up',
        user_id: user.id
      });

    // If this is an appointment, also log to activity_log for leaderboard tracking
    if (!error && followUp.type === 'appointment') {
      await supabase.from('crm_activity_log').insert({
        user_id: user.id,
        activity_type: 'appointment_booked',
        related_lead_id: followUp.lead_id || null
      });
    }

    return !error;
  };

  // Update follow-up
  const updateFollowUp = async (id: string, updates: Partial<CRMFollowUp>): Promise<boolean> => {
    const { lead, ...dbUpdates } = updates;
    const { error } = await supabase
      .from('crm_follow_ups')
      .update(dbUpdates as any)
      .eq('id', id);

    return !error;
  };

  // Complete follow-up
  const completeFollowUp = async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('crm_follow_ups')
      .update({ completed: true })
      .eq('id', id);

    return !error;
  };

  // Delete follow-up
  const deleteFollowUp = async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('crm_follow_ups')
      .delete()
      .eq('id', id);

    return !error;
  };

  return {
    leads,
    loading,
    isAdmin,
    fetchLeads,
    checkDuplicate,
    addLead,
    updateLead,
    deleteLead,
    addNote,
    getLeadNotes,
    getLeaderboard,
    getSalesLeaderboard,
    getCurrentGoal,
    setMonthlyGoal,
    updateUserSales,
    getAllUsers,
    getAllGoals,
    // Follow-up functions
    fetchFollowUps,
    addFollowUp,
    updateFollowUp,
    completeFollowUp,
    deleteFollowUp
  };
}
