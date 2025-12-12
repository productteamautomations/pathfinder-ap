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

      <div
        className="flex-1 flex items-center justify-center px-4 sm:px-6 relative z-10"
        style={{ padding: "5vh 1.5rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[clamp(1rem,2vw,2rem)] shadow-[0_30px_100px_rgba(0,0,0,0.12)] overflow-hidden w-full"
          style={{
            maxWidth: "min(1400px, 90vw)",
            maxHeight: "calc(100vh - 73px - 10vh)", // Subtract header + padding
          }}
        >
          <div className="grid lg:grid-cols-2 w-full h-full">
            {/* Left Side - Plan Info */}
            <div
              className="bg-[#f7f5f2] flex flex-col justify-center"
              style={{ padding: "clamp(1.5rem, 4vw, 3.5rem)" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span
                  className="font-semibold text-primary uppercase tracking-widest block"
                  style={{
                    fontSize: "clamp(0.75rem, 1vw, 1rem)",
                    marginBottom: "clamp(0.75rem, 1.5vw, 1.25rem)",
                  }}
                >
                  Recommended for you
                </span>
                <h1
                  className="font-display font-bold text-title leading-tight tracking-tight"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 4rem)",
                    marginBottom: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                >
                  Lead Generation
                </h1>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{
                    fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)",
                    marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                  }}
                >
                  Professional Google Ads management with full campaign setup, call tracking, and ongoing optimisation.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 1.5vw, 1.25rem)" }}>
                  {features.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                      className="flex items-center"
                      style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}
                    >
                      <div
                        className="rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "clamp(1.75rem, 2.5vw, 2rem)",
                          height: "clamp(1.75rem, 2.5vw, 2rem)",
                        }}
                      >
                        <Check
                          className="text-primary-foreground"
                          strokeWidth={3}
                          style={{ width: "clamp(0.875rem, 1.25vw, 1rem)", height: "clamp(0.875rem, 1.25vw, 1rem)" }}
                        />
                      </div>
                      <span
                        className="text-foreground font-medium"
                        style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)" }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Pricing */}
            <div className="bg-white flex flex-col justify-center" style={{ padding: "clamp(1.5rem, 4vw, 3.5rem)" }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* Plan Toggle */}
                <div style={{ marginBottom: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  <p
                    className="font-semibold text-foreground"
                    style={{
                      fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)",
                      marginBottom: "clamp(0.75rem, 1.5vw, 1rem)",
                    }}
                  >
                    Choose your plan
                  </p>
                  <div className="grid grid-cols-2" style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
                    <button
                      onClick={() => setSelectedPlan("6")}
                      className={`rounded-2xl font-bold transition-all ${
                        selectedPlan === "6"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                      style={{
                        padding: "clamp(0.875rem, 1.5vw, 1.25rem) clamp(1rem, 1.5vw, 1.25rem)",
                        fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)",
                      }}
                    >
                      6 Months
                    </button>
                    <button
                      onClick={() => setSelectedPlan("12")}
                      className={`rounded-2xl font-bold transition-all relative ${
                        selectedPlan === "12"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                      style={{
                        padding: "clamp(0.875rem, 1.5vw, 1.25rem) clamp(1rem, 1.5vw, 1.25rem)",
                        fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)",
                      }}
                    >
                      12 Months
                      {selectedPlan === "12" && (
                        <span
                          className="absolute bg-green-500 text-white font-bold rounded-full whitespace-nowrap"
                          style={{
                            top: "clamp(-0.5rem, -1vw, -0.75rem)",
                            right: "clamp(-0.5rem, -1vw, -0.75rem)",
                            padding: "clamp(0.25rem, 0.5vw, 0.375rem) clamp(0.5rem, 1vw, 0.75rem)",
                            fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                          }}
                        >
                          Save £{savings}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1" style={{ marginBottom: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "clamp(0.75rem, 1.5vw, 1rem) 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)" }}>
                      Setup Fee
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
                      £{setupFee.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "clamp(0.75rem, 1.5vw, 1rem) 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)" }}>
                      Monthly Fee
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
                      £{monthlyFee.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "clamp(0.75rem, 1.5vw, 1rem) 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)" }}>
                      VAT (20%)
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
                      £{vat.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="bg-muted/30 rounded-2xl"
                  style={{
                    padding: "clamp(1.25rem, 2vw, 1.5rem)",
                    marginBottom: "clamp(1.5rem, 2.5vw, 2rem)",
                  }}
                >
                  <div className="flex justify-between items-end" style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
                    <div>
                      <p
                        className="text-muted-foreground"
                        style={{
                          fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                          marginBottom: "clamp(0.25rem, 0.5vw, 0.375rem)",
                        }}
                      >
                        First month total
                      </p>
                      <p className="font-bold text-foreground" style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}>
                        £{totalFirstMonth.toFixed(2)}
                      </p>
                    </div>
                    <p
                      className="text-muted-foreground text-right"
                      style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
                    >
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
                  style={{
                    padding: "clamp(1.25rem, 2vw, 1.5rem)",
                    fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  }}
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
