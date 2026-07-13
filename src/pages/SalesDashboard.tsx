import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Target, Users, Trophy, BookOpen, Presentation, Shield, UserPlus, BarChart3 } from 'lucide-react';
import { ProspectingSection } from '@/components/sales/ProspectingSection';
import { GoalsSection } from '@/components/sales/GoalsSection';
import { SalesSection } from '@/components/sales/SalesSection';
import { SalesManagement } from '@/components/admin/SalesManagement';
import { TrainingSection } from '@/components/sales/TrainingSection';
import { TrainingManagement } from '@/components/admin/TrainingManagement';
import { LeaderboardSection } from '@/components/sales/LeaderboardSection';
import AnalyticsTab from '@/components/admin/AnalyticsTab';
import { Seo } from '@/components/seo/Seo';
import { JobberStatus } from '@/components/presentation/JobberStatus';

export default function SalesDashboard() {
  const { user, loading, signOut, hasRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('prospecting');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const isAdminByRole = await hasRole('admin');
        setIsAdmin(isAdminByRole);
      }
    };
    checkAdminStatus();
  }, [user, hasRole]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <Seo title="Sales Dashboard | Legacy Industrial Coatings" description="Internal sales dashboard for Legacy Industrial Coatings." path="/sales-dashboard" noindex />
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          <div className="flex items-center gap-4">
            <JobberStatus />
            {isAdmin && (
              <Badge variant="default" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Admin Mode
              </Badge>
            )}
            {isAdmin && (
              <Button
                variant="outline"
                onClick={() => navigate('/auth#user-management')}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Manage Users
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => navigate('/packagepresentation')}
              className="flex items-center gap-2"
            >
              <Presentation className="h-4 w-4" />
              Package Presentation
            </Button>
            <span className="text-sm text-muted-foreground">
              Welcome, {user.user_metadata?.full_name || user.email}
            </span>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="prospecting" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Prospecting
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <Presentation className="h-4 w-4" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Goals
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="prospecting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProspectingSection />
              </div>
              <div>
                <GoalsSection />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            {isAdmin ? <SalesManagement /> : <SalesSection />}
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            {isAdmin ? (
              <div className="space-y-6">
                <TrainingManagement />
                <TrainingSection />
              </div>
            ) : (
              <TrainingSection />
            )}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <LeaderboardSection />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalsSection />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsTab />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}