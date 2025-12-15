import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check } from "lucide-react";

export default function PricingLSA() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<"6" | "12">("12");

  const setupFee = 199.0;
  const monthlyFee6 = 199.0;
  const monthlyFee12 = 149.0;
  const monthlyFee = selectedPlan === "12" ? monthlyFee12 : monthlyFee6;
  const vat = (setupFee + monthlyFee) * 0.2;
  const totalFirstMonth = setupFee + monthlyFee + vat;
  const monthlyAfterVAT = monthlyFee * 1.2;
  const savings = (monthlyFee6 - monthlyFee12) * 12;

  const features = [
    "Google Guaranteed badge setup",
    "LSA profile optimisation",
    "Review management",
    "Lead dispute handling",
    "Monthly performance reporting",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <TopographicBackground />
      <PageHeader
        onBack={() => navigate("/about/lsa", { state: location.state })}
        currentStep={4}
        totalSteps={4}
        showProgress
        productLabel="LSAs"
      />

      <div className="flex-1 pt-[73px] flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{
            width: "min(90vw, calc((100vh - 73px) * 0.9 * 1.65))",
            aspectRatio: "1.65",
            containerType: "size",
            borderRadius: "2.5cqw",
          }}
        >
          <div className="grid lg:grid-cols-2 w-full h-full">
            {/* Left Side - Plan Info */}
            <div className="bg-[#f7f5f2] flex flex-col justify-center" style={{ padding: "3.5cqw" }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h1
                  className="font-display font-bold text-title leading-tight tracking-tight"
                  style={{
                    fontSize: "4.5cqw",
                    marginBottom: "2cqw",
                  }}
                >
                  Local Services Ads
                </h1>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{
                    fontSize: "1.25cqw",
                    marginBottom: "3cqw",
                  }}
                >
                  Get the Google Guaranteed badge and only pay for valid leads. We handle setup, optimisation, and lead
                  dispute management.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5cqw" }}>
                  {features.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                      className="flex items-center"
                      style={{ gap: "1.5cqw" }}
                    >
                      <div
                        className="rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "2.5cqw",
                          height: "2.5cqw",
                        }}
                      >
                        <Check
                          className="text-primary-foreground"
                          strokeWidth={3}
                          style={{ width: "1.25cqw", height: "1.25cqw" }}
                        />
                      </div>
                      <span className="text-foreground font-medium" style={{ fontSize: "1.25cqw" }}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Pricing */}
            <div className="bg-white flex flex-col justify-center" style={{ padding: "3.5cqw" }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* Pricing Header */}
                <div style={{ marginBottom: "2cqw" }}>
                  <p
                    className="font-semibold text-foreground"
                    style={{
                      fontSize: "1.5cqw",
                      marginBottom: "1cqw",
                    }}
                  >
                    Choose Your Plan
                  </p>
                </div>

                {/* Plan Toggle */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1cqw", marginBottom: "2cqw" }}>
                  <button
                    onClick={() => setSelectedPlan("6")}
                    className={`font-semibold transition-all ${
                      selectedPlan === "6"
                        ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                        : "bg-white text-foreground border border-border/30 hover:border-primary/40"
                    }`}
                    style={{ padding: "1.2cqw", borderRadius: "1cqw", fontSize: "1.2cqw" }}
                  >
                    6 Months
                  </button>
                  <button
                    onClick={() => setSelectedPlan("12")}
                    className={`font-semibold transition-all ${
                      selectedPlan === "12"
                        ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                        : "bg-white text-foreground border border-border/30 hover:border-primary/40"
                    }`}
                    style={{ padding: "1.2cqw", borderRadius: "1cqw", fontSize: "1.2cqw" }}
                  >
                    12 Months
                  </button>
                </div>

                {/* Savings Banner */}
                <div
                  className={`text-center border ${
                    selectedPlan === "12" ? "bg-green-50 border-green-200" : "bg-transparent border-transparent"
                  }`}
                  style={{ padding: "1cqw", borderRadius: "1cqw", marginBottom: "2cqw" }}
                >
                  <p
                    className={`font-semibold ${selectedPlan === "12" ? "text-green-700" : "text-transparent"}`}
                    style={{ fontSize: "1.1cqw" }}
                  >
                    You save £{savings.toFixed(2)} with a 12-month plan!
                  </p>
                </div>

                {/* Price Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3cqw", marginBottom: "2cqw" }}>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "1.2cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.25cqw" }}>
                      Setup Fee
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "1.5cqw" }}>
                      £{setupFee.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "1.2cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.25cqw" }}>
                      Monthly Fee
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "1.5cqw" }}>
                      £{monthlyFee.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "1.2cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.25cqw" }}>
                      VAT (20%)
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "1.5cqw" }}>
                      £{vat.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="bg-muted/30"
                  style={{
                    borderRadius: "1.5cqw",
                    padding: "2cqw",
                    marginBottom: "2cqw",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p
                        className="text-muted-foreground"
                        style={{
                          fontSize: "1.1cqw",
                          marginBottom: "0.5cqw",
                        }}
                      >
                        Total First Month (inc. VAT)
                      </p>
                      <p className="font-bold text-foreground" style={{ fontSize: "3.5cqw" }}>
                        £{totalFirstMonth.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className="bg-green-100 text-green-700 font-semibold text-center"
                      style={{
                        borderRadius: "1cqw",
                        padding: "1cqw 1.25cqw",
                        fontSize: "0.95cqw",
                      }}
                    >
                      then £{monthlyAfterVAT.toFixed(2)}
                      <br />
                      /month inc. VAT
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() =>
                    navigate("/required-info", {
                      state: { ...location.state, product: "LSAs" },
                    })
                  }
                  fullWidth
                  style={{
                    padding: "2cqw",
                    fontSize: "1.5cqw",
                    borderRadius: "0.8cqw",
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
