import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./PageTransition";
import Welcome from "@/pages/Welcome";
import FactFinder from "@/pages/FactFinder";
import FunnelDiagnostic from "@/pages/FunnelDiagnostic";
import FunnelHealth from "@/pages/FunnelHealth";
import ProductRecommendation from "@/pages/ProductRecommendation";
import BusinessCycle from "@/pages/BusinessCycle";
import Pricing from "@/pages/Pricing";
import RequiredInfo from "@/pages/RequiredInfo";
import NotFound from "@/pages/NotFound";

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Welcome /></PageTransition>} />
        <Route path="/fact-finder" element={<PageTransition><FactFinder /></PageTransition>} />
        <Route path="/funnel-diagnostic" element={<PageTransition><FunnelDiagnostic /></PageTransition>} />
        <Route path="/funnel-health" element={<PageTransition><FunnelHealth /></PageTransition>} />
        <Route path="/product-recommendation" element={<PageTransition><ProductRecommendation /></PageTransition>} />
        <Route path="/business-cycle" element={<PageTransition><BusinessCycle /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/required-info" element={<PageTransition><RequiredInfo /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
