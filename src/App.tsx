
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import About from "./pages/About";
import AdditionalServices from "./pages/AdditionalServices";
import Blog from "./pages/Blog";
import Commercial from "./pages/Commercial";
import ConcretePolishing from "./pages/ConcretePolishing";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Financing from "./pages/Financing";
import FlakeFloors from "./pages/FlakeFloors";
import FlowerMound from "./pages/FlowerMound";
import Gallery from "./pages/Gallery";

import IndustrialEpoxy from "./pages/IndustrialEpoxy";
import NotFound from "./pages/NotFound";
import PackagePresentation from "./pages/PackagePresentation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Prosper from "./pages/Prosper";
import Quote from "./pages/Quote";
import QuoteDFW from "./pages/QuoteDFW";
import ResidentialGarageFloors from "./pages/ResidentialGarageFloors";
import ResidentialPatio from "./pages/ResidentialPatio";
import ServiceAreas from "./pages/ServiceAreas";
import TermsAndConditions from "./pages/TermsAndConditions";
import Warranty from "./pages/Warranty";
import DFW from "./pages/DFW";
import DFWResLanding from "./pages/DFWResLanding";
import LandingVisual from "./pages/LandingVisual";
import Auth from "./pages/Auth";
import SalesDashboard from "./pages/SalesDashboard";
import FlakeFloorTemplate from "./pages/FlakeFloorTemplate";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<DFW />} />
              <Route path="/dfw" element={<DFW />} />
              <Route path="/quotedfw" element={<QuoteDFW />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/landingvisual" element={<LandingVisual />} />
              <Route path="/service-areas" element={<ServiceAreas />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/flake-floors" element={<FlakeFloors />} />
              <Route path="/residential-patio" element={<ResidentialPatio />} />
              <Route path="/garagefloors" element={<ResidentialGarageFloors />} />
              <Route path="/flower-mound" element={<FlowerMound />} />
              <Route path="/prosper" element={<Prosper />} />
              <Route path="/additional-services" element={<AdditionalServices />} />
              <Route path="/industrial-epoxy" element={<IndustrialEpoxy />} />
              <Route path="/commercial" element={<Commercial />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/about" element={<About />} />
              <Route path="/packagepresentation" element={<PackagePresentation />} />
              <Route path="/flakefloortemplate" element={<FlakeFloorTemplate />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/sales-dashboard" element={<SalesDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
