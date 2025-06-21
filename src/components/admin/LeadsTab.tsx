
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Download,
  RefreshCw,
  Archive,
  ArchiveRestore,
  Eye,
  EyeOff
} from "lucide-react";
import { Quote } from "@/types/admin";
import PhotoViewer from "@/components/admin/PhotoViewer";

interface LeadsTabProps {
  quotes: Quote[];
  loading: boolean;
  showArchived: boolean;
  archivingQuoteId: string | null;
  onToggleArchivedView: () => void;
  onRefresh: () => void;
  onExportLeads: () => void;
  onArchiveQuote: (quoteId: string) => void;
  onUnarchiveQuote: (quoteId: string) => void;
}

const LeadsTab: React.FC<LeadsTabProps> = ({
  quotes,
  loading,
  showArchived,
  archivingQuoteId,
  onToggleArchivedView,
  onRefresh,
  onExportLeads,
  onArchiveQuote,
  onUnarchiveQuote
}) => {
  const activeQuotes = quotes.filter(q => !q.archived);
  const archivedQuotes = quotes.filter(q => q.archived);
  const displayedQuotes = showArchived ? quotes : activeQuotes;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceBadge = (leadSource: string) => {
    if (leadSource === 'DFW') {
      return <Badge className="bg-green-100 text-green-800 border-0">DFW</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 border-0">Houston</Badge>;
  };

  const formatGarageType = (quote: Quote) => {
    if (quote.garage_type === 'custom') {
      const spaceType = quote.other_space_type || quote.space_type || 'Custom';
      return `${spaceType} (${quote.custom_sqft || 0} sq ft)`;
    }
    return quote.garage_type;
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">
          {showArchived ? `All Leads (${quotes.length})` : `Active Leads (${activeQuotes.length})`}
          {showArchived && archivedQuotes.length > 0 && (
            <span className="text-sm text-gray-400 ml-2">
              • {archivedQuotes.length} archived
            </span>
          )}
          {loading && <span className="ml-2 text-sm text-gray-400">(Loading...)</span>}
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            onClick={onToggleArchivedView}
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
          >
            {showArchived ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </Button>
          <Button 
            onClick={onRefresh} 
            variant="outline"
            size="sm"
            disabled={loading}
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={onExportLeads} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            Loading quotes from database...
          </div>
        ) : displayedQuotes.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              {showArchived ? 'No quotes found in database' : 'No active quotes found'}
            </div>
            <Button 
              onClick={onRefresh} 
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-700">
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Contact</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Source</TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Color</TableHead>
                  <TableHead className="text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-300">Photos</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedQuotes.map((quote) => (
                  <TableRow 
                    key={quote.id} 
                    className={`border-b border-gray-700 ${quote.archived ? 'opacity-60' : ''}`}
                  >
                    <TableCell className="text-white font-medium">
                      {quote.name}
                      {quote.archived && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Archived
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div>{quote.email}</div>
                      <div className="text-sm">{quote.phone}</div>
                    </TableCell>
                    <TableCell className="text-gray-300">{quote.zip_code}</TableCell>
                    <TableCell>{getSourceBadge(quote.lead_source)}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatGarageType(quote)}
                    </TableCell>
                    <TableCell className="text-gray-300">{quote.color_choice}</TableCell>
                    <TableCell className="text-green-400 font-bold">
                      ${quote.estimated_price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <PhotoViewer 
                        exteriorPhotos={quote.exterior_photos}
                        damagePhotos={quote.damage_photos}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(quote.status)} border-0`}>
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {quote.archived ? (
                        <Button
                          onClick={() => onUnarchiveQuote(quote.id)}
                          disabled={archivingQuoteId === quote.id}
                          size="sm"
                          variant="outline"
                          className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        >
                          {archivingQuoteId === quote.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <ArchiveRestore className="h-4 w-4" />
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => onArchiveQuote(quote.id)}
                          disabled={archivingQuoteId === quote.id}
                          size="sm"
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                        >
                          {archivingQuoteId === quote.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Archive className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadsTab;
