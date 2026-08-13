
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

import Gallery from "./pages/Gallery";

import IndustrialEpoxy from "./pages/IndustrialEpoxy";
import NotFound from "./pages/NotFound";
import PackagePresentation from "./pages/PackagePresentation";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import Quote from "./pages/Quote";
import QuoteDFW from "./pages/QuoteDFW";
import ResidentialGarageFloors from "./pages/ResidentialGarageFloors";
import ResidentialPatio from "./pages/ResidentialPatio";
import ServiceAreas from "./pages/ServiceAreas";
import EpoxyFlooringCity from "./pages/EpoxyFlooringCity";
import TermsAndConditions from "./pages/TermsAndConditions";
import Warranty from "./pages/Warranty";
import DFW from "./pages/DFW";
import GPT from "./pages/GPT";
import DFWResLanding from "./pages/DFWResLanding";
import LandingVisual from "./pages/LandingVisual";
import Auth from "./pages/Auth";
import SalesDashboard from "./pages/SalesDashboard";
import FlakeFloorTemplate from "./pages/FlakeFloorTemplate";

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
import CommercialMaintenance from "./pages/CommercialMaintenance";
import AboutCommercial from "./pages/AboutCommercial";
import AquaTotsFlooring from "./pages/AquaTotsFlooring";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import CaseStudiesHub from "./pages/CaseStudiesHub";
import CommercialIndustryPage from "./pages/CommercialIndustryPage";
import CommercialSystemPage from "./pages/CommercialSystemPage";
import { APPLICATIONS, SOLUTIONS } from "./data/commercialNav";
import ScrollToTop from "./components/ScrollToTop";
import EstimateRequestReceived from "./pages/EstimateRequestReceived";


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
              <Route path="/gpt" element={<GPT />} />
              <Route path="/dfw" element={<Navigate to="/" replace />} />
              
              <Route path="/quotedfw" element={<QuoteDFW />} />
              
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/landingvisual" element={<LandingVisual />} />
              <Route path="/service-areas" element={<ServiceAreas />} />
              <Route path="/epoxy-flooring/:city" element={<EpoxyFlooringCity />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/flake-floors" element={<FlakeFloors />} />
              <Route path="/residential-patio" element={<ResidentialPatio />} />
              <Route path="/garagefloors" element={<ResidentialGarageFloors />} />
              <Route path="/industrial-epoxy" element={<IndustrialEpoxy />} />
              <Route path="/commercial" element={<Commercial />} />
              <Route path="/commercialfloors" element={<CommercialFloors />} />
              <Route path="/about-commercial" element={<AboutCommercial />} />
              <Route path="/commercial-floor-maintenance" element={<CommercialMaintenance />} />
              <Route path="/concrete-polishing" element={<ConcretePolishing />} />
              <Route path="/concrete-sealing" element={<ConcreteSealing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/about" element={<About />} />
              <Route path="/case-studies" element={<CaseStudiesHub />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/commercial-case-studies" element={<CaseStudies category="commercial" />} />
              <Route path="/commercial-case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/residential-case-studies" element={<CaseStudies category="residential" />} />
              <Route path="/residential-case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/packagepresentation" element={<PackagePresentation />} />
              <Route path="/flakefloortemplate" element={<FlakeFloorTemplate />} />

              {/* Commercial applications */}
              {APPLICATIONS.map((a) => (
                <Route
                  key={a.path}
                  path={a.path}
                  element={<CommercialIndustryPage slug={a.slug!} />}
                />
              ))}

              {/* Commercial solutions */}
              {SOLUTIONS.filter((s) => !s.existing).map((s) => (
                <Route
                  key={s.path}
                  path={s.path}
                  element={<CommercialSystemPage slug={s.slug!} />}
                />
              ))}

              {/* Keyword URL redirects to existing pages */}
              <Route path="/garage-floor-coating" element={<Navigate to="/garagefloors" replace />} />
              <Route path="/polyaspartic-garage-floor" element={<Navigate to="/garagefloors" replace />} />
              <Route path="/polished-concrete" element={<Navigate to="/concrete-polishing" replace />} />
              <Route path="/warehouse-epoxy-flooring" element={<Navigate to="/warehouse-flooring" replace />} />
              <Route path="/commercial-flooring" element={<Navigate to="/commercial" replace />} />
              <Route path="/epoxy-flooring-dallas" element={<Navigate to="/industrial-epoxy" replace />} />

              
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
