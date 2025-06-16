
import { useState, useEffect } from "react";
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
  Users, 
  Download,
  RefreshCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import PhotoViewer from "@/components/admin/PhotoViewer";

interface Quote {
  id: string;
  garage_type: string;
  custom_sqft?: number;
  space_type?: string;
  other_space_type?: string;
  exterior_photos: string[] | null;
  damage_photos: string[] | null;
  color_choice: string;
  name: string;
  email: string;
  phone: string;
  zip_code: string;
  estimated_price: number;
  created_at: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
}

const EmployeePanel = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchQuotes = async () => {
    console.log('🔍 Starting fetchQuotes function...');
    
    try {
      setLoading(true);
      console.log('📡 Making Supabase query...');
      
      const { data, error, count } = await supabase
        .from('quotes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      console.log('📊 Raw Supabase response:', { data, error, count });

      if (error) {
        console.error('❌ Supabase error:', error);
        toast({
          title: "Database Error",
          description: `Error fetching quotes: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        console.log('⚠️ No data returned from database');
        setQuotes([]);
        return;
      }

      console.log('✅ Processing data...');
      // Type cast the status field and handle null arrays
      const typedQuotes = data.map(quote => {
        console.log('🔄 Processing quote:', quote.id, quote.name);
        return {
          ...quote,
          status: (quote.status as 'new' | 'contacted' | 'quoted' | 'closed') || 'new',
          exterior_photos: quote.exterior_photos || [],
          damage_photos: quote.damage_photos || []
        };
      });

      console.log('🎯 Final processed quotes:', typedQuotes);
      setQuotes(typedQuotes);
      
      toast({
        title: "Success",
        description: `Loaded ${typedQuotes.length} quotes from database`,
      });

    } catch (error) {
      console.error('💥 Unexpected error in fetchQuotes:', error);
      toast({
        title: "Error",
        description: "Failed to connect to database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log('🏁 fetchQuotes completed');
    }
  };

  useEffect(() => {
    console.log('🚀 EmployeePanel component mounted, testing Supabase connection...');
    console.log('🔧 Supabase client:', supabase);
    
    fetchQuotes();
  }, []);

  const exportLeads = () => {
    if (quotes.length === 0) {
      toast({
        title: "No Data",
        description: "No quotes available to export",
        variant: "destructive",
      });
      return;
    }

    const csvContent = [
      ['Name', 'Email', 'Phone', 'ZIP', 'Garage Type', 'Custom Sq Ft', 'Space Type', 'Other Space Type', 'Color Choice', 'Price', 'Status', 'Date', 'Exterior Photos', 'Damage Photos'],
      ...quotes.map(q => [
        q.name, 
        q.email, 
        q.phone, 
        q.zip_code, 
        q.garage_type,
        q.custom_sqft?.toString() || '',
        q.space_type || '',
        q.other_space_type || '',
        q.color_choice,
        q.estimated_price.toString(), 
        q.status, 
        q.created_at,
        (q.exterior_photos || []).join('; '),
        (q.damage_photos || []).join('; ')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatGarageType = (quote: Quote) => {
    if (quote.garage_type === 'custom') {
      const spaceType = quote.other_space_type || quote.space_type || 'Custom';
      return `${spaceType} (${quote.custom_sqft || 0} sq ft)`;
    }
    return quote.garage_type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Employee Dashboard</h1>
          <p className="text-blue-200">View and manage leads</p>
        </div>

        {/* Leads Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recent Leads ({quotes.length})
              {loading && <span className="ml-2 text-sm text-gray-400">(Loading...)</span>}
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={fetchQuotes} 
                variant="outline"
                size="sm"
                disabled={loading}
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={exportLeads} className="bg-green-600 hover:bg-green-700">
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
            ) : quotes.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">No quotes found in database</div>
                <Button 
                  onClick={fetchQuotes} 
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
                      <TableHead className="text-gray-300">Type</TableHead>
                      <TableHead className="text-gray-300">Color</TableHead>
                      <TableHead className="text-gray-300">Price</TableHead>
                      <TableHead className="text-gray-300">Photos</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote) => (
                      <TableRow key={quote.id} className="border-b border-gray-700">
                        <TableCell className="text-white font-medium">{quote.name}</TableCell>
                        <TableCell className="text-gray-300">
                          <div>{quote.email}</div>
                          <div className="text-sm">{quote.phone}</div>
                        </TableCell>
                        <TableCell className="text-gray-300">{quote.zip_code}</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeePanel;
