import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./PageTransition";
import { TopographicBackground } from "./TopographicBackground";
import Welcome from "@/pages/Welcome";
import FactFinder from "@/pages/FactFinder";
import FunnelDiagnostic from "@/pages/FunnelDiagnostic";
import FunnelHealth from "@/pages/FunnelHealth";
import ServiceSelector from "@/pages/ServiceSelector";
import RequiredInfo from "@/pages/RequiredInfo";
import NotFound from "@/pages/NotFound";

// Local SEO pages
import ProductRecommendationLocalSEO from "@/pages/localseo/ProductRecommendation";
import BusinessCycleLocalSEO from "@/pages/localseo/BusinessCycle";
import PricingLocalSEO from "@/pages/localseo/Pricing";

// Lead Gen pages
import ProductRecommendationLeadGen from "@/pages/leadgen/ProductRecommendation";
import BusinessCycleLeadGen from "@/pages/leadgen/BusinessCycle";
import PricingLeadGen from "@/pages/leadgen/Pricing";

// LSA pages
import ProductRecommendationLSA from "@/pages/lsa/ProductRecommendation";
import PricingLSA from "@/pages/lsa/Pricing";

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      {/* Persistent background across all pages */}
      <TopographicBackground />
      
      <div className="relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Welcome /></PageTransition>} />
            <Route path="/fact-finder" element={<PageTransition><FactFinder /></PageTransition>} />
            <Route path="/funnel-diagnostic" element={<PageTransition><FunnelDiagnostic /></PageTransition>} />
            <Route path="/funnel-health" element={<PageTransition><FunnelHealth /></PageTransition>} />
            <Route path="/service-selector" element={<PageTransition><ServiceSelector /></PageTransition>} />
            
            {/* Local SEO path */}
            <Route path="/product-recommendation/localseo" element={<PageTransition><ProductRecommendationLocalSEO /></PageTransition>} />
            <Route path="/business-cycle/localseo" element={<PageTransition><BusinessCycleLocalSEO /></PageTransition>} />
            <Route path="/pricing/localseo" element={<PageTransition><PricingLocalSEO /></PageTransition>} />
            
            {/* Lead Gen path */}
            <Route path="/product-recommendation/leadgen" element={<PageTransition><ProductRecommendationLeadGen /></PageTransition>} />
            <Route path="/business-cycle/leadgen" element={<PageTransition><BusinessCycleLeadGen /></PageTransition>} />
            <Route path="/pricing/leadgen" element={<PageTransition><PricingLeadGen /></PageTransition>} />
            
            {/* LSA path (no business cycle) */}
            <Route path="/product-recommendation/lsa" element={<PageTransition><ProductRecommendationLSA /></PageTransition>} />
            <Route path="/pricing/lsa" element={<PageTransition><PricingLSA /></PageTransition>} />
            
            <Route path="/required-info" element={<PageTransition><RequiredInfo /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
