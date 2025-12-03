import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, ChevronRight } from "lucide-react";

function OrangeAccent() {
  return (
    <div className="flex items-center gap-2 mt-6">
      <div className="flex gap-1.5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 - i * 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
      <motion.div
        className="h-[2px] w-16 bg-gradient-to-r from-primary to-transparent rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      />
    </div>
  );
}

export default function PricingLocalSEO() {
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
    "Google Business Profile optimisation",
    "Local keyword targeting",
    "Perfectly optimised local content",
    "Best-practice technical SEO",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={10}
        totalSteps={11}
        showProgress
      />

      <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 min-h-[70vh]">
              <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                    Primary Recommendation
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#173340] leading-tight tracking-tight">
                    Local SEO
                  </h2>
                  <OrangeAccent />
                  <p className="text-base text-muted-foreground mt-8 leading-relaxed">
                    Dominate local search results on Google Maps and attract customers 
                    in your area when they search for services like yours.
                  </p>
                  <div className="mt-8 space-y-3">
                    {features.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                        <span className="text-sm text-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <h3 className="text-xl font-bold text-foreground mb-6">Transparent Pricing</h3>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <button
                      onClick={() => setSelectedPlan("6")}
                      className={`py-3 px-4 rounded-2xl font-semibold text-sm transition-all ${
                        selectedPlan === "6"
                          ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                          : "bg-white text-foreground border border-border/30 hover:border-primary/40"
                      }`}
                    >
                      6 Months
                    </button>
                    <button
                      onClick={() => setSelectedPlan("12")}
                      className={`py-3 px-4 rounded-2xl font-semibold text-sm transition-all ${
                        selectedPlan === "12"
                          ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                          : "bg-white text-foreground border border-border/30 hover:border-primary/40"
                      }`}
                    >
                      12 Months
                    </button>
                  </div>

                  {selectedPlan === "12" && (
                    <div className="bg-green-50 p-4 rounded-2xl mb-6 text-center border border-green-200">
                      <p className="text-sm font-semibold text-green-700">
                        You save £{savings.toFixed(2)} with a 12-month plan!
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-border/30">
                      <span className="text-sm text-foreground">Setup Fee</span>
                      <span className="font-bold text-foreground">£{setupFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border/30">
                      <span className="text-sm text-foreground">Monthly Fee</span>
                      <span className="font-bold text-foreground">£{monthlyFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border/30">
                      <span className="text-sm text-foreground">VAT</span>
                      <span className="font-bold text-foreground">£{vat.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-primary text-primary-foreground p-5 rounded-2xl mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total First Month</span>
                      <span className="text-2xl font-bold">£{totalFirstMonth.toFixed(2)}</span>
                    </div>
                    <p className="text-xs opacity-90 mt-2 text-right">
                      (then £{monthlyAfterVAT.toFixed(2)}/month inc. VAT)
                    </p>
                  </div>

                  <Button
                    onClick={() => navigate("/required-info", { state: location.state })}
                    fullWidth
                  >
                    Start My Campaign
                  </Button>

                  <button
                    onClick={() => navigate(-1)}
                    className="mt-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all">
                      <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
                    </div>
                    <span className="uppercase tracking-wider">Back</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
