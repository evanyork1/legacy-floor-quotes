import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, DollarSign, Medal, Award } from 'lucide-react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';

interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  contacts?: number;
  deals?: number;
  revenue?: number;
}

export function LeaderboardSection() {
  const [prospectingLeaderboard, setProspectingLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [salesLeaderboard, setSalesLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    setLoading(true);

    try {
      // Fetch prospecting leaderboard via secured edge function
      const { data: prospectingResp, error: prospectingError } = await supabase
        .functions.invoke('crm-rpc', {
          body: {
            action: 'get_prospecting_leaderboard',
            week_start: format(weekStart, 'yyyy-MM-dd'),
            week_end: format(weekEnd, 'yyyy-MM-dd'),
          },
        });

      if (prospectingError) throw prospectingError;

      // Fetch sales leaderboard via secured edge function
      const { data: salesResp, error: salesError } = await supabase
        .functions.invoke('crm-rpc', {
          body: {
            action: 'get_sales_leaderboard',
            month_start: format(monthStart, 'yyyy-MM-dd'),
            month_end: format(monthEnd, 'yyyy-MM-dd'),
          },
        });

      if (salesError) throw salesError;

      setProspectingLeaderboard(prospectingResp?.data || []);
      setSalesLeaderboard(salesResp?.data || []);
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-semibold">{index + 1}</span>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="prospecting" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prospecting" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Prospecting
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Sales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prospecting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Weekly Prospecting Leaderboard
              </CardTitle>
              <CardDescription>
                Week of {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading leaderboard...</p>
                </div>
              ) : prospectingLeaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No prospecting data for this week yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {prospectingLeaderboard.map((entry, index) => (
                    <div
                      key={entry.user_id}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        index < 3 ? 'bg-primary/5 border-primary/20' : 'bg-background'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getRankIcon(index)}
                        <div>
                          <p className="font-medium">{entry.full_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.contacts} contacts this week
                          </p>
                        </div>
                      </div>
                      <Badge variant={index < 3 ? 'default' : 'secondary'}>
                        {entry.contacts} contacts
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Monthly Sales Leaderboard
              </CardTitle>
              <CardDescription>
                {format(monthStart, 'MMMM yyyy')} performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading leaderboard...</p>
                </div>
              ) : salesLeaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No sales data for this month yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {salesLeaderboard.map((entry, index) => (
                    <div
                      key={entry.user_id}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        index < 3 ? 'bg-primary/5 border-primary/20' : 'bg-background'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getRankIcon(index)}
                        <div>
                          <p className="font-medium">{entry.full_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.deals} deals • {formatCurrency(Number(entry.revenue))}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={index < 3 ? 'default' : 'secondary'}>
                          {entry.deals} deals
                        </Badge>
                        <p className="text-sm font-medium mt-1">
                          {formatCurrency(Number(entry.revenue))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}