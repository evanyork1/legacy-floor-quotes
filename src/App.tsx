
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages for code splitting
const Houston = lazy(() => import("./pages/Houston"));
const Quote = lazy(() => import("./pages/Quote"));
const DFW = lazy(() => import("./pages/DFW"));
const DFWResLanding = lazy(() => import("./pages/DFWResLanding"));
const QuoteDFW = lazy(() => import("./pages/QuoteDFW"));
const Gallery = lazy(() => import("./pages/Gallery"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const EmployeePanel = lazy(() => import("./pages/EmployeePanel"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LandingVisual = lazy(() => import("./pages/LandingVisual"));

const Warranty = lazy(() => import("./pages/Warranty"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const FlakeFloors = lazy(() => import("./pages/FlakeFloors"));
const IndustrialEpoxy = lazy(() => import("./pages/IndustrialEpoxy"));
const ConcretePolishing = lazy(() => import("./pages/ConcretePolishing"));
const Commercial = lazy(() => import("./pages/Commercial"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-blue-600 text-lg">Loading...</div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Redirect root to dfw to make it the new homepage */}
              <Route path="/" element={<Navigate to="/dfw" replace />} />
              <Route path="/houston" element={<Houston />} />
              <Route path="/quotehou" element={<Quote />} />
              <Route path="/dfw" element={<DFW />} />
              <Route path="/dfwreslanding" element={<DFWResLanding />} />
              <Route path="/quotedfw" element={<QuoteDFW />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/landingvisual" element={<LandingVisual />} />
              
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/flake-floors" element={<FlakeFloors />} />
              <Route path="/industrial-epoxy" element={<IndustrialEpoxy />} />
              <Route path="/concrete-polishing" element={<ConcretePolishing />} />
              <Route path="/commercial" element={<Commercial />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/adminpanel2025" element={<AdminPanel />} />
              <Route path="/jingram" element={<EmployeePanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
