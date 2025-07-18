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
  const [dfwWebhookUrl, setDfwWebhookUrl] = useState("");
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

  const fetchQuotes = async (mode: 'active' | 'archived' | 'all' = 'active') => {
    console.log('🔍 ADMIN PANEL: Starting fetchQuotes function...', { mode });
    
    try {
      setLoading(true);
      console.log('📡 ADMIN PANEL: Making Supabase queries...');
      
      // Fetch from both tables with detailed logging
      const quotesQuery = supabase
        .from('quotes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      const quotesDfwQuery = supabase
        .from('quotes_dfw')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Apply proper filtering based on mode
      if (mode === 'active') {
        quotesQuery.or('archived.is.null,archived.eq.false');
        quotesDfwQuery.or('archived.is.null,archived.eq.false');
      } else if (mode === 'archived') {
        quotesQuery.eq('archived', true);
        quotesDfwQuery.eq('archived', true);
      }

      console.log('📊 ADMIN PANEL: Executing queries...');
      const [quotesResult, quotesDfwResult] = await Promise.all([
        quotesQuery,
        quotesDfwQuery
      ]);

      console.log('📊 ADMIN PANEL: Raw Supabase responses:', { 
        quotesResult: quotesResult, 
        quotesDfwResult: quotesDfwResult 
      });

      if (quotesResult.error) {
        console.error('❌ ADMIN PANEL: Supabase error (quotes):', quotesResult.error);
        throw quotesResult.error;
      }

      if (quotesDfwResult.error) {
        console.error('❌ ADMIN PANEL: Supabase error (quotes_dfw):', quotesDfwResult.error);
        throw quotesDfwResult.error;
      }

      const quotesData = quotesResult.data || [];
      const quotesDfwData = quotesDfwResult.data || [];

      console.log('✅ ADMIN PANEL: Raw data received:');
      console.log('  Houston quotes:', quotesData.length, quotesData);
      console.log('  DFW quotes:', quotesDfwData.length, quotesDfwData);
      
      // Combine and process both datasets with detailed logging
      const houstonQuotes = quotesData.map(quote => {
        const processedQuote = {
          ...quote,
          status: (quote.status as 'new' | 'contacted' | 'quoted' | 'closed') || 'new',
          exterior_photos: quote.exterior_photos || [],
          damage_photos: quote.damage_photos || [],
          archived: quote.archived || false,
          lead_source: quote.lead_source || 'Houston'
        };
        console.log('  Processed Houston quote:', processedQuote.id, processedQuote.lead_source);
        return processedQuote;
      });

      const dfwQuotes = quotesDfwData.map(quote => {
        const processedQuote = {
          ...quote,
          status: (quote.status as 'new' | 'contacted' | 'quoted' | 'closed') || 'new',
          exterior_photos: quote.exterior_photos || [],
          damage_photos: quote.damage_photos || [],
          archived: quote.archived || false,
          lead_source: quote.lead_source || 'DFW'
        };
        console.log('  Processed DFW quote:', processedQuote.id, processedQuote.lead_source);
        return processedQuote;
      });

      const allQuotes = [...houstonQuotes, ...dfwQuotes];
      console.log('🔗 ADMIN PANEL: Combined quotes array:', allQuotes.length, allQuotes);

      // Sort by creation date (newest first)
      const sortedQuotes = allQuotes.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      console.log('🎯 ADMIN PANEL: Final sorted quotes:', sortedQuotes.length);
      console.log('  Quote breakdown by source:');
      const houstonCount = sortedQuotes.filter(q => q.lead_source === 'Houston').length;
      const dfwCount = sortedQuotes.filter(q => q.lead_source === 'DFW').length;
      console.log('    Houston:', houstonCount);
      console.log('    DFW:', dfwCount);

      setQuotes(sortedQuotes);
      
      const statusText = mode === 'all' ? 'all quotes' : mode === 'archived' ? 'archived quotes' : 'active quotes';
      toast({
        title: "Success",
        description: `Loaded ${sortedQuotes.length} ${statusText} (${houstonCount} Houston, ${dfwCount} DFW)`,
      });

    } catch (error) {
      console.error('💥 ADMIN PANEL: Unexpected error in fetchQuotes:', error);
      toast({
        title: "Error",
        description: "Failed to connect to database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log('🏁 ADMIN PANEL: fetchQuotes completed');
    }
  };

  const archiveQuote = async (quoteId: string) => {
    setArchivingQuoteId(quoteId);
    try {
      // Find the quote to determine which table to update
      const quote = quotes.find(q => q.id === quoteId);
      if (!quote) return;

      const tableName = quote.lead_source === 'DFW' ? 'quotes_dfw' : 'quotes';

      const { error } = await supabase
        .from(tableName)
        .update({ archived: true })
        .eq('id', quoteId);

      if (error) {
        throw error;
      }

      // Always update state consistently
      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId ? { ...quote, archived: true } : quote
      ));

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
      // Find the quote to determine which table to update
      const quote = quotes.find(q => q.id === quoteId);
      if (!quote) return;

      const tableName = quote.lead_source === 'DFW' ? 'quotes_dfw' : 'quotes';

      const { error } = await supabase
        .from(tableName)
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
        .select('zapier_webhook_url, dfw_webhook_url')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching webhook settings:', error);
        return;
      }

      if (data) {
        setWebhookUrl(data.zapier_webhook_url || '');
        setDfwWebhookUrl(data.dfw_webhook_url || '');
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
          dfw_webhook_url: dfwWebhookUrl || null,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Webhook URLs saved successfully",
      });
    } catch (error) {
      console.error('Error saving webhook URLs:', error);
      toast({
        title: "Error",
        description: "Failed to save webhook URLs",
        variant: "destructive",
      });
    } finally {
      setSavingWebhook(false);
    }
  };

  useEffect(() => {
    console.log('🚀 ADMIN PANEL: Component mounted, initializing data fetch...');
    console.log('🔧 ADMIN PANEL: Supabase client:', supabase);
    
    fetchQuotes('active');
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
    dfwWebhookUrl,
    setWebhookUrl,
    setDfwWebhookUrl,
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
