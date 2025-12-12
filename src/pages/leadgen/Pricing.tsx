import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-background relative">
      <TopographicBackground />
      <PageHeader
        onBack={() => navigate("/about/leadgen", { state: location.state })}
        currentStep={6}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.12)] overflow-hidden w-full max-w-7xl"
        >
          <div className="grid lg:grid-cols-2 w-full">
            {/* Left Side - Plan Info */}
            <div className="bg-[#f7f5f2] p-6 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="text-sm sm:text-base font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-5 block">
                  Recommended for you
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-title leading-tight tracking-tight mb-4 sm:mb-6">
                  Lead Generation
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                  Professional Google Ads management with full campaign setup, call tracking, and ongoing optimisation.
                </p>

                <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                  {features.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                      className="flex items-center gap-3 sm:gap-4"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
                      </div>
                      <span className="text-base sm:text-lg text-foreground font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Pricing */}
            <div className="bg-white p-6 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* Plan Toggle */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Choose your plan</p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={() => setSelectedPlan("6")}
                      className={`py-4 sm:py-5 px-4 sm:px-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all ${
                        selectedPlan === "6"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      6 Months
                    </button>
                    <button
                      onClick={() => setSelectedPlan("12")}
                      className={`py-4 sm:py-5 px-4 sm:px-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all relative ${
                        selectedPlan === "12"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      12 Months
                      {selectedPlan === "12" && (
                        <span className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-green-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                          Save £{savings}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1 mb-6 sm:mb-8">
                  <div className="flex justify-between items-center py-3 sm:py-4 border-b border-border/40">
                    <span className="text-base sm:text-lg text-muted-foreground">Setup Fee</span>
                    <span className="font-bold text-lg sm:text-xl text-foreground">£{setupFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-4 border-b border-border/40">
                    <span className="text-base sm:text-lg text-muted-foreground">Monthly Fee</span>
                    <span className="font-bold text-lg sm:text-xl text-foreground">£{monthlyFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-4 border-b border-border/40">
                    <span className="text-base sm:text-lg text-muted-foreground">VAT (20%)</span>
                    <span className="font-bold text-lg sm:text-xl text-foreground">£{vat.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-muted/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8">
                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground mb-1">First month total</p>
                      <p className="text-3xl sm:text-4xl font-bold text-foreground">£{totalFirstMonth.toFixed(2)}</p>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground text-right">
                      then £{monthlyAfterVAT.toFixed(2)}/mo
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() =>
                    navigate("/required-info", {
                      state: { ...location.state, product: "Lead Generation" },
                    })
                  }
                  fullWidth
                  className="py-5 sm:py-6 text-lg sm:text-xl"
                >
                  Start My Campaign
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
