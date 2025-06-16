import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Settings, 
  Users, 
  DollarSign, 
  Globe, 
  Download,
  Edit,
  Trash2,
  Plus,
  Save,
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

interface PricingTier {
  id: string;
  min_sqft: number;
  max_sqft: number;
  price_per_sqft: number;
}

interface Subdomain {
  id: string;
  name: string;
  pricing_multiplier: number;
  custom_pricing: PricingTier[];
  created_at: string;
}

const AdminPanel = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const { toast } = useToast();

  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    { id: "1", min_sqft: 0, max_sqft: 500, price_per_sqft: 9 },
    { id: "2", min_sqft: 501, max_sqft: 800, price_per_sqft: 8 },
    { id: "3", min_sqft: 801, max_sqft: 1200, price_per_sqft: 7 },
    { id: "4", min_sqft: 1201, max_sqft: 9999, price_per_sqft: 6 }
  ]);

  const [subdomains, setSubdomains] = useState<Subdomain[]>([
    {
      id: "1",
      name: "dallas",
      pricing_multiplier: 1.0,
      custom_pricing: [],
      created_at: "2024-01-01T00:00:00Z"
    },
    {
      id: "2", 
      name: "houston",
      pricing_multiplier: 1.1,
      custom_pricing: [],
      created_at: "2024-01-02T00:00:00Z"
    }
  ]);

  const [newSubdomain, setNewSubdomain] = useState("");
  const [newMultiplier, setNewMultiplier] = useState("1.0");

  const fetchQuotes = async () => {
    console.log('🔍 Starting fetchQuotes function...');
    
    try {
      setLoading(true);
      console.log('📡 Making Supabase query...');
      
      // Test basic Supabase connection first
      const connectionTest = await supabase.from('quotes').select('count', { count: 'exact', head: true });
      console.log('🔗 Connection test result:', connectionTest);
      
      const { data, error, count } = await supabase
        .from('quotes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      console.log('📊 Raw Supabase response:', { data, error, count });
      console.log('📈 Data length:', data?.length);
      console.log('🔍 First item (if exists):', data?.[0]);

      if (error) {
        console.error('❌ Supabase error:', error);
        setDebugInfo({ error: error.message, details: error });
        toast({
          title: "Database Error",
          description: `Error fetching quotes: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        console.log('⚠️ No data returned from database');
        setDebugInfo({ message: 'No data found', rawData: data });
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
      setDebugInfo({ success: true, count: typedQuotes.length, firstQuote: typedQuotes[0] });
      setQuotes(typedQuotes);
      
      toast({
        title: "Success",
        description: `Loaded ${typedQuotes.length} quotes from database`,
      });

    } catch (error) {
      console.error('💥 Unexpected error in fetchQuotes:', error);
      setDebugInfo({ unexpectedError: error });
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

  // Test Supabase connection on component mount
  useEffect(() => {
    console.log('🚀 AdminPanel component mounted, testing Supabase connection...');
    console.log('🔧 Supabase client:', supabase);
    
    // Test if we can access Supabase at all
    const testConnection = async () => {
      try {
        const { data: testData, error: testError } = await supabase.from('quotes').select('id').limit(1);
        console.log('🧪 Connection test:', { testData, testError });
      } catch (err) {
        console.error('🚨 Connection test failed:', err);
      }
    };
    
    testConnection();
    fetchQuotes();
  }, []);

  const addSubdomain = () => {
    if (newSubdomain.trim()) {
      const subdomain: Subdomain = {
        id: Date.now().toString(),
        name: newSubdomain.toLowerCase().replace(/[^a-z0-9]/g, ''),
        pricing_multiplier: parseFloat(newMultiplier),
        custom_pricing: [],
        created_at: new Date().toISOString()
      };
      setSubdomains([...subdomains, subdomain]);
      setNewSubdomain("");
      setNewMultiplier("1.0");
    }
  };

  const updatePricingTier = (id: string, field: keyof PricingTier, value: number) => {
    setPricingTiers(prev => prev.map(tier => 
      tier.id === id ? { ...tier, [field]: value } : tier
    ));
  };

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
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-blue-200">Manage your garage floor coating business</p>
          
          {/* Debug Info Card */}
          {debugInfo && (
            <Card className="mt-4 bg-yellow-900 border-yellow-700">
              <CardHeader>
                <CardTitle className="text-yellow-100">Debug Information</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-yellow-200 text-xs overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
            <TabsTrigger value="leads" className="text-white data-[state=active]:bg-blue-600">
              <Users className="h-4 w-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="pricing" className="text-white data-[state=active]:bg-blue-600">
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="subdomains" className="text-white data-[state=active]:bg-blue-600">
              <Globe className="h-4 w-4 mr-2" />
              Subdomains
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">
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
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Pricing Tiers</CardTitle>
                <p className="text-gray-400">Set your base pricing per square foot</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {pricingTiers.map((tier) => (
                  <div key={tier.id} className="grid grid-cols-4 gap-4 p-4 bg-gray-700 rounded-lg">
                    <div>
                      <Label className="text-gray-300">Min Sq Ft</Label>
                      <Input 
                        type="number"
                        value={tier.min_sqft}
                        onChange={(e) => updatePricingTier(tier.id, 'min_sqft', parseInt(e.target.value))}
                        className="bg-gray-600 border-gray-500 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Max Sq Ft</Label>
                      <Input 
                        type="number"
                        value={tier.max_sqft}
                        onChange={(e) => updatePricingTier(tier.id, 'max_sqft', parseInt(e.target.value))}
                        className="bg-gray-600 border-gray-500 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Price per Sq Ft</Label>
                      <Input 
                        type="number"
                        step="0.50"
                        value={tier.price_per_sqft}
                        onChange={(e) => updatePricingTier(tier.id, 'price_per_sqft', parseFloat(e.target.value))}
                        className="bg-gray-600 border-gray-500 text-white"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Pricing Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subdomains Tab */}
          <TabsContent value="subdomains">
            <div className="grid gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Create New Subdomain</CardTitle>
                  <p className="text-gray-400">Generate location-specific landing pages with custom pricing</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-300">Subdomain Name</Label>
                      <Input 
                        value={newSubdomain}
                        onChange={(e) => setNewSubdomain(e.target.value)}
                        placeholder="dallas"
                        className="bg-gray-600 border-gray-500 text-white"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Will create: {newSubdomain.toLowerCase().replace(/[^a-z0-9]/g, '')}.yoursite.com
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-300">Pricing Multiplier</Label>
                      <Input 
                        type="number"
                        step="0.1"
                        value={newMultiplier}
                        onChange={(e) => setNewMultiplier(e.target.value)}
                        className="bg-gray-600 border-gray-500 text-white"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={addSubdomain} className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Subdomain
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Active Subdomains ({subdomains.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subdomains.map((subdomain) => (
                      <div key={subdomain.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <h3 className="text-white font-medium">{subdomain.name}.yoursite.com</h3>
                          <p className="text-gray-400 text-sm">
                            Pricing: {subdomain.pricing_multiplier}x base rate
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Business Name</Label>
                  <Input 
                    defaultValue="Premier Garage Floors"
                    className="bg-gray-600 border-gray-500 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Contact Phone</Label>
                  <Input 
                    defaultValue="(555) 123-4567"
                    className="bg-gray-600 border-gray-500 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Service Areas (ZIP codes, comma-separated)</Label>
                  <Input 
                    defaultValue="75201, 75202, 75203, 75204"
                    className="bg-gray-600 border-gray-500 text-white"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
