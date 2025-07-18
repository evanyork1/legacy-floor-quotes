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
    console.log('🔍 ADMIN PANEL: Supabase client initialized:', !!supabase);
    
    try {
      setLoading(true);
      console.log('📡 ADMIN PANEL: Making separate Supabase queries to both tables...');
      
      // Query Houston quotes table (quotes)
      console.log('📊 ADMIN PANEL: Querying Houston quotes table...');
      const quotesQuery = supabase
        .from('quotes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Query DFW quotes table (quotes_dfw) 
      console.log('📊 ADMIN PANEL: Querying DFW quotes table...');
      const quotesDfwQuery = supabase
        .from('quotes_dfw')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Apply proper filtering based on mode
      if (mode === 'active') {
        console.log('📊 ADMIN PANEL: Filtering for active quotes only');
        quotesQuery.or('archived.is.null,archived.eq.false');
        quotesDfwQuery.or('archived.is.null,archived.eq.false');
      } else if (mode === 'archived') {
        console.log('📊 ADMIN PANEL: Filtering for archived quotes only');
        quotesQuery.eq('archived', true);
        quotesDfwQuery.eq('archived', true);
      }

      console.log('📊 ADMIN PANEL: Executing both queries in parallel...');
      const [quotesResult, quotesDfwResult] = await Promise.all([
        quotesQuery,
        quotesDfwQuery
      ]);

      console.log('📊 ADMIN PANEL: Raw Supabase responses received:');
      console.log('  - Houston quotes response:', {
        data: quotesResult.data,
        error: quotesResult.error,
        count: quotesResult.count,
        status: quotesResult.status
      });
      console.log('  - DFW quotes response:', {
        data: quotesDfwResult.data,
        error: quotesDfwResult.error,
        count: quotesDfwResult.count,
        status: quotesDfwResult.status
      });

      // Check for errors
      if (quotesResult.error) {
        console.error('❌ ADMIN PANEL: Error fetching Houston quotes:', quotesResult.error);
        throw new Error(`Houston quotes error: ${quotesResult.error.message}`);
      }

      if (quotesDfwResult.error) {
        console.error('❌ ADMIN PANEL: Error fetching DFW quotes:', quotesDfwResult.error);
        throw new Error(`DFW quotes error: ${quotesDfwResult.error.message}`);
      }

      // Extract data arrays
      const quotesData = quotesResult.data || [];
      const quotesDfwData = quotesDfwResult.data || [];

      console.log('✅ ADMIN PANEL: Raw data extraction complete:');
      console.log('  - Houston quotes count:', quotesData.length);
      console.log('  - DFW quotes count:', quotesDfwData.length);
      console.log('  - Houston quotes data:', quotesData);
      console.log('  - DFW quotes data:', quotesDfwData);
      
      // Process Houston quotes with detailed logging
      console.log('🔄 ADMIN PANEL: Processing Houston quotes...');
      const houstonQuotes = quotesData.map((quote, index) => {
        const processedQuote = {
          ...quote,
          status: (quote.status as 'new' | 'contacted' | 'quoted' | 'closed') || 'new',
          exterior_photos: quote.exterior_photos || [],
          damage_photos: quote.damage_photos || [],
          archived: quote.archived || false,
          lead_source: quote.lead_source || 'Houston'
        };
        console.log(`  Houston quote ${index + 1}:`, {
          id: processedQuote.id,
          name: processedQuote.name,
          lead_source: processedQuote.lead_source,
          created_at: processedQuote.created_at
        });
        return processedQuote;
      });

      // Process DFW quotes with detailed logging
      console.log('🔄 ADMIN PANEL: Processing DFW quotes...');
      const dfwQuotes = quotesDfwData.map((quote, index) => {
        const processedQuote = {
          ...quote,
          status: (quote.status as 'new' | 'contacted' | 'quoted' | 'closed') || 'new',
          exterior_photos: quote.exterior_photos || [],
          damage_photos: quote.damage_photos || [],
          archived: quote.archived || false,
          lead_source: quote.lead_source || 'DFW'
        };
        console.log(`  DFW quote ${index + 1}:`, {
          id: processedQuote.id,
          name: processedQuote.name,
          lead_source: processedQuote.lead_source,
          created_at: processedQuote.created_at
        });
        return processedQuote;
      });

      // Combine arrays
      console.log('🔗 ADMIN PANEL: Combining quote arrays...');
      const allQuotes = [...houstonQuotes, ...dfwQuotes];
      console.log('🔗 ADMIN PANEL: Combined array length:', allQuotes.length);

      // Sort by creation date (newest first)
      console.log('📅 ADMIN PANEL: Sorting quotes by creation date...');
      const sortedQuotes = allQuotes.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      console.log('🎯 ADMIN PANEL: Final processing complete:');
      console.log('  - Total quotes after sorting:', sortedQuotes.length);
      
      // Count breakdown
      const houstonCount = sortedQuotes.filter(q => q.lead_source === 'Houston').length;
      const dfwCount = sortedQuotes.filter(q => q.lead_source === 'DFW').length;
      
      console.log('  - Houston quotes in final array:', houstonCount);
      console.log('  - DFW quotes in final array:', dfwCount);
      console.log('  - Final quotes by source breakdown:', {
        Houston: houstonCount,
        DFW: dfwCount,
        Total: sortedQuotes.length
      });

      // Set state
      console.log('💾 ADMIN PANEL: Setting quotes state...');
      setQuotes(sortedQuotes);
      
      // Success toast
      const statusText = mode === 'all' ? 'all quotes' : mode === 'archived' ? 'archived quotes' : 'active quotes';
      toast({
        title: "Data Loaded Successfully",
        description: `Found ${sortedQuotes.length} ${statusText} (${houstonCount} Houston, ${dfwCount} DFW)`,
      });

    } catch (error) {
      console.error('💥 ADMIN PANEL: Critical error in fetchQuotes:', error);
      console.error('💥 ADMIN PANEL: Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      toast({
        title: "Database Error",
        description: `Failed to load quotes: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log('🏁 ADMIN PANEL: fetchQuotes function completed');
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
    console.log('🚀 ADMIN PANEL: Component mounted, initializing...');
    console.log('🔧 ADMIN PANEL: Supabase client status:', {
      isAvailable: !!supabase,
      from: typeof supabase?.from
    });
    
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
