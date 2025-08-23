
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Loader2, UserPlus, Mail, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface PendingInvite {
  id: string;
  email: string;
  role: 'admin' | 'rep';
  created_at: string;
}

export default function Auth() {
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // User management states
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'rep'>('rep');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/sales-dashboard');
      }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const adminRole = await hasRole('admin');
        setIsAdmin(adminRole);
        if (adminRole) {
          fetchPendingInvites();
        }
      }
    };
    checkAdminRole();
  }, [user, hasRole]);

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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/sales-dashboard`,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: 'Account created!',
        description: 'Please check your email to confirm your account.',
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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/sales-dashboard');
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

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setInviteLoading(true);

    try {
      const { error } = await supabase
        .from('pending_invites')
        .insert({
          email: inviteEmail.toLowerCase().trim(),
          role: inviteRole,
        });

      if (error) throw error;

      setInviteEmail('');
      setInviteRole('rep');
      fetchPendingInvites();

      toast({
        title: 'Invitation sent!',
        description: `${inviteEmail} can now sign up and will be assigned the ${inviteRole} role.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setInviteLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to access your sales dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Admin User Management Section */}
        {user && isAdmin && (
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
                      <Label htmlFor="invite-email">Email Address</Label>
                      <Input
                        id="invite-email"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="invite-role">Role</Label>
                      <Select value={inviteRole} onValueChange={(value: 'admin' | 'rep') => setInviteRole(value)}>
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
                  <Button type="submit" disabled={inviteLoading}>
                    {inviteLoading ? 'Sending...' : 'Send Invitation'}
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
          </div>
        )}
      </div>
    </div>
  );
}
