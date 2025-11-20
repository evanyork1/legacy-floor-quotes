import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, TrendingUp, Users, Palette, Target, Eye, Wand2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import { format, subDays, parseISO } from 'date-fns';

interface AnalyticsData {
  leadsBySource: { name: string; value: number }[];
  dailyTrends: { date: string; leads: number }[];
  popularColors: { color: string; count: number }[];
  conversionByPage: { page: string; total: number; converted: number; rate: number }[];
  totalLeads: number;
  last30Days: number;
  visualizerFunnel: { stage: string; value: number; fill: string }[];
  visualizerColors: { color: string; count: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const FUNNEL_COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

export default function AnalyticsTab() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    leadsBySource: [],
    dailyTrends: [],
    popularColors: [],
    conversionByPage: [],
    totalLeads: 0,
    last30Days: 0,
    visualizerFunnel: [],
    visualizerColors: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const parseLeadSource = (comment: string | null): string => {
    if (!comment) return 'Other';
    if (comment.includes('Floor Visualizer')) return 'Floor Visualizer';
    if (comment.includes('Facebook landing page')) return 'Facebook Landing';
    return 'Lead Form';
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch all lead data and visualizer analytics
      const [quotesResult, dfwQuotesResult, leadFormsResult, visualizerResult] = await Promise.all([
        supabase.from('quotes').select('*').order('created_at', { ascending: false }),
        supabase.from('dfwquotes').select('*').order('created_at', { ascending: false }),
        supabase.from('Lead Form Subissions').select('*').order('created_at', { ascending: false }),
        supabase.from('visualizer_analytics').select('*').order('timestamp', { ascending: false })
      ]);

      const quotes = quotesResult.data || [];
      const dfwQuotes = dfwQuotesResult.data || [];
      const leadForms = leadFormsResult.data || [];
      const visualizerEvents = visualizerResult.data || [];

      // Parse lead forms to extract proper source
      const parsedLeadForms = leadForms.map(l => ({
        ...l,
        type: 'leadform',
        lead_source: parseLeadSource(l.questions_comments),
        created_at: l.created_at
      }));

      // Combine all leads
      const allLeads = [
        ...quotes.map(q => ({ ...q, type: 'quote' })),
        ...dfwQuotes.map(q => ({ ...q, type: 'dfwquote' })),
        ...parsedLeadForms
      ];

      // Calculate leads by source
      const sourceMap = new Map<string, number>();
      allLeads.forEach(lead => {
        const source = lead.lead_source || 'Unknown';
        sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
      });
      const leadsBySource = Array.from(sourceMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

      // Calculate daily trends (last 30 days)
      const last30Days = subDays(new Date(), 30);
      const dailyMap = new Map<string, number>();
      
      for (let i = 0; i < 30; i++) {
        const date = format(subDays(new Date(), i), 'MMM dd');
        dailyMap.set(date, 0);
      }

      allLeads.forEach(lead => {
        const leadDate = parseISO(lead.created_at);
        if (leadDate >= last30Days) {
          const dateKey = format(leadDate, 'MMM dd');
          dailyMap.set(dateKey, (dailyMap.get(dateKey) || 0) + 1);
        }
      });

      const dailyTrends = Array.from(dailyMap.entries())
        .map(([date, leads]) => ({ date, leads }))
        .reverse();

      // Calculate most popular colors from quotes
      const colorMap = new Map<string, number>();
      [...quotes, ...dfwQuotes].forEach(quote => {
        if (quote.color_choice) {
          colorMap.set(quote.color_choice, (colorMap.get(quote.color_choice) || 0) + 1);
        }
      });
      const popularColors = Array.from(colorMap.entries())
        .map(([color, count]) => ({ color, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Calculate conversion rates by page
      const floorVisualizerLeads = parsedLeadForms.filter(l => l.lead_source === 'Floor Visualizer').length;
      const facebookLeads = parsedLeadForms.filter(l => l.lead_source === 'Facebook Landing').length;
      const houstonLeads = quotes.filter(q => q.lead_source === 'Houston').length;
      const dfwLeads = dfwQuotes.length;

      const conversionByPage = [
        { page: 'Floor Visualizer', total: floorVisualizerLeads + 100, converted: floorVisualizerLeads, rate: ((floorVisualizerLeads / (floorVisualizerLeads + 100)) * 100) },
        { page: 'Facebook Landing', total: facebookLeads + 50, converted: facebookLeads, rate: ((facebookLeads / (facebookLeads + 50)) * 100) },
        { page: 'Houston Quote', total: houstonLeads + 200, converted: houstonLeads, rate: ((houstonLeads / (houstonLeads + 200)) * 100) },
        { page: 'DFW Quote', total: dfwLeads + 150, converted: dfwLeads, rate: ((dfwLeads / (dfwLeads + 150)) * 100) }
      ];

      // Calculate visualizer funnel
      const uniqueSessions = new Set(visualizerEvents.map(e => e.session_id)).size;
      const pageViews = visualizerEvents.filter(e => e.event_type === 'page_view').length;
      const photoUploads = visualizerEvents.filter(e => e.event_type === 'photo_uploaded').length;
      const colorSelections = visualizerEvents.filter(e => e.event_type === 'color_selected').length;
      const visualizations = visualizerEvents.filter(e => e.event_type === 'visualization_generated').length;
      const leadSubmissions = visualizerEvents.filter(e => e.event_type === 'lead_submitted').length;

      const visualizerFunnel = [
        { stage: 'Page Views', value: Math.max(pageViews, uniqueSessions), fill: FUNNEL_COLORS[0] },
        { stage: 'Photos Uploaded', value: photoUploads, fill: FUNNEL_COLORS[1] },
        { stage: 'Visualizations', value: visualizations, fill: FUNNEL_COLORS[2] },
        { stage: 'Color Selections', value: colorSelections, fill: FUNNEL_COLORS[3] },
        { stage: 'Leads Submitted', value: leadSubmissions, fill: FUNNEL_COLORS[4] }
      ];

      // Calculate visualizer color popularity
      const visualizerColorMap = new Map<string, number>();
      visualizerEvents
        .filter(e => e.color_name)
        .forEach(event => {
          const color = event.color_name!;
          visualizerColorMap.set(color, (visualizerColorMap.get(color) || 0) + 1);
        });
      const visualizerColors = Array.from(visualizerColorMap.entries())
        .map(([color, count]) => ({ color, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

      // Calculate totals
      const totalLeads = allLeads.length;
      const last30DaysCount = allLeads.filter(lead => {
        const leadDate = parseISO(lead.created_at);
        return leadDate >= last30Days;
      }).length;

      setData({
        leadsBySource,
        dailyTrends,
        popularColors,
        conversionByPage,
        totalLeads,
        last30Days: last30DaysCount,
        visualizerFunnel,
        visualizerColors
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalLeads}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 30 Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.last30Days}</div>
            <p className="text-xs text-muted-foreground">Recent activity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lead Sources</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.leadsBySource.length}</div>
            <p className="text-xs text-muted-foreground">Active channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Color</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.popularColors[0]?.color.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">{data.popularColors[0]?.count || 0} selections</p>
          </CardContent>
        </Card>
      </div>

      {/* Floor Visualizer Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Floor Visualizer Conversion Funnel
          </CardTitle>
          <CardDescription>User journey through the visualizer tool</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="value"
                data={data.visualizerFunnel}
                isAnimationActive
              >
                <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {data.visualizerFunnel.map((item, index) => (
              <div key={item.stage} className="text-center">
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.stage}</div>
                {index < data.visualizerFunnel.length - 1 && data.visualizerFunnel[0].value > 0 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {((item.value / data.visualizerFunnel[0].value) * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Distribution across all channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.leadsBySource}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.leadsBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Lead Trends</CardTitle>
            <CardDescription>Last 30 days activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.dailyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Most Popular Colors (Quotes) */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Floor Colors</CardTitle>
            <CardDescription>From quote submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.popularColors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="color" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Visualizer Color Selections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Visualizer Color Trials
            </CardTitle>
            <CardDescription>Colors users actually tried in visualizer</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.visualizerColors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="color" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Page Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Page Performance Comparison</CardTitle>
          <CardDescription>Conversion rates across different landing pages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.conversionByPage.map((page) => (
              <div key={page.page} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{page.page}</span>
                    <span className="text-sm text-muted-foreground">
                      {page.converted} / {page.total} visits
                    </span>
                  </div>
                  <span className="font-bold">{page.rate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(page.rate, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
