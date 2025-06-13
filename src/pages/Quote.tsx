
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Home, Ruler, Palette, Calendar, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Quote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Property Info
    propertyType: "",
    squareFootage: "",
    currentFloor: "",
    // Location
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Coating Preferences
    coatingType: "",
    colorPreference: "",
    texturePreference: "",
    // Project Timeline
    timeline: "",
    // Contact Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const totalSteps = 5;

  const updateFormData = (field: string, value: string) => {
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Your Space</h2>
              <p className="text-gray-600">Let's start with some basic information about your project</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="propertyType" className="text-base font-medium">Property Type</Label>
                <Select value={formData.propertyType} onValueChange={(value) => updateFormData('propertyType', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Home</SelectItem>
                    <SelectItem value="commercial">Commercial Building</SelectItem>
                    <SelectItem value="industrial">Industrial Facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currentFloor" className="text-base font-medium">Current Floor Type</Label>
                <Select value={formData.currentFloor} onValueChange={(value) => updateFormData('currentFloor', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="What's your current floor?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concrete">Concrete</SelectItem>
                    <SelectItem value="epoxy">Existing Epoxy</SelectItem>
                    <SelectItem value="tile">Tile</SelectItem>
                    <SelectItem value="wood">Wood</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="squareFootage" className="text-base font-medium">Approximate Square Footage</Label>
              <Select value={formData.squareFootage} onValueChange={(value) => updateFormData('squareFootage', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select square footage range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-400">Under 400 sq ft</SelectItem>
                  <SelectItem value="400-600">400-600 sq ft</SelectItem>
                  <SelectItem value="600-800">600-800 sq ft</SelectItem>
                  <SelectItem value="800-1000">800-1,000 sq ft</SelectItem>
                  <SelectItem value="1000-1500">1,000-1,500 sq ft</SelectItem>
                  <SelectItem value="over-1500">Over 1,500 sq ft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Location</h2>
              <p className="text-gray-600">Where should we schedule your installation?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-base font-medium">Street Address</Label>
                <Input 
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="Enter your street address"
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-base font-medium">City</Label>
                  <Input 
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    placeholder="City"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="state" className="text-base font-medium">State</Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="NV">Nevada</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="zipCode" className="text-base font-medium">ZIP Code</Label>
                  <Input 
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                    placeholder="ZIP"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Palette className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coating Preferences</h2>
              <p className="text-gray-600">Choose your ideal coating style and finish</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="coatingType" className="text-base font-medium">Coating Type</Label>
                <Select value={formData.coatingType} onValueChange={(value) => updateFormData('coatingType', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select coating type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="polyurea">Polyurea (Premium)</SelectItem>
                    <SelectItem value="epoxy">Epoxy</SelectItem>
                    <SelectItem value="polyaspartic">Polyaspartic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="colorPreference" className="text-base font-medium">Color Preference</Label>
                <Select value={formData.colorPreference} onValueChange={(value) => updateFormData('colorPreference', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select color preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gray">Gray Tones</SelectItem>
                    <SelectItem value="beige">Beige/Tan</SelectItem>
                    <SelectItem value="blue">Blue Tones</SelectItem>
                    <SelectItem value="custom">Custom Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="texturePreference" className="text-base font-medium">Texture Preference</Label>
                <Select value={formData.texturePreference} onValueChange={(value) => updateFormData('texturePreference', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select texture preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smooth">Smooth Finish</SelectItem>
                    <SelectItem value="textured">Textured/Non-Slip</SelectItem>
                    <SelectItem value="decorative">Decorative Flakes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Timeline</h2>
              <p className="text-gray-600">When would you like to start your project?</p>
            </div>

            <div>
              <Label htmlFor="timeline" className="text-base font-medium">Preferred Timeline</Label>
              <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your preferred timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">As soon as possible</SelectItem>
                  <SelectItem value="1-2weeks">Within 1-2 weeks</SelectItem>
                  <SelectItem value="1month">Within 1 month</SelectItem>
                  <SelectItem value="2-3months">2-3 months</SelectItem>
                  <SelectItem value="flexible">I'm flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-600">We're almost done! Just need your contact details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-base font-medium">First Name</Label>
                <Input 
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="First name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="text-base font-medium">Last Name</Label>
                <Input 
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Last name"
                  className="mt-2"
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
                className="mt-2"
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
                className="mt-2"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Get Your Instant Quote</h1>
              <span className="text-sm font-medium text-gray-500">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center"
                    onClick={() => {
                      console.log('Form submitted:', formData);
                      // Handle form submission here
                    }}
                  >
                    Get My Quote
                    <ArrowRight className="h-4 w-4 ml-2" />
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
