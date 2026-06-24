import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { CustomerPresentation } from '@/components/presentation/CustomerPresentation';
import { toast } from 'sonner';

interface SalesPresentation {
  id: string;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  client_address: string | null;
  space_type: string;
  square_footage: number;
  moisture_content: number | null;
  color_choice: string;
  custom_color_note: string | null;
  line_items: any;
  warranty_type: string;
  custom_warranty_note: string | null;
  deposit_type: string;
  custom_deposit_amount: number | null;
  presentation_notes: string | null;
  silver_total: number;
  gold_total: number;
  platinum_total: number;
  selected_package: string | null;
  status: string;
  site_photos: string[] | null;
}

export default function CustomerPresentationPage() {
  const { id } = useParams<{ id: string }>();
  const [presentation, setPresentation] = useState<SalesPresentation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresentation = async () => {
      if (!id) {
        setError('No presentation ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const { data: resp, error: fetchError } = await supabase.functions.invoke(
          'public-sales-presentation',
          { body: { action: 'get', id } }
        );

        if (fetchError || !resp?.data) {
          console.error('Error fetching presentation:', fetchError);
          setError('Presentation not found');
        } else {
          const data = resp.data;
          setPresentation(data);

          // Mark as viewed if pending
          if (data.status === 'pending') {
            await supabase.functions.invoke('public-sales-presentation', {
              body: { action: 'mark_viewed', id },
            });
          }
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load presentation');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresentation();
  }, [id]);

  const handleUpdate = (updates: any) => {
    if (presentation) {
      setPresentation({ ...presentation, ...updates });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your quote...</p>
        </div>
      </div>
    );
  }

  if (error || !presentation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quote Not Found</h1>
          <p className="text-gray-600">{error || 'This quote may have expired or does not exist.'}</p>
        </div>
      </div>
    );
  }

  // Transform to component format
  const presentationData = {
    id: presentation.id,
    clientName: presentation.client_name,
    clientEmail: presentation.client_email || '',
    clientPhone: presentation.client_phone || '',
    clientAddress: presentation.client_address || '',
    spaceType: presentation.space_type,
    squareFootage: presentation.square_footage,
    moistureContent: presentation.moisture_content || 3,
    colorChoice: presentation.color_choice,
    customColorNote: presentation.custom_color_note || '',
    lineItems: Array.isArray(presentation.line_items) ? presentation.line_items : [],
    warrantyType: presentation.warranty_type,
    customWarrantyNote: presentation.custom_warranty_note || '',
    depositType: presentation.deposit_type,
    customDepositAmount: presentation.custom_deposit_amount,
    presentationNotes: presentation.presentation_notes || '',
    silverTotal: presentation.silver_total,
    goldTotal: presentation.gold_total,
    platinumTotal: presentation.platinum_total,
    selectedPackage: presentation.selected_package,
    status: presentation.status,
    sitePhotos: presentation.site_photos || [],
  };

  return (
    <>
      <Helmet>
        <title>Your Floor Quote | Legacy Industrial Coatings</title>
        <meta name="description" content="Your personalized floor coating quote from Legacy Industrial Coatings." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <CustomerPresentation 
        data={presentationData} 
        onUpdate={handleUpdate}
        isShareable={true}
      />
    </>
  );
}