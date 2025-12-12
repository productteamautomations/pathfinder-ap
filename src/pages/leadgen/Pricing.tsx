import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
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
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader
        onBack={() => navigate("/about/leadgen", { state: location.state })}
        currentStep={6}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 flex items-center justify-center px-6" style={{ paddingTop: "73px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl"
          style={{ height: "calc((100vh - 73px) * 0.88)" }}
        >
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            {/* Left Side - Plan Info */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                  Recommended for you
                </span>
                <h1 className="text-5xl lg:text-6xl font-display font-bold text-title leading-[1.1] tracking-tight mb-6">
                  Lead Generation
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Professional Google Ads management with full campaign setup, call tracking, and ongoing optimisation.
                </p>

                <div className="space-y-4">
                  {features.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
                      </div>
                      <span className="text-base text-foreground font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Pricing Card */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.12)] p-8 lg:p-10"
              >
                {/* Plan Toggle */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">Choose your plan</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPlan("6")}
                      className={`py-4 px-4 rounded-2xl font-bold text-base transition-all ${
                        selectedPlan === "6"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      6 Months
                    </button>
                    <button
                      onClick={() => setSelectedPlan("12")}
                      className={`py-4 px-4 rounded-2xl font-bold text-base transition-all relative ${
                        selectedPlan === "12"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      12 Months
                      {selectedPlan === "12" && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          Save £{savings}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-border/40">
                    <span className="text-base text-muted-foreground">Setup Fee</span>
                    <span className="font-bold text-lg text-foreground">£{setupFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/40">
                    <span className="text-base text-muted-foreground">Monthly Fee</span>
                    <span className="font-bold text-lg text-foreground">£{monthlyFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/40">
                    <span className="text-base text-muted-foreground">VAT (20%)</span>
                    <span className="font-bold text-lg text-foreground">£{vat.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-muted/30 rounded-2xl p-5 mb-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">First month total</p>
                      <p className="text-3xl font-bold text-foreground">£{totalFirstMonth.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground text-right">
                      then £{monthlyAfterVAT.toFixed(2)}/mo
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() =>
                    navigate("/required-info", { state: { ...location.state, product: "Lead Generation" } })
                  }
                  fullWidth
                  className="py-5 text-lg"
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
