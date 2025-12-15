import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./PageTransition";
import { TopographicBackground } from "./TopographicBackground";
import Welcome from "@/pages/Welcome";
import FactFinder from "@/pages/FactFinder";
import ServiceSelector from "@/pages/ServiceSelector";
import RequiredInfo from "@/pages/RequiredInfo";
import NotFound from "@/pages/NotFound";

// Local SEO pages
import ProductRecommendationLocalSEO from "@/pages/localseo/ProductRecommendation";
import FunnelDiagnosticLocalSEO from "@/pages/localseo/FunnelDiagnostic";
import FunnelHealthLocalSEO from "@/pages/localseo/FunnelHealth";
import BusinessCycleLocalSEO from "@/pages/localseo/BusinessCycle";
import AboutAddPeopleLocalSEO from "@/pages/localseo/AboutAddPeople";
import PricingLocalSEO from "@/pages/localseo/Pricing";

// Lead Gen pages
import ProductRecommendationLeadGen from "@/pages/leadgen/ProductRecommendation";
import FunnelDiagnosticLeadGen from "@/pages/leadgen/FunnelDiagnostic";
import FunnelHealthLeadGen from "@/pages/leadgen/FunnelHealth";
import BusinessCycleLeadGen from "@/pages/leadgen/BusinessCycle";
import AboutAddPeopleLeadGen from "@/pages/leadgen/AboutAddPeople";
import PricingLeadGen from "@/pages/leadgen/Pricing";

// LSA pages
import ProductRecommendationLSA from "@/pages/lsa/ProductRecommendation";
import AboutAddPeopleLSA from "@/pages/lsa/AboutAddPeople";
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
            <Route path="/service-selector" element={<PageTransition><ServiceSelector /></PageTransition>} />
            
            {/* Local SEO path */}
            <Route path="/product-recommendation/localseo" element={<PageTransition><ProductRecommendationLocalSEO /></PageTransition>} />
            <Route path="/funnel-diagnostic/localseo" element={<PageTransition><FunnelDiagnosticLocalSEO /></PageTransition>} />
            <Route path="/funnel-health/localseo" element={<PageTransition><FunnelHealthLocalSEO /></PageTransition>} />
            <Route path="/business-cycle/localseo" element={<PageTransition><BusinessCycleLocalSEO /></PageTransition>} />
            <Route path="/about/localseo" element={<PageTransition><AboutAddPeopleLocalSEO /></PageTransition>} />
            <Route path="/pricing/localseo" element={<PageTransition><PricingLocalSEO /></PageTransition>} />
            
            {/* Lead Gen path */}
            <Route path="/product-recommendation/leadgen" element={<PageTransition><ProductRecommendationLeadGen /></PageTransition>} />
            <Route path="/funnel-diagnostic/leadgen" element={<PageTransition><FunnelDiagnosticLeadGen /></PageTransition>} />
            <Route path="/funnel-health/leadgen" element={<PageTransition><FunnelHealthLeadGen /></PageTransition>} />
            <Route path="/business-cycle/leadgen" element={<PageTransition><BusinessCycleLeadGen /></PageTransition>} />
            <Route path="/about/leadgen" element={<PageTransition><AboutAddPeopleLeadGen /></PageTransition>} />
            <Route path="/pricing/leadgen" element={<PageTransition><PricingLeadGen /></PageTransition>} />
            
            {/* LSA path */}
            <Route path="/product-recommendation/lsa" element={<PageTransition><ProductRecommendationLSA /></PageTransition>} />
            <Route path="/about/lsa" element={<PageTransition><AboutAddPeopleLSA /></PageTransition>} />
            <Route path="/pricing/lsa" element={<PageTransition><PricingLSA /></PageTransition>} />
            
            <Route path="/required-info" element={<PageTransition><RequiredInfo /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
