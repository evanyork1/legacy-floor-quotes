import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IntakeForm } from '@/components/presentation/IntakeForm';
import { ClosersCanvas } from '@/components/presentation/ClosersCanvas';
import { JobberStatus } from '@/components/presentation/JobberStatus';

export interface LineItem {
  id: string;
  name: string;
  pricePerSqFt: number;
  isCustom?: boolean;
  note?: string; // For disclaimers
  category?: 'floor' | 'additive' | 'custom';
}

// Floor entry for multiple floor types (e.g., garage + patio)
export interface FloorEntry {
  id: string;
  floorType: string;
  squareFootage: number;
  additives: string[]; // IDs of selected additives
  colorChoice: string;
  customColorNote: string;
  warrantyType: 'lifetime' | '15year' | 'custom';
  customWarrantyNote: string;
}

export type PresentationData = {
  // Client info
  clientId?: string;
  propertyId?: string; // Jobber property ID (needed for quotes)
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  
  // Project details
  spaceType: string; // Legacy - primary space type
  squareFootage: number; // Legacy - total sqft
  moistureContent: number;
  
  // Floor entries (new - supports multiple floors with per-entry color/warranty)
  floorEntries: FloorEntry[];
  
  // Line items (add-ons only, not package selection)
  lineItems: LineItem[];
  
  // Deposit selection
  depositType: '10' | '50' | '100' | 'custom';
  customDepositAmount: number | null;
  
  // Presentation notes (disclaimers for customer to sign)
  presentationNotes: string;
  
  // Notes for Jobber client profile
  notes: string;
  
  // Calculated pricing for each package tier
  silverTotal: number;
  goldTotal: number;
  platinumTotal: number;
  
  // Media
  sitePhotos: File[];
  sitePhotoUrls: string[];
  
  // Jobber quote tracking
  jobberQuoteId?: string;
  jobberQuoteNumber?: string;
  jobberClientHubUrl?: string;
};

// Package pricing constants (per sqft)
export const PACKAGE_PRICING = {
  silver: 5.00,
  gold: 7.10,
  platinum: 9.50,
};

// Floor type options
export const FLOOR_TYPES = [
  { value: 'garage', label: 'Garage Floor' },
  { value: 'patio', label: 'Patio Floor' },
  { value: 'basement', label: 'Basement' },
  { value: 'commercial', label: 'Commercial Space' },
];

// Additive options (can be added per floor)
export const ADDITIVE_OPTIONS: LineItem[] = [
  { id: 'custom-flake', name: 'Custom Flake', pricePerSqFt: 1.50, category: 'additive' },
  { id: 'grp-additive', name: 'GRP Additive', pricePerSqFt: 0.40, category: 'additive' },
];

// Legacy preset for backwards compatibility
export const PRESET_LINE_ITEMS: LineItem[] = ADDITIVE_OPTIONS;

// Space type options (legacy)
export const SPACE_TYPE_OPTIONS = [
  { value: 'Garage Floor', label: 'Garage Floor' },
  { value: 'Patio Floor', label: 'Patio Floor' },
];

export default function SalesPresentation() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'intake' | 'present'>('intake');
  const [presentationData, setPresentationData] = useState<PresentationData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    spaceType: 'Garage Floor',
    squareFootage: 400,
    moistureContent: 3,
    floorEntries: [
      { 
        id: 'floor-1', 
        floorType: 'garage', 
        squareFootage: 400, 
        additives: [],
        colorChoice: 'Domino',
        customColorNote: '',
        warrantyType: 'lifetime',
        customWarrantyNote: '',
      }
    ],
    lineItems: [],
    depositType: '50',
    customDepositAmount: null,
    presentationNotes: '',
    notes: '',
    silverTotal: 2000,
    goldTotal: 2840,
    platinumTotal: 3800,
    sitePhotos: [],
    sitePhotoUrls: [],
  });

  // Accept optional updated data to avoid race condition with async state updates
  const handleStartPresentation = (updatedData?: PresentationData) => {
    if (updatedData) {
      setPresentationData(updatedData);
    }
    setMode('present');
  };

  const handleBackToIntake = () => {
    setMode('intake');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {mode === 'intake' ? (
        <>
          {/* Header */}
          <header className="bg-[#1e3a5f] border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/crm')}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to CRM
              </Button>
              <div className="h-6 w-px bg-slate-700" />
              <h1 className="text-xl font-bold">Sales Presentation Tool</h1>
              <div className="h-6 w-px bg-slate-700" />
              <JobberStatus />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode('intake')}
                className="bg-[#1e3a5f] hover:bg-[#2a4a70] text-white border border-white/20"
              >
                <FileText className="h-4 w-4 mr-2" />
                Intake
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode('present')}
                disabled={!presentationData.clientName}
                className="text-slate-400 hover:text-white"
              >
                <Presentation className="h-4 w-4 mr-2" />
                Present
              </Button>
            </div>
          </header>

          <IntakeForm 
            data={presentationData} 
            onChange={setPresentationData}
            onStartPresentation={handleStartPresentation}
          />
        </>
      ) : (
        <ClosersCanvas 
          data={presentationData} 
          onBack={handleBackToIntake}
          onDataChange={setPresentationData}
        />
      )}
    </div>
  );
}