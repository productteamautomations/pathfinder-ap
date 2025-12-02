import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { GlassCard } from "@/components/GlassCard";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check } from "lucide-react";

export default function Pricing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<"6" | "12">("12");

  const setupFee = 349.0;
  const monthlyFee = 229.0;
  const vat = 115.6;
  const totalFirstMonth = 693.6;
  const monthlyAfterVAT = 274.8;
  const savings = 600.0;

  const features = [
    "All Local SEO features",
    "All SmartSite features",
    "Perfectly optimised local content",
    "Best-practice technical SEO",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={10}
          totalSteps={11}
          showProgress
        />

        {/* Fixed Title Section */}
        <div className="fixed top-[73px] left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-primary">Your Recommended Path</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your business, goals, and eligibility
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 pt-[140px] pb-[100px] px-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Column: Primary Recommendation */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlassCard className="p-6 border-2 border-primary h-full">
                    <div className="mb-5">
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">
                        PRIMARY RECOMMENDATION
                      </span>
                      <h2 className="text-2xl font-bold text-foreground mt-2">
                        Local SEO & SmartSite
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        Combine a dominant local presence on Google Maps with a powerful website
                        designed to convert local searchers into loyal customers.
                      </p>
                    </div>

                    <div className="mb-5">
                      <h3 className="text-base font-bold text-foreground mb-3">Key Deliverables:</h3>
                      <ul className="space-y-2">
                        {features.map((item, index) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                            <span className="text-sm text-foreground">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                      <h3 className="text-sm font-bold text-foreground mb-1">Why this path for you?</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Combining a dominant local SEO strategy with a new high-performance
                        SmartSite will maximize your visibility and conversions.
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Right Column: Pricing */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="mb-5">
                      <h2 className="text-xl font-bold text-primary mb-2">
                        Local SEO & SmartSite
                      </h2>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• You have strong signals for appearing in the Google Map Pack</li>
                        <li>• A new SmartSite is required for optimal performance</li>
                      </ul>
                    </div>

                    <div className="mb-5">
                      <h3 className="text-base font-bold text-foreground mb-3">Transparent Pricing</h3>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <button
                          onClick={() => setSelectedPlan("6")}
                          className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
                            selectedPlan === "6"
                              ? "bg-primary text-primary-foreground"
                              : "bg-white/50 text-foreground hover:bg-white/70"
                          }`}
                        >
                          6 Months
                        </button>
                        <button
                          onClick={() => setSelectedPlan("12")}
                          className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
                            selectedPlan === "12"
                              ? "bg-primary text-primary-foreground"
                              : "bg-white/50 text-foreground hover:bg-white/70"
                          }`}
                        >
                          12 Months
                        </button>
                      </div>

                      {selectedPlan === "12" && (
                        <div className="bg-accent/20 p-3 rounded-lg mb-4 text-center">
                          <p className="text-xs font-semibold text-foreground">
                            You save £{savings.toFixed(2)} with a 12-month plan!
                          </p>
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm text-foreground">Setup Fee</span>
                          <span className="font-bold text-sm text-foreground">£{setupFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm text-foreground">Monthly Fee</span>
                          <span className="font-bold text-sm text-foreground">£{monthlyFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm text-foreground">VAT</span>
                          <span className="font-bold text-sm text-foreground">£{vat.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="bg-primary text-primary-foreground p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Total First Month</span>
                          <span className="text-xl font-bold">£{totalFirstMonth.toFixed(2)}</span>
                        </div>
                        <p className="text-xs opacity-90 mt-1 text-right">
                          (then £{monthlyAfterVAT.toFixed(2)}/month inc. VAT)
                        </p>
                      </div>
                    </div>

                    <p className="text-center text-xs text-muted-foreground">
                      You're just one step away from starting.
                    </p>
                  </GlassCard>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Fixed Button Section */}
        <div className="fixed bottom-0 left-0 right-0 z-40 px-6 py-5">
          <div className="max-w-5xl mx-auto flex justify-center">
            <Button
              onClick={() => navigate("/required-info", { state: location.state })}
              className="px-16"
            >
              Start My Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
