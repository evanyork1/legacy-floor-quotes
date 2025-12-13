-- CRM Leads table
CREATE TABLE public.crm_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  address text,
  website text,
  linkedin text,
  stage text NOT NULL DEFAULT 'new',
  created_by uuid NOT NULL REFERENCES public.profiles(id),
  assigned_to uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create indexes for duplicate detection
CREATE INDEX idx_crm_leads_phone ON public.crm_leads(phone) WHERE phone IS NOT NULL;
CREATE INDEX idx_crm_leads_email ON public.crm_leads(email) WHERE email IS NOT NULL;
CREATE INDEX idx_crm_leads_assigned_to ON public.crm_leads(assigned_to);
CREATE INDEX idx_crm_leads_created_by ON public.crm_leads(created_by);

-- Enable RLS
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for crm_leads
CREATE POLICY "Users can view their own leads" ON public.crm_leads
  FOR SELECT USING (auth.uid() = created_by OR auth.uid() = assigned_to);

CREATE POLICY "Admins can view all leads" ON public.crm_leads
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert their own leads" ON public.crm_leads
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own leads" ON public.crm_leads
  FOR UPDATE USING (auth.uid() = created_by OR auth.uid() = assigned_to);

CREATE POLICY "Admins can update all leads" ON public.crm_leads
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads" ON public.crm_leads
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_crm_leads_updated_at
  BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- CRM Lead Notes table (append-only)
CREATE TABLE public.crm_lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id),
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_crm_lead_notes_lead_id ON public.crm_lead_notes(lead_id);

ALTER TABLE public.crm_lead_notes ENABLE ROW LEVEL SECURITY;

-- Notes visible to anyone who can see the lead
CREATE POLICY "Users can view notes on their leads" ON public.crm_lead_notes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.crm_leads 
      WHERE id = lead_id AND (created_by = auth.uid() OR assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can view all notes" ON public.crm_lead_notes
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can add notes to their leads" ON public.crm_lead_notes
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND EXISTS (
      SELECT 1 FROM public.crm_leads 
      WHERE id = lead_id AND (created_by = auth.uid() OR assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can add notes" ON public.crm_lead_notes
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin') AND auth.uid() = user_id);

-- CRM Activity Log table
CREATE TABLE public.crm_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id),
  activity_type text NOT NULL, -- 'lead_added', 'note_added', 'appointment_booked'
  related_lead_id uuid REFERENCES public.crm_leads(id) ON DELETE SET NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_crm_activity_log_user_id ON public.crm_activity_log(user_id);
CREATE INDEX idx_crm_activity_log_created_at ON public.crm_activity_log(created_at);
CREATE INDEX idx_crm_activity_log_type ON public.crm_activity_log(activity_type);

ALTER TABLE public.crm_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity" ON public.crm_activity_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity" ON public.crm_activity_log
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can log their own activity" ON public.crm_activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CRM Sales Goals table
CREATE TABLE public.crm_sales_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id),
  month date NOT NULL, -- first of month
  goal_amount numeric NOT NULL DEFAULT 0,
  actual_amount numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, month)
);

CREATE INDEX idx_crm_sales_goals_user_month ON public.crm_sales_goals(user_id, month);

ALTER TABLE public.crm_sales_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own goals" ON public.crm_sales_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all goals" ON public.crm_sales_goals
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert their own goals" ON public.crm_sales_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goal_amount" ON public.crm_sales_goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all goals" ON public.crm_sales_goals
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_crm_sales_goals_updated_at
  BEFORE UPDATE ON public.crm_sales_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Functions for leaderboard queries
CREATE OR REPLACE FUNCTION public.get_crm_leaderboard(
  start_date date,
  end_date date
)
RETURNS TABLE(
  user_id uuid,
  full_name text,
  leads_added integer,
  notes_added integer,
  appointments_booked integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    a.user_id,
    COALESCE(p.full_name, 'Unknown') as full_name,
    COUNT(*) FILTER (WHERE a.activity_type = 'lead_added')::integer as leads_added,
    COUNT(*) FILTER (WHERE a.activity_type = 'note_added')::integer as notes_added,
    COUNT(*) FILTER (WHERE a.activity_type = 'appointment_booked')::integer as appointments_booked
  FROM public.crm_activity_log a
  LEFT JOIN public.profiles p ON p.id = a.user_id
  WHERE a.created_at::date BETWEEN start_date AND end_date
  GROUP BY a.user_id, p.full_name
  ORDER BY leads_added DESC, notes_added DESC
$$;

-- Function to check for duplicate leads
CREATE OR REPLACE FUNCTION public.check_duplicate_lead(
  check_phone text,
  check_email text
)
RETURNS TABLE(
  id uuid,
  name text,
  phone text,
  email text,
  created_by_name text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    l.id,
    l.name,
    l.phone,
    l.email,
    COALESCE(p.full_name, 'Unknown') as created_by_name
  FROM public.crm_leads l
  LEFT JOIN public.profiles p ON p.id = l.created_by
  WHERE 
    (check_phone IS NOT NULL AND check_phone != '' AND l.phone = check_phone)
    OR (check_email IS NOT NULL AND check_email != '' AND l.email = check_email)
  LIMIT 1
$$;