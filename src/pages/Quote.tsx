
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { FormData, ColorOption } from "@/components/quote/types";

import { Step1GarageSize } from "@/components/quote/Step1GarageSize";
import { Step2CustomSpace } from "@/components/quote/Step2CustomSpace";
import { Step3ExteriorPhotos } from "@/components/quote/Step3ExteriorPhotos";
import { Step4DamagePhotos } from "@/components/quote/Step4DamagePhotos";
import { Step5ColorChoice } from "@/components/quote/Step5ColorChoice";
import { Step6ContactInfo } from "@/components/quote/Step6ContactInfo";
import { Step7QuoteSummary } from "@/components/quote/Step7QuoteSummary";

const Quote = () => {
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

  const colorOptions: ColorOption[] = [
    { id: "domino", name: "Domino", thumbnail: "/lovable-uploads/cdfd7176-3906-43b6-94ee-714cbd1826a4.png", preview: "/lovable-uploads/3cf154bb-3983-4192-8d3c-6d8bf7cc2587.png" },
    { id: "tidal-wave", name: "Tidal Wave", thumbnail: "/lovable-uploads/ee1820a2-913b-461d-b3fb-92cbd844fd78.png", preview: "/lovable-uploads/31083ac1-bd37-402e-93a7-56f5bedbf606.png" },
    { id: "wombat", name: "Wombat", thumbnail: "/lovable-uploads/2546c208-cda6-4d48-9163-80c246dba2d2.png", preview: "/lovable-uploads/0d074361-e8d8-4280-99dc-ad791113a1fd.png" },
    { id: "raven", name: "Raven", thumbnail: "/lovable-uploads/348c8c3b-1396-4bef-ab42-e8412ddbee0c.png", preview: "/lovable-uploads/40f32c63-7463-4fd5-ad12-c4e99b315de8.png" },
    { id: "cabin-fever", name: "Cabin Fever", thumbnail: "/lovable-uploads/735e5c66-d9b6-4902-9d1a-fd1deea7b369.png", preview: "/lovable-uploads/e6d46c38-cab4-4c0e-b5f7-a13f414dc01b.png" },
    { id: "coyote", name: "Coyote", thumbnail: "/lovable-uploads/7ad5601d-c765-4bd8-9777-db2ad54404eb.png", preview: "/lovable-uploads/a5a3889c-577c-48c8-adcc-e3e9aefdf70b.png" },
    { id: "creek-bed", name: "Creek Bed", thumbnail: "/lovable-uploads/30880d71-5ddb-4653-8b75-4f05283e8728.png", preview: "/lovable-uploads/17dfd122-2e0f-4fe6-80ee-fe0ce73f36e1.png" },
    { id: "orbit", name: "Orbit", thumbnail: "/lovable-uploads/77dbbade-9254-4af6-872f-f75c0f6f9607.png", preview: "/lovable-uploads/1194f510-058f-4c9b-b792-ac33f55f217e.png" }
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
        if (currentStep === 1 && formData.garageType !== "custom") {
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
    let totalSqft = 0;
    if (formData.garageType === "2-car") totalSqft += 425;
    else if (formData.garageType === "3-car") totalSqft += 650;
    else if (formData.garageType === "4-car") totalSqft += 900;
    else if (formData.garageType === "custom" && formData.customSqft) totalSqft += parseInt(formData.customSqft);
    
    formData.additionalSpaces.forEach(space => {
      if (space.type === "2-car") totalSqft += 425;
      else if (space.type === "3-car") totalSqft += 650;
      else if (space.type === "4-car") totalSqft += 900;
      else if (space.type === "custom" && space.sqft) totalSqft += parseInt(space.sqft);
    });

    return totalSqft * 8;
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1GarageSize formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2CustomSpace formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3ExteriorPhotos formData={formData} handleFileUpload={handleFileUpload} removePhoto={removePhoto} />;
      case 4:
        return <Step4DamagePhotos formData={formData} handleFileUpload={handleFileUpload} removePhoto={removePhoto} />;
      case 5:
        return <Step5ColorChoice formData={formData} updateFormData={updateFormData} colorOptions={colorOptions} />;
      case 6:
        return <Step6ContactInfo formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <Step7QuoteSummary formData={formData} estimatedPrice={calculatePrice()} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.garageType !== "";
      case 2: return formData.customSqft !== "" && formData.spaceType !== "";
      case 3: return true;
      case 4: return true;
      case 5: return formData.colorChoice !== "";
      case 6: return formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.zipCode !== "";
      case 7: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    console.log('Quote submitted:', formData);
    alert('Quote submitted successfully! We\'ll call you within 60 minutes.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Get Your Instant Quote</h1>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">Step {currentStep} of {totalSteps}</div>
                <div className="text-xs sm:text-sm text-gray-500">90 seconds to complete</div>
              </div>
            </div>
            <Progress value={currentStep / totalSteps * 100} className="h-2 sm:h-3" />
          </div>

          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              {renderStep()}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg order-2 sm:order-1">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Previous
                </Button>
                {currentStep < totalSteps ? 
                  <Button onClick={nextStep} disabled={!canProceed()} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg order-1 sm:order-2">
                    Next Step
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </Button> : 
                  <Button onClick={handleSubmit} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg order-1 sm:order-2">
                    Done
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </Button>
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Quote;
