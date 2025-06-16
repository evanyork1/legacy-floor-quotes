import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { FormData } from "@/components/quote/types";

export const useQuoteForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    garageType: "",
    customSqft: "",
    spaceType: "",
    otherSpaceType: "",
    additionalSpaces: [],
    exteriorPhotos: [],
    damagePhotos: [],
    colorChoice: "",
    name: "",
    email: "",
    phone: "",
    zipCode: ""
  });
  const totalSteps = 7;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const { data: pricingSettings } = useQuery({
    queryKey: ['pricingSettings'],
    queryFn: async () => {
        const { data, error } = await supabase
            .from('pricing_settings')
            .select('*')
            .limit(1)
            .single();
        if (error) {
            console.error("Error fetching pricing", error);
            toast({
                title: "Error",
                description: "Could not load pricing information. Please try again later.",
                variant: "destructive",
            });
            throw new Error(error.message);
        }
        return data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
        if (currentStep === 6) {
            // Submit to database when moving from step 6 to step 7
            submitQuote(formData);
        } else if (currentStep === 1 && formData.garageType !== "custom") {
            setCurrentStep(3); // Skip step 2 if garageType is not custom
        } else {
            setCurrentStep(currentStep + 1);
        }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
        if (currentStep === 3 && formData.garageType !== "custom") {
            setCurrentStep(1); // Skip back to step 1 if garageType is not custom
        } else {
            setCurrentStep(currentStep - 1);
        }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'exterior' | 'damage') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const field = type === 'exterior' ? 'exteriorPhotos' : 'damagePhotos';
      updateFormData(field, [...formData[field], ...files]);
    }
  };

  const removePhoto = (index: number, type: 'exterior' | 'damage') => {
    const field = type === 'exterior' ? 'exteriorPhotos' : 'damagePhotos';
    const newPhotos = formData[field].filter((_, i) => i !== index);
    updateFormData(field, newPhotos);
  };

  const calculatePrice = () => {
    if (!pricingSettings) return 0;

    let price = 0;
    
    const calculateSpacePrice = (space: { garageType: string; customSqft: string; }) => {
        if (space.garageType === "2-car") return pricingSettings.price_2_car;
        if (space.garageType === "3-car") return pricingSettings.price_3_car;
        if (space.garageType === "4-car") return pricingSettings.price_4_car;
        if (space.garageType === "custom" && space.customSqft) {
          return parseInt(space.customSqft) * pricingSettings.price_per_sqft;
        }
        return 0;
    }

    // Main garage price
    price += calculateSpacePrice({ garageType: formData.garageType, customSqft: formData.customSqft });

    // Additional spaces price
    formData.additionalSpaces.forEach(space => {
        price += calculateSpacePrice(space);
    });
    
    return price;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.garageType !== "";
      case 2: return formData.customSqft !== "" && formData.spaceType !== "";
      case 3: return true;
      case 4: return true;
      case 5: return formData.colorChoice !== "";
      case 6: {
        // Check that all fields are filled
        const allFieldsFilled = formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.zipCode !== "";
        
        if (!allFieldsFilled) return false;
        
        // Validate phone (10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        const phoneValid = phoneDigits.length === 10;
        
        // Validate email (contains @)
        const emailValid = formData.email.includes('@');
        
        // Validate zip code (5 digits)
        const zipDigits = formData.zipCode.replace(/\D/g, '');
        const zipValid = zipDigits.length === 5;
        
        return phoneValid && emailValid && zipValid;
      }
      case 7: return true;
      default: return false;
    }
  };

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
        // Proceed to step 7 after successful submission
        setCurrentStep(7);
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
    currentStep,
    totalSteps,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleFileUpload,
    removePhoto,
    calculatePrice,
    canProceed,
    handleSubmit,
    isSubmitting
  };
};
