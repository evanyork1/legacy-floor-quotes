import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Plus, Camera, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PresentationData } from '@/pages/SalesPresentation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface IntakeFormProps {
  data: PresentationData;
  onChange: (data: PresentationData) => void;
  onStartPresentation: () => void;
}

const BASE_COAT_OPTIONS = [
  { value: 'polyurea', label: 'Polyurea (Premium)' },
  { value: 'polyaspartic', label: 'Polyaspartic (Fast Cure)' },
  { value: 'epoxy', label: 'Epoxy (Economy)' },
];

const FLAKE_STYLES = [
  { value: 'domino', label: 'Domino (Black & White)' },
  { value: 'granite', label: 'Granite (Multi-color)' },
  { value: 'midnight', label: 'Midnight (Dark Blend)' },
  { value: 'saddle-tan', label: 'Saddle Tan (Earth Tones)' },
  { value: 'creekbed', label: 'Creek Bed (Natural)' },
  { value: 'custom', label: 'Custom Blend' },
];

const TOP_COAT_OPTIONS = [
  { value: 'matte', label: 'Matte Finish' },
  { value: 'satin', label: 'Satin Finish' },
  { value: 'gloss', label: 'High Gloss' },
];

const CSP_OPTIONS = [
  { value: 1, label: 'CSP 1 - Acid Etched' },
  { value: 2, label: 'CSP 2 - Light Grind' },
  { value: 3, label: 'CSP 3 - Medium Grind' },
  { value: 4, label: 'CSP 4 - Heavy Grind' },
  { value: 5, label: 'CSP 5 - Shotblast' },
];

export function IntakeForm({ data, onChange, onStartPresentation }: IntakeFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-calculate total price
  const calculateTotal = () => {
    let total = data.squareFootage * data.pricePerSqFt;
    if (data.gripAdditive) total += data.squareFootage * 0.50;
    if (data.vaporBarrier) total += data.squareFootage * 1.00;
    return total;
  };

  const updatePricing = (field: 'squareFootage' | 'pricePerSqFt', value: number) => {
    const newData = { ...data, [field]: value };
    newData.totalPrice = newData.squareFootage * newData.pricePerSqFt + 
      (newData.gripAdditive ? newData.squareFootage * 0.50 : 0) +
      (newData.vaporBarrier ? newData.squareFootage * 1.00 : 0);
    onChange(newData);
  };

  const toggleOption = (field: 'gripAdditive' | 'vaporBarrier') => {
    const newData = { ...data, [field]: !data[field] };
    newData.totalPrice = newData.squareFootage * newData.pricePerSqFt + 
      (newData.gripAdditive ? newData.squareFootage * 0.50 : 0) +
      (newData.vaporBarrier ? newData.squareFootage * 1.00 : 0);
    onChange(newData);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Client Section */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">1</span>
            Client Information
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
              
              {/* Show searching indicator */}
              {isSearching && (
                <div className="text-sm text-slate-400 px-2">Searching...</div>
              )}
              
              {/* Show no results message */}
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
                onClick={() => { onChange({ ...data, clientId: undefined, clientName: '', clientEmail: '', clientPhone: '', clientAddress: '' }); setIsCreatingClient(false); }}
                className="text-slate-400 hover:text-white"
              >
                Change Client
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">2</span>
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-slate-300">Square Footage</Label>
              <Input
                type="number"
                value={data.squareFootage}
                onChange={(e) => updatePricing('squareFootage', Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white h-14 text-xl font-bold"
              />
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
                  {data.moistureContent > 4 ? 'High - Vapor Barrier Required' : 'Acceptable'}
                </span>
                <span>10%</span>
              </div>
            </div>
            
            <div>
              <Label className="text-slate-300">Concrete Surface Profile</Label>
              <Select 
                value={String(data.concreteSurfaceProfile)} 
                onValueChange={(v) => onChange({ ...data, concreteSurfaceProfile: Number(v) })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-14">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {CSP_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={String(opt.value)} className="text-white">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Selection */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">3</span>
            Product Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-slate-300">Base Coat Type</Label>
              <Select value={data.baseCoatType} onValueChange={(v) => onChange({ ...data, baseCoatType: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-14">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {BASE_COAT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-white">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-slate-300">Flake Style / Color</Label>
              <Select value={data.flakeStyle} onValueChange={(v) => onChange({ ...data, flakeStyle: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-14">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {FLAKE_STYLES.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-white">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-slate-300">Top Coat</Label>
              <Select value={data.topCoat} onValueChange={(v) => onChange({ ...data, topCoat: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-14">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {TOP_COAT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-white">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Options */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">4</span>
            Pricing & Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-slate-300">Price per Sq Ft</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">$</span>
                <Input
                  type="number"
                  step="0.25"
                  value={data.pricePerSqFt}
                  onChange={(e) => updatePricing('pricePerSqFt', Number(e.target.value))}
                  className="bg-slate-800 border-slate-700 text-white h-14 text-xl font-bold pl-10"
                />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg p-4 border border-orange-500/30">
              <Label className="text-slate-300">Total Price</Label>
              <div className="text-4xl font-bold text-orange-400">
                ${calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {data.squareFootage} sq ft × ${data.pricePerSqFt}/sq ft
                {data.gripAdditive && ' + Grip'}
                {data.vaporBarrier && ' + Vapor Barrier'}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-4 min-w-[200px]">
              <Switch
                checked={data.gripAdditive}
                onCheckedChange={() => toggleOption('gripAdditive')}
                className="data-[state=checked]:bg-orange-500"
              />
              <div>
                <div className="text-white font-medium">Grip Additive</div>
                <div className="text-sm text-slate-400">+$0.50/sq ft</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-4 min-w-[200px]">
              <Switch
                checked={data.vaporBarrier}
                onCheckedChange={() => toggleOption('vaporBarrier')}
                className="data-[state=checked]:bg-orange-500"
              />
              <div>
                <div className="text-white font-medium">Vapor Barrier</div>
                <div className="text-sm text-slate-400">+$1.00/sq ft</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Site Photos */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">5</span>
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
