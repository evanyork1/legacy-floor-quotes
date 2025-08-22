import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface SpaceData {
  type: 'garage' | 'patio';
  sqft: number;
  tier: string;
  price: number;
}

const PackagePresentation = () => {
  const [spaces, setSpaces] = useState<SpaceData[]>([]);
  const [color, setColor] = useState("");
  const [installDate, setInstallDate] = useState<Date>();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  // Pricing tiers
  const garagePricing = {
    platinum: 9.5,
    gold: 7,
    silver: 6
  };

  const patioPricing = {
    platinum: 10.5,
    gold: 8,
    silver: 7
  };

  const addSpace = (type: 'garage' | 'patio') => {
    setSpaces([...spaces, {
      type,
      sqft: 0,
      tier: 'platinum',
      price: type === 'garage' ? garagePricing.platinum : patioPricing.platinum
    }]);
  };

  const updateSpace = (index: number, field: keyof SpaceData, value: any) => {
    const newSpaces = [...spaces];
    newSpaces[index] = { ...newSpaces[index], [field]: value };
    
    // Recalculate price when sqft or tier changes
    if (field === 'sqft' || field === 'tier') {
      const space = newSpaces[index];
      const pricing = space.type === 'garage' ? garagePricing : patioPricing;
      newSpaces[index].price = pricing[space.tier as keyof typeof pricing] * space.sqft;
    }
    
    setSpaces(newSpaces);
  };

  const removeSpace = (index: number) => {
    setSpaces(spaces.filter((_, i) => i !== index));
  };

  const totalPrice = spaces.reduce((sum, space) => sum + space.price, 0);
  const halfDown = totalPrice / 2;
  const monthlyPayment = halfDown / 24; // 24 months 0%

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Load the template image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/legacy-template.jpg';
    
    return new Promise((resolve) => {
      img.onload = () => {
        // Add template image as background
        pdf.addImage(img, 'JPEG', 0, 0, 210, 297);
        
        // Add text overlays (adjust positions based on template)
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        
        // Customer name
        if (customerName) {
          pdf.text(customerName, 20, 40);
        }
        
        // Address
        if (address) {
          pdf.text(address, 20, 50);
        }
        
        // Install date
        if (installDate) {
          pdf.text(`Install Date: ${format(installDate, 'PP')}`, 20, 60);
        }
        
        // Color
        if (color) {
          pdf.text(`Color: ${color}`, 20, 70);
        }
        
        // Spaces breakdown
        let yPos = 90;
        spaces.forEach((space, index) => {
          pdf.text(`${space.type.toUpperCase()} - ${space.sqft} sq ft - ${space.tier.toUpperCase()} - $${space.price.toFixed(2)}`, 20, yPos);
          yPos += 10;
        });
        
        // Totals
        pdf.setFontSize(16);
        pdf.text(`Total: $${totalPrice.toFixed(2)}`, 20, yPos + 20);
        pdf.text(`50% Down: $${halfDown.toFixed(2)}`, 20, yPos + 35);
        pdf.text(`Monthly Payment: $${monthlyPayment.toFixed(2)} (24 months)`, 20, yPos + 50);
        
        // Save the PDF
        pdf.save('legacy-package-presentation.pdf');
        resolve(pdf);
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Helmet>
        <title>Package Presentation - Legacy Epoxy Floors</title>
        <meta name="description" content="Create professional package presentations for customers" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Package Presentation</h1>
            <p className="text-xl text-gray-600">Legacy Epoxy Floors</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter project address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Enter color choice"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Install Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !installDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {installDate ? format(installDate, "PPP") : "Pick install date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={installDate}
                        onSelect={setInstallDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={() => addSpace('garage')} variant="outline" size="sm">
                      Add Garage
                    </Button>
                    <Button onClick={() => addSpace('patio')} variant="outline" size="sm">
                      Add Patio
                    </Button>
                  </div>

                  {spaces.map((space, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold capitalize">{space.type}</h4>
                        <Button 
                          onClick={() => removeSpace(index)} 
                          variant="destructive" 
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Square Footage</Label>
                          <Input
                            type="number"
                            value={space.sqft || ''}
                            onChange={(e) => updateSpace(index, 'sqft', parseFloat(e.target.value) || 0)}
                            placeholder="Enter sq ft"
                          />
                        </div>
                        
                        <div>
                          <Label>Tier</Label>
                          <Select 
                            value={space.tier} 
                            onValueChange={(value) => updateSpace(index, 'tier', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="platinum">
                                Platinum - ${space.type === 'garage' ? '9.50' : '10.50'}/sq ft
                              </SelectItem>
                              <SelectItem value="gold">
                                Gold - ${space.type === 'garage' ? '7.00' : '8.00'}/sq ft
                              </SelectItem>
                              <SelectItem value="silver">
                                Silver - ${space.type === 'garage' ? '6.00' : '7.00'}/sq ft
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-right">
                        <span className="text-lg font-semibold">${space.price.toFixed(2)}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Quote Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {spaces.length === 0 ? (
                  <p className="text-gray-500">Add spaces to see pricing</p>
                ) : (
                  <>
                    <div className="space-y-2">
                      {spaces.map((space, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="capitalize">
                            {space.type} ({space.sqft} sq ft, {space.tier})
                          </span>
                          <span>${space.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <hr />
                    
                    <div className="space-y-2 text-lg font-semibold">
                      <div className="flex justify-between">
                        <span>Total Price:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>50% Down:</span>
                        <span>${halfDown.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-blue-600">
                        <span>Monthly Payment:</span>
                        <span>${monthlyPayment.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        24 months at 0% interest
                      </p>
                    </div>

                    <Button 
                      onClick={generatePDF} 
                      className="w-full mt-6"
                      disabled={spaces.length === 0}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Generate PDF Presentation
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagePresentation;