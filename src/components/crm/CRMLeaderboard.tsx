import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCRM } from '@/hooks/useCRM';
import type { LeaderboardEntry } from '@/types/crm';
import { Trophy, Users, FileText, Calendar } from 'lucide-react';

export function CRMLeaderboard() {
  const { getLeaderboard } = useCRM();
  const [weeklyData, setWeeklyData] = useState<LeaderboardEntry[]>([]);
  const [lifetimeData, setLifetimeData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [weekly, lifetime] = await Promise.all([
        getLeaderboard('week'),
        getLeaderboard('lifetime')
      ]);
      setWeeklyData(weekly);
      setLifetimeData(lifetime);
      setLoading(false);
    };

    loadData();
  }, []);

  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}.`;
    }
  };

  const LeaderboardTable = ({ data, metric }: { data: LeaderboardEntry[]; metric: 'leads' | 'notes' | 'appointments' }) => {
    const sorted = [...data].sort((a, b) => {
      switch (metric) {
        case 'leads': return b.leads_added - a.leads_added;
        case 'notes': return b.notes_added - a.notes_added;
        case 'appointments': return b.appointments_booked - a.appointments_booked;
      }
    });

    const getValue = (entry: LeaderboardEntry) => {
      switch (metric) {
        case 'leads': return entry.leads_added;
        case 'notes': return entry.notes_added;
        case 'appointments': return entry.appointments_booked;
      }
    };

    if (sorted.length === 0) {
      return (
        <p className="text-sm text-muted-foreground text-center py-4">
          No data yet
        </p>
      );
    }

    return (
      <div className="space-y-2">
        {sorted.map((entry, index) => (
          <div 
            key={entry.user_id} 
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg w-8">{getRankEmoji(index)}</span>
              <span className="font-medium">{entry.full_name}</span>
            </div>
            <span className="font-bold text-primary">{getValue(entry)}</span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="md:ml-56 text-center py-8 text-muted-foreground">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="space-y-6 md:ml-56">
      <div className="flex items-center gap-3">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-foreground">Leaderboard</h2>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Most Leads Added
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={weeklyData} metric="leads" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-500" />
                Most Notes Added
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={weeklyData} metric="notes" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                Most Appointments Booked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={weeklyData} metric="appointments" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifetime" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Most Leads Added (All Time)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={lifetimeData} metric="leads" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-500" />
                Most Notes Added (All Time)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={lifetimeData} metric="notes" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                Most Appointments Booked (All Time)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={lifetimeData} metric="appointments" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
