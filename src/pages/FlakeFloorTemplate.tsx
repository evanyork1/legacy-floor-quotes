import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
const FlakeFloorTemplate = () => {
  const [squareFootage, setSquareFootage] = useState("");
  const [color, setColor] = useState("");
  const [installDate, setInstallDate] = useState("");

  // Package pricing inputs
  const [platinumMonthly, setPlatinumMonthly] = useState("");
  const [platinumTotal, setPlatinumTotal] = useState("");
  const [platinumDeposit, setPlatinumDeposit] = useState("");
  const [goldMonthly, setGoldMonthly] = useState("");
  const [goldTotal, setGoldTotal] = useState("");
  const [goldDeposit, setGoldDeposit] = useState("");
  const [silverMonthly, setSilverMonthly] = useState("");
  const [silverTotal, setSilverTotal] = useState("");
  const [silverDeposit, setSilverDeposit] = useState("");
  const packages = [{
    name: "Platinum",
    popular: false,
    features: ["Fastest Installation - Installed within 4 days or sooner", "White-Glove Service - We move your belongings out and back in for you", "Professional Cleanings - 2 maintenance visits 1st year to keep the floor looking brand new", "Premium Thickness Polyurea Floor System - Our flagship, lifetime-warrantied coating", "Full Color & Flake Selection - Choose from our entire design catalog", "Lifetime Warranty"],
    monthly: platinumMonthly,
    setMonthly: setPlatinumMonthly,
    total: platinumTotal,
    setTotal: setPlatinumTotal,
    deposit: platinumDeposit,
    setDeposit: setPlatinumDeposit
  }, {
    name: "Gold",
    popular: true,
    features: ["Premium Thickness Polyurea Floor System - Our flagship, lifetime-warrantied coating", "Full Color & Flake Selection - Choose from our entire design catalog", "Lifetime Warranty"],
    monthly: goldMonthly,
    setMonthly: setGoldMonthly,
    total: goldTotal,
    setTotal: setGoldTotal,
    deposit: goldDeposit,
    setDeposit: setGoldDeposit
  }, {
    name: "Silver",
    popular: false,
    features: ["Quality Floor at Entry-Level Price - Professional polyurea coating that outperforms DIY kits", "Basic Color Selection", "15 Year Warranty"],
    monthly: silverMonthly,
    setMonthly: setSilverMonthly,
    total: silverTotal,
    setTotal: setSilverTotal,
    deposit: silverDeposit,
    setDeposit: setSilverDeposit
  }];
  return <>
      <Helmet>
        <title>Flake Floor Template - Legacy Industrial Coatings</title>
      </Helmet>
      
      <div className="min-h-screen bg-white print:min-h-0">
        {/* Header with Logo */}
        <div className="bg-white border-b-2 border-navy-900 print:border-b print:border-gray-400">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-center">
              <img src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" alt="Legacy Industrial Coatings" className="h-20 w-auto" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 print:py-4">
          {/* Project Details Input Section */}
          <div className="mb-8 print:mb-6">
            <h1 className="text-3xl font-bold text-navy-900 text-center mb-6 print:text-2xl print:mb-4">Flake Floor Packages</h1>
            
            <div className="flex justify-center gap-8 mb-12 print:gap-6 print:mb-10">
              <div className="space-y-2">
                <Label htmlFor="squareFootage" className="text-navy-900 font-semibold text-center block">
                  Square Footage
                </Label>
                <Input id="squareFootage" value={squareFootage} onChange={e => setSquareFootage(e.target.value)} className="border-navy-200 focus:border-navy-500 print:border-gray-400 w-32 h-12 text-center" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color" className="text-navy-900 font-semibold text-center block">
                  Color
                </Label>
                <Input id="color" value={color} onChange={e => setColor(e.target.value)} className="border-navy-200 focus:border-navy-500 print:border-gray-400 w-32 h-12 text-center" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="installDate" className="text-navy-900 font-semibold text-center block">
                  Install Day
                </Label>
                <Input id="installDate" type="date" value={installDate} onChange={e => setInstallDate(e.target.value)} className="border-navy-200 focus:border-navy-500 print:border-gray-400 w-32 h-12 text-center" placeholder="" />
              </div>
            </div>
          </div>

          {/* Pricing Packages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:gap-4">
            {packages.map(pkg => <Card key={pkg.name} className={`relative border-2 print:border ${pkg.popular ? 'border-navy-500 ring-2 ring-navy-200 shadow-xl scale-105 print:scale-100' : 'border-navy-200'} print:shadow-none print:ring-0`}>
                {pkg.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 print:-top-2">
                    <Badge className="bg-navy-600 text-white px-4 py-1 text-sm font-semibold print:bg-gray-800">
                      MOST POPULAR
                    </Badge>
                  </div>}
                
                 <CardHeader className="text-center pb-4 print:pb-2">
                   <CardTitle className={`text-2xl font-bold print:text-xl ${pkg.popular ? 'text-navy-600 font-extrabold text-3xl print:text-2xl' : 'text-navy-900'}`}>
                     {pkg.name}
                   </CardTitle>
                 </CardHeader>
                
                <CardContent className="space-y-6 print:space-y-4">
                  {/* Features */}
                  <div className="space-y-3 print:space-y-2">
                    <h4 className="font-semibold text-navy-900 border-b border-navy-200 pb-2 print:border-gray-300">
                      Included Features
                    </h4>
                     <ul className="space-y-2 print:space-y-1">
                       {pkg.features.map((feature, index) => <li key={index} className="flex items-start gap-2 text-sm">
                           <Check className="h-4 w-4 text-navy-600 mt-0.5 flex-shrink-0 print:text-gray-700" />
                           <span className={`text-gray-700 ${pkg.popular ? 'font-bold' : ''}`}>{feature}</span>
                         </li>)}
                     </ul>
                  </div>

                  {/* Pricing Inputs */}
                  <div className="space-y-4 border-t pt-4 print:space-y-3 print:pt-3 print:border-gray-300">
                    <h4 className="font-semibold text-navy-900">Pricing</h4>
                    
                     <div className="space-y-3 print:space-y-2">
                       <div>
                         <Label className="text-sm text-navy-700 font-medium">Monthly Payment</Label>
                         <Input value={pkg.monthly} onChange={e => pkg.setMonthly(e.target.value)} className="mt-1 border-navy-200 focus:border-navy-500 text-lg font-semibold print:border-gray-400 print:text-base h-12" />
                       </div>
                       
                       <div>
                         <Label className="text-sm text-navy-700 font-medium">Total Investment</Label>
                         <Input value={pkg.total} onChange={e => pkg.setTotal(e.target.value)} className="mt-1 border-navy-200 focus:border-navy-500 text-lg font-semibold print:border-gray-400 print:text-base h-12" />
                       </div>
                       
                       <div>
                         <Label className="text-sm text-navy-700 font-medium">50% Deposit</Label>
                         <Input value={pkg.deposit} onChange={e => pkg.setDeposit(e.target.value)} className="mt-1 border-navy-200 focus:border-navy-500 text-lg font-semibold print:border-gray-400 print:text-base h-12" />
                       </div>
                     </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600 print:mt-6">
            <p>All prices include materials, labor, and warranty. Contact us for custom solutions.</p>
            <p className="mt-2 font-semibold text-navy-900">Legacy Industrial Coatings - Professional Floor Solutions</p>
          </div>
        </div>
      </div>
    </>;
};
export default FlakeFloorTemplate;