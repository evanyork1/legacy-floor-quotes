import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Car, 
  Ruler, 
  Layers, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

interface Option {
  id: string;
  name: string;
  description: string;
  sqft: number;
}

interface QuoteData {
  garageType: string;
  customSqft?: number;
  additionalSpace?: string;
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  terms: boolean;
}

const Quote = () => {
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState<QuoteData>({
    garageType: '',
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    terms: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setQuoteData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!quoteData.name) newErrors.name = 'Name is required';
    if (!quoteData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!quoteData.phone) newErrors.phone = 'Phone is required';
    if (!quoteData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!quoteData.garageType) newErrors.garageType = 'Please select a garage type';
    if (quoteData.garageType === 'custom' && (!quoteData.customSqft || quoteData.customSqft <= 0)) {
      newErrors.customSqft = 'Square footage must be a positive number';
    }
    if (!quoteData.terms) newErrors.terms = 'You must accept the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted with data:', quoteData);
      // After successful submission, navigate to a confirmation page or reset the form
      navigate('/adminpanel2025');
    } else {
      console.log('Form has errors');
    }
  };

  const garageOptions = [
    { 
      id: '1-car', 
      name: '1-Car Garage', 
      description: '425 sq ft', 
      sqft: 425,
      icon: Car 
    },
    { 
      id: '2-car', 
      name: '2-Car Garage', 
      description: '650 sq ft', 
      sqft: 650,
      icon: Car 
    },
    { 
      id: '3-car', 
      name: '3-Car Garage', 
      description: '900 sq ft', 
      sqft: 900,
      icon: Car 
    },
    { 
      id: 'custom', 
      name: 'Custom Size', 
      description: 'Enter your dimensions', 
      sqft: 0,
      icon: Ruler 
    }
  ];

  const additionalSpaceOptions = [
    { 
      id: 'workshop', 
      name: 'Workshop Area', 
      description: '425 sq ft', 
      sqft: 425 
    },
    { 
      id: 'storage', 
      name: 'Storage Room', 
      description: '650 sq ft', 
      sqft: 650 
    },
    { 
      id: 'basement', 
      name: 'Basement', 
      description: '900 sq ft', 
      sqft: 900 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Get a Free Quote</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Garage Type Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="garageType" className="text-gray-600 font-medium">
                      Garage Type
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      {garageOptions.map((option) => (
                        <Card
                          key={option.id}
                          className={`cursor-pointer hover:shadow-md transition-shadow duration-300 ${quoteData.garageType === option.id ? 'border-2 border-blue-500' : ''}`}
                          onClick={() => handleChange({ target: { name: 'garageType', value: option.id, type: 'text' } } as any)}
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{option.name}</CardTitle>
                            {option.icon && <option.icon className="h-6 w-6 text-gray-500" />}
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-xs text-gray-500">
                              {option.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {errors.garageType && <p className="text-red-500 text-sm">{errors.garageType}</p>}
                  </div>

                  {/* Custom Square Footage Input */}
                  {quoteData.garageType === 'custom' && (
                    <div className="space-y-2">
                      <Label htmlFor="customSqft" className="text-gray-600 font-medium">
                        Custom Square Footage
                      </Label>
                      <Input
                        type="number"
                        id="customSqft"
                        name="customSqft"
                        value={quoteData.customSqft || ''}
                        onChange={handleChange}
                        placeholder="Enter square footage"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.customSqft && <p className="text-red-500 text-sm">{errors.customSqft}</p>}
                    </div>
                  )}

                  {/* Additional Space Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="additionalSpace" className="text-gray-600 font-medium">
                      Additional Space (Optional)
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      {additionalSpaceOptions.map((option) => (
                        <Card
                          key={option.id}
                          className={`cursor-pointer hover:shadow-md transition-shadow duration-300 ${quoteData.additionalSpace === option.id ? 'border-2 border-blue-500' : ''}`}
                          onClick={() => handleChange({ target: { name: 'additionalSpace', value: option.id, type: 'text' } } as any)}
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{option.name}</CardTitle>
                            <Layers className="h-6 w-6 text-gray-500" />
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-xs text-gray-500">
                              {option.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-600 font-medium flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-gray-500" />
                        Name
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={quoteData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-600 font-medium flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-gray-500" />
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={quoteData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-600 font-medium flex items-center">
                        <Phone className="mr-2 h-5 w-5 text-gray-500" />
                        Phone
                      </Label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={quoteData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone Number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-gray-600 font-medium flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                        ZIP Code
                      </Label>
                      <Input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={quoteData.zipCode}
                        onChange={handleChange}
                        placeholder="Your ZIP Code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Checkbox
                        id="terms"
                        name="terms"
                        checked={quoteData.terms}
                        onCheckedChange={(checked) => handleChange({ target: { name: 'terms', type: 'checkbox', checked } } as any)}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label htmlFor="terms" className="font-medium text-gray-700">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                      </Label>
                      {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Get Your Free Quote
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
