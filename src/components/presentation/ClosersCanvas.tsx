import { useState } from 'react';
import { ArrowLeft, Check, Shield, Clock, Sparkles, Award, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PresentationData, PACKAGE_PRICING } from '@/pages/SalesPresentation';
import { CustomerPresentation } from './CustomerPresentation';

interface ClosersCanvasProps {
  data: PresentationData;
  onBack: () => void;
  onDataChange: (data: PresentationData) => void;
}

export function ClosersCanvas({ data, onBack, onDataChange }: ClosersCanvasProps) {
  // Transform data for CustomerPresentation component
  const presentationData = {
    id: '', // Empty for live presentation
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    clientPhone: data.clientPhone,
    clientAddress: data.clientAddress,
    spaceType: data.spaceType,
    squareFootage: data.squareFootage,
    moistureContent: data.moistureContent,
    colorChoice: data.colorChoice,
    customColorNote: data.customColorNote,
    lineItems: data.lineItems,
    warrantyType: data.warrantyType,
    customWarrantyNote: data.customWarrantyNote,
    depositType: data.depositType,
    customDepositAmount: data.customDepositAmount,
    presentationNotes: data.presentationNotes,
    silverTotal: data.silverTotal,
    goldTotal: data.goldTotal,
    platinumTotal: data.platinumTotal,
    selectedPackage: null,
    status: 'pending',
    sitePhotos: data.sitePhotoUrls,
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={onBack}
        className="fixed top-4 left-4 z-50 text-slate-400 hover:text-white bg-slate-900/80 backdrop-blur-sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Form
      </Button>
      
      <CustomerPresentation 
        data={presentationData}
        onUpdate={() => {}}
        isShareable={false}
      />
    </div>
  );
}