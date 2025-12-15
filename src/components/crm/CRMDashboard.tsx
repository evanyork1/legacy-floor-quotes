import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCRM } from '@/hooks/useCRM';
import { useAuth } from '@/hooks/useAuth';
import type { CRMSalesGoal, LeaderboardEntry, SalesLeaderboardEntry } from '@/types/crm';
import { Target, TrendingUp, Users, Calendar, Edit2, Check, X, Plus, Trophy, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { CRMLeadForm } from './CRMLeadForm';
import { CRMFollowUpsToday } from './CRMFollowUpsToday';
import { CRMDashboardCalendar } from './CRMDashboardCalendar';

export function CRMDashboard() {
  const { user } = useAuth();
  const { leads, getCurrentGoal, setMonthlyGoal, getLeaderboard, getSalesLeaderboard, fetchLeads } = useCRM();
  const [goal, setGoal] = useState<CRMSalesGoal | null>(null);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lifetimeLeaderboard, setLifetimeLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [weeklySalesLeaderboard, setWeeklySalesLeaderboard] = useState<SalesLeaderboardEntry[]>([]);
  const [lifetimeSalesLeaderboard, setLifetimeSalesLeaderboard] = useState<SalesLeaderboardEntry[]>([]);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [showAddLead, setShowAddLead] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const currentGoal = await getCurrentGoal();
      setGoal(currentGoal);
      if (currentGoal) {
        setNewGoalAmount(currentGoal.goal_amount.toString());
      }

      const weekly = await getLeaderboard('week');
      const lifetime = await getLeaderboard('lifetime');
      const weeklySales = await getSalesLeaderboard('week');
      const lifetimeSales = await getSalesLeaderboard('lifetime');
      
      setWeeklyLeaderboard(weekly);
      setLifetimeLeaderboard(lifetime);
      setWeeklySalesLeaderboard(weeklySales);
      setLifetimeSalesLeaderboard(lifetimeSales);
    };

    loadData();
  }, [user?.id]);

  const handleSaveGoal = async () => {
    const amount = parseFloat(newGoalAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    await setMonthlyGoal(amount);
    const updatedGoal = await getCurrentGoal();
    setGoal(updatedGoal);
    setIsEditingGoal(false);
  };

  const handleLeadAdded = async () => {
    setShowAddLead(false);
    await fetchLeads();
  };

  const progressPercent = goal && goal.goal_amount > 0 
    ? Math.min((goal.actual_amount / goal.goal_amount) * 100, 100) 
    : 0;

  const getProgressColor = (percent: number) => {
    if (percent < 50) return 'bg-red-500';
    if (percent < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const myLeads = leads.filter(l => l.created_by === user?.id || l.assigned_to === user?.id);
  const myNewLeads = myLeads.filter(l => l.stage === 'new');
  const myWonLeads = myLeads.filter(l => l.stage === 'won');
  const weeklyStats = weeklyLeaderboard.find(e => e.user_id === user?.id);

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const LeaderboardTable = ({ data, metric }: { data: LeaderboardEntry[], metric: 'leads' | 'appointments' }) => {
    const sorted = [...data].sort((a, b) => {
      if (metric === 'leads') return b.leads_added - a.leads_added;
      return b.appointments_booked - a.appointments_booked;
    }).slice(0, 5);

    return (
      <div className="space-y-2">
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">No data</p>
        ) : (
          sorted.map((entry, index) => (
            <div key={entry.user_id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-6">{getRankEmoji(index)}</span>
                <span className="truncate">{entry.full_name}</span>
              </div>
              <span className="font-medium">
                {metric === 'leads' && entry.leads_added}
                {metric === 'appointments' && entry.appointments_booked}
              </span>
            </div>
          ))
        )}
      </div>
    );
  };

  const SalesLeaderboardTable = ({ data }: { data: SalesLeaderboardEntry[] }) => {
    const sorted = [...data].sort((a, b) => b.deals - a.deals).slice(0, 5);

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
    };

    return (
      <div className="space-y-2">
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">No data</p>
        ) : (
          sorted.map((entry, index) => (
            <div key={entry.user_id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-6">{getRankEmoji(index)}</span>
                <span className="truncate">{entry.full_name}</span>
              </div>
              <span className="font-medium">
                {entry.deals} ({formatCurrency(entry.revenue)})
              </span>
            </div>
          ))
        )}
      </div>
    );
  };

  if (showAddLead) {
    return <CRMLeadForm onClose={handleLeadAdded} />;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Dashboard</h2>
        <div className="flex items-center gap-2 md:gap-3">
          <Button onClick={() => setShowAddLead(true)} size="sm" className="gap-1 md:gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Lead</span>
          </Button>
          <span className="text-xs md:text-sm text-muted-foreground hidden sm:block">{format(new Date(), 'MMMM yyyy')}</span>
        </div>
      </div>

      {/* Follow-Ups Today and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <CRMFollowUpsToday />
        <CRMDashboardCalendar />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <Card>
          <CardContent className="p-3 md:pt-6 md:px-6">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
              <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
              <span className="text-xs md:text-sm text-muted-foreground">My Leads</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{myLeads.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 md:pt-6 md:px-6">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
              <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-500" />
              <span className="text-xs md:text-sm text-muted-foreground">Won</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{myWonLeads.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 md:pt-6 md:px-6">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
              <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-500" />
              <span className="text-xs md:text-sm text-muted-foreground">New</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{myNewLeads.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 md:pt-6 md:px-6">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
              <Target className="h-3.5 w-3.5 md:h-4 md:w-4 text-orange-500" />
              <span className="text-xs md:text-sm text-muted-foreground">This Week</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{weeklyStats?.leads_added || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Section */}
      <div className="space-y-3 md:space-y-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Trophy className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          Company Leaderboard
        </h3>
        <Tabs defaultValue="week" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[250px] md:max-w-[300px]">
          <TabsTrigger value="week" className="text-xs md:text-sm">This Week</TabsTrigger>
          <TabsTrigger value="lifetime" className="text-xs md:text-sm">Lifetime</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week" className="mt-3 md:mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Card>
              <CardHeader className="p-3 md:p-6 pb-2">
                <CardTitle className="text-xs md:text-sm flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  Most Leads Added
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <LeaderboardTable data={weeklyLeaderboard} metric="leads" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 md:p-6 pb-2">
                <CardTitle className="text-xs md:text-sm flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  Most Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <LeaderboardTable data={weeklyLeaderboard} metric="appointments" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 md:p-6 pb-2">
                <CardTitle className="text-xs md:text-sm flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  Most Sales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <SalesLeaderboardTable data={weeklySalesLeaderboard} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lifetime" className="mt-3 md:mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Card>
              <CardHeader className="p-3 md:p-6 pb-2">
                <CardTitle className="text-xs md:text-sm flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  Most Leads Added
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <LeaderboardTable data={lifetimeLeaderboard} metric="leads" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 md:p-6 pb-2">
                <CardTitle className="text-xs md:text-sm flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  Most Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <LeaderboardTable data={lifetimeLeaderboard} metric="appointments" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 md:p-6 pb-2">
                <CardTitle className="text-xs md:text-sm flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  Most Sales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <SalesLeaderboardTable data={lifetimeSalesLeaderboard} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        </Tabs>
      </div>

      {/* Monthly Sales Goal - Moved to bottom */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Monthly Sales Goal
            </CardTitle>
            {!isEditingGoal && (
              <Button variant="ghost" size="sm" onClick={() => setIsEditingGoal(true)}>
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditingGoal ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">$</span>
              <Input
                type="number"
                value={newGoalAmount}
                onChange={(e) => setNewGoalAmount(e.target.value)}
                placeholder="Enter goal amount"
                className="max-w-[200px]"
              />
              <Button size="sm" onClick={handleSaveGoal}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditingGoal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  ${goal?.actual_amount?.toLocaleString() || 0} of ${goal?.goal_amount?.toLocaleString() || 0}
                </span>
                <span className="text-sm font-medium">{progressPercent.toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${getProgressColor(progressPercent)}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
