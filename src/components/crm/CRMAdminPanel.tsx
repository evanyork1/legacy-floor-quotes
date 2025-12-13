import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCRM } from '@/hooks/useCRM';
import type { CRMUser, CRMSalesGoal } from '@/types/crm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shield, Users, DollarSign, UserPlus, Save } from 'lucide-react';
import { format, startOfMonth } from 'date-fns';

export function CRMAdminPanel() {
  const { getAllUsers, getAllGoals, updateUserSales, leads } = useCRM();
  const [users, setUsers] = useState<CRMUser[]>([]);
  const [goals, setGoals] = useState<(CRMSalesGoal & { user_profile?: CRMUser })[]>([]);
  const [salesInputs, setSalesInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // New user form
  const [newEmail, setNewEmail] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'rep'>('rep');
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [usersData, goalsData] = await Promise.all([
      getAllUsers(),
      getAllGoals()
    ]);
    setUsers(usersData);
    setGoals(goalsData);

    // Initialize sales inputs
    const inputs: Record<string, string> = {};
    goalsData.forEach(g => {
      inputs[g.user_id] = g.actual_amount.toString();
    });
    setSalesInputs(inputs);

    setLoading(false);
  };

  const handleUpdateSales = async (userId: string) => {
    const amount = parseFloat(salesInputs[userId] || '0');
    if (isNaN(amount)) {
      toast.error('Invalid amount');
      return;
    }

    const success = await updateUserSales(userId, amount);
    if (success) {
      toast.success('Sales updated');
      await loadData();
    } else {
      toast.error('Failed to update');
    }
  };

  const handleInviteUser = async () => {
    if (!newEmail.trim()) {
      toast.error('Email is required');
      return;
    }

    setInviting(true);

    // Add to pending invites
    const { error: inviteError } = await supabase
      .from('pending_invites')
      .insert({
        email: newEmail.toLowerCase(),
        role: newRole
      });

    if (inviteError) {
      toast.error('Failed to create invite');
      setInviting(false);
      return;
    }

    // Generate invite link (in production you'd send this via email)
    const inviteUrl = `${window.location.origin}/auth?email=${encodeURIComponent(newEmail)}`;
    
    toast.success(`Invite created! Share this link: ${inviteUrl}`);
    setNewEmail('');
    setNewFullName('');
    setNewRole('rep');
    setInviting(false);
  };

  const getUserGoal = (userId: string) => {
    return goals.find(g => g.user_id === userId);
  };

  if (loading) {
    return (
      <div className="md:ml-56 text-center py-8 text-muted-foreground">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div className="space-y-6 md:ml-56">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Admin Panel</h2>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="invite">Invite</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                All Users ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map(user => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{user.full_name || 'No name'}</p>
                      <p className="text-sm text-muted-foreground">{user.id.slice(0, 8)}...</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        Leads: {leads.filter(l => l.created_by === user.id).length}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Update Sales - {format(new Date(), 'MMMM yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map(user => {
                  const goal = getUserGoal(user.id);
                  return (
                    <div key={user.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{user.full_name || 'No name'}</p>
                        <p className="text-sm text-muted-foreground">
                          Goal: ${goal?.goal_amount?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label className="text-xs">Actual Sales</Label>
                          <Input
                            type="number"
                            value={salesInputs[user.id] || '0'}
                            onChange={(e) => setSalesInputs(prev => ({
                              ...prev,
                              [user.id]: e.target.value
                            }))}
                            placeholder="0"
                          />
                        </div>
                        <Button 
                          onClick={() => handleUpdateSales(user.id)}
                          className="self-end"
                          size="sm"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invite Tab */}
        <TabsContent value="invite">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Invite New User
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newEmail">Email Address</Label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newRole">Role</Label>
                <Select value={newRole} onValueChange={(v: 'admin' | 'rep') => setNewRole(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rep">Sales Rep</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleInviteUser} 
                disabled={inviting || !newEmail.trim()}
                className="w-full gap-2"
              >
                <UserPlus className="h-4 w-4" />
                {inviting ? 'Creating Invite...' : 'Create Invite Link'}
              </Button>

              <p className="text-sm text-muted-foreground">
                This will create a pending invite. When the user signs up with this email, 
                they'll automatically be assigned the selected role.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
