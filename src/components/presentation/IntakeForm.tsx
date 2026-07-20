import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Plus, Camera, ChevronRight, Loader2, Trash2, X, Send, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PresentationData, PACKAGE_PRICING, PRESET_LINE_ITEMS, SPACE_TYPE_OPTIONS, FLOOR_TYPES, ADDITIVE_OPTIONS, LineItem, FloorEntry } from '@/pages/SalesPresentation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface IntakeFormProps {
  data: PresentationData;
  onChange: (data: PresentationData) => void;
  onStartPresentation: (updatedData?: PresentationData) => void;
}

const COLOR_OPTIONS = [
  'Domino',
  'Creek Bed',
  'Wombat',
  'Tidal Wave',
  'Raven',
  'Cabin Fever',
  'Other',
];

const WARRANTY_OPTIONS = [
  { value: 'lifetime', label: 'Lifetime Warranty' },
  { value: '15year', label: '15 Year Warranty' },
  { value: 'custom', label: 'Custom Warranty' },
];

const DEPOSIT_OPTIONS = [
  { value: '10', label: '10% Deposit' },
  { value: '50', label: '50% Deposit' },
  { value: '100', label: '100% Upfront' },
  { value: 'custom', label: 'Custom Amount' },
];

export function IntakeForm({ data, onChange, onStartPresentation }: IntakeFormProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [customLineItemName, setCustomLineItemName] = useState('');
  const [customLineItemPrice, setCustomLineItemPrice] = useState('');
  const [customLineItemNote, setCustomLineItemNote] = useState('');
  const [isCreatingPresentation, setIsCreatingPresentation] = useState(false);
  const [isCreatingJobberQuote, setIsCreatingJobberQuote] = useState(false);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate totals whenever relevant data changes
  useEffect(() => {
    // Calculate total square footage from all floor entries
    const totalSqft = data.floorEntries?.reduce((sum, entry) => sum + entry.squareFootage, 0) || data.squareFootage;
    
    // Calculate additive costs
    let additivesCost = 0;
    if (data.floorEntries) {
      data.floorEntries.forEach(entry => {
        entry.additives.forEach(additiveId => {
          const additive = ADDITIVE_OPTIONS.find(a => a.id === additiveId);
          if (additive) {
            additivesCost += entry.squareFootage * additive.pricePerSqFt;
          }
        });
      });
    }
    
    // Add legacy line items cost
    const lineItemsTotal = data.lineItems.reduce(
      (sum, item) => sum + (totalSqft * item.pricePerSqFt),
      0
    );
    
    const silverTotal = (totalSqft * PACKAGE_PRICING.silver) + additivesCost + lineItemsTotal;
    const goldTotal = (totalSqft * PACKAGE_PRICING.gold) + additivesCost + lineItemsTotal;
    const platinumTotal = (totalSqft * PACKAGE_PRICING.platinum) + additivesCost + lineItemsTotal;
    
    if (silverTotal !== data.silverTotal || goldTotal !== data.goldTotal || platinumTotal !== data.platinumTotal || totalSqft !== data.squareFootage) {
      onChange({ ...data, silverTotal, goldTotal, platinumTotal, squareFootage: totalSqft });
    }
  }, [data.floorEntries, data.lineItems]);

  const handleSearchClients = useCallback(async (term: string) => {
    if (!term.trim() || term.length < 2) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('jobber-api', {
        body: { action: 'searchClients', data: { searchTerm: term } },
      });
      
      // Check for connection errors
      if (error) {
        console.error('Search invoke error:', error);
        toast.error('Could not connect to Jobber');
        setSearchResults([]);
        return;
      }
      
      // Check if response indicates not connected or auth error
      if (result?.connected === false || result?.error) {
        console.error('Jobber connection issue:', result?.error);
        toast.error(result?.error || 'Jobber connection expired - please reconnect');
        setSearchResults([]);
        return;
      }
      
      setSearchResults(result?.clients?.nodes || []);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Could not search clients - check Jobber connection');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced auto-search as user types
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchTerm.length >= 2) {
      debounceRef.current = setTimeout(() => {
        handleSearchClients(searchTerm);
      }, 300);
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm, handleSearchClients]);

  const handleSelectClient = (client: any) => {
    // Get the first property ID if available (needed for Jobber quotes)
    const propertyId = client.properties?.[0]?.id || null;
    
    onChange({
      ...data,
      clientId: client.id,
      propertyId: propertyId, // Store property ID for quote creation
      clientName: client.name || `${client.firstName} ${client.lastName}`,
      clientEmail: client.emails?.[0]?.address || '',
      clientPhone: client.phones?.[0]?.number || '',
      clientAddress: client.billingAddress?.street1 || '',
    });
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleCreateNewClient = () => {
    setIsCreatingClient(true);
    onChange({
      ...data,
      clientId: undefined,
      clientName: searchTerm || '',
    });
    setSearchResults([]);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(file => URL.createObjectURL(file));
    
    onChange({
      ...data,
      sitePhotos: [...data.sitePhotos, ...files],
      sitePhotoUrls: [...data.sitePhotoUrls, ...urls],
    });
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...data.sitePhotos];
    const newUrls = [...data.sitePhotoUrls];
    URL.revokeObjectURL(newUrls[index]);
    newPhotos.splice(index, 1);
    newUrls.splice(index, 1);
    
    onChange({
      ...data,
      sitePhotos: newPhotos,
      sitePhotoUrls: newUrls,
    });
  };

  const addLineItem = (item: LineItem) => {
    if (data.lineItems.some(li => li.id === item.id)) {
      toast.error('This line item is already added');
      return;
    }
    onChange({
      ...data,
      lineItems: [...data.lineItems, item],
    });
  };

  const addCustomLineItem = () => {
    if (!customLineItemName.trim() || !customLineItemPrice) {
      toast.error('Please enter both name and price');
      return;
    }
    
    const price = parseFloat(customLineItemPrice);
    if (isNaN(price) || price < 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    const newItem: LineItem = {
      id: `custom-${Date.now()}`,
      name: customLineItemName.trim(),
      pricePerSqFt: price,
      isCustom: true,
      note: customLineItemNote.trim() || undefined,
    };
    
    onChange({
      ...data,
      lineItems: [...data.lineItems, newItem],
    });
    
    setCustomLineItemName('');
    setCustomLineItemPrice('');
    setCustomLineItemNote('');
    toast.success('Custom line item added');
  };

  const removeLineItem = (itemId: string) => {
    onChange({
      ...data,
      lineItems: data.lineItems.filter(li => li.id !== itemId),
    });
  };

  const createShareablePresentation = async () => {
    if (!data.clientName) {
      toast.error('Please select a customer first');
      return;
    }
    
    if (!user?.id) {
      toast.error('You must be logged in to create a shareable presentation. Please log in and try again.');
      console.error('No user ID available for shareable presentation');
      return;
    }

    setIsCreatingPresentation(true);

    try {
      // Get primary color/warranty from first floor entry for legacy DB columns
      const primaryEntry = data.floorEntries?.[0];
      
      console.log('Creating shareable presentation...');
      console.log('User ID:', user.id);
      console.log('Client ID:', data.clientId);
      
      const insertData: any = {
        client_id: data.clientId || null,
        client_name: data.clientName,
        client_email: data.clientEmail || null,
        client_phone: data.clientPhone || null,
        client_address: data.clientAddress || null,
        space_type: data.spaceType,
        square_footage: data.squareFootage,
        moisture_content: data.moistureContent,
        color_choice: primaryEntry?.colorChoice || 'Domino',
        custom_color_note: primaryEntry?.customColorNote || null,
        line_items: data.lineItems,
        warranty_type: primaryEntry?.warrantyType || 'lifetime',
        custom_warranty_note: primaryEntry?.customWarrantyNote || null,
        deposit_type: data.depositType,
        custom_deposit_amount: data.customDepositAmount,
        presentation_notes: data.presentationNotes || null,
        silver_total: data.silverTotal,
        gold_total: data.goldTotal,
        platinum_total: data.platinumTotal,
        created_by: user.id,
        site_photos: data.sitePhotoUrls,
      };

      console.log('Insert data:', JSON.stringify(insertData, null, 2));

      const { data: result, error } = await supabase
        .from('sales_presentations')
        .insert(insertData)
        .select('id')
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        console.error('Error code:', error.code);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        toast.error(`Failed to create presentation: ${error.message} (Code: ${error.code || 'unknown'})`);
        return;
      }

      if (!result?.id) {
        console.error('No result ID returned from insert');
        toast.error('Failed to create presentation: No ID returned');
        return;
      }

      const link = `${window.location.origin}/presentation/${result.id}`;
      console.log('Shareable link created:', link);
      setShareableLink(link);
      toast.success('Shareable presentation created!');
    } catch (error: any) {
      console.error('Error creating presentation:', error);
      toast.error(`Failed to create presentation: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsCreatingPresentation(false);
    }
  };

  const copyLink = () => {
    if (shareableLink) {
      navigator.clipboard.writeText(shareableLink);
      setLinkCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  // Build line items for Jobber quote
  const buildJobberLineItems = (packageType: 'silver' | 'gold' | 'platinum') => {
    const packagePricing = { silver: 5.00, gold: 7.10, platinum: 9.50 };
    const packageLabels = { silver: 'Silver Package', gold: 'Gold Package', platinum: 'Platinum Package' };
    const lineItems: Array<{ name: string; description: string; unitPrice: number; quantity: number }> = [];
    
    // Add floor entries
    (data.floorEntries || []).forEach((entry, index) => {
      const floorLabel = entry.floorType === 'garage' ? 'Garage Floor' 
        : entry.floorType === 'patio' ? 'Patio Floor'
        : entry.floorType === 'basement' ? 'Basement'
        : 'Floor Area';
      
      lineItems.push({
        name: `${packageLabels[packageType]} - ${floorLabel}`,
        description: `${entry.squareFootage} sq ft - ${entry.colorChoice || 'Domino'} color`,
        unitPrice: packagePricing[packageType],
        quantity: entry.squareFootage,
      });
      
      // Add additives for this floor
      entry.additives.forEach(additiveId => {
        const additive = ADDITIVE_OPTIONS.find(a => a.id === additiveId);
        if (additive) {
          lineItems.push({
            name: `${additive.name} - ${floorLabel}`,
            description: `Applied to ${entry.squareFootage} sq ft`,
            unitPrice: additive.pricePerSqFt,
            quantity: entry.squareFootage,
          });
        }
      });
    });
    
    // Add custom line items
    data.lineItems.forEach(item => {
      lineItems.push({
        name: item.name,
        description: item.note || `${data.squareFootage} sq ft`,
        unitPrice: item.pricePerSqFt,
        quantity: data.squareFootage,
      });
    });
    
    return lineItems;
  };

  // Calculate deposit amount
  const getDepositAmount = (total: number) => {
    switch (data.depositType) {
      case '10': return total * 0.1;
      case '50': return total * 0.5;
      case '100': return total;
      case 'custom': return data.customDepositAmount || 0;
      default: return total * 0.5;
    }
  };

  // Calculate deposit percentage for Jobber
  const getDepositPercentage = () => {
    switch (data.depositType) {
      case '10': return 10;
      case '50': return 50;
      case '100': return 100;
      case 'custom': 
        // Calculate percentage from custom amount
        if (data.customDepositAmount && data.goldTotal > 0) {
          return Math.round((data.customDepositAmount / data.goldTotal) * 100);
        }
        return 50;
      default: return 50;
    }
  };

  // Create Jobber quote and start presentation
  const handlePresentNow = async () => {
    if (!data.clientName) {
      toast.error('Please select a customer first');
      return;
    }

    // If no Jobber client selected, just start presentation without quote
    if (!data.clientId) {
      toast.info('Starting presentation without Jobber quote (no client selected)');
      onStartPresentation(data);
      return;
    }

    setIsCreatingJobberQuote(true);

    try {
      // Use Gold package as default for quote creation
      const lineItems = buildJobberLineItems('gold');
      const depositAmount = getDepositAmount(data.goldTotal);

      console.log('Creating Jobber quote with line items:', lineItems);

      const { data: result, error } = await supabase.functions.invoke('jobber-api', {
        body: {
          action: 'createQuote',
          data: {
            clientId: data.clientId,
            propertyId: data.propertyId, // Include property ID for quote creation
            title: `Floor Coating - ${data.clientName}`,
            lineItems,
            notes: data.presentationNotes || `Floor coating quote for ${data.squareFootage} sq ft`,
            // Pass deposit info for required deposit on the quote
            depositType: 'PERCENTAGE',
            depositPercentage: getDepositPercentage(),
          },
        },
      });

      console.log('Jobber quote creation result:', result);

      if (error) {
        console.error('Error creating Jobber quote:', error);
        toast.error('Could not create Jobber quote, proceeding without it');
        onStartPresentation(data);
        return;
      }

      if (result?.quoteCreate?.quote) {
        const quote = result.quoteCreate.quote;
        console.log('Jobber quote created:', quote);
        
        // Build updated data with Jobber quote info
        const updatedData: PresentationData = {
          ...data,
          jobberQuoteId: quote.id,
          jobberQuoteNumber: quote.quoteNumber,
          jobberClientHubUrl: quote.clientHubUri,
        };

        // Also update parent state for consistency
        onChange(updatedData);
        
        toast.success(`Quote #${quote.quoteNumber} created in Jobber!`);
        
        // Pass updated data directly to avoid race condition
        onStartPresentation(updatedData);
      } else if (result?.quoteCreate?.userErrors?.length > 0) {
        console.error('Jobber quote errors:', result.quoteCreate.userErrors);
        toast.error(`Jobber error: ${result.quoteCreate.userErrors[0].message}`);
        onStartPresentation(data);
      } else {
        // No quote created but no errors either
        onStartPresentation(data);
      }
    } catch (error) {
      console.error('Error creating Jobber quote:', error);
      toast.error('Failed to create Jobber quote, proceeding without it');
      onStartPresentation(data);
    } finally {
      setIsCreatingJobberQuote(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Client Section */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm font-bold">1</span>
            Select Customer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!data.clientName && !isCreatingClient ? (
            <div className="space-y-3">
              <div className="relative">
                <Input
                  placeholder="Start typing to search Jobber clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white text-lg h-14 pr-12"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {isSearching ? (
                    <Loader2 className="h-5 w-5 animate-spin text-[#1e3a5f]" />
                  ) : (
                    <Search className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>
              
              {isSearching && (
                <div className="text-sm text-slate-400 px-2">Searching...</div>
              )}
              
              {hasSearched && !isSearching && searchResults.length === 0 && searchTerm.length >= 2 && (
                <div className="text-sm text-slate-400 px-2">No clients found matching "{searchTerm}"</div>
              )}
              
              {searchResults.length > 0 && (
                <div className="bg-slate-800 rounded-lg border border-slate-700 divide-y divide-slate-700">
                  {searchResults.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className="w-full p-4 text-left hover:bg-slate-700 transition-colors"
                    >
                      <div className="font-medium text-white">{client.name || `${client.firstName} ${client.lastName}`}</div>
                      <div className="text-sm text-slate-400">{client.emails?.[0]?.address} • {client.phones?.[0]?.number}</div>
                    </button>
                  ))}
                </div>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleCreateNewClient}
                className="w-full h-14 border-dashed border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Client
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Client Name</Label>
                <Input
                  value={data.clientName}
                  onChange={(e) => onChange({ ...data, clientName: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white h-12 text-lg"
                />
              </div>
              <div>
                <Label className="text-slate-300">Email</Label>
                <Input
                  type="email"
                  value={data.clientEmail}
                  readOnly
                  className="bg-slate-800 border-slate-700 text-slate-400 h-12 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-slate-300">Phone</Label>
                <Input
                  type="tel"
                  value={data.clientPhone}
                  readOnly
                  className="bg-slate-800 border-slate-700 text-slate-400 h-12 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-slate-300">Address</Label>
                <Input
                  value={data.clientAddress}
                  readOnly
                  className="bg-slate-800 border-slate-700 text-slate-400 h-12 cursor-not-allowed"
                />
              </div>
              <Button 
                variant="ghost" 
                onClick={() => { 
                  onChange({ ...data, clientId: undefined, clientName: '', clientEmail: '', clientPhone: '', clientAddress: '' }); 
                  setIsCreatingClient(false); 
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4 mr-2" />
                Change Client
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floor Entries - Add Multiple Floors */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm font-bold">2</span>
            Floor Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Floor Entries List */}
          {(data.floorEntries || []).map((entry, index) => (
            <div key={entry.id} className="bg-slate-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#1e3a5f]">#{index + 1}</span>
                  <Select
                    value={entry.floorType} 
                    onValueChange={(v) => {
                      const newEntries = [...(data.floorEntries || [])];
                      newEntries[index] = { ...entry, floorType: v };
                      onChange({ ...data, floorEntries: newEntries });
                    }}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-48">
                      <SelectValue placeholder="Select floor type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {FLOOR_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-700">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {(data.floorEntries || []).length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newEntries = (data.floorEntries || []).filter(e => e.id !== entry.id);
                      onChange({ ...data, floorEntries: newEntries });
                    }}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {/* Square Footage */}
              <div>
                <Label className="text-slate-300 text-sm">Square Footage</Label>
                <Input
                  type="number"
                  value={entry.squareFootage}
                  onChange={(e) => {
                    const newEntries = [...(data.floorEntries || [])];
                    newEntries[index] = { ...entry, squareFootage: Number(e.target.value) || 0 };
                    onChange({ ...data, floorEntries: newEntries });
                  }}
                  className="bg-slate-700 border-slate-600 text-white h-12 text-lg font-bold mt-1"
                />
              </div>
              
              {/* Additives for this floor */}
              <div>
                <Label className="text-slate-300 text-sm mb-2 block">Add-ons for this floor</Label>
                <div className="grid grid-cols-2 gap-2">
                  {ADDITIVE_OPTIONS.map((additive) => {
                    const isSelected = entry.additives.includes(additive.id);
                    const additiveCost = entry.squareFootage * additive.pricePerSqFt;
                    return (
                      <button
                        key={additive.id}
                        onClick={() => {
                          const newAdditives = isSelected
                            ? entry.additives.filter(a => a !== additive.id)
                            : [...entry.additives, additive.id];
                          const newEntries = [...(data.floorEntries || [])];
                          newEntries[index] = { ...entry, additives: newAdditives };
                          onChange({ ...data, floorEntries: newEntries });
                        }}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-[#1e3a5f] bg-[#1e3a5f]/10'
                            : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={isSelected} className="pointer-events-none" />
                          <span className={`text-sm font-medium ${isSelected ? 'text-[#1e3a5f]' : 'text-white'}`}>
                            {additive.name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1 ml-6">
                          +${additive.pricePerSqFt.toFixed(2)}/sqft {isSelected && `(+$${additiveCost.toLocaleString()})`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Color Selection for this floor */}
              <div>
                <Label className="text-slate-300 text-sm">Color</Label>
                <Select 
                  value={entry.colorChoice} 
                  onValueChange={(v) => {
                    const newEntries = [...(data.floorEntries || [])];
                    newEntries[index] = { ...entry, colorChoice: v };
                    onChange({ ...data, floorEntries: newEntries });
                  }}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-1">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {COLOR_OPTIONS.map((color) => (
                      <SelectItem key={color} value={color} className="text-white hover:bg-slate-700">
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {entry.colorChoice === 'Other' && (
                  <Input
                    placeholder="Describe the custom color..."
                    value={entry.customColorNote}
                    onChange={(e) => {
                      const newEntries = [...(data.floorEntries || [])];
                      newEntries[index] = { ...entry, customColorNote: e.target.value };
                      onChange({ ...data, floorEntries: newEntries });
                    }}
                    className="bg-slate-700 border-slate-600 text-white h-10 mt-2"
                  />
                )}
              </div>
              
              {/* Warranty Selection for this floor */}
              <div>
                <Label className="text-slate-300 text-sm">Warranty</Label>
                <Select 
                  value={entry.warrantyType} 
                  onValueChange={(v) => {
                    const newEntries = [...(data.floorEntries || [])];
                    newEntries[index] = { ...entry, warrantyType: v as 'lifetime' | '15year' | 'custom' };
                    onChange({ ...data, floorEntries: newEntries });
                  }}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-1">
                    <SelectValue placeholder="Select warranty" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {WARRANTY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-white hover:bg-slate-700">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {entry.warrantyType === 'custom' && (
                  <Input
                    placeholder="e.g., 10 Year Limited Warranty..."
                    value={entry.customWarrantyNote}
                    onChange={(e) => {
                      const newEntries = [...(data.floorEntries || [])];
                      newEntries[index] = { ...entry, customWarrantyNote: e.target.value };
                      onChange({ ...data, floorEntries: newEntries });
                    }}
                    className="bg-slate-700 border-slate-600 text-white h-10 mt-2"
                  />
                )}
              </div>
            </div>
          ))}
          
          {/* Add Another Floor Button */}
          <Button
            variant="outline"
            onClick={() => {
              const newEntry: FloorEntry = {
                id: `floor-${Date.now()}`,
                floorType: 'patio',
                squareFootage: 200,
                additives: [],
                colorChoice: 'Domino',
                customColorNote: '',
                warrantyType: 'lifetime',
                customWarrantyNote: '',
              };
              onChange({ ...data, floorEntries: [...(data.floorEntries || []), newEntry] });
            }}
            className="w-full h-12 border-dashed border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Another Floor (e.g., Patio)
          </Button>
          
          {/* Moisture Content */}
          <div className="pt-4 border-t border-slate-700">
            <Label className="text-slate-300">Moisture Content: {data.moistureContent}%</Label>
            <div className="pt-4">
              <Slider
                value={[data.moistureContent]}
                onValueChange={(v) => onChange({ ...data, moistureContent: v[0] })}
                max={10}
                step={0.5}
                className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6"
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span className={data.moistureContent > 4 ? 'text-red-400' : 'text-green-400'}>
                {data.moistureContent > 4 ? 'High - May Need Treatment' : 'Acceptable'}
              </span>
              <span>10%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deposit Selection */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm font-bold">3</span>
            Deposit Amount
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DEPOSIT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...data, depositType: opt.value as any })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  data.depositType === opt.value
                    ? 'border-[#1e3a5f] bg-[#1e3a5f]/10'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className={`font-bold ${data.depositType === opt.value ? 'text-white' : 'text-white'}`}>
                  {opt.label}
                </div>
              </button>
            ))}
          </div>
          
          {data.depositType === 'custom' && (
            <div>
              <Label className="text-slate-300">Custom Deposit Amount ($)</Label>
              <Input
                type="number"
                placeholder="Enter amount..."
                value={data.customDepositAmount || ''}
                onChange={(e) => onChange({ ...data, customDepositAmount: Number(e.target.value) || null })}
                className="bg-slate-800 border-slate-700 text-white h-12"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Line Items (for extras not covered by per-floor additives) */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm font-bold">4</span>
            Custom Extras
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-400">Add any custom line items that apply to the entire project (not per-floor).</p>
          
          {/* Custom Line Item */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Item name"
                value={customLineItemName}
                onChange={(e) => setCustomLineItemName(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white flex-1"
              />
              <div className="relative w-32">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={customLineItemPrice}
                  onChange={(e) => setCustomLineItemPrice(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white pl-7"
                />
              </div>
              <Button
                onClick={addCustomLineItem}
                className="bg-[#1e3a5f] hover:bg-[#2a4a70]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Note/Disclaimer (optional - will appear on presentation)"
              value={customLineItemNote}
              onChange={(e) => setCustomLineItemNote(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <p className="text-xs text-slate-500">Price per square foot. Notes will display as disclaimers.</p>
          
          {/* Added Custom Line Items */}
          {data.lineItems.length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <Label className="text-slate-300 mb-3 block">Added Custom Items</Label>
              <div className="space-y-2">
                {data.lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-slate-800 p-3 rounded-lg"
                  >
                    <div>
                      <span className="text-white">{item.name}</span>
                      <span className="text-slate-400 ml-2">${item.pricePerSqFt.toFixed(2)}/sqft</span>
                      {item.note && (
                        <p className="text-xs text-amber-400 mt-1">Note: {item.note}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#1e3a5f] font-medium">
                        +${(data.squareFootage * item.pricePerSqFt).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLineItem(item.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Presentation Notes / Disclaimers */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm font-bold">5</span>
            Presentation Notes / Disclaimers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add notes that will appear on the customer presentation for them to sign (e.g., warranty changes, special conditions)..."
            value={data.presentationNotes}
            onChange={(e) => onChange({ ...data, presentationNotes: e.target.value })}
            className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
          />
          <p className="text-xs text-slate-500 mt-2">These notes will be displayed on the customer-facing presentation and must be acknowledged before signing.</p>
        </CardContent>
      </Card>

      {/* Jobber Notes */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm font-bold">6</span>
            Jobber Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add internal notes for the Jobber client profile..."
            value={data.notes}
            onChange={(e) => onChange({ ...data, notes: e.target.value })}
            className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
          />
          <p className="text-xs text-slate-500 mt-2">These notes will be added to the client's profile in Jobber (not visible to customer).</p>
        </CardContent>
      </Card>

      {/* Site Photos */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm font-bold">7</span>
            Pre-Job Site Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.sitePhotoUrls.map((url, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800">
                <img src={url} alt={`Site photo ${index + 1}`} className="w-full h-full object-cover"  loading="eager" decoding="async" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            
            <label className="aspect-square rounded-lg border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-[#1e3a5f] hover:bg-slate-800/50 transition-colors">
              <Camera className="h-8 w-8 text-slate-500 mb-2" />
              <span className="text-sm text-slate-500">Add Photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold">$</span>
            Package Pricing Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Floor Breakdown */}
          <div className="space-y-2">
            {(data.floorEntries || []).map((entry, index) => {
              const floorLabel = FLOOR_TYPES.find(f => f.value === entry.floorType)?.label || entry.floorType;
              const additiveNames = entry.additives.map(aId => ADDITIVE_OPTIONS.find(a => a.id === aId)?.name).filter(Boolean);
              const additiveCost = entry.additives.reduce((sum, aId) => {
                const additive = ADDITIVE_OPTIONS.find(a => a.id === aId);
                return sum + (additive ? entry.squareFootage * additive.pricePerSqFt : 0);
              }, 0);
              
              return (
                <div key={entry.id} className="bg-slate-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{floorLabel}</span>
                    <span className="text-slate-400">{entry.squareFootage} sqft</span>
                  </div>
                  {additiveNames.length > 0 && (
                    <div className="text-xs text-[#1e3a5f] mt-1">
                      + {additiveNames.join(', ')} (+${additiveCost.toLocaleString()})
                    </div>
                  )}
                </div>
              );
            })}
            <div className="text-sm text-slate-400 pt-2 border-t border-slate-700">
              Total: <span className="text-white font-bold">{data.squareFootage} sqft</span>
            </div>
          </div>
          
          {/* Package Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <div className="text-slate-400 text-sm uppercase">Silver</div>
              <div className="text-2xl font-bold text-white mt-1">
                ${data.silverTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-500">$5.00/sqft base</div>
            </div>
            <div className="bg-amber-500/10 border-2 border-amber-500 p-4 rounded-xl text-center">
              <div className="text-amber-400 text-sm uppercase font-bold">Gold (Popular)</div>
              <div className="text-2xl font-bold text-white mt-1">
                ${data.goldTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-500">$7.10/sqft base</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <div className="text-blue-400 text-sm uppercase">Platinum</div>
              <div className="text-2xl font-bold text-white mt-1">
                ${data.platinumTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-500">$9.50/sqft base</div>
            </div>
          </div>
          
          {data.lineItems.length > 0 && (
            <div className="pt-4 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                Custom extras included: {data.lineItems.map(li => li.name).join(', ')} 
                (+${data.lineItems.reduce((sum, li) => sum + (data.squareFootage * li.pricePerSqFt), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })})
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shareable Link */}
      {shareableLink && (
        <Card className="bg-green-900/30 border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label className="text-green-300 mb-1 block">Shareable Presentation Link</Label>
                <Input
                  value={shareableLink}
                  readOnly
                  className="bg-green-900/50 border-green-600 text-white"
                />
              </div>
              <Button
                onClick={copyLink}
                className={`${linkCopied ? 'bg-green-600' : 'bg-green-500'} hover:bg-green-600`}
              >
                {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-green-400 text-xs mt-2">Send this link to your customer so they can view and sign the presentation.</p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="sticky bottom-4 md:bottom-6 space-y-3">
        <div className="flex gap-3">
          <Button
            onClick={createShareablePresentation}
            disabled={!data.clientName || isCreatingPresentation}
            className="flex-1 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700"
          >
            {isCreatingPresentation ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Send className="h-5 w-5 mr-2" />
            )}
            Create Shareable Link
          </Button>
          
          <Button
            onClick={handlePresentNow}
            disabled={!data.clientName || isCreatingJobberQuote}
            className="flex-1 h-14 text-lg font-bold bg-gradient-to-r from-[#1e3a5f] to-[#2a4a70] hover:from-[#2a4a70] hover:to-[#365b82] shadow-2xl shadow-[#1e3a5f]/30"
          >
            {isCreatingJobberQuote ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Creating Quote...
              </>
            ) : (
              <>
                Present Now
                <ChevronRight className="h-6 w-6 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}