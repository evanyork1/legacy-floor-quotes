import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCRM } from '@/hooks/useCRM';
import { LEAD_STAGES, type CRMLead, type CRMLeadNote, type CRMFollowUp } from '@/types/crm';
import { formatPhoneNumber } from '@/lib/formatters';
import { ArrowLeft, Edit2, Save, X, Phone, Mail, MapPin, Globe, Linkedin, Calendar, User, Send, Loader2, Clock, Trash2, Pencil } from 'lucide-react';
import { format, isFuture, isPast, isToday } from 'date-fns';
import { toast } from 'sonner';
import { CRMFollowUpForm } from './CRMFollowUpForm';

interface CRMLeadDetailProps {
  lead: CRMLead;
  onClose: () => void;
}

export function CRMLeadDetail({ lead, onClose }: CRMLeadDetailProps) {
  const { updateLead, addNote, getLeadNotes, isAdmin, deleteLead, fetchLeads, fetchFollowUps, deleteFollowUp } = useCRM();
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState<CRMLeadNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [stageLoading, setStageLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(lead.stage);
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [editingItem, setEditingItem] = useState<CRMFollowUp | null>(null);
  const [leadFollowUps, setLeadFollowUps] = useState<CRMFollowUp[]>([]);

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
    loadLeadFollowUps();
  }, [lead.id]);

  const loadNotes = async () => {
    const leadNotes = await getLeadNotes(lead.id);
    setNotes(leadNotes);
  };

  const loadLeadFollowUps = async () => {
    const allFollowUps = await fetchFollowUps();
    const filtered = allFollowUps.filter(fu => fu.lead_id === lead.id);
    setLeadFollowUps(filtered);
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

  const handleDeleteFollowUp = async (id: string) => {
    const success = await deleteFollowUp(id);
    if (success) {
      toast.success('Deleted');
      await loadLeadFollowUps();
    } else {
      toast.error('Failed to delete');
    }
  };

  const handleFormClose = () => {
    setShowFollowUpForm(false);
    setShowAppointmentForm(false);
    setEditingItem(null);
    loadLeadFollowUps();
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

  if (showFollowUpForm || showAppointmentForm || editingItem) {
    return (
      <CRMFollowUpForm
        onClose={handleFormClose}
        leadId={lead.id}
        leadName={lead.name}
        existingFollowUp={editingItem || undefined}
        type={showAppointmentForm ? 'appointment' : editingItem?.type || 'follow_up'}
      />
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-2 h-8 px-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          {isAdmin && (
            <Button variant="destructive" size="sm" onClick={handleDelete} className="h-8">
              Delete
            </Button>
          )}
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8">
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading} className="h-8">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Lead Info */}
      <Card>
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-lg font-bold mb-1 h-9"
                />
              ) : (
                <CardTitle className="text-lg">{lead.name}</CardTitle>
              )}
              <p className="text-xs text-muted-foreground">ID: {lead.id.slice(0, 8)}...</p>
            </div>
            <div className="flex items-center gap-2">
              {stageLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <Select value={currentStage} onValueChange={handleStageChange} disabled={stageLoading}>
                <SelectTrigger className={`w-[120px] h-8 border-2 text-sm ${getStageColor(currentStage)}`}>
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
        <CardContent className="space-y-3 px-4 pb-4">
          {isEditing ? (
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Company</Label>
                <Input
                  value={editData.company}
                  onChange={(e) => setEditData(prev => ({ ...prev, company: e.target.value }))}
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Phone</Label>
                <Input
                  value={editData.phone}
                  onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Email</Label>
                <Input
                  value={editData.email}
                  onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-8"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label className="text-xs">Address</Label>
                <Input
                  value={editData.address}
                  onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Website</Label>
                <Input
                  value={editData.website}
                  onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">LinkedIn</Label>
                <Input
                  value={editData.linkedin}
                  onChange={(e) => setEditData(prev => ({ ...prev, linkedin: e.target.value }))}
                  className="h-8"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              {lead.company && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Company:</span>
                  <span>{lead.company}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                    {formatPhoneNumber(lead.phone)}
                  </a>
                </div>
              )}
              {lead.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
                </div>
              )}
              {lead.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{lead.address}</span>
                </div>
              )}
              {lead.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {lead.website}
                  </a>
                </div>
              )}
              {lead.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-3.5 w-3.5 text-muted-foreground" />
                  <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="pt-2 border-t border-border flex flex-wrap gap-3 text-xs text-muted-foreground">
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

      {/* Quick Actions - Compact */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAppointmentForm(true)}
          className="h-8"
        >
          <Calendar className="h-4 w-4 mr-1" />
          Log Appointment
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => setShowFollowUpForm(true)}
          className="h-8"
        >
          <Clock className="h-4 w-4 mr-1" />
          Add Follow-Up
        </Button>
      </div>

      {/* Scheduled Items for this Lead */}
      {leadFollowUps.length > 0 && (
        <Card>
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-sm">Scheduled Items</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3 space-y-2">
            {leadFollowUps.map(item => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between p-2 rounded-md border text-sm ${
                  item.completed ? 'bg-muted/50 opacity-60' : 'bg-card'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${item.type === 'appointment' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                  <span className={`truncate ${item.completed ? 'line-through' : ''}`}>{item.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {format(new Date(item.scheduled_at), 'MMM d, h:mm a')}
                  </span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => setEditingItem(item)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteFollowUp(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Notes Section */}
      <Card>
        <CardHeader className="py-2 px-4">
          <CardTitle className="text-sm">Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pb-4">
          {/* Add Note */}
          <div className="flex gap-2">
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note..."
              className="min-h-[60px] text-sm"
            />
          </div>
          <Button onClick={handleAddNote} disabled={loading || !newNote.trim()} size="sm" className="w-full gap-2 h-8">
            <Send className="h-3.5 w-3.5" />
            Add Note
          </Button>

          {/* Notes List */}
          <div className="space-y-2 pt-2 border-t border-border">
            {notes.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-3">
                No notes yet
              </p>
            ) : (
              notes.map(note => (
                <div key={note.id} className="bg-muted/50 rounded-md p-2">
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{note.user_profile?.full_name || 'Unknown'}</span>
                    <span>•</span>
                    <span>{format(new Date(note.created_at), 'MMM d, h:mm a')}</span>
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
