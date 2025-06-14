import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, ArrowLeft, Upload, Check, Plus, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Quote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedColorPreview, setSelectedColorPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    garageType: "",
    customSqft: "",
    spaceType: "",
    otherSpaceType: "",
    additionalSpaces: [] as Array<{type: string, sqft: string, spaceType: string, otherSpaceType: string}>,
    exteriorPhotos: [] as File[],
    damagePhotos: [] as File[],
    colorChoice: "",
    name: "",
    email: "",
    phone: "",
    zipCode: "",
  });

  const [showAdditionalSpace, setShowAdditionalSpace] = useState(false);
  const [currentAdditionalSpace, setCurrentAdditionalSpace] = useState({
    type: "",
    sqft: "",
    spaceType: "",
    otherSpaceType: ""
  });

  const totalSteps = 7;

  // Color options with real images
  const colorOptions = [
    {
      id: "domino",
      name: "Domino",
      thumbnail: "/lovable-uploads/cdfd7176-3906-43b6-94ee-714cbd1826a4.png",
      preview: "/lovable-uploads/3cf154bb-3983-4192-8d3c-6d8bf7cc2587.png"
    },
    {
      id: "tidal-wave",
      name: "Tidal Wave",
      thumbnail: "/lovable-uploads/ee1820a2-913b-461d-b3fb-92cbd844fd78.png", 
      preview: "/lovable-uploads/31083ac1-bd37-402e-93a7-56f5bedbf606.png"
    },
    { id: "charcoal", name: "Charcoal", color: "#374151" },
    { id: "beige", name: "Beige", color: "#D1C4B7" },
    { id: "brown", name: "Brown", color: "#8B4513" },
    { id: "green", name: "Forest Green", color: "#065F46" },
    { id: "navy", name: "Navy Blue", color: "#1E3A8A" },
    { id: "custom", name: "Custom Color", color: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)" }
  ];

  const updateFormData = (field: string, value: string | File[] | any[]) => {
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'exterior' | 'damage') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (type === 'exterior') {
        updateFormData('exteriorPhotos', [...formData.exteriorPhotos, ...files]);
      } else {
        updateFormData('damagePhotos', [...formData.damagePhotos, ...files]);
      }
    }
  };

  const removePhoto = (index: number, type: 'exterior' | 'damage') => {
    if (type === 'exterior') {
      const newPhotos = formData.exteriorPhotos.filter((_, i) => i !== index);
      updateFormData('exteriorPhotos', newPhotos);
    } else {
      const newPhotos = formData.damagePhotos.filter((_, i) => i !== index);
      updateFormData('damagePhotos', newPhotos);
    }
  };

  const addAdditionalSpace = () => {
    if (currentAdditionalSpace.type) {
      updateFormData('additionalSpaces', [...formData.additionalSpaces, currentAdditionalSpace]);
      setCurrentAdditionalSpace({ type: "", sqft: "", spaceType: "", otherSpaceType: "" });
      setShowAdditionalSpace(false);
    }
  };

  const calculatePrice = () => {
    let totalSqft = 0;
    
    // Main space
    if (formData.garageType === "2-car") totalSqft += 425;
    else if (formData.garageType === "3-car") totalSqft += 650;
    else if (formData.garageType === "4-car") totalSqft += 900;
    else if (formData.garageType === "custom" && formData.customSqft) totalSqft += parseInt(formData.customSqft);

    // Additional spaces
    formData.additionalSpaces.forEach(space => {
      if (space.type === "2-car") totalSqft += 425;
      else if (space.type === "3-car") totalSqft += 650;
      else if (space.type === "4-car") totalSqft += 900;
      else if (space.type === "custom" && space.sqft) totalSqft += parseInt(space.sqft);
    });

    // Base pricing: $8 per sq ft
    const basePrice = totalSqft * 8;
    return basePrice;
  };

  const handleColorSelection = (colorId: string) => {
    updateFormData('colorChoice', colorId);
  };

  const openColorPreview = (colorId: string) => {
    setSelectedColorPreview(colorId);
  };

  const closeColorPreview = () => {
    setSelectedColorPreview(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">What size is your garage?</h2>
              <p className="text-base sm:text-lg text-gray-600 px-4">Choose the option that best describes your space</p>
            </div>

            <div className="grid gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
              {[
                { id: "custom", label: "Know Exact Square Footage?", desc: "We'll ask for details next" },
                { id: "2-car", label: "2-Car Garage", desc: "Approx. 400–450 sq ft" },
                { id: "3-car", label: "3-Car Garage", desc: "Approx. 600–700 sq ft" },
                { id: "4-car", label: "4-Car Garage", desc: "Approx. 800–1,000 sq ft" }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData('garageType', option.id)}
                  className={`p-4 sm:p-6 rounded-xl border-2 text-left transition-all hover:scale-[1.02] relative ${
                    option.id === "custom" 
                      ? `bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border-2 border-transparent bg-clip-padding shadow-lg ${
                          formData.garageType === option.id 
                            ? 'before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:-z-10 before:animate-pulse shadow-2xl shadow-purple-400/30' 
                            : 'before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:-z-10 hover:shadow-xl hover:shadow-purple-400/20'
                        }`
                      : formData.garageType === option.id 
                        ? 'border-blue-600 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-blue-300'
                  }`}
                  style={option.id === "custom" ? {
                    background: formData.garageType === option.id 
                      ? 'linear-gradient(135deg, #fdf4ff, #fef7ed, #fff7ed)' 
                      : 'linear-gradient(135deg, #faf5ff, #fef2f2, #fff7ed)',
                    position: 'relative'
                  } : {}}
                >
                  {option.id === "custom" && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-20 blur-sm -z-10" />
                  )}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex-1">
                      <h3 className={`text-lg sm:text-xl font-semibold ${
                        option.id === "custom" ? 'text-purple-900' : 'text-gray-900'
                      }`}>
                        {option.label}
                      </h3>
                      <p className={`mt-1 text-sm sm:text-base ${
                        option.id === "custom" ? 'text-purple-700' : 'text-gray-600'
                      }`}>
                        {option.desc}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {formData.garageType === option.id && (
                        <Check className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 ${
                          option.id === "custom" ? 'text-purple-600' : 'text-blue-600'
                        }`} />
                      )}
                    </div>
                  </div>
                  {option.id === "custom" && (
                    <div className="absolute bottom-3 right-3">
                      <span className="text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                        MOST ACCURATE
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Additional Space Button */}
            <div className="mt-8 sm:mt-12 max-w-2xl mx-auto px-4">
              <div className="border-t-2 border-dashed border-gray-300 pt-6 sm:pt-8">
                <button
                  onClick={() => setShowAdditionalSpace(!showAdditionalSpace)}
                  className="w-full p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-all"
                >
                  <div className="flex items-center justify-center">
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-2 sm:mr-3" />
                    <span className="text-base sm:text-lg font-semibold text-purple-700">Add Additional Space</span>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-600 mt-1">Storage, workshop, or other areas</p>
                </button>
              </div>

              {showAdditionalSpace && (
                <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-purple-50 rounded-xl border border-purple-200">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Additional Space Details</h3>
                  <div className="grid gap-3 sm:gap-4">
                    {[
                      { id: "garage-floor", label: "Garage Floor" },
                      { id: "storage", label: "Extra storage" },
                      { id: "warehouse", label: "Warehouse" },
                      { id: "detached", label: "Detached garage" },
                      { id: "other", label: "Other" }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setCurrentAdditionalSpace(prev => ({ ...prev, type: option.id }))}
                        className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${
                          currentAdditionalSpace.type === option.id 
                            ? 'border-purple-600 bg-purple-100' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{option.label}</h4>
                          </div>
                          {currentAdditionalSpace.type === option.id && (
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {currentAdditionalSpace.type === "other" && (
                    <div className="mt-3 sm:mt-4">
                      <Input 
                        value={currentAdditionalSpace.otherSpaceType}
                        onChange={(e) => setCurrentAdditionalSpace(prev => ({ ...prev, otherSpaceType: e.target.value }))}
                        placeholder="Please describe your space"
                        className="h-10 sm:h-12"
                      />
                    </div>
                  )}

                  {currentAdditionalSpace.type === "custom" && (
                    <div className="mt-4 sm:mt-6 space-y-3">
                      <Input 
                        type="number"
                        value={currentAdditionalSpace.sqft}
                        onChange={(e) => setCurrentAdditionalSpace(prev => ({ ...prev, sqft: e.target.value }))}
                        placeholder="Enter square footage"
                        className="h-12"
                      />
                      <div className="grid gap-2">
                        {[
                          { id: "storage", label: "Extra storage" },
                          { id: "warehouse", label: "Warehouse" },
                          { id: "detached", label: "Detached garage" },
                          { id: "other", label: "Other" }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setCurrentAdditionalSpace(prev => ({ ...prev, spaceType: option.id }))}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              currentAdditionalSpace.spaceType === option.id 
                                ? 'border-purple-600 bg-purple-100' 
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      {currentAdditionalSpace.spaceType === "other" && (
                        <Input 
                          value={currentAdditionalSpace.otherSpaceType}
                          onChange={(e) => setCurrentAdditionalSpace(prev => ({ ...prev, otherSpaceType: e.target.value }))}
                          placeholder="Please describe your space"
                          className="h-12"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <Button onClick={addAdditionalSpace} disabled={!currentAdditionalSpace.type} className="text-sm sm:text-base">
                      Add Space
                    </Button>
                    <Button variant="outline" onClick={() => setShowAdditionalSpace(false)} className="text-sm sm:text-base">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {formData.additionalSpaces.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Added Spaces ({formData.additionalSpaces.length})</h3>
                  <div className="space-y-2">
                    {formData.additionalSpaces.map((space, index) => (
                      <div key={index} className="p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
                        <span className="text-green-800 text-sm sm:text-base">
                          {space.type === "custom" ? `Custom (${space.sqft} sq ft)` : 
                           space.type === "2-car" ? "2-Car Size" :
                           space.type === "3-car" ? "3-Car Size" : "4-Car Size"}
                        </span>
                        <button
                          onClick={() => {
                            const newSpaces = formData.additionalSpaces.filter((_, i) => i !== index);
                            updateFormData('additionalSpaces', newSpaces);
                          }}
                          className="text-red-600 hover:text-red-800 text-sm sm:text-base"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        if (formData.garageType !== "custom") {
          setCurrentStep(3);
          return null;
        }
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Tell us about your custom space</h2>
              <p className="text-base sm:text-lg text-gray-600">Help us calculate the perfect quote for you</p>
            </div>

            <div className="max-w-xl mx-auto space-y-4 sm:space-y-6 px-4">
              <div>
                <Label htmlFor="sqft" className="text-base sm:text-lg font-medium mb-2 sm:mb-3 block">What's your total square footage?</Label>
                <div className="relative">
                  <Input 
                    id="sqft"
                    type="number"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    value={formData.customSqft}
                    onChange={(e) => updateFormData('customSqft', e.target.value)}
                    placeholder="Enter square footage"
                    className="h-14 sm:h-16 text-lg sm:text-xl font-semibold text-center bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 hover:shadow-lg placeholder:text-blue-400"
                  />
                  <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-blue-500 font-medium text-base sm:text-lg">
                    sq ft
                  </div>
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <p className="text-xs sm:text-sm text-blue-600 mt-2 text-center font-medium">
                  ✨ The more accurate, the better your quote!
                </p>
              </div>

              <div>
                <Label className="text-base sm:text-lg font-medium mb-3 sm:mb-4 block">What type of space is this?</Label>
                <div className="grid gap-2 sm:gap-3">
                  {[
                    { id: "garage-floor", label: "Garage Floor" },
                    { id: "storage", label: "Extra storage" },
                    { id: "warehouse", label: "Warehouse" },
                    { id: "detached", label: "Detached garage" },
                    { id: "other", label: "Other" }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData('spaceType', option.id)}
                      className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${
                        formData.spaceType === option.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm sm:text-base">{option.label}</span>
                        {formData.spaceType === option.id && (
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
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
                    className="mt-2 sm:mt-3 h-10 sm:h-12"
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Upload Photos - Exterior View</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">This helps us understand exactly how to price your floor.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 max-w-2xl mx-auto">
                <p className="text-blue-800 font-medium text-sm sm:text-base">📸 Please take photos showing the whole space or all spaces from the exterior</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 max-w-2xl mx-auto mt-3 sm:mt-4">
                <p className="text-green-800 font-semibold text-xs sm:text-sm">💡 Upload as many pictures as you can; the more, the better!</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-4">
              {/* Example placeholder */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Example Photo:</h3>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-48 sm:h-96 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/c131885b-6fd6-4475-afeb-d13b0d895942.png" 
                    alt="Example garage exterior view"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-12 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">Drop exterior photos here or click to browse</p>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">JPG, PNG up to 10MB each</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'exterior')}
                  className="hidden"
                  id="exterior-upload"
                />
                <label htmlFor="exterior-upload">
                  <Button className="cursor-pointer text-sm sm:text-base">Choose Photos</Button>
                </label>
              </div>

              {formData.exteriorPhotos.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Uploaded Exterior Photos ({formData.exteriorPhotos.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {formData.exteriorPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={URL.createObjectURL(photo)} 
                          alt={`Exterior ${index + 1}`}
                          className="w-full h-20 sm:h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index, 'exterior')}
                          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity"
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
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Upload Photos - Damage & Concerns</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">Show any damage, cracks, or areas of concern</p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 max-w-2xl mx-auto">
                <p className="text-amber-800 font-medium text-sm sm:text-base">⚠️ Please photograph any cracks, stains, existing coatings, or problem areas</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 max-w-2xl mx-auto mt-3 sm:mt-4">
                <p className="text-green-800 font-semibold text-xs sm:text-sm">💡 Upload as many pictures as you can; the more, the better!</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-4">
              {/* Example placeholder */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Example Photo:</h3>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-48 sm:h-96 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/a05a7933-8c9e-4367-9523-6c38e3b5944c.png" 
                    alt="Example of floor crack damage"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-12 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">Drop damage photos here or click to browse</p>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">JPG, PNG up to 10MB each (Optional)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'damage')}
                  className="hidden"
                  id="damage-upload"
                />
                <label htmlFor="damage-upload">
                  <Button className="cursor-pointer text-sm sm:text-base">Choose Photos</Button>
                </label>
              </div>

              {formData.damagePhotos.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Uploaded Damage Photos ({formData.damagePhotos.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {formData.damagePhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={URL.createObjectURL(photo)} 
                          alt={`Damage ${index + 1}`}
                          className="w-full h-20 sm:h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index, 'damage')}
                          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity"
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

      case 5:
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Choose Your Look</h2>
              <p className="text-base sm:text-lg text-gray-600">Select a floor color (more options available during consultation)</p>
            </div>

            <div className="max-w-4xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {colorOptions.map((color) => (
                  <div key={color.id} className="space-y-3 sm:space-y-4">
                    <button
                      onClick={() => handleColorSelection(color.id)}
                      className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        formData.colorChoice === color.id 
                          ? 'border-blue-600 shadow-lg' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="w-full h-16 sm:h-20 rounded-lg mb-2 sm:mb-3 overflow-hidden">
                        {color.thumbnail ? (
                          <img 
                            src={color.thumbnail} 
                            alt={color.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to solid color if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-full h-full rounded-lg ${color.thumbnail ? 'hidden' : 'block'}`}
                          style={{ background: color.color }}
                        />
                      </div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{color.name}</p>
                      {formData.colorChoice === color.id && (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mt-2" />
                      )}
                    </button>

                    {/* Preview Button - only show for colors with preview images */}
                    {color.preview && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openColorPreview(color.id)}
                        className="w-full text-xs sm:text-sm"
                      >
                        See in Garage
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Preview Modal */}
            <Dialog open={selectedColorPreview !== null} onOpenChange={closeColorPreview}>
              <DialogContent className="max-w-4xl w-full mx-4">
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-xl font-semibold">
                    {selectedColorPreview && colorOptions.find(c => c.id === selectedColorPreview)?.name} in a Real Garage
                  </DialogTitle>
                </DialogHeader>
                <div className="relative">
                  {selectedColorPreview && (
                    <img 
                      src={colorOptions.find(c => c.id === selectedColorPreview)?.preview} 
                      alt={`${colorOptions.find(c => c.id === selectedColorPreview)?.name} in garage`}
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your Information</h2>
              <p className="text-base sm:text-lg text-gray-600">Almost done! We just need your contact details</p>
            </div>

            <div className="max-w-xl mx-auto space-y-4 sm:space-y-6 px-4">
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm sm:text-base font-medium">Name</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Your full name"
                    className="mt-1 sm:mt-2 h-10 sm:h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm sm:text-base font-medium">Phone Number</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-1 sm:mt-2 h-10 sm:h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm sm:text-base font-medium">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-1 sm:mt-2 h-10 sm:h-12"
                />
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-sm sm:text-base font-medium">ZIP Code</Label>
                <Input 
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  placeholder="12345"
                  className="mt-1 sm:mt-2 h-10 sm:h-12"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        const estimatedPrice = calculatePrice();
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your Instant Quote</h2>
              <p className="text-base sm:text-lg text-gray-600">Here's your estimated price based on your selections</p>
            </div>

            <div className="max-w-2xl mx-auto px-4">
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3 sm:mb-4">
                    ${estimatedPrice.toLocaleString()}
                  </div>
                  <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6">Estimated Total Investment</p>
                  
                  <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                    <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quote Summary:</h3>
                    <div className="text-left space-y-2">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Main Garage:</span>
                        <span className="font-medium">
                          {formData.garageType === "custom" ? `Custom (${formData.customSqft} sq ft)` : 
                           formData.garageType === "2-car" ? "2-Car Garage" :
                           formData.garageType === "3-car" ? "3-Car Garage" : "4-Car Garage"}
                        </span>
                      </div>
                      {formData.additionalSpaces.length > 0 && (
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>Additional Spaces:</span>
                          <span className="font-medium">{formData.additionalSpaces.length} spaces</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Color Choice:</span>
                        <span className="font-medium capitalize">{formData.colorChoice.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Photos Uploaded:</span>
                        <span className="font-medium">{formData.exteriorPhotos.length + formData.damagePhotos.length} photos</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <p className="text-green-800 font-medium text-sm sm:text-base">
                      🔥 We'll call you within 60 minutes to confirm your quote and answer any questions.
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <p className="text-yellow-800 text-sm font-medium mb-2">Important Disclaimer:</p>
                    <p className="text-yellow-700 text-xs sm:text-sm text-left">
                      This is not an exact estimate. Once our team member calls you, you will be issued an exact quote. 
                      Things that may change pricing are significance of damage, moisture issues seen on photos, 
                      existing coatings that need to be removed.
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
      case 4: return true; // Damage photos are optional
      case 5: return formData.colorChoice !== "";
      case 6: return formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.zipCode !== "";
      case 7: return true;
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
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Get Your Instant Quote</h1>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">Step {currentStep} of {totalSteps}</div>
                <div className="text-xs sm:text-sm text-gray-500">90 seconds to complete</div>
              </div>
            </div>
            
            <Progress value={(currentStep / totalSteps) * 100} className="h-2 sm:h-3" />
          </div>

          {/* Form Content */}
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg order-2 sm:order-1"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg order-1 sm:order-2"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg order-1 sm:order-2"
                  >
                    Finish & Submit
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
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
