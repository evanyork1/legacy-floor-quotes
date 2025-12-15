import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCRM } from '@/hooks/useCRM';
import { LEAD_STAGES, type CRMLead, type CRMLeadNote } from '@/types/crm';
import { formatPhoneNumber } from '@/lib/formatters';
import { ArrowLeft, Edit2, Save, X, Phone, Mail, MapPin, Globe, Linkedin, Calendar, User, Send, Loader2, Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { CRMFollowUpForm } from './CRMFollowUpForm';

interface CRMLeadDetailProps {
  lead: CRMLead;
  onClose: () => void;
}

export function CRMLeadDetail({ lead, onClose }: CRMLeadDetailProps) {
  const { updateLead, addNote, getLeadNotes, logAppointment, isAdmin, deleteLead, fetchLeads } = useCRM();
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState<CRMLeadNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [stageLoading, setStageLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(lead.stage);
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);

  const [editData, setEditData] = useState({
    name: lead.name,
    company: lead.company || '',
    phone: lead.phone || '',
    email: lead.email || '',
    address: lead.address || '',
    website: lead.website || '',
    linkedin: lead.linkedin || '',
  });

  useEffect(() => {
    loadNotes();
  }, [lead.id]);

  const loadNotes = async () => {
    const leadNotes = await getLeadNotes(lead.id);
    setNotes(leadNotes);
  };

  const handleSave = async () => {
    setLoading(true);
    const success = await updateLead(lead.id, editData);
    if (success) {
      toast.success('Lead updated');
      setIsEditing(false);
    } else {
      toast.error('Failed to update');
    }
    setLoading(false);
  };

  const handleStageChange = async (newStage: string) => {
    setStageLoading(true);
    setCurrentStage(newStage);
    const success = await updateLead(lead.id, { stage: newStage });
    if (success) {
      toast.success('Stage updated');
      await fetchLeads();
    } else {
      toast.error('Failed to update stage');
      setCurrentStage(lead.stage);
    }
    setStageLoading(false);
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    setLoading(true);
    const success = await addNote(lead.id, newNote);
    if (success) {
      setNewNote('');
      await loadNotes();
      toast.success('Note added');
    } else {
      toast.error('Failed to add note');
    }
    setLoading(false);
  };

  const handleBookAppointment = async () => {
    setAppointmentLoading(true);
    const result = await logAppointment(lead.id);
    if (result.success) {
      toast.success('Appointment logged successfully!');
    } else {
      toast.error(`Failed to log appointment: ${result.error || 'Unknown error'}`);
      console.error('Appointment log error:', result.error);
    }
    setAppointmentLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    
    const success = await deleteLead(lead.id);
    if (success) {
      toast.success('Lead deleted');
      onClose();
    } else {
      toast.error('Failed to delete lead');
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new': return 'border-blue-500 text-blue-600';
      case 'contacted': return 'border-yellow-500 text-yellow-600';
      case 'quoted': return 'border-purple-500 text-purple-600';
      case 'won': return 'border-green-500 text-green-600';
      case 'lost': return 'border-red-500 text-red-600';
      default: return 'border-muted text-muted-foreground';
    }
  };

  if (showFollowUpForm) {
    return (
      <CRMFollowUpForm
        onClose={() => setShowFollowUpForm(false)}
        leadId={lead.id}
        leadName={lead.name}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          {isAdmin && (
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Lead Info */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xl font-bold mb-2"
                />
              ) : (
                <CardTitle className="text-xl">{lead.name}</CardTitle>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                Lead ID: {lead.id.slice(0, 8)}...
              </p>
            </div>
            {/* Always-visible stage selector */}
            <div className="flex items-center gap-2">
              {stageLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <Select value={currentStage} onValueChange={handleStageChange} disabled={stageLoading}>
                <SelectTrigger className={`w-[140px] border-2 ${getStageColor(currentStage)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {LEAD_STAGES.map(stage => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={editData.company}
                  onChange={(e) => setEditData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={editData.phone}
                  onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={editData.email}
                  onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Address</Label>
                <Input
                  value={editData.address}
                  onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  value={editData.website}
                  onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input
                  value={editData.linkedin}
                  onChange={(e) => setEditData(prev => ({ ...prev, linkedin: e.target.value }))}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {lead.company && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">Company:</span>
                  <span>{lead.company}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                    {formatPhoneNumber(lead.phone)}
                  </a>
                </div>
              )}
              {lead.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
                </div>
              )}
              {lead.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.address}</span>
                </div>
              )}
              {lead.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {lead.website}
                  </a>
                </div>
              )}
              {lead.linkedin && (
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-border flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Created: {format(new Date(lead.created_at), 'MMM d, yyyy')}
            </span>
            {lead.created_by_profile && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                By: {lead.created_by_profile.full_name || 'Unknown'}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          onClick={handleBookAppointment}
          disabled={appointmentLoading}
        >
          {appointmentLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Calendar className="h-4 w-4 mr-2" />
          )}
          Log Appointment
        </Button>
        <Button 
          variant="outline"
          onClick={() => setShowFollowUpForm(true)}
        >
          <Clock className="h-4 w-4 mr-2" />
          Add Follow-Up
        </Button>
      </div>

      {/* Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Note */}
          <div className="flex gap-2">
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note..."
              className="min-h-[80px]"
            />
          </div>
          <Button onClick={handleAddNote} disabled={loading || !newNote.trim()} className="w-full gap-2">
            <Send className="h-4 w-4" />
            Add Note
          </Button>

          {/* Notes List */}
          <div className="space-y-3 pt-4 border-t border-border">
            {notes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No notes yet
              </p>
            ) : (
              notes.map(note => (
                <div key={note.id} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{note.user_profile?.full_name || 'Unknown'}</span>
                    <span>•</span>
                    <span>{format(new Date(note.created_at), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
