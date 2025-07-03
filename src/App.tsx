
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Quote from "./pages/Quote";
import DFW from "./pages/DFW";
import QuoteDFW from "./pages/QuoteDFW";
import Gallery from "./pages/Gallery";
import AdminPanel from "./pages/AdminPanel";
import EmployeePanel from "./pages/EmployeePanel";
import NotFound from "./pages/NotFound";
import LandingVisual from "./pages/LandingVisual";
import JAK from "./pages/JAK";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Redirect root to houston for backward compatibility */}
          <Route path="/" element={<Navigate to="/houston" replace />} />
          <Route path="/houston" element={<Index />} />
          <Route path="/quotehou" element={<Quote />} />
          <Route path="/dfw" element={<DFW />} />
          <Route path="/quotedfw" element={<QuoteDFW />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/landingvisual" element={<LandingVisual />} />
          <Route path="/jak" element={<JAK />} />
          <Route path="/adminpanel2025" element={<AdminPanel />} />
          <Route path="/jingram" element={<EmployeePanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
