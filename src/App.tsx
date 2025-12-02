import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import FactFinder from "./pages/FactFinder";
import FunnelDiagnostic from "./pages/FunnelDiagnostic";
import FunnelHealth from "./pages/FunnelHealth";
import ProductRecommendation from "./pages/ProductRecommendation";
import BusinessCycle from "./pages/BusinessCycle";
import Pricing from "./pages/Pricing";
import RequiredInfo from "./pages/RequiredInfo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/fact-finder" element={<FactFinder />} />
          <Route path="/funnel-diagnostic" element={<FunnelDiagnostic />} />
          <Route path="/funnel-health" element={<FunnelHealth />} />
          <Route path="/product-recommendation" element={<ProductRecommendation />} />
          <Route path="/business-cycle" element={<BusinessCycle />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/required-info" element={<RequiredInfo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
