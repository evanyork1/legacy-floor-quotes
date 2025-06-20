
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Houston from "./pages/Houston";
import DFW from "./pages/DFW";
import Quote from "./pages/Quote";
import QuoteHou from "./pages/QuoteHou";
import QuoteDFW from "./pages/QuoteDFW";
import AdminPanel from "./pages/AdminPanel";
import EmployeePanel from "./pages/EmployeePanel";
import NotFound from "./pages/NotFound";
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
          <Route path="/" element={<Index />} />
          <Route path="/houston" element={<Houston />} />
          <Route path="/dfw" element={<DFW />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/quotehou" element={<QuoteHou />} />
          <Route path="/quotedfw" element={<QuoteDFW />} />
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
