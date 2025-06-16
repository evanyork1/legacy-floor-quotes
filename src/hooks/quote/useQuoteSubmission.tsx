
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { FormData } from "@/components/quote/types";

export const useQuoteSubmission = (
  calculatePrice: () => number,
  onSubmissionSuccess: () => void
) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: submitQuote, isPending: isSubmitting } = useMutation({
    mutationFn: async (dataToSubmit: FormData) => {
        const uploadFile = async (file: File) => {
            const fileName = `${crypto.randomUUID()}-${file.name}`;
            const { error: uploadError } = await supabase.storage.from('quote_photos').upload(fileName, file);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('quote_photos').getPublicUrl(fileName);
            return urlData.publicUrl;
        };

        const exterior_photos = await Promise.all(dataToSubmit.exteriorPhotos.map(uploadFile));
        const damage_photos = await Promise.all(dataToSubmit.damagePhotos.map(uploadFile));
        
        const price = calculatePrice();

        const quotePayload = {
            garage_type: dataToSubmit.garageType,
            custom_sqft: dataToSubmit.customSqft ? parseInt(dataToSubmit.customSqft) : null,
            space_type: dataToSubmit.spaceType,
            other_space_type: dataToSubmit.otherSpaceType,
            color_choice: dataToSubmit.colorChoice,
            name: dataToSubmit.name,
            email: dataToSubmit.email,
            phone: dataToSubmit.phone,
            zip_code: dataToSubmit.zipCode,
            estimated_price: price,
            exterior_photos,
            damage_photos,
            status: 'new',
        };

        const { error } = await supabase.from('quotes').insert(quotePayload);

        if (error) {
            throw error;
        }
    },
    onSuccess: () => {
        toast({
            title: "Quote Submitted!",
            description: "We'll call you within 60 minutes to confirm.",
        });
        // Call the success callback to proceed to step 7
        onSubmissionSuccess();
    },
    onError: (error) => {
        console.error('Error submitting quote:', error);
        toast({
            title: "Submission Failed",
            description: "There was an error submitting your quote. Please try again.",
            variant: "destructive",
        });
    },
  });

  const handleSubmit = () => {
    navigate('/');
  };

  return {
    submitQuote,
    isSubmitting,
    handleSubmit
  };
};
