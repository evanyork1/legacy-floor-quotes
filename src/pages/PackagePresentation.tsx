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
      sqft: 0
    }]);
  };

  const updateSpace = (index: number, field: keyof SpaceData, value: any) => {
    const newSpaces = [...spaces];
    newSpaces[index] = { ...newSpaces[index], [field]: value };
    setSpaces(newSpaces);
  };

  const removeSpace = (index: number) => {
    setSpaces(spaces.filter((_, i) => i !== index));
  };

  // Calculate totals for all three tiers
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

  const generatePDF = async () => {
    console.log('PDF generation started');
    try {
      if (!Array.isArray(spaces) || spaces.length === 0) {
        alert('Please add at least one space before generating PDF.');
        return;
      }
      console.log('Spaces validation passed:', spaces);

      // Fetch the template image
      console.log('Fetching template image...');
      const templateResponse = await fetch('/lovable-uploads/a19b162b-be7c-491b-af12-48d5df7bcb23.png');
      if (!templateResponse.ok) {
        console.error('Template response not ok:', templateResponse.status, templateResponse.statusText);
        alert('Template image not found. Please contact support.');
        return;
      }
      console.log('Template image fetched successfully');
      const templateArrayBuffer = await templateResponse.arrayBuffer();
      console.log('Template array buffer created, size:', templateArrayBuffer.byteLength);
      
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
      
      // Template positioning system based on percentage anchors
      const w = templateImage.width;
      const h = templateImage.height;
      
      // Define text positioning anchors (percentage-based for responsiveness)
      const anchors = {
        // Top info boxes (centered in each box, moved left and up)
        sqftBox: { x: w * 0.21, y: h * 0.75 }, // Top left box center
        colorBox: { x: w * 0.50, y: h * 0.75 }, // Top middle box center  
        dateBox: { x: w * 0.79, y: h * 0.75 }, // Top right box center
        
        // Pricing positions (moved further down and left with larger font)
        platinum: {
          monthly: { x: w * 0.52, y: h * 0.66 }, // After "MO/" in platinum section (moved further down and left)
          deposit: { x: w * 0.73, y: h * 0.66 }  // After "DEPOSIT/" in platinum section (moved further down and left)
        },
        gold: {
          monthly: { x: w * 0.52, y: h * 0.415 }, // After "MO/" in gold section (moved further down and left)
          deposit: { x: w * 0.73, y: h * 0.415 }  // After "DEPOSIT/" in gold section (moved further down and left)
        },
        silver: {
          monthly: { x: w * 0.52, y: h * 0.165 }, // After "MO/" in silver section (moved further down and left)
          deposit: { x: w * 0.73, y: h * 0.165 }  // After "DEPOSIT/" in silver section (moved further down and left)
        }
      };

      // Helper function to center text horizontally
      const getCenteredTextX = (text: string, fontSize: number, anchorX: number) => {
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        return anchorX - (textWidth / 2);
      };

      // Write white text on the PDF using proper positioning
      const topBoxFontSize = 42; // Much larger font for top boxes
      const pricingFontSize = 28; // Larger font for pricing
      const whiteColor = rgb(1, 1, 1);
      
      // Square Footage (centered in top left box)
      const sqftText = `${totalSqft}`;
      page.drawText(sqftText, {
        x: getCenteredTextX(sqftText, topBoxFontSize, anchors.sqftBox.x),
        y: anchors.sqftBox.y,
        size: topBoxFontSize,
        font,
        color: whiteColor,
      });
      
      // Color (centered in top middle box)
      if (color) {
        page.drawText(color, {
          x: getCenteredTextX(color, topBoxFontSize, anchors.colorBox.x),
          y: anchors.colorBox.y,
          size: topBoxFontSize,
          font,
          color: whiteColor,
        });
      }
      
      // Install Day (centered in top right box)
      if (installDate) {
        const dateText = format(installDate, 'MMM dd');
        page.drawText(dateText, {
          x: getCenteredTextX(dateText, topBoxFontSize, anchors.dateBox.x),
          y: anchors.dateBox.y,
          size: topBoxFontSize,
          font,
          color: whiteColor,
        });
      }
      
      // Platinum pricing
      const platinumMonthly = platinumTotal / 24;
      const platinumDeposit = platinumTotal * 0.5;
      
      page.drawText(`$${platinumMonthly.toFixed(0)}`, {
        x: anchors.platinum.monthly.x,
        y: anchors.platinum.monthly.y,
        size: pricingFontSize,
        font,
        color: whiteColor,
      });
      
      page.drawText(`$${platinumDeposit.toFixed(0)}`, {
        x: anchors.platinum.deposit.x,
        y: anchors.platinum.deposit.y,
        size: pricingFontSize,
        font,
        color: whiteColor,
      });
      
      // Gold pricing
      const goldMonthly = goldTotal / 24;
      const goldDeposit = goldTotal * 0.5;
      
      page.drawText(`$${goldMonthly.toFixed(0)}`, {
        x: anchors.gold.monthly.x,
        y: anchors.gold.monthly.y,
        size: pricingFontSize,
        font,
        color: whiteColor,
      });
      
      page.drawText(`$${goldDeposit.toFixed(0)}`, {
        x: anchors.gold.deposit.x,
        y: anchors.gold.deposit.y,
        size: pricingFontSize,
        font,
        color: whiteColor,
      });
      
      // Silver pricing
      const silverMonthly = silverTotal / 24;
      const silverDeposit = silverTotal * 0.5;
      
      page.drawText(`$${silverMonthly.toFixed(0)}`, {
        x: anchors.silver.monthly.x,
        y: anchors.silver.monthly.y,
        size: pricingFontSize,
        font,
        color: whiteColor,
      });
      
      page.drawText(`$${silverDeposit.toFixed(0)}`, {
        x: anchors.silver.deposit.x,
        y: anchors.silver.deposit.y,
        size: pricingFontSize,
        font,
        color: whiteColor,
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Package Presentation</h1>
            <p className="text-lg sm:text-xl text-gray-600">Legacy Epoxy Floors</p>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={() => addSpace('garage')} 
                      variant="outline" 
                      size="default"
                      className="w-full sm:w-auto"
                    >
                      Add Garage
                    </Button>
                    <Button 
                      onClick={() => addSpace('patio')} 
                      variant="outline" 
                      size="default"
                      className="w-full sm:w-auto"
                    >
                      Add Patio
                    </Button>
                  </div>

                  {spaces.map((space, index) => (
                    <Card key={index} className="p-3 sm:p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold capitalize text-base sm:text-lg">{space.type}</h4>
                        <Button 
                          onClick={() => removeSpace(index)} 
                          variant="destructive" 
                          size="sm"
                          className="min-h-[36px] px-3"
                        >
                          Remove
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label className="text-sm font-medium">Square Footage</Label>
                          <Input
                            type="number"
                            value={space.sqft || ''}
                            onChange={(e) => updateSpace(index, 'sqft', parseFloat(e.target.value) || 0)}
                            placeholder="Enter sq ft"
                            className="mt-1 h-10"
                            inputMode="numeric"
                          />
                        </div>
                        
                        <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                          <div className="font-medium text-purple-600">Platinum: ${space.type === 'garage' ? '9.50' : '10.50'}/sq ft</div>
                          <div className="font-medium text-yellow-600">Gold: ${space.type === 'garage' ? '7.00' : '8.00'}/sq ft</div>
                          <div className="font-medium text-gray-600">Silver: ${space.type === 'garage' ? '6.00' : '7.00'}/sq ft</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Quote Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {spaces.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Add spaces to see pricing</p>
                ) : (
                  <>
                    <div className="space-y-2">
                      {spaces.map((space, index) => (
                        <div key={index} className="flex justify-between text-sm sm:text-base">
                          <span className="capitalize">
                            {space.type} ({space.sqft} sq ft)
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <hr />
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-600 text-base sm:text-lg mb-2">PLATINUM</h4>
                        <div className="grid grid-cols-1 gap-1 text-sm sm:text-base">
                          <div className="flex justify-between">
                            <span>Total:</span>
                            <span className="font-medium">${platinumTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly:</span>
                            <span className="font-medium">${(platinumTotal / 24).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Deposit:</span>
                            <span className="font-medium">${(platinumTotal * 0.5).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-600 text-base sm:text-lg mb-2">GOLD</h4>
                        <div className="grid grid-cols-1 gap-1 text-sm sm:text-base">
                          <div className="flex justify-between">
                            <span>Total:</span>
                            <span className="font-medium">${goldTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly:</span>
                            <span className="font-medium">${(goldTotal / 24).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Deposit:</span>
                            <span className="font-medium">${(goldTotal * 0.5).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-600 text-base sm:text-lg mb-2">SILVER</h4>
                        <div className="grid grid-cols-1 gap-1 text-sm sm:text-base">
                          <div className="flex justify-between">
                            <span>Total:</span>
                            <span className="font-medium">${silverTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly:</span>
                            <span className="font-medium">${(silverTotal / 24).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Deposit:</span>
                            <span className="font-medium">${(silverTotal * 0.5).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-gray-600 text-center mt-3">
                        24 months at 0% interest
                      </p>
                    </div>

                    <Button 
                      onClick={generatePDF} 
                      className="w-full mt-6 h-12 text-base font-medium"
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