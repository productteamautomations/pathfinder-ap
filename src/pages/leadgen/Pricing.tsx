import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check, Clock, Plus } from "lucide-react";
import PaymentProviders from "@/assets/payment-providers.svg";
import { useRecommendation } from "@/contexts/RecommendationContext";

export default function PricingLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendation } = useRecommendation();

  const requiresSmartSite = recommendation.isBig3 === false;
  const smartSiteFee = 599.0;

  const trialFee = 649.0;
  const addonTotal = requiresSmartSite ? smartSiteFee : 0;
  const vat = (trialFee + addonTotal) * 0.2;
  const totalWithVAT = trialFee + addonTotal + vat;

  const features = [
    "Google Ads campaign management",
    "Advanced data gathering",
    "Advanced conversion tracking",
    "Weekly performance updates",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <TopographicBackground />
      <PageHeader
        onBack={() => navigate("/about/leadgen", { state: location.state })}
        currentStep={7}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
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
                {/* Trial Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="inline-flex items-center bg-primary/10 text-primary rounded-full font-semibold"
                  style={{
                    gap: "0.75cqw",
                    padding: "0.75cqw 1.5cqw",
                    fontSize: "1.1cqw",
                    marginBottom: "2cqw",
                  }}
                >
                  <Clock style={{ width: "1.25cqw", height: "1.25cqw" }} />6 Week Trial
                </motion.div>

                <h1
                  className="font-display font-bold text-title leading-tight tracking-tight"
                  style={{
                    fontSize: "4.5cqw",
                    marginBottom: "2cqw",
                  }}
                >
                  Lead Generation
                </h1>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{
                    fontSize: "1.25cqw",
                    marginBottom: "3cqw",
                  }}
                >
                  Try our professional Google Ads management with full campaign setup, conversion tracking, and
                  optimisation - risk free.
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
                {/* Trial Pricing Header */}
                <div style={{ marginBottom: "2cqw" }}>
                  <p
                    className="font-semibold text-foreground"
                    style={{
                      fontSize: "1.5cqw",
                      marginBottom: "0.75cqw",
                    }}
                  >
                    Trial Investment
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "1.1cqw" }}>
                    One-time payment for 6-weeks of full service
                  </p>
                </div>

                {/* Price Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2cqw", marginBottom: "2cqw" }}>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "1cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.2cqw" }}>
                      6-Week Trial
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "1.5cqw" }}>
                      £{trialFee.toFixed(2)}
                    </span>
                  </div>
                  
                  {/* SmartSite Addon */}
                  {requiresSmartSite && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-b border-border/40"
                      style={{ padding: "1cqw 0" }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center" style={{ gap: "0.5cqw" }}>
                          <Plus className="text-primary" style={{ width: "1.2cqw", height: "1.2cqw" }} />
                          <span className="text-primary font-medium" style={{ fontSize: "1.2cqw" }}>
                            SmartSite
                          </span>
                        </div>
                        <span className="font-bold text-foreground" style={{ fontSize: "1.5cqw" }}>
                          £{smartSiteFee.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-muted-foreground" style={{ fontSize: "0.9cqw", marginTop: "0.3cqw", paddingLeft: "1.7cqw" }}>
                        A conversion-optimised landing page built for accurate tracking
                      </p>
                    </motion.div>
                  )}
                  
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "1cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.2cqw" }}>
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
                          fontSize: "1cqw",
                          marginBottom: "0.3cqw",
                        }}
                      >
                        Total (inc. VAT)
                      </p>
                      <p className="font-bold text-foreground" style={{ fontSize: "3.5cqw" }}>
                        £{totalWithVAT.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className="bg-green-100 text-green-700 font-semibold text-center"
                      style={{
                        borderRadius: "1cqw",
                        padding: "1cqw 1.25cqw",
                        fontSize: "0.9cqw",
                      }}
                    >
                      No ongoing
                      <br />
                      commitment
                    </div>
                  </div>
                </div>

                {/* Payment Providers */}
                <img
                  src={PaymentProviders}
                  alt="Accepted payment methods"
                  style={{
                    width: "100%",
                    marginBottom: "1.25cqw",
                  }}
                />

                {/* CTA Button */}
                <Button
                  onClick={() =>
                    navigate("/required-info", {
                      state: { ...location.state, product: "Lead Generation", requiresSmartSite },
                    })
                  }
                  fullWidth
                  style={{
                    padding: "1.75cqw",
                    fontSize: "1.4cqw",
                    borderRadius: "0.8cqw",
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
