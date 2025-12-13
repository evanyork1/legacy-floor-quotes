import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useCRM } from '@/hooks/useCRM';
import { useAuth } from '@/hooks/useAuth';
import type { CRMSalesGoal, LeaderboardEntry } from '@/types/crm';
import { Target, TrendingUp, Users, Calendar, Edit2, Check, X } from 'lucide-react';
import { format } from 'date-fns';

export function CRMDashboard() {
  const { user } = useAuth();
  const { leads, getCurrentGoal, setMonthlyGoal, getLeaderboard } = useCRM();
  const [goal, setGoal] = useState<CRMSalesGoal | null>(null);
  const [weeklyStats, setWeeklyStats] = useState<LeaderboardEntry | null>(null);
  const [lifetimeStats, setLifetimeStats] = useState<LeaderboardEntry | null>(null);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoalAmount, setNewGoalAmount] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const currentGoal = await getCurrentGoal();
      setGoal(currentGoal);
      if (currentGoal) {
        setNewGoalAmount(currentGoal.goal_amount.toString());
      }

      const weekly = await getLeaderboard('week');
      const lifetime = await getLeaderboard('lifetime');
      
      setWeeklyStats(weekly.find(e => e.user_id === user?.id) || null);
      setLifetimeStats(lifetime.find(e => e.user_id === user?.id) || null);
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

  return (
    <div className="space-y-6 md:ml-56">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <span className="text-sm text-muted-foreground">{format(new Date(), 'MMMM yyyy')}</span>
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

      {/* Activity Summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Leads Added</span>
              <span className="font-medium">{weeklyStats?.leads_added || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Notes Added</span>
              <span className="font-medium">{weeklyStats?.notes_added || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Appointments</span>
              <span className="font-medium">{weeklyStats?.appointments_booked || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lifetime</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Leads Added</span>
              <span className="font-medium">{lifetimeStats?.leads_added || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Notes Added</span>
              <span className="font-medium">{lifetimeStats?.notes_added || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Appointments</span>
              <span className="font-medium">{lifetimeStats?.appointments_booked || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
