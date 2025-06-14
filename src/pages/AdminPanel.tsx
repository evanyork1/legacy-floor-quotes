import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Users, 
  DollarSign, 
  Globe, 
  Download,
  Edit,
  Trash2,
  Plus,
  Save
} from "lucide-react";

interface Quote {
  id: string;
  garage_type: string;
  custom_sqft?: number;
  space_type?: string;
  name: string;
  email: string;
  phone: string;
  zip_code: string;
  quoted_price: number;
  submitted_at: string;
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
  const { toast } = useToast();
  
  // Mock data - replace with real API calls
  const [quotes] = useState<Quote[]>([
    {
      id: "1",
      garage_type: "2-car",
      name: "John Smith",
      email: "john@example.com", 
      phone: "(555) 123-4567",
      zip_code: "75201",
      quoted_price: 3400,
      submitted_at: "2024-01-15T10:30:00Z",
      status: "new"
    },
    {
      id: "2",
      garage_type: "custom",
      custom_sqft: 1200,
      space_type: "warehouse",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 987-6543", 
      zip_code: "75202",
      quoted_price: 9600,
      submitted_at: "2024-01-14T15:45:00Z",
      status: "contacted"
    }
  ]);

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
    const csvContent = [
      ['Name', 'Email', 'Phone', 'ZIP', 'Garage Type', 'Price', 'Status', 'Date'],
      ...quotes.map(q => [
        q.name, q.email, q.phone, q.zip_code, q.garage_type, 
        q.quoted_price.toString(), q.status, q.submitted_at
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
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

  const savePricingChanges = () => {
    // Here you would typically make an API call to save the pricing changes
    // For now, we'll just show a success toast
    toast({
      title: "Pricing Updated",
      description: "Your pricing tiers have been successfully saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-blue-200">Manage your garage floor coating business</p>
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
                <CardTitle className="text-white">Recent Leads ({quotes.length})</CardTitle>
                <Button onClick={exportLeads} className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-3 text-gray-300">Name</th>
                        <th className="pb-3 text-gray-300">Contact</th>
                        <th className="pb-3 text-gray-300">Location</th>
                        <th className="pb-3 text-gray-300">Type</th>
                        <th className="pb-3 text-gray-300">Price</th>
                        <th className="pb-3 text-gray-300">Status</th>
                        <th className="pb-3 text-gray-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote) => (
                        <tr key={quote.id} className="border-b border-gray-700">
                          <td className="py-4 text-white font-medium">{quote.name}</td>
                          <td className="py-4 text-gray-300">
                            <div>{quote.email}</div>
                            <div className="text-sm">{quote.phone}</div>
                          </td>
                          <td className="py-4 text-gray-300">{quote.zip_code}</td>
                          <td className="py-4 text-gray-300">
                            {quote.garage_type === 'custom' ? 
                              `Custom (${quote.custom_sqft} sq ft)` : 
                              quote.garage_type
                            }
                          </td>
                          <td className="py-4 text-green-400 font-bold">
                            ${quote.quoted_price.toLocaleString()}
                          </td>
                          <td className="py-4">
                            <Badge className={`${getStatusColor(quote.status)} border-0`}>
                              {quote.status}
                            </Badge>
                          </td>
                          <td className="py-4 text-gray-400 text-sm">
                            {new Date(quote.submitted_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                <Button onClick={savePricingChanges} className="w-full bg-blue-600 hover:bg-blue-700">
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
