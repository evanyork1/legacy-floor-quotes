import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles } from "lucide-react";

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
    icon: <Sparkles className="h-6 w-6" />,
    gradient: "from-gray-500 to-gray-700",
    features: [
      "Fastest Installation - Installed within 4 days or sooner",
      "White-Glove Service - We move your belongings out and back in for you",
      "Professional Cleanings - 2 maintenance visits 1st year to keep the floor looking brand new",
      "Premium Thickness Polyurea Floor System - Our flagship, lifetime-warrantied coating",
      "Full Color & Flake Selection - Choose from our entire design catalog",
      "Lifetime Warranty"
    ],
    monthly: platinumMonthly,
    setMonthly: setPlatinumMonthly,
    total: platinumTotal,
    setTotal: setPlatinumTotal,
    deposit: platinumDeposit,
    setDeposit: setPlatinumDeposit
  }, {
    name: "Gold",
    popular: true,
    icon: <Star className="h-6 w-6" />,
    gradient: "from-amber-400 to-amber-600",
    features: [
      "Premium Thickness Polyurea Floor System - Our flagship, lifetime-warrantied coating",
      "Full Color & Flake Selection - Choose from our entire design catalog",
      "Lifetime Warranty"
    ],
    monthly: goldMonthly,
    setMonthly: setGoldMonthly,
    total: goldTotal,
    setTotal: setGoldTotal,
    deposit: goldDeposit,
    setDeposit: setGoldDeposit
  }, {
    name: "Silver",
    popular: false,
    icon: <Star className="h-6 w-6" />,
    gradient: "from-slate-400 to-slate-600",
    features: [
      "Quality Floor at Entry-Level Price - Professional polyurea coating that outperforms DIY kits",
      "Basic Color Selection",
      "15 Year Warranty"
    ],
    monthly: silverMonthly,
    setMonthly: setSilverMonthly,
    total: silverTotal,
    setTotal: setSilverTotal,
    deposit: silverDeposit,
    setDeposit: setSilverDeposit
  }];
  
  return (
    <>
      <Helmet>
        <title>Flake Floor Template - Legacy Industrial Coatings</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 print:bg-white print:min-h-0 font-inter">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b border-slate-200 print:border-b print:border-gray-400 print:shadow-none">
          <div className="max-w-7xl mx-auto px-6 py-8 print:py-6">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" 
                alt="Legacy Industrial Coatings" 
                className="h-24 w-auto print:h-20" 
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 print:py-8">
          {/* Project Details Input Section */}
          <div className="mb-24 print:mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-navy-900 to-blue-800 bg-clip-text text-transparent text-center mb-4 print:text-4xl print:text-navy-900">
              Flake Floor Packages
            </h1>
            <p className="text-lg text-slate-600 text-center mb-12 print:mb-10 font-medium">
              Transform your space with our premium coating solutions
            </p>
            
            <div className="flex justify-center gap-12 print:gap-10 mb-12">
              <div className="space-y-3">
                <Label htmlFor="squareFootage" className="text-navy-900 font-semibold text-center block text-sm uppercase tracking-wide">
                  Square Footage
                </Label>
                <Input 
                  id="squareFootage" 
                  value={squareFootage} 
                  onChange={e => setSquareFootage(e.target.value)} 
                  className="w-32 h-14 text-center text-lg font-medium border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 print:border-gray-400 print:focus:ring-0 shadow-sm bg-white" 
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="color" className="text-navy-900 font-semibold text-center block text-sm uppercase tracking-wide">
                  Color
                </Label>
                <Input 
                  id="color" 
                  value={color} 
                  onChange={e => setColor(e.target.value)} 
                  className="w-32 h-14 text-center text-lg font-medium border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 print:border-gray-400 print:focus:ring-0 shadow-sm bg-white" 
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="installDate" className="text-navy-900 font-semibold text-center block text-sm uppercase tracking-wide">
                  Install Day
                </Label>
                <Input 
                  id="installDate" 
                  type="date" 
                  value={installDate} 
                  onChange={e => setInstallDate(e.target.value)} 
                  className="w-36 h-14 text-center text-lg font-medium border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 print:border-gray-400 print:focus:ring-0 shadow-sm bg-white [&::-webkit-calendar-picker-indicator]:opacity-0" 
                />
              </div>
            </div>
          </div>

          {/* Pricing Packages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:gap-6">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.name} 
                className={`relative border-0 overflow-hidden transition-all duration-300 ${
                  pkg.popular 
                    ? 'ring-2 ring-blue-500 shadow-2xl scale-105 print:scale-100 bg-white' 
                    : 'shadow-xl hover:shadow-2xl bg-white/80 backdrop-blur-sm'
                } print:shadow-md print:ring-1 print:ring-gray-300`}
              >
                {pkg.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 print:-top-3">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 text-sm font-bold shadow-lg border-0 print:bg-blue-600">
                      ⭐ MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6 print:pb-4 bg-gradient-to-br from-slate-50 to-white print:bg-white">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${pkg.gradient} flex items-center justify-center text-white mb-4 shadow-lg print:w-12 print:h-12`}>
                    {pkg.icon}
                  </div>
                  <CardTitle className={`text-3xl font-bold print:text-2xl ${
                    pkg.popular ? 'text-blue-600 font-extrabold text-4xl print:text-3xl' : 'text-navy-900'
                  }`}>
                    {pkg.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-8 print:space-y-6 p-6 print:p-4">
                  {/* Features */}
                  <div className="space-y-4 print:space-y-3">
                    <h4 className="font-bold text-navy-900 text-lg border-b-2 border-slate-200 pb-3 print:border-gray-300 print:text-base uppercase tracking-wide">
                      Included Features
                    </h4>
                    <ul className="space-y-3 print:space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-sm print:text-xs">
                          <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 print:h-4 print:w-4 ${
                            pkg.popular ? 'text-blue-600' : 'text-green-600'
                          } print:text-gray-700`} />
                          <span className={`text-slate-700 leading-relaxed ${pkg.popular ? 'font-semibold' : 'font-medium'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Inputs */}
                  <div className="space-y-5 border-t-2 pt-6 print:space-y-4 print:pt-4 print:border-gray-300 bg-gradient-to-br from-slate-50 to-white print:bg-white rounded-lg p-4 print:p-3">
                    <h4 className="font-bold text-navy-900 text-lg print:text-base uppercase tracking-wide text-center">Investment Details</h4>
                    
                    <div className="space-y-4 print:space-y-3 flex flex-col items-center">
                      <div className="text-center">
                        <Label className="text-sm text-slate-700 font-semibold mb-2 block uppercase tracking-wide">Monthly Payment</Label>
                        <Input 
                          value={pkg.monthly} 
                          onChange={e => pkg.setMonthly(e.target.value)} 
                          className="w-32 h-12 mx-auto text-center text-base font-bold border-2 border-slate-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 print:border-gray-400 print:focus:ring-0 print:text-sm shadow-sm" 
                        />
                      </div>
                      
                      <div className="text-center">
                        <Label className="text-sm text-slate-700 font-semibold mb-2 block uppercase tracking-wide">Total Investment</Label>
                        <Input 
                          value={pkg.total} 
                          onChange={e => pkg.setTotal(e.target.value)} 
                          className="w-32 h-12 mx-auto text-center text-base font-bold border-2 border-slate-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 print:border-gray-400 print:focus:ring-0 print:text-sm shadow-sm" 
                        />
                      </div>
                      
                      <div className="text-center">
                        <Label className="text-sm text-slate-700 font-semibold mb-2 block uppercase tracking-wide">50% Deposit</Label>
                        <Input 
                          value={pkg.deposit} 
                          onChange={e => pkg.setDeposit(e.target.value)} 
                          className="w-32 h-12 mx-auto text-center text-base font-bold border-2 border-slate-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 print:border-gray-400 print:focus:ring-0 print:text-sm shadow-sm" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center print:mt-12 bg-white rounded-2xl shadow-lg p-8 print:p-6 print:shadow-none print:rounded-none border border-slate-200 print:border-gray-300">
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg text-slate-700 font-medium print:text-base">
                All prices include materials, labor, and warranty. Contact us for custom solutions.
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                <p className="text-2xl font-bold bg-gradient-to-r from-navy-900 to-blue-800 bg-clip-text text-transparent print:text-xl print:text-navy-900">
                  Legacy Industrial Coatings
                </p>
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              </div>
              <p className="text-slate-600 font-medium italic">Professional Floor Solutions That Last a Lifetime</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlakeFloorTemplate;