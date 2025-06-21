
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import LeadsTab from "@/components/admin/LeadsTab";
import PricingTab from "@/components/admin/PricingTab";
import WebhooksTab from "@/components/admin/WebhooksTab";
import SubdomainsTab from "@/components/admin/SubdomainsTab";
import GalleryAdmin from "@/components/admin/GalleryAdmin";
import { useAdminData } from "@/hooks/useAdminData";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const adminData = useAdminData();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="subdomains">Subdomains</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leads" className="space-y-4">
            <LeadsTab {...adminData} />
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-4">
            <PricingTab 
              pricingTiers={adminData.pricingTiers}
              setPricingTiers={adminData.setPricingTiers}
            />
          </TabsContent>
          
          <TabsContent value="gallery" className="space-y-4">
            <GalleryAdmin />
          </TabsContent>
          
          <TabsContent value="webhooks" className="space-y-4">
            <WebhooksTab
              webhookUrl={adminData.webhookUrl}
              setWebhookUrl={adminData.setWebhookUrl}
              saveWebhookUrl={adminData.saveWebhookUrl}
              savingWebhook={adminData.savingWebhook}
            />
          </TabsContent>
          
          <TabsContent value="subdomains" className="space-y-4">
            <SubdomainsTab 
              subdomains={adminData.subdomains}
              setSubdomains={adminData.setSubdomains}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
