
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Quote, PricingTier, Subdomain } from "@/types/admin";

export const useAdminData = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [archivingQuoteId, setArchivingQuoteId] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [savingWebhook, setSavingWebhook] = useState(false);
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

  const fetchQuotes = async (includeArchived = false) => {
    console.log('🔍 Starting fetchQuotes function...', { includeArchived });
    
    try {
      setLoading(true);
      console.log('📡 Making Supabase query...');
      
      let query = supabase
        .from('quotes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (!includeArchived) {
        query = query.or('archived.is.null,archived.eq.false');
      }

      const { data, error, count } = await query;

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
      const typedQuotes = data.map(quote => {
        console.log('🔄 Processing quote:', quote.id, quote.name);
        return {
          ...quote,
          status: (quote.status as 'new' | 'contacted' | 'quoted' | 'closed') || 'new',
          exterior_photos: quote.exterior_photos || [],
          damage_photos: quote.damage_photos || [],
          archived: quote.archived || false
        };
      });

      console.log('🎯 Final processed quotes:', typedQuotes);
      setQuotes(typedQuotes);
      
      const statusText = includeArchived ? 'all quotes (including archived)' : 'active quotes';
      toast({
        title: "Success",
        description: `Loaded ${typedQuotes.length} ${statusText} from database`,
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

  const archiveQuote = async (quoteId: string) => {
    setArchivingQuoteId(quoteId);
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ archived: true })
        .eq('id', quoteId);

      if (error) {
        throw error;
      }

      if (!showArchived) {
        setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
      } else {
        setQuotes(prev => prev.map(quote => 
          quote.id === quoteId ? { ...quote, archived: true } : quote
        ));
      }

      toast({
        title: "Success",
        description: "Lead archived successfully",
      });
    } catch (error) {
      console.error('Error archiving quote:', error);
      toast({
        title: "Error",
        description: "Failed to archive lead",
        variant: "destructive",
      });
    } finally {
      setArchivingQuoteId(null);
    }
  };

  const unarchiveQuote = async (quoteId: string) => {
    setArchivingQuoteId(quoteId);
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ archived: false })
        .eq('id', quoteId);

      if (error) {
        throw error;
      }

      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId ? { ...quote, archived: false } : quote
      ));

      toast({
        title: "Success",
        description: "Lead restored from archive",
      });
    } catch (error) {
      console.error('Error unarchiving quote:', error);
      toast({
        title: "Error",
        description: "Failed to restore lead",
        variant: "destructive",
      });
    } finally {
      setArchivingQuoteId(null);
    }
  };

  const fetchWebhookSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('webhook_settings')
        .select('zapier_webhook_url')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching webhook settings:', error);
        return;
      }

      if (data?.zapier_webhook_url) {
        setWebhookUrl(data.zapier_webhook_url);
      }
    } catch (error) {
      console.error('Error fetching webhook settings:', error);
    }
  };

  const saveWebhookUrl = async () => {
    setSavingWebhook(true);
    try {
      const { error } = await supabase
        .from('webhook_settings')
        .upsert({ 
          id: 1, 
          zapier_webhook_url: webhookUrl || null,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Webhook URL saved successfully",
      });
    } catch (error) {
      console.error('Error saving webhook URL:', error);
      toast({
        title: "Error",
        description: "Failed to save webhook URL",
        variant: "destructive",
      });
    } finally {
      setSavingWebhook(false);
    }
  };

  useEffect(() => {
    console.log('🚀 AdminPanel component mounted, testing Supabase connection...');
    console.log('🔧 Supabase client:', supabase);
    
    fetchQuotes(false);
    fetchWebhookSettings();
  }, []);

  return {
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
  };
};
