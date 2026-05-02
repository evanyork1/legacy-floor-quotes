
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";
import Commercial from "./pages/Commercial";
import ConcretePolishing from "./pages/ConcretePolishing";
import ConcreteSealing from "./pages/ConcreteSealing";
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
import PHX from "./pages/PHX";
import QuotePHX from "./pages/QuotePHX";
import DFWResLanding from "./pages/DFWResLanding";
import LandingVisual from "./pages/LandingVisual";
import Auth from "./pages/Auth";
import SalesDashboard from "./pages/SalesDashboard";
import FlakeFloorTemplate from "./pages/FlakeFloorTemplate";

import Rentals from "./pages/Rentals";
import Giveaway from "./pages/Giveaway";
import GiveawayRaf from "./pages/GiveawayRaf";
import GarageLandingForm from "./pages/GarageLandingForm";
import GoogleGaragePage from "./pages/GoogleGaragePage";
import GaragePacketPage from "./pages/GaragePacketPage";
import GaragePacketResults from "./pages/GaragePacketResults";
import GarageLandingInstant from "./pages/GarageLandingInstant";
import GarageFloorsDallasFB from "./pages/GarageFloorsDallasFB";
import FloorVisualizer from "./pages/FloorVisualizer";
import CRM from "./pages/CRM";
import SalesPresentation from "./pages/SalesPresentation";
import CustomerPresentationPage from "./pages/CustomerPresentationPage";
import SplashSelect from "./pages/SplashSelect";
import CommercialFloors from "./pages/CommercialFloors";
import AboutCommercial from "./pages/AboutCommercial";
import AquaTotsFlooring from "./pages/AquaTotsFlooring";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import ScrollToTop from "./components/ScrollToTop";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<DFW />} />
              <Route path="/dfw" element={<DFW />} />
              <Route path="/phx" element={<PHX />} />
              <Route path="/quotedfw" element={<QuoteDFW />} />
              <Route path="/quotephx" element={<QuotePHX />} />
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
              <Route path="/industrial-epoxy" element={<IndustrialEpoxy />} />
              <Route path="/commercial" element={<Commercial />} />
              <Route path="/commercialfloors" element={<CommercialFloors />} />
              <Route path="/about-commercial" element={<AboutCommercial />} />
              <Route path="/concrete-polishing" element={<ConcretePolishing />} />
              <Route path="/concrete-sealing" element={<ConcreteSealing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/about" element={<About />} />
              <Route path="/case-studies" element={<Navigate to="/commercial-case-studies" replace />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/commercial-case-studies" element={<CaseStudies category="commercial" />} />
              <Route path="/commercial-case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/residential-case-studies" element={<CaseStudies category="residential" />} />
              <Route path="/residential-case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/packagepresentation" element={<PackagePresentation />} />
              <Route path="/flakefloortemplate" element={<FlakeFloorTemplate />} />
              
              <Route path="/rentals" element={<Rentals />} />
          <Route path="/giveaway" element={<Giveaway />} />
          <Route path="/giveawayraf" element={<GiveawayRaf />} />
          <Route path="/garagelandingform" element={<GarageLandingForm />} />
          <Route path="/garagelandinginstant" element={<GarageLandingInstant />} />
          <Route path="/garagefloorsdallasfb" element={<GarageFloorsDallasFB />} />
          <Route path="/googlegaragepage" element={<GoogleGaragePage />} />
          <Route path="/garagepacketpage" element={<GaragePacketPage />} />
          <Route path="/garage-packet-result/:id" element={<GaragePacketResults />} />
          <Route path="/floor-visualizer" element={<FloorVisualizer />} />
              
              <Route path="/auth" element={<Auth />} />
              <Route path="/sales-dashboard" element={<SalesDashboard />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/sales-presentation" element={<SalesPresentation />} />
              <Route path="/presentation/:id" element={<CustomerPresentationPage />} />
              <Route path="/aquatotsflooring" element={<AquaTotsFlooring />} />
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
