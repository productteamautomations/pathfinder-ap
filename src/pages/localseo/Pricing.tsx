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

export default function PricingLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<"6" | "12">("12");

  const setupFee = 249.0;
  const monthlyFee6 = 299.0;
  const monthlyFee12 = 249.0;
  const monthlyFee = selectedPlan === "12" ? monthlyFee12 : monthlyFee6;
  const vat = (setupFee + monthlyFee) * 0.2;
  const totalFirstMonth = setupFee + monthlyFee + vat;
  const monthlyAfterVAT = monthlyFee * 1.2;
  const savings = (monthlyFee6 - monthlyFee12) * 12;

  const features = [
    "Google Ads campaign management",
    "Responsive Search Ad creation",
    "Enhanced call tracking",
    "Say Hello access",
    "Monthly performance reporting",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/about/leadgen", { state: location.state })}
        currentStep={6}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
                    Primary Recommendation
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-title leading-tight tracking-tight">
                    Lead Generation
                  </h2>
                  <OrangeAccent />
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                    Professional Google Ads management with full campaign setup, call tracking, and ongoing
                    optimisation.
                  </p>
                  <div className="mt-4 space-y-2">
                    {features.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <span className="text-xs text-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <h3 className="text-base font-bold text-foreground mb-4">Transparent Pricing</h3>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      onClick={() => setSelectedPlan("6")}
                      className={`py-2 px-3 rounded-xl font-semibold text-xs transition-all ${
                        selectedPlan === "6"
                          ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                          : "bg-white text-foreground border border-border/30 hover:border-primary/40"
                      }`}
                    >
                      6 Months
                    </button>
                    <button
                      onClick={() => setSelectedPlan("12")}
                      className={`py-2 px-3 rounded-xl font-semibold text-xs transition-all ${
                        selectedPlan === "12"
                          ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                          : "bg-white text-foreground border border-border/30 hover:border-primary/40"
                      }`}
                    >
                      12 Months
                    </button>
                  </div>

                  <div
                    className={`p-2.5 rounded-xl mb-4 text-center border ${
                      selectedPlan === "12" ? "bg-green-50 border-green-200" : "bg-transparent border-transparent"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        selectedPlan === "12" ? "text-green-700" : "text-transparent"
                      }`}
                    >
                      You save £{savings.toFixed(2)} with a 12-month plan!
                    </p>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-xs text-foreground">Setup Fee</span>
                      <span className="font-bold text-sm text-foreground">£{setupFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-xs text-foreground">Monthly Fee</span>
                      <span className="font-bold text-sm text-foreground">£{monthlyFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-xs text-foreground">VAT</span>
                      <span className="font-bold text-sm text-foreground">£{vat.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-primary text-primary-foreground p-4 rounded-xl mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">Total First Month</span>
                      <span className="text-xl font-bold">£{totalFirstMonth.toFixed(2)}</span>
                    </div>
                    <p className="text-xs opacity-90 mt-1 text-right">
                      (then £{monthlyAfterVAT.toFixed(2)}/month inc. VAT)
                    </p>
                  </div>

                  <Button
                    onClick={() =>
                      navigate("/required-info", { state: { ...location.state, product: "Lead Generation" } })
                    }
                    fullWidth
                  >
                    Start My Campaign
                  </Button>

                  <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all">
                      <ChevronRight className="w-3 h-3 text-foreground rotate-180" />
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
