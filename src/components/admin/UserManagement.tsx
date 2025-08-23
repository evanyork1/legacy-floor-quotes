import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Mail, Trash2 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'rep';
  created_at: string;
}

interface PendingInvite {
  id: string;
  email: string;
  role: 'admin' | 'rep';
  created_at: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'rep'>('rep');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchPendingInvites();
  }, []);

  const fetchUsers = async () => {
    // Get profiles with their roles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        user_roles!inner(role)
      `);

    if (profilesError) {
      console.error('Error fetching users:', profilesError);
      return;
    }

    // Get auth users to get email addresses
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error('Error fetching auth users:', authError);
      return;
    }

    // Combine profile and auth data
    const combinedUsers = profiles?.map((profile: any) => {
      const authUser = authUsers.users.find(user => user.id === profile.id);
      return {
        id: profile.id,
        email: authUser?.email || 'Unknown',
        full_name: profile.full_name,
        role: (profile as any).user_roles.role,
        created_at: authUser?.created_at || '',
      };
    }) || [];

    setUsers(combinedUsers);
  };

  const fetchPendingInvites = async () => {
    const { data, error } = await supabase
      .from('pending_invites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending invites:', error);
      return;
    }

    setPendingInvites(data || []);
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    try {
      // Insert pending invite
      const { error } = await supabase
        .from('pending_invites')
        .insert({
          email: email.toLowerCase().trim(),
          role,
        });

      if (error) throw error;

      setEmail('');
      setRole('rep');
      fetchPendingInvites();

      toast({
        title: 'Invitation sent!',
        description: `${email} can now sign up and will be assigned the ${role} role.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInvite = async (inviteId: string) => {
    const { error } = await supabase
      .from('pending_invites')
      .delete()
      .eq('id', inviteId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete invitation',
        variant: 'destructive',
      });
      return;
    }

    fetchPendingInvites();
    toast({
      title: 'Success',
      description: 'Invitation deleted',
    });
  };

  return (
    <div className="space-y-6">
      {/* Invite User Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite New User
          </CardTitle>
          <CardDescription>
            Send an invitation to add a new team member
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInviteUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: 'admin' | 'rep') => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rep">Sales Rep</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Pending Invitations
            </CardTitle>
            <CardDescription>
              Users who have been invited but haven't signed up yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{invite.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">
                        {invite.role === 'admin' ? 'Admin' : 'Sales Rep'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Invited {new Date(invite.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteInvite(invite.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Users */}
      <Card>
        <CardHeader>
          <CardTitle>Current Users</CardTitle>
          <CardDescription>
            All registered users and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {user.full_name || user.email}
                    </p>
                    {user.full_name && (
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                    <Badge variant="secondary" className="mt-1">
                      {user.role === 'admin' ? 'Admin' : 'Sales Rep'}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}