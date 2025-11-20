-- Create visualizer_analytics table for tracking user interactions
CREATE TABLE IF NOT EXISTS public.visualizer_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'photo_uploaded', 'color_selected', 'visualization_generated', 'lead_submitted')),
  color_name TEXT,
  garage_size TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  converted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visualizer_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert events (public tracking)
CREATE POLICY "Anyone can insert visualizer events"
  ON public.visualizer_analytics
  FOR INSERT
  WITH CHECK (true);

-- Allow admins to read all events
CREATE POLICY "Authenticated users can read visualizer events"
  ON public.visualizer_analytics
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create indexes for better query performance
CREATE INDEX idx_visualizer_analytics_session ON public.visualizer_analytics(session_id);
CREATE INDEX idx_visualizer_analytics_event_type ON public.visualizer_analytics(event_type);
CREATE INDEX idx_visualizer_analytics_timestamp ON public.visualizer_analytics(timestamp DESC);
CREATE INDEX idx_visualizer_analytics_converted ON public.visualizer_analytics(converted);

-- Create a trigger to update converted flag for all events in a session when lead_submitted
CREATE OR REPLACE FUNCTION public.mark_session_converted()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'lead_submitted' THEN
    UPDATE public.visualizer_analytics
    SET converted = true
    WHERE session_id = NEW.session_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_mark_session_converted
  AFTER INSERT ON public.visualizer_analytics
  FOR EACH ROW
  WHEN (NEW.event_type = 'lead_submitted')
  EXECUTE FUNCTION public.mark_session_converted();