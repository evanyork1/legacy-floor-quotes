
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Upload, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Quote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    garageType: "",
    customSqft: "",
    spaceType: "",
    otherSpaceType: "",
    photos: [] as File[],
    colorChoice: "",
    name: "",
    email: "",
    phone: "",
    zipCode: "",
  });

  const totalSteps = 6;

  const updateFormData = (field: string, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      updateFormData('photos', [...formData.photos, ...files]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData('photos', newPhotos);
  };

  const calculatePrice = () => {
    let sqft = 0;
    if (formData.garageType === "2-car") sqft = 425;
    else if (formData.garageType === "3-car") sqft = 650;
    else if (formData.garageType === "4-car") sqft = 900;
    else if (formData.garageType === "custom" && formData.customSqft) sqft = parseInt(formData.customSqft);

    // Base pricing: $8 per sq ft
    const basePrice = sqft * 8;
    return basePrice;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What size is your garage?</h2>
              <p className="text-lg text-gray-600">Choose the option that best describes your space</p>
            </div>

            <div className="grid gap-4 max-w-2xl mx-auto">
              {[
                { id: "2-car", label: "2-Car Garage", desc: "Approx. 400–450 sq ft" },
                { id: "3-car", label: "3-Car Garage", desc: "Approx. 600–700 sq ft" },
                { id: "4-car", label: "4-Car Garage", desc: "Approx. 800–1,000 sq ft" },
                { id: "custom", label: "Custom / Other Size", desc: "We'll ask for details next" }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData('garageType', option.id)}
                  className={`p-6 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                    formData.garageType === option.id 
                      ? 'border-blue-600 bg-blue-50 shadow-lg' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{option.label}</h3>
                      <p className="text-gray-600 mt-1">{option.desc}</p>
                    </div>
                    {formData.garageType === option.id && (
                      <Check className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        if (formData.garageType !== "custom") {
          setCurrentStep(3);
          return null;
        }
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us about your custom space</h2>
              <p className="text-lg text-gray-600">Help us calculate the perfect quote for you</p>
            </div>

            <div className="max-w-xl mx-auto space-y-6">
              <div>
                <Label htmlFor="sqft" className="text-lg font-medium mb-3 block">What's your total square footage?</Label>
                <Input 
                  id="sqft"
                  type="number"
                  value={formData.customSqft}
                  onChange={(e) => updateFormData('customSqft', e.target.value)}
                  placeholder="Enter square footage"
                  className="h-14 text-lg"
                />
              </div>

              <div>
                <Label className="text-lg font-medium mb-4 block">What type of space is this?</Label>
                <div className="grid gap-3">
                  {[
                    { id: "storage", label: "Extra storage" },
                    { id: "warehouse", label: "Warehouse" },
                    { id: "detached", label: "Detached garage" },
                    { id: "other", label: "Other" }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData('spaceType', option.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.spaceType === option.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {formData.spaceType === option.id && (
                          <Check className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {formData.spaceType === "other" && (
                  <Input 
                    value={formData.otherSpaceType}
                    onChange={(e) => updateFormData('otherSpaceType', e.target.value)}
                    placeholder="Please describe your space"
                    className="mt-3 h-12"
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Photos</h2>
              <p className="text-lg text-gray-600">Got photos of your space or any cracks/damage? Upload them here.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Drop photos here or click to browse</p>
                <p className="text-gray-500 mb-6">JPG, PNG up to 10MB each</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <Button className="cursor-pointer">Choose Photos</Button>
                </label>
              </div>

              {formData.photos.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Uploaded Photos ({formData.photos.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={URL.createObjectURL(photo)} 
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Look</h2>
              <p className="text-lg text-gray-600">Select a floor color (more options available during consultation)</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { id: "classic-gray", name: "Classic Gray", color: "#6B7280" },
                  { id: "slate-blue", name: "Slate Blue", color: "#475569" },
                  { id: "charcoal", name: "Charcoal", color: "#374151" },
                  { id: "beige", name: "Beige", color: "#D1C4B7" },
                  { id: "brown", name: "Brown", color: "#8B4513" },
                  { id: "green", name: "Forest Green", color: "#065F46" },
                  { id: "navy", name: "Navy Blue", color: "#1E3A8A" },
                  { id: "custom", name: "Custom Color", color: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)" }
                ].map((color) => (
                  <button
                    key={color.id}
                    onClick={() => updateFormData('colorChoice', color.id)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      formData.colorChoice === color.id 
                        ? 'border-blue-600 shadow-lg' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div 
                      className="w-full h-20 rounded-lg mb-3"
                      style={{ background: color.color }}
                    />
                    <p className="font-medium text-gray-900">{color.name}</p>
                    {formData.colorChoice === color.id && (
                      <Check className="h-5 w-5 text-blue-600 mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Information</h2>
              <p className="text-lg text-gray-600">Almost done! We just need your contact details</p>
            </div>

            <div className="max-w-xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-base font-medium">Name</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Your full name"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-2 h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-base font-medium">ZIP Code</Label>
                <Input 
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  placeholder="12345"
                  className="mt-2 h-12"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        const estimatedPrice = calculatePrice();
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Instant Quote</h2>
              <p className="text-lg text-gray-600">Here's your estimated price based on your selections</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-4">
                    ${estimatedPrice.toLocaleString()}
                  </div>
                  <p className="text-xl text-gray-700 mb-6">Estimated Total Investment</p>
                  
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4">Quote Summary:</h3>
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span>Garage Type:</span>
                        <span className="font-medium">
                          {formData.garageType === "custom" ? `Custom (${formData.customSqft} sq ft)` : 
                           formData.garageType === "2-car" ? "2-Car Garage" :
                           formData.garageType === "3-car" ? "3-Car Garage" : "4-Car Garage"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Color Choice:</span>
                        <span className="font-medium capitalize">{formData.colorChoice.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Photos Uploaded:</span>
                        <span className="font-medium">{formData.photos.length} photos</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-medium">
                      🔥 We'll call you within 60 minutes to confirm your quote and answer any questions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.garageType !== "";
      case 2: return formData.garageType !== "custom" || (formData.customSqft !== "" && formData.spaceType !== "");
      case 3: return true; // Photos are optional
      case 4: return formData.colorChoice !== "";
      case 5: return formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.zipCode !== "";
      case 6: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    console.log('Quote submitted:', formData);
    // Here you would normally send to backend
    alert('Quote submitted successfully! We\'ll call you within 60 minutes.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold text-gray-900">Get Your Instant Quote</h1>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">Step {currentStep} of {totalSteps}</div>
                <div className="text-sm text-gray-500">90 seconds to complete</div>
              </div>
            </div>
            
            <Progress value={(currentStep / totalSteps) * 100} className="h-3" />
          </div>

          {/* Form Content */}
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-12">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center px-8 py-3 text-lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center px-8 py-3 text-lg"
                  >
                    Next Step
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center px-8 py-3 text-lg"
                  >
                    Finish & Submit
                    <Check className="h-5 w-5 ml-2" />
                  </Button>
                )}
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
