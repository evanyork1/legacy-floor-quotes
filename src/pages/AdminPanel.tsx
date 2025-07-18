
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  DollarSign, 
  Globe, 
  Webhook,
  Image
} from "lucide-react";
import { useAdminData } from "@/hooks/useAdminData";
import AdminHeader from "@/components/admin/AdminHeader";
import LeadsTab from "@/components/admin/LeadsTab";
import PricingTab from "@/components/admin/PricingTab";
import SubdomainsTab from "@/components/admin/SubdomainsTab";
import WebhooksTab from "@/components/admin/WebhooksTab";
import SettingsTab from "@/components/admin/SettingsTab";
import GalleryAdmin from "@/components/admin/GalleryAdmin";
import { useToast } from "@/hooks/use-toast";
import { PricingTier, Subdomain } from "@/types/admin";

const AdminPanel = () => {
  const {
    quotes,
    setQuotes,
    loading,
    showArchived,
    setShowArchived,
    archivingQuoteId,
    webhookUrl,
    setWebhookUrl,
    savingWebhook,
    pricingTiers,
    setPricingTiers,
    subdomains,
    setSubdomains,
    fetchQuotes,
    archiveQuote,
    unarchiveQuote,
    saveWebhookUrl
  } = useAdminData();

  const { toast } = useToast();

  const toggleArchivedView = () => {
    const newShowArchived = !showArchived;
    setShowArchived(newShowArchived);
    fetchQuotes(newShowArchived);
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
      ['Name', 'Email', 'Phone', 'ZIP', 'Garage Type', 'Custom Sq Ft', 'Space Type', 'Other Space Type', 'Color Choice', 'Price', 'Status', 'Archived', 'Date', 'Exterior Photos', 'Damage Photos'],
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
        q.archived ? 'Yes' : 'No',
        q.created_at,
        (q.exterior_photos || []).join('; '),
        (q.damage_photos || []).join('; ')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${showArchived ? 'all' : 'active'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updatePricingTier = (id: string, field: keyof PricingTier, value: number) => {
    setPricingTiers(prev => prev.map(tier => 
      tier.id === id ? { ...tier, [field]: value } : tier
    ));
  };

  const addSubdomain = (newSubdomain: string, newMultiplier: string) => {
    const subdomain: Subdomain = {
      id: Date.now().toString(),
      name: newSubdomain.toLowerCase().replace(/[^a-z0-9]/g, ''),
      pricing_multiplier: parseFloat(newMultiplier),
      custom_pricing: [],
      created_at: new Date().toISOString()
    };
    setSubdomains([...subdomains, subdomain]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <AdminHeader />

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800 border-gray-700">
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
            <TabsTrigger value="webhooks" className="text-white data-[state=active]:bg-blue-600">
              <Webhook className="h-4 w-4 mr-2" />
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="gallery" className="text-white data-[state=active]:bg-blue-600">
              <Image className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <LeadsTab
              quotes={quotes}
              loading={loading}
              showArchived={showArchived}
              archivingQuoteId={archivingQuoteId}
              onToggleArchivedView={toggleArchivedView}
              onRefresh={() => fetchQuotes(showArchived)}
              onExportLeads={exportLeads}
              onArchiveQuote={archiveQuote}
              onUnarchiveQuote={unarchiveQuote}
            />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingTab
              pricingTiers={pricingTiers}
              onUpdatePricingTier={updatePricingTier}
            />
          </TabsContent>

          <TabsContent value="subdomains">
            <SubdomainsTab
              subdomains={subdomains}
              onAddSubdomain={addSubdomain}
            />
          </TabsContent>

          <TabsContent value="webhooks">
            <WebhooksTab
              webhookUrl={webhookUrl}
              savingWebhook={savingWebhook}
              onWebhookUrlChange={setWebhookUrl}
              onSaveWebhookUrl={saveWebhookUrl}
            />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryAdmin />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
