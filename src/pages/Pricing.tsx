import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
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
    <div className="min-h-screen bg-background">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={10}
        totalSteps={11}
        showProgress
      />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Your Recommended Path
            </h1>
            <p className="text-muted-foreground">
              Based on your business, goals, and eligibility, here is the path we recommend
              for growth.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Primary Recommendation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 border-4 border-primary h-full">
                <div className="mb-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">
                    PRIMARY RECOMMENDATION
                  </span>
                  <h2 className="text-3xl font-bold text-foreground mt-2">
                    Local SEO & SmartSite
                  </h2>
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    Combine a dominant local presence on Google Maps with a powerful website
                    designed to convert local searchers into loyal customers.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Key Deliverables:
                  </h3>
                  <ul className="space-y-3">
                    {features.map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Why this path for you?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Combining a dominant local SEO strategy with a new high-performance
                    SmartSite will maximize your visibility and conversions.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Right Column: Pricing */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-8 h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-primary mb-3">
                    Local SEO & SmartSite
                  </h2>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      • You have strong signals for appearing in the Google Map Pack
                    </li>
                    <li>
                      • A new SmartSite is required for optimal performance and tracking
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Transparent Pricing
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => setSelectedPlan("6")}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        selectedPlan === "6"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      6 Months
                    </button>
                    <button
                      onClick={() => setSelectedPlan("12")}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        selectedPlan === "12"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      12 Months
                    </button>
                  </div>

                  {selectedPlan === "12" && (
                    <div className="bg-accent/20 p-4 rounded-xl mb-6 text-center">
                      <p className="text-sm font-semibold text-foreground">
                        You save £{savings.toFixed(2)} with a 12-month plan!
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-foreground">Setup Fee</span>
                      <span className="font-bold text-foreground">
                        £{setupFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-foreground">Monthly Fee</span>
                      <span className="font-bold text-foreground">
                        £{monthlyFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-foreground">VAT</span>
                      <span className="font-bold text-foreground">
                        £{vat.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-primary text-primary-foreground p-6 rounded-xl mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total First Month</span>
                      <span className="text-2xl font-bold">
                        £{totalFirstMonth.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm opacity-90 mt-2 text-right">
                      (then £{monthlyAfterVAT.toFixed(2)}/month inc. VAT)
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/required-info", { state: location.state })}
                  fullWidth
                >
                  Start My Campaign
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  You're just one step away from starting.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
