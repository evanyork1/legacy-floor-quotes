
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// Tabs removed: signup is invite-only
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Loader2, UserPlus, Mail, Trash2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface PendingInvite {
  id: string;
  email: string;
  role: 'admin' | 'rep';
  created_at: string;
}

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const adminSectionRef = useRef<HTMLDivElement>(null);
  
  // User management states
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'rep'>('rep');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);

  // Check if this is a CRM redirect (hide signup)
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect');
  const isCRMLogin = redirectTo === '/crm';

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Redirect to the requested page or default to sales-dashboard
        if (redirectTo) {
          navigate(redirectTo);
        } else {
          // Only redirect non-admins automatically
          const adminRole = await hasRole('admin');
          if (!adminRole) {
            navigate('/sales-dashboard');
          }
        }
      }
    };
    checkUser();
  }, [navigate, hasRole, redirectTo]);

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

  useEffect(() => {
    // Scroll to admin section if hash is present
    if (location.hash === '#user-management' && adminSectionRef.current) {
      adminSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash, isAdmin]);

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

      // Redirect to requested page or default
      navigate(redirectTo || '/sales-dashboard');
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
        {user && (
          <div className="flex items-center justify-between bg-background/95 backdrop-blur rounded-lg p-4 border">
            <div>
              <p className="text-sm text-muted-foreground">You're signed in as</p>
              <p className="font-medium">{user.user_metadata?.full_name || user.email}</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/sales-dashboard')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        )}
        
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              {user ? 'Manage your account' : isCRMLogin ? 'Sign in to access the CRM' : 'Sign in to access your sales dashboard'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isCRMLogin ? (
              // CRM login - only show sign in form, no tabs
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
            ) : (
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
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Accounts are created by invitation only. Contact your administrator for access.
                </p>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Admin User Management Section */}
        {user && isAdmin && (
          <div ref={adminSectionRef} className="space-y-6">
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
