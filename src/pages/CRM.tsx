import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { CRMLayout } from '@/components/crm/CRMLayout';
import { CRMDashboard } from '@/components/crm/CRMDashboard';
import { CRMLeadsView } from '@/components/crm/CRMLeadsView';
import { CRMLeaderboard } from '@/components/crm/CRMLeaderboard';
import { CRMSettings } from '@/components/crm/CRMSettings';
import { CRMAdminPanel } from '@/components/crm/CRMAdminPanel';
import { useCRM } from '@/hooks/useCRM';

export default function CRM() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin } = useCRM();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?redirect=/crm');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <CRMDashboard />;
      case 'leads':
        return <CRMLeadsView />;
      case 'leaderboard':
        return <CRMLeaderboard />;
      case 'settings':
        return <CRMSettings />;
      case 'admin':
        return isAdmin ? <CRMAdminPanel /> : <CRMDashboard />;
      default:
        return <CRMDashboard />;
    }
  };

  return (
    <CRMLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </CRMLayout>
  );
}
