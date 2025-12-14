import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCRM } from '@/hooks/useCRM';
import { useAuth } from '@/hooks/useAuth';
import type { CRMSalesGoal, LeaderboardEntry } from '@/types/crm';
import { Target, TrendingUp, Users, Calendar, Edit2, Check, X, Plus, Trophy, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { CRMLeadForm } from './CRMLeadForm';

export function CRMDashboard() {
  const { user } = useAuth();
  const { leads, getCurrentGoal, setMonthlyGoal, getLeaderboard, fetchLeads } = useCRM();
  const [goal, setGoal] = useState<CRMSalesGoal | null>(null);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lifetimeLeaderboard, setLifetimeLeaderboard] = useState<LeaderboardEntry[]>([]);
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
      
      setWeeklyLeaderboard(weekly);
      setLifetimeLeaderboard(lifetime);
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

  const LeaderboardTable = ({ data, metric }: { data: LeaderboardEntry[], metric: 'leads' | 'notes' | 'appointments' }) => {
    const sorted = [...data].sort((a, b) => {
      if (metric === 'leads') return b.leads_added - a.leads_added;
      if (metric === 'notes') return b.notes_added - a.notes_added;
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
                {metric === 'notes' && entry.notes_added}
                {metric === 'appointments' && entry.appointments_booked}
              </span>
            </div>
          ))
        )}
      </div>
    );
  };

  if (showAddLead) {
    return (
      <div className="md:ml-56">
        <CRMLeadForm onClose={handleLeadAdded} />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:ml-56">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowAddLead(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
          <span className="text-sm text-muted-foreground hidden sm:block">{format(new Date(), 'MMMM yyyy')}</span>
        </div>
      </div>

      {/* Sales Goal Progress */}
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">My Leads</span>
            </div>
            <p className="text-2xl font-bold">{myLeads.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Won</span>
            </div>
            <p className="text-2xl font-bold">{myWonLeads.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">New</span>
            </div>
            <p className="text-2xl font-bold">{myNewLeads.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
            <p className="text-2xl font-bold">{weeklyStats?.leads_added || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Section */}
      <Tabs defaultValue="week" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[300px]">
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week" className="mt-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Most Leads Added
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={weeklyLeaderboard} metric="leads" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Most Notes Added
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={weeklyLeaderboard} metric="notes" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Most Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={weeklyLeaderboard} metric="appointments" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lifetime" className="mt-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Most Leads Added
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={lifetimeLeaderboard} metric="leads" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Most Notes Added
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={lifetimeLeaderboard} metric="notes" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Most Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={lifetimeLeaderboard} metric="appointments" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
