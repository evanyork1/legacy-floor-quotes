import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, FileText, Video, Trash2, Upload } from 'lucide-react';
import { format } from 'date-fns';

interface TrainingItem {
  id: string;
  title: string;
  description?: string;
  file_url?: string;
  video_url?: string;
  created_at: string;
}

export function TrainingManagement() {
  const [trainings, setTrainings] = useState<TrainingItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    const { data, error } = await supabase
      .from('training_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching trainings:', error);
      return;
    }

    setTrainings(data || []);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from('training-materials')
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    return fileName;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);

    try {
      let fileUrl = null;
      
      if (selectedFile) {
        setUploading(true);
        fileUrl = await uploadFile(selectedFile);
        setUploading(false);
      }

      const { error } = await supabase
        .from('training_items')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          file_url: fileUrl,
          video_url: videoUrl.trim() || null,
        });

      if (error) throw error;

      // Reset form
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setSelectedFile(null);
      setShowForm(false);
      
      fetchTrainings();

      toast({
        title: 'Success',
        description: 'Training item created successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleDelete = async (trainingId: string, fileUrl?: string) => {
    if (!confirm('Are you sure you want to delete this training item?')) return;

    try {
      // Delete file from storage if exists
      if (fileUrl) {
        await supabase.storage
          .from('training-materials')
          .remove([fileUrl]);
      }

      const { error } = await supabase
        .from('training_items')
        .delete()
        .eq('id', trainingId);

      if (error) throw error;

      fetchTrainings();
      
      toast({
        title: 'Success',
        description: 'Training item deleted',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to delete training item',
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'Error',
          description: 'File size must be less than 10MB',
          variant: 'destructive',
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Training Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Training Management
              </CardTitle>
              <CardDescription>
                Add training materials for your team
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? 'Cancel' : 'Add Training'}
            </Button>
          </div>
        </CardHeader>
        
        {showForm && (
          <CardContent className="border-t">
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the training material..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="file">File Upload (Optional)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports: PDF, DOC, DOCX, JPG, PNG (max 10MB)
                </p>
                {selectedFile && (
                  <Badge variant="outline" className="mt-2">
                    <Upload className="h-3 w-3 mr-1" />
                    {selectedFile.name}
                  </Badge>
                )}
              </div>

              <div>
                <Label htmlFor="videoUrl">Video URL (Optional)</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  YouTube, Vimeo, or any video URL
                </p>
              </div>
              
              <Button type="submit" disabled={loading || uploading}>
                {uploading ? 'Uploading...' : loading ? 'Creating...' : 'Create Training Item'}
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Training Items List */}
      <Card>
        <CardHeader>
          <CardTitle>Training Materials</CardTitle>
          <CardDescription>
            All available training materials for your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          {trainings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No training materials yet</p>
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
                            File
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
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(training.id, training.file_url || undefined)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}