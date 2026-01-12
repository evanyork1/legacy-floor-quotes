import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Plus, Camera, ChevronRight, Loader2, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PresentationData, PACKAGE_PRICING, PRESET_LINE_ITEMS, LineItem } from '@/pages/SalesPresentation';
import { TodaysCalendar } from './TodaysCalendar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface IntakeFormProps {
  data: PresentationData;
  onChange: (data: PresentationData) => void;
  onStartPresentation: () => void;
}

const SPACE_TYPES = ['Garage', 'Patio', 'Porch'];

const COLOR_OPTIONS = [
  'Domino',
  'Creek Bed',
  'Wombat',
  'Tidal Wave',
  'Raven',
  'Cabin Fever',
  'Other',
];

const PACKAGE_OPTIONS = [
  { value: 'silver', label: 'Silver Package', price: 5.00 },
  { value: 'gold', label: 'Gold Package', price: 7.10 },
  { value: 'platinum', label: 'Platinum Package', price: 9.50 },
];

export function IntakeForm({ data, onChange, onStartPresentation }: IntakeFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [customLineItemName, setCustomLineItemName] = useState('');
  const [customLineItemPrice, setCustomLineItemPrice] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate total price whenever relevant data changes
  useEffect(() => {
    const basePrice = data.squareFootage * PACKAGE_PRICING[data.packageLevel];
    const lineItemsTotal = data.lineItems.reduce(
      (sum, item) => sum + (data.squareFootage * item.pricePerSqFt),
      0
    );
    const total = basePrice + lineItemsTotal;
    
    if (total !== data.totalPrice) {
      onChange({ ...data, totalPrice: total });
    }
  }, [data.squareFootage, data.packageLevel, data.lineItems]);

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
      
      if (error) throw error;
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
    onChange({
      ...data,
      clientId: client.id,
      clientName: client.name || `${client.firstName} ${client.lastName}`,
      clientEmail: client.emails?.[0]?.address || '',
      clientPhone: client.phones?.[0]?.number || '',
      clientAddress: client.billingAddress?.street1 || '',
    });
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleSelectFromCalendar = (client: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  }) => {
    onChange({
      ...data,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email || '',
      clientPhone: client.phone || '',
      clientAddress: client.address || '',
    });
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
    // Check if already added
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
    };
    
    onChange({
      ...data,
      lineItems: [...data.lineItems, newItem],
    });
    
    setCustomLineItemName('');
    setCustomLineItemPrice('');
    toast.success('Custom line item added');
  };

  const removeLineItem = (itemId: string) => {
    onChange({
      ...data,
      lineItems: data.lineItems.filter(li => li.id !== itemId),
    });
  };

  const calculateTotal = () => {
    const basePrice = data.squareFootage * PACKAGE_PRICING[data.packageLevel];
    const lineItemsTotal = data.lineItems.reduce(
      (sum, item) => sum + (data.squareFootage * item.pricePerSqFt),
      0
    );
    return basePrice + lineItemsTotal;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Today's Calendar Section */}
      <TodaysCalendar onSelectClient={handleSelectFromCalendar} />

      {/* Client Section */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">1</span>
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
                    <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
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
                  onChange={(e) => onChange({ ...data, clientEmail: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white h-12"
                />
              </div>
              <div>
                <Label className="text-slate-300">Phone</Label>
                <Input
                  type="tel"
                  value={data.clientPhone}
                  onChange={(e) => onChange({ ...data, clientPhone: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white h-12"
                />
              </div>
              <div>
                <Label className="text-slate-300">Address</Label>
                <Input
                  value={data.clientAddress}
                  onChange={(e) => onChange({ ...data, clientAddress: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white h-12"
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

      {/* Space Selection */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">2</span>
            Select Space
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-slate-300">Space Type</Label>
              <Select value={data.spaceType} onValueChange={(v) => onChange({ ...data, spaceType: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-14">
                  <SelectValue placeholder="Select space type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {SPACE_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-slate-700">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-slate-300">Square Footage</Label>
              <Input
                type="number"
                value={data.squareFootage}
                onChange={(e) => onChange({ ...data, squareFootage: Number(e.target.value) })}
                className="bg-slate-800 border-slate-700 text-white h-14 text-xl font-bold"
              />
            </div>
          </div>
          
          <div>
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

      {/* Package Selection */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">3</span>
            Select Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PACKAGE_OPTIONS.map((pkg) => (
              <button
                key={pkg.value}
                onClick={() => onChange({ ...data, packageLevel: pkg.value as 'silver' | 'gold' | 'platinum' })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  data.packageLevel === pkg.value
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className={`text-xl font-bold ${
                  data.packageLevel === pkg.value ? 'text-orange-400' : 'text-white'
                }`}>
                  {pkg.label}
                </div>
                <div className="text-2xl font-bold text-white mt-2">
                  ${pkg.price.toFixed(2)}<span className="text-sm text-slate-400">/sq ft</span>
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  ${(data.squareFootage * pkg.price).toLocaleString('en-US', { minimumFractionDigits: 2 })} total
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Selection */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">4</span>
            Select Color
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={data.colorChoice} onValueChange={(v) => onChange({ ...data, colorChoice: v })}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-14">
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
          
          {data.colorChoice === 'Other' && (
            <div>
              <Label className="text-slate-300">Custom Color Description</Label>
              <Input
                placeholder="Describe the custom color..."
                value={data.customColorNote}
                onChange={(e) => onChange({ ...data, customColorNote: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white h-12"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">5</span>
            Line Items (Add-ons)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preset Line Items */}
          <div>
            <Label className="text-slate-300 mb-3 block">Quick Add</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_LINE_ITEMS.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addLineItem(item)}
                  disabled={data.lineItems.some(li => li.id === item.id)}
                  className={`border-slate-600 ${
                    data.lineItems.some(li => li.id === item.id)
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-slate-700'
                  }`}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {item.name} (${item.pricePerSqFt.toFixed(2)}/sqft)
                </Button>
              ))}
            </div>
          </div>
          
          {/* Custom Line Item */}
          <div className="border-t border-slate-700 pt-4">
            <Label className="text-slate-300 mb-3 block">Add Custom Line Item</Label>
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
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-1">Price per square foot</p>
          </div>
          
          {/* Added Line Items */}
          {data.lineItems.length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <Label className="text-slate-300 mb-3 block">Added Items</Label>
              <div className="space-y-2">
                {data.lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-slate-800 p-3 rounded-lg"
                  >
                    <div>
                      <span className="text-white">{item.name}</span>
                      <span className="text-slate-400 ml-2">${item.pricePerSqFt.toFixed(2)}/sqft</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-orange-400 font-medium">
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

      {/* Pricing Summary */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">6</span>
            Pricing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Base Package */}
            <div className="flex justify-between text-slate-300">
              <span>{PACKAGE_OPTIONS.find(p => p.value === data.packageLevel)?.label} ({data.squareFootage} sqft × ${PACKAGE_PRICING[data.packageLevel].toFixed(2)})</span>
              <span>${(data.squareFootage * PACKAGE_PRICING[data.packageLevel]).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            
            {/* Line Items */}
            {data.lineItems.map((item) => (
              <div key={item.id} className="flex justify-between text-slate-400">
                <span>{item.name} ({data.squareFootage} sqft × ${item.pricePerSqFt.toFixed(2)})</span>
                <span>+${(data.squareFootage * item.pricePerSqFt).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            
            {/* Divider */}
            <div className="border-t border-slate-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-3xl font-bold text-orange-400">
                  ${calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">7</span>
            Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add notes for the client profile in Jobber..."
            value={data.notes}
            onChange={(e) => onChange({ ...data, notes: e.target.value })}
            className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
          />
          <p className="text-xs text-slate-500 mt-2">These notes will be added to the client's profile in Jobber.</p>
        </CardContent>
      </Card>

      {/* Site Photos */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">8</span>
            Pre-Job Site Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.sitePhotoUrls.map((url, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800">
                <img src={url} alt={`Site photo ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            
            <label className="aspect-square rounded-lg border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-slate-800/50 transition-colors">
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

      {/* Start Presentation Button */}
      <div className="sticky bottom-4 md:bottom-6">
        <Button
          onClick={onStartPresentation}
          disabled={!data.clientName}
          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-2xl shadow-orange-500/30"
        >
          Start Presentation
          <ChevronRight className="h-6 w-6 ml-2" />
        </Button>
      </div>
    </div>
  );
}
