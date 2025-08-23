import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Target, Edit, Save, X } from 'lucide-react';

export function GoalsSection() {
  const { user } = useAuth();
  const [goals, setGoals] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasGoals, setHasGoals] = useState(false);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    const { data, error } = await supabase
      .from('goals')
      .select('content')
      .eq('user_id', user?.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching goals:', error);
      return;
    }

    if (data) {
      setGoals(data.content);
      setHasGoals(true);
    } else {
      setHasGoals(false);
      setIsEditing(true); // Start editing if no goals exist
    }
  };

  const handleSave = async () => {
    if (!goals.trim()) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('goals')
        .upsert({
          user_id: user?.id,
          content: goals,
        });

      if (error) throw error;

      setIsEditing(false);
      setHasGoals(true);

      toast({
        title: 'Success',
        description: 'Goals saved successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save goals',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchGoals(); // Reset to original content
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              My Goals
            </CardTitle>
            <CardDescription>
              Set and track your personal goals
            </CardDescription>
          </div>
          {hasGoals && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Enter your goals here..."
              rows={6}
              className="resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={loading} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
              {hasGoals && (
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ) : hasGoals ? (
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-sm">{goals}</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No goals set yet</p>
            <Button onClick={() => setIsEditing(true)}>
              <Target className="h-4 w-4 mr-2" />
              Set Goals
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}