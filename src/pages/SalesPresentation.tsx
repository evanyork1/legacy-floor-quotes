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
}

export type PresentationData = {
  // Client info
  clientId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  
  // Project details
  spaceType: string; // Garage, Patio, Porch
  squareFootage: number;
  moistureContent: number;
  
  // Package selection
  packageLevel: 'silver' | 'gold' | 'platinum';
  
  // Color
  colorChoice: string;
  customColorNote: string;
  
  // Line items
  lineItems: LineItem[];
  
  // Notes
  notes: string;
  
  // Pricing (calculated)
  totalPrice: number;
  
  // Media
  sitePhotos: File[];
  sitePhotoUrls: string[];
};

// Package pricing constants
export const PACKAGE_PRICING = {
  silver: 5.00,
  gold: 7.10,
  platinum: 9.50,
};

// Preset line items
export const PRESET_LINE_ITEMS: LineItem[] = [
  { id: 'custom-flake', name: 'Custom Flake', pricePerSqFt: 1.50 },
  { id: 'grp-additive', name: 'GRP Additive', pricePerSqFt: 0.40 },
];

export default function SalesPresentation() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'intake' | 'present'>('intake');
  const [presentationData, setPresentationData] = useState<PresentationData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    spaceType: 'Garage',
    squareFootage: 400,
    moistureContent: 3,
    packageLevel: 'gold',
    colorChoice: 'Domino',
    customColorNote: '',
    lineItems: [],
    notes: '',
    totalPrice: 2840, // 400 * 7.10
    sitePhotos: [],
    sitePhotoUrls: [],
  });

  const handleStartPresentation = () => {
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
          <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
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
                className="bg-orange-500 hover:bg-orange-600 text-white"
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
