import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, TrendingUp, Users, Palette, Target } from 'lucide-react';
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
  ResponsiveContainer
} from 'recharts';
import { format, subDays, startOfDay, parseISO } from 'date-fns';

interface AnalyticsData {
  leadsBySource: { name: string; value: number }[];
  dailyTrends: { date: string; leads: number }[];
  popularColors: { color: string; count: number }[];
  conversionByPage: { page: string; total: number; converted: number; rate: number }[];
  totalLeads: number;
  last30Days: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function AnalyticsTab() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    leadsBySource: [],
    dailyTrends: [],
    popularColors: [],
    conversionByPage: [],
    totalLeads: 0,
    last30Days: 0
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch all lead data
      const [quotesResult, dfwQuotesResult, leadFormsResult] = await Promise.all([
        supabase.from('quotes').select('*').order('created_at', { ascending: false }),
        supabase.from('dfwquotes').select('*').order('created_at', { ascending: false }),
        supabase.from('Lead Form Subissions').select('*').order('created_at', { ascending: false })
      ]);

      const quotes = quotesResult.data || [];
      const dfwQuotes = dfwQuotesResult.data || [];
      const leadForms = leadFormsResult.data || [];

      // Combine all leads
      const allLeads = [
        ...quotes.map(q => ({ ...q, type: 'quote' })),
        ...dfwQuotes.map(q => ({ ...q, type: 'dfwquote' })),
        ...leadForms.map(l => ({ ...l, type: 'leadform', lead_source: 'Lead Form', created_at: l.created_at }))
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

      // Calculate most popular colors (from quotes only)
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

      // Calculate conversion rates by page/source
      const pageMap = new Map<string, { total: number; converted: number }>();
      allLeads.forEach(lead => {
        const page = lead.lead_source || 'Unknown';
        const current = pageMap.get(page) || { total: 0, converted: 0 };
        current.total++;
        
        // Consider a lead "converted" if it has a status of 'contacted', 'quoted', or 'closed'
        // Only quotes and dfwquotes have status field
        if ('status' in lead && lead.status && ['contacted', 'quoted', 'closed'].includes(lead.status)) {
          current.converted++;
        }
        pageMap.set(page, current);
      });

      const conversionByPage = Array.from(pageMap.entries())
        .map(([page, stats]) => ({
          page,
          total: stats.total,
          converted: stats.converted,
          rate: stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0
        }))
        .sort((a, b) => b.total - a.total);

      // Count last 30 days leads
      const recentLeads = allLeads.filter(lead => 
        parseISO(lead.created_at) >= last30Days
      ).length;

      setData({
        leadsBySource,
        dailyTrends,
        popularColors,
        conversionByPage,
        totalLeads: allLeads.length,
        last30Days: recentLeads
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
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
              {data.popularColors[0]?.color.split(' ')[0] || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.popularColors[0]?.count || 0} selections
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Distribution of lead sources</CardDescription>
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
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Leads"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Floor Colors</CardTitle>
            <CardDescription>Top 10 color choices from quotes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.popularColors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="color" 
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" name="Selections" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rates by Source</CardTitle>
            <CardDescription>Lead to contacted/quoted/closed conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.conversionByPage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="page" 
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Total Leads" />
                <Bar dataKey="converted" fill="#82ca9d" name="Converted" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
