import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check, Clock } from "lucide-react";

export default function PricingLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();

  const trialFee = 499.0;
  const vat = trialFee * 0.2;
  const totalWithVAT = trialFee + vat;

  const features = [
    "Google Ads campaign management",
    "Responsive Search Ad creation",
    "Enhanced call tracking",
    "Weekly performance updates",
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
        className="flex items-center justify-center relative z-10"
        style={{ paddingTop: "73px", minHeight: "100vh" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{
            height: "calc((100vh - 73px) * 0.9)",
            aspectRatio: "1.65",
            maxWidth: "90vw",
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
                {/* Trial Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="inline-flex items-center bg-primary/10 text-primary rounded-full font-semibold"
                  style={{
                    gap: "clamp(0.5rem, 0.75vw, 0.625rem)",
                    padding: "clamp(0.5rem, 0.75vw, 0.625rem) clamp(1rem, 1.5vw, 1.25rem)",
                    fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                    marginBottom: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                >
                  <Clock style={{ width: "clamp(1rem, 1.25vw, 1.125rem)", height: "clamp(1rem, 1.25vw, 1.125rem)" }} />6
                  Week Trial
                </motion.div>

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
                  Try our professional Google Ads management with full campaign setup, call tracking, and hands-on
                  optimisation — risk free.
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
                {/* Trial Pricing Header */}
                <div style={{ marginBottom: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  <p
                    className="font-semibold text-foreground"
                    style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                      marginBottom: "clamp(0.5rem, 1vw, 0.75rem)",
                    }}
                  >
                    Trial Investment
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}>
                    One-time payment for 6 weeks of full service
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1" style={{ marginBottom: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "clamp(0.875rem, 1.5vw, 1.125rem) 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "clamp(1rem, 1.35vw, 1.25rem)" }}>
                      6 Week Trial
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "clamp(1.125rem, 1.75vw, 1.5rem)" }}>
                      £{trialFee.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "clamp(0.875rem, 1.5vw, 1.125rem) 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "clamp(1rem, 1.35vw, 1.25rem)" }}>
                      VAT (20%)
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "clamp(1.125rem, 1.75vw, 1.5rem)" }}>
                      £{vat.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="bg-muted/30 rounded-2xl"
                  style={{
                    padding: "clamp(1.5rem, 2.5vw, 2rem)",
                    marginBottom: "clamp(1.5rem, 2.5vw, 2rem)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p
                        className="text-muted-foreground"
                        style={{
                          fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                          marginBottom: "clamp(0.25rem, 0.5vw, 0.375rem)",
                        }}
                      >
                        Total (inc. VAT)
                      </p>
                      <p className="font-bold text-foreground" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
                        £{totalWithVAT.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className="bg-green-100 text-green-700 font-semibold rounded-xl text-center"
                      style={{
                        padding: "clamp(0.75rem, 1.25vw, 1rem) clamp(1rem, 1.5vw, 1.25rem)",
                        fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                      }}
                    >
                      No ongoing
                      <br />
                      commitment
                    </div>
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
                    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                  }}
                >
                  Start My Trial
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
