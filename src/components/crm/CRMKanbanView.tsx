import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CRMLead, LEAD_STAGES } from '@/types/crm';
import { useCRM } from '@/hooks/useCRM';
import { formatPhoneNumber } from '@/lib/formatters';
import { toast } from 'sonner';

interface CRMKanbanViewProps {
  leads: CRMLead[];
  onLeadClick: (lead: CRMLead) => void;
  onLeadUpdated: () => void;
}

export function CRMKanbanView({ leads, onLeadClick, onLeadUpdated }: CRMKanbanViewProps) {
  const { updateLead } = useCRM();
  const [draggedLead, setDraggedLead] = useState<CRMLead | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, lead: CRMLead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStage(stage);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = async (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    setDragOverStage(null);
    
    if (!draggedLead || draggedLead.stage === newStage) {
      setDraggedLead(null);
      return;
    }

    try {
      await updateLead(draggedLead.id, { stage: newStage });
      toast.success(`Moved to ${LEAD_STAGES.find(s => s.value === newStage)?.label}`);
      onLeadUpdated();
    } catch (error) {
      toast.error('Failed to update lead');
    }
    
    setDraggedLead(null);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new': return 'bg-blue-500/10 border-blue-500/30';
      case 'contacted': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'quoted': return 'bg-purple-500/10 border-purple-500/30';
      case 'won': return 'bg-green-500/10 border-green-500/30';
      case 'lost': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-muted';
    }
  };

  const getStageHeaderColor = (stage: string) => {
    switch (stage) {
      case 'new': return 'text-blue-600 dark:text-blue-400';
      case 'contacted': return 'text-yellow-600 dark:text-yellow-400';
      case 'quoted': return 'text-purple-600 dark:text-purple-400';
      case 'won': return 'text-green-600 dark:text-green-400';
      case 'lost': return 'text-red-600 dark:text-red-400';
      default: return '';
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
      {LEAD_STAGES.map((stage) => {
        const stageLeads = leads.filter((lead) => lead.stage === stage.value);
        const isDragOver = dragOverStage === stage.value;
        
        return (
          <div
            key={stage.value}
            className={`flex-shrink-0 w-64 md:w-72 flex flex-col rounded-lg border-2 transition-colors ${
              isDragOver ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'
            }`}
            onDragOver={(e) => handleDragOver(e, stage.value)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.value)}
          >
            <div className={`p-3 border-b ${getStageColor(stage.value)}`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold ${getStageHeaderColor(stage.value)}`}>
                  {stage.label}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {stageLeads.length}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 p-2 space-y-2 min-h-[200px] max-h-[calc(100vh-350px)] overflow-y-auto">
              {stageLeads.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-8">
                  No leads
                </div>
              ) : (
                stageLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    onClick={() => onLeadClick(lead)}
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      draggedLead?.id === lead.id ? 'opacity-50' : ''
                    }`}
                  >
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm truncate mb-2">
                        {lead.name}
                      </h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {lead.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{formatPhoneNumber(lead.phone)}</span>
                          </div>
                        )}
                        {lead.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                        )}
                        {lead.address && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{lead.address}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
