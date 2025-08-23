import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Video, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface TrainingItem {
  id: string;
  title: string;
  description?: string;
  file_url?: string;
  video_url?: string;
  created_at: string;
}

export function TrainingSection() {
  const [trainings, setTrainings] = useState<TrainingItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('training_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching trainings:', error);
      return;
    }

    setTrainings(data || []);
    setLoading(false);
  };

  const downloadFile = async (fileUrl: string, title: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('training-materials')
        .download(fileUrl);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Training Materials
        </CardTitle>
        <CardDescription>
          Access training videos, manuals, and resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading training materials...</p>
          </div>
        ) : trainings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No training materials available yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {trainings.map((training) => (
              <div
                key={training.id}
                className="flex items-start justify-between p-4 border rounded-lg bg-background"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{training.title}</h3>
                    <div className="flex gap-1">
                      {training.file_url && (
                        <Badge variant="secondary" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Document
                        </Badge>
                      )}
                      {training.video_url && (
                        <Badge variant="secondary" className="text-xs">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {training.description && (
                    <p className="text-sm text-muted-foreground">
                      {training.description}
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    Added {format(new Date(training.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  {training.video_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(training.video_url, '_blank')}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Watch
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                  
                  {training.file_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(training.file_url!, training.title)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}