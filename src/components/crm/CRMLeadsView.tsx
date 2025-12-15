import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useCRM } from '@/hooks/useCRM';
import { CRMLeadForm } from './CRMLeadForm';
import { CRMLeadDetail } from './CRMLeadDetail';
import { CRMKanbanView } from './CRMKanbanView';
import { LEAD_STAGES, type CRMLead } from '@/types/crm';
import { formatPhoneNumber } from '@/lib/formatters';
import { Plus, Search, Phone, Mail, MapPin, List, LayoutGrid } from 'lucide-react';
import { format } from 'date-fns';

export function CRMLeadsView() {
  const { leads, loading, fetchLeads } = useCRM();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');

  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      lead.name.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.phone?.includes(searchQuery) ||
      lead.address?.toLowerCase().includes(query) ||
      lead.website?.toLowerCase().includes(query) ||
      lead.linkedin?.toLowerCase().includes(query);
    
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'quoted': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'won': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'lost': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleLeadUpdated = async () => {
    await fetchLeads();
  };

  if (showAddForm) {
    return <CRMLeadForm onClose={() => setShowAddForm(false)} />;
  }

  if (selectedLead) {
    return <CRMLeadDetail lead={selectedLead} onClose={() => setSelectedLead(null)} />;
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Leads</h2>
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as 'list' | 'board')}>
            <ToggleGroupItem value="list" aria-label="List view" className="px-2 md:px-3 h-9">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="board" aria-label="Board view" className="px-2 md:px-3 h-9">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button onClick={() => setShowAddForm(true)} size="sm" className="gap-1 md:gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Lead</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, email, address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent className="bg-background z-50">
            <SelectItem value="all">All Stages</SelectItem>
            {LEAD_STAGES.map(stage => (
              <SelectItem key={stage.value} value={stage.value}>
                {stage.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Leads View */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : filteredLeads.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {searchQuery || stageFilter !== 'all' 
              ? 'No leads match your filters'
              : 'No leads yet. Add your first lead!'}
          </CardContent>
        </Card>
      ) : viewMode === 'board' ? (
        <CRMKanbanView 
          leads={filteredLeads} 
          onLeadClick={setSelectedLead}
          onLeadUpdated={handleLeadUpdated}
        />
      ) : (
        <div className="space-y-3">
          {filteredLeads.map(lead => (
            <Card 
              key={lead.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setSelectedLead(lead)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{lead.name}</h3>
                      <Badge className={getStageColor(lead.stage)}>
                        {LEAD_STAGES.find(s => s.value === lead.stage)?.label || lead.stage}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      {lead.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {formatPhoneNumber(lead.phone)}
                        </span>
                      )}
                      {lead.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </span>
                      )}
                      {lead.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {lead.address}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground shrink-0">
                    {format(new Date(lead.created_at), 'MMM d, yyyy')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
