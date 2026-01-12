import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, FileText, Presentation, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IntakeForm } from '@/components/presentation/IntakeForm';
import { ClosersCanvas } from '@/components/presentation/ClosersCanvas';
import { cn } from '@/lib/utils';

export type PresentationData = {
  // Client info
  clientId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  
  // Project details
  squareFootage: number;
  moistureContent: number;
  concreteSurfaceProfile: number;
  
  // Product selection
  baseCoatType: string;
  flakeStyle: string;
  topCoat: string;
  
  // Pricing
  pricePerSqFt: number;
  totalPrice: number;
  
  // Options
  gripAdditive: boolean;
  vaporBarrier: boolean;
  
  // Media
  sitePhotos: File[];
  sitePhotoUrls: string[];
};

export default function SalesPresentation() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'intake' | 'present'>('intake');
  const [presentationData, setPresentationData] = useState<PresentationData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    squareFootage: 400,
    moistureContent: 3,
    concreteSurfaceProfile: 2,
    baseCoatType: 'polyurea',
    flakeStyle: 'domino',
    topCoat: 'matte',
    pricePerSqFt: 8.50,
    totalPrice: 3400,
    gripAdditive: false,
    vaporBarrier: false,
    sitePhotos: [],
    sitePhotoUrls: [],
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    navigate('/auth?redirect=/sales-presentation');
    return null;
  }

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
