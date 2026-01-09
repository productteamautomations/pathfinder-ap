import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check, Loader2 } from "lucide-react";
import PaymentProviders from "@/assets/payment-providers.svg";
import { buildPageWebhookPayload, sendPageWebhook } from "@/lib/webhookPayload";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useRecommendation } from "@/contexts/RecommendationContext";

export default function PricingLSA() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const { session } = useRecommendation();
  const [selectedPlan, setSelectedPlan] = useState<"6" | "12">("12");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setupFee = 199.0;
  const monthlyFee6 = 199.0;
  const monthlyFee12 = 149.0;
  const monthlyFee = selectedPlan === "12" ? monthlyFee12 : monthlyFee6;
  const vat = (setupFee) * 0.2;
  const totalFirstMonth = setupFee + vat;
  const monthlyAfterVAT = monthlyFee * 1.2;
  const savings = (monthlyFee6 - monthlyFee12) * 12;

  const features = [
    "Google Guaranteed badge setup",
    "LSA profile optimisation",
    "Review management",
    "Lead dispute handling",
    "Monthly performance reporting",
  ];

  const handleStartCampaign = async () => {
    if (isSubmitting) return;

    if (isLoading) {
      toast("Loading your profile...");
      return;
    }

    if (!user) {
      toast.error("Please sign in to continue");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    const pricingData = {
      product: "LSA",
      smartSiteIncluded: false,
      initialCost: totalFirstMonth.toFixed(2),
      monthlyCost: monthlyAfterVAT.toFixed(2),
      contractLength: selectedPlan === "12" ? "12 months" : "6 months",
    };

    // Send end page webhook
    const payload = buildPageWebhookPayload(
      {
        sessionId: session.sessionId,
        googleId: session.googleId,
        googleFullName: session.googleFullName,
        googleEmail: session.googleEmail,
        startTime: session.startTime,
      },
      location.state || {},
      pricingData,
      false, // isStartPage
      true, // isEndPage
      { step: 5, totalSteps: 5, maxStep: Math.max(session.maxStep, 5) },
      { product: "LSA", smartSiteIncluded: false }
    );

    try {
      await sendPageWebhook(payload);
      toast.success("Campaign started successfully!");
    } catch (error) {
      console.error("Webhook error:", error);
      // Continue anyway - navigation is more important than tracking
    }
    
    navigate("/required-info", {
      state: {
        ...location.state,
        ...pricingData,
      },
    });
    setIsSubmitting(false);
  };

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
                <span
                  className="font-semibold text-primary uppercase tracking-widest block"
                  style={{ fontSize: "1.1cqw", marginBottom: "2cqw" }}
                >
                  Recommended for you
                </span>
                <h1
                  className="font-display font-bold text-title leading-tight tracking-tight"
                  style={{ fontSize: "4.5cqw", marginBottom: "2cqw" }}
                >
                  Local Services Ads
                </h1>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: "1.25cqw", marginBottom: "3cqw" }}
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
                        style={{ width: "2.5cqw", height: "2.5cqw" }}
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
                {/* Plan Toggle */}
                <div style={{ marginBottom: "2.5cqw" }}>
                  <p className="font-semibold text-foreground" style={{ fontSize: "1.5cqw", marginBottom: "1cqw" }}>
                    Choose your plan
                  </p>
                  <div className="grid grid-cols-2" style={{ gap: "1cqw" }}>
                    <button
                      onClick={() => setSelectedPlan("6")}
                      className={`font-bold transition-all ${
                        selectedPlan === "6"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                      style={{ padding: "1.25cqw", fontSize: "1.1cqw", borderRadius: "1cqw" }}
                    >
                      6 Months
                    </button>
                    <button
                      onClick={() => setSelectedPlan("12")}
                      className={`font-bold transition-all relative ${
                        selectedPlan === "12"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                      style={{ padding: "1.25cqw", fontSize: "1.1cqw", borderRadius: "1cqw" }}
                    >
                      12 Months
                      {selectedPlan === "12" && (
                        <span
                          className="absolute bg-green-500 text-white font-bold rounded-full whitespace-nowrap"
                          style={{
                            top: "-0.8cqw",
                            right: "-0.8cqw",
                            padding: "0.4cqw 0.8cqw",
                            fontSize: "0.9cqw",
                          }}
                        >
                          Save £{savings.toFixed(2)}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2cqw", marginBottom: "1.5cqw" }}>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "1cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.35cqw" }}>
                      Setup Fee
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "1.75cqw" }}>
                      £{setupFee.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "1cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.35cqw" }}>
                      Monthly Fee
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "1.75cqw" }}>
                      £{monthlyFee.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="bg-muted/30"
                  style={{ borderRadius: "1.5cqw", padding: "1.5cqw", marginBottom: "1.5cqw" }}
                >
                  <div className="flex justify-between items-end" style={{ gap: "1cqw" }}>
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: "1.1cqw", marginBottom: "0.3cqw" }}>
                        First payment total inc. VAT
                      </p>
                      <p className="font-bold text-foreground" style={{ fontSize: "3.5cqw" }}>
                        £{totalFirstMonth.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-right" style={{ fontSize: "1.1cqw" }}>
                      then £{monthlyAfterVAT.toFixed(2)}/mo inc. VAT
                    </p>
                  </div>
                </div>

                {/* Payment Providers */}
                <img src={PaymentProviders} alt="Payment providers" style={{ width: "100%", marginBottom: "1.5cqw" }} />

                {/* CTA Button */}
                <Button
                  onClick={handleStartCampaign}
                  disabled={isSubmitting}
                  fullWidth
                  style={{ padding: "2cqw", fontSize: "1.5cqw", borderRadius: "0.8cqw" }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" style={{ width: "1.5cqw", height: "1.5cqw" }} />
                      Processing...
                    </span>
                  ) : (
                    "Start My Campaign"
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
