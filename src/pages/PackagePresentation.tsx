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
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

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
    try {
      if (!Array.isArray(spaces) || spaces.length === 0) {
        alert('Please add at least one space before generating PDF.');
        return;
      }

      // Fetch the template image
      const templateResponse = await fetch('/legacy-template.png');
      const templateArrayBuffer = await templateResponse.arrayBuffer();
      
      // Create new PDF document
      const pdfDoc = await PDFDocument.create();
      
      // Embed the template image
      const templateImage = await pdfDoc.embedPng(templateArrayBuffer);
      
      // Add a page with the template dimensions
      const page = pdfDoc.addPage([templateImage.width, templateImage.height]);
      
      // Draw the template image as background
      page.drawImage(templateImage, {
        x: 0,
        y: 0,
        width: templateImage.width,
        height: templateImage.height,
      });
      
      // Embed font for white text
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      // Calculate total square footage
      const totalSqft = spaces.reduce((sum, space) => sum + space.sqft, 0);
      
      // Write white text on the PDF
      const textSize = 28;
      const whiteColor = rgb(1, 1, 1);
      const orangeColor = rgb(1, 0.6, 0.2);
      
      // Square Footage (top left field)
      page.drawText(`${totalSqft}`, {
        x: 175,
        y: templateImage.height - 310,
        size: textSize,
        font,
        color: whiteColor,
      });
      
      // Color (top middle field)
      if (color) {
        page.drawText(color, {
          x: 460,
          y: templateImage.height - 310,
          size: textSize,
          font,
          color: whiteColor,
        });
      }
      
      // Install Day (top right field)
      if (installDate) {
        page.drawText(format(installDate, 'MMM dd'), {
          x: 760,
          y: templateImage.height - 310,
          size: textSize,
          font,
          color: whiteColor,
        });
      }
      
      // Calculate pricing for each tier
      const platinumTotal = spaces.reduce((sum, space) => {
        const pricing = space.type === 'garage' ? garagePricing.platinum : patioPricing.platinum;
        return sum + (space.sqft * pricing);
      }, 0);
      
      const goldTotal = spaces.reduce((sum, space) => {
        const pricing = space.type === 'garage' ? garagePricing.gold : patioPricing.gold;
        return sum + (space.sqft * pricing);
      }, 0);
      
      const silverTotal = spaces.reduce((sum, space) => {
        const pricing = space.type === 'garage' ? garagePricing.silver : patioPricing.silver;
        return sum + (space.sqft * pricing);
      }, 0);
      
      // Platinum pricing
      const platinumMonthly = (platinumTotal * 0.5) / 24; // 50% down, remaining over 24 months
      const platinumDeposit = platinumTotal * 0.5;
      
      page.drawText(`$${platinumMonthly.toFixed(0)}`, {
        x: 500,
        y: templateImage.height - 435,
        size: textSize,
        font,
        color: orangeColor,
      });
      
      page.drawText(`$${platinumDeposit.toFixed(0)}`, {
        x: 680,
        y: templateImage.height - 435,
        size: textSize,
        font,
        color: orangeColor,
      });
      
      // Gold pricing
      const goldMonthly = (goldTotal * 0.5) / 24;
      const goldDeposit = goldTotal * 0.5;
      
      page.drawText(`$${goldMonthly.toFixed(0)}`, {
        x: 500,
        y: templateImage.height - 740,
        size: textSize,
        font,
        color: orangeColor,
      });
      
      page.drawText(`$${goldDeposit.toFixed(0)}`, {
        x: 680,
        y: templateImage.height - 740,
        size: textSize,
        font,
        color: orangeColor,
      });
      
      // Silver pricing
      const silverMonthly = (silverTotal * 0.5) / 24;
      const silverDeposit = silverTotal * 0.5;
      
      page.drawText(`$${silverMonthly.toFixed(0)}`, {
        x: 500,
        y: templateImage.height - 1045,
        size: textSize,
        font,
        color: orangeColor,
      });
      
      page.drawText(`$${silverDeposit.toFixed(0)}`, {
        x: 680,
        y: templateImage.height - 1045,
        size: textSize,
        font,
        color: orangeColor,
      });
      
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Download the PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = 'legacy-package-presentation.pdf';
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
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