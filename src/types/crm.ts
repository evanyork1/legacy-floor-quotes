export interface CRMUser {
  id: string;
  full_name: string | null;
}

export interface CRMLead {
  id: string;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  website: string | null;
  linkedin: string | null;
  stage: string;
  created_by: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  created_by_profile?: CRMUser;
  assigned_to_profile?: CRMUser;
}

export interface CRMLeadNote {
  id: string;
  lead_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_profile?: CRMUser;
}

export interface CRMActivityLog {
  id: string;
  user_id: string;
  activity_type: 'lead_added' | 'note_added' | 'appointment_booked';
  related_lead_id: string | null;
  created_at: string;
}

export interface CRMSalesGoal {
  id: string;
  user_id: string;
  month: string;
  goal_amount: number;
  actual_amount: number;
  created_at: string;
  updated_at: string;
}

export interface CRMFollowUp {
  id: string;
  lead_id: string | null;
  user_id: string;
  scheduled_at: string;
  title: string;
  notes: string | null;
  is_recurring: boolean;
  recurrence_interval: string | null;
  completed: boolean;
  type: 'follow_up' | 'appointment';
  created_at: string;
  updated_at: string;
  lead?: CRMLead;
}

export interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  leads_added: number;
  notes_added: number;
  appointments_booked: number;
}

export interface SalesLeaderboardEntry {
  user_id: string;
  full_name: string;
  deals: number;
  revenue: number;
}

export interface DuplicateLead {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  created_by_name: string;
}

export const LEAD_STAGES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
] as const;

export type LeadStage = typeof LEAD_STAGES[number]['value'];
