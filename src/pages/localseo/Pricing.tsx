import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check, Plus, Loader2 } from "lucide-react";
import PaymentProviders from "@/assets/payment-providers.svg";
import { useRecommendation } from "@/contexts/RecommendationContext";
import { buildPageWebhookPayload, sendPageWebhook } from "@/lib/webhookPayload";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function PricingLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendation, session } = useRecommendation();
  const { user, isLoading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<"6" | "12">("12");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SmartSite toggle - auto-enabled if isBig3 is false, but can be manually toggled
  const smartSiteRequired = recommendation.isBig3 === false;
  const [smartSiteEnabled, setSmartSiteEnabled] = useState(smartSiteRequired);
  const smartSiteFee = 199.0;

  const setupFee = 349.0;
  const monthlyFee6 = 299.0;
  const monthlyFee12 = 249.0;
  const monthlyFee = selectedPlan === "12" ? monthlyFee12 : monthlyFee6;
  const baseTotal = setupFee;
  const addonTotal = smartSiteEnabled ? smartSiteFee : 0;
  const vat = (baseTotal + addonTotal) * 0.2;
  const totalFirstMonth = baseTotal + addonTotal + vat;
  const monthlyAfterVAT = monthlyFee * 1.2;
  const savings = (monthlyFee6 - monthlyFee12) * 12;

  const features = [
    "Google Business Profile optimisation",
    "Local keyword targeting",
    "Perfectly optimised local content",
    "Best-practice technical SEO",
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
      product: "Local SEO",
      smartSiteIncluded: smartSiteEnabled,
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
      { step: 8, totalSteps: 8, maxStep: Math.max(session.maxStep, 8) },
      { product: "Local SEO", smartSiteIncluded: smartSiteEnabled },
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
        onBack={() => navigate("/about/localseo", { state: location.state })}
        currentStep={7}
        totalSteps={7}
        showProgress
        productLabel="Local SEO"
        showSmartSite={smartSiteEnabled}
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
                  Local SEO
                </h1>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: "1.25cqw", marginBottom: "3cqw" }}
                >
                  Stay ahead of competitors in search results and Google Maps when customers in your area search for
                  services like yours.
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
                <div style={{ marginBottom: "2cqw" }}>
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
                    style={{ padding: "0.8cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.2cqw" }}>
                      Setup Fee
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "1.5cqw" }}>
                      £{setupFee.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center border-b border-border/40"
                    style={{ padding: "0.8cqw 0" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "1.2cqw" }}>
                      Monthly Fee
                    </span>
                    <span className="font-bold text-foreground" style={{ fontSize: "1.5cqw" }}>
                      £{monthlyFee.toFixed(2)}
                    </span>
                  </div>

                  {/* SmartSite Toggle */}
                  <div
                    className="border-b border-border/40"
                    style={{ padding: "0.8cqw 0" }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center" style={{ gap: "0.75cqw" }}>
                        <button
                          onClick={() => setSmartSiteEnabled(!smartSiteEnabled)}
                          className={`relative transition-all flex-shrink-0 ${
                            smartSiteEnabled ? "bg-primary" : "bg-muted"
                          }`}
                          style={{
                            width: "3.5cqw",
                            height: "2cqw",
                            borderRadius: "1cqw",
                          }}
                        >
                          <span
                            className={`absolute bg-white rounded-full shadow-sm transition-all ${
                              smartSiteEnabled ? "translate-x-[1.5cqw]" : "translate-x-0"
                            }`}
                            style={{
                              width: "1.6cqw",
                              height: "1.6cqw",
                              top: "0.2cqw",
                              left: "0.2cqw",
                            }}
                          />
                        </button>
                        <Plus className={`${smartSiteEnabled ? "text-primary" : "text-muted-foreground"}`} style={{ width: "1.2cqw", height: "1.2cqw" }} />
                        <span className={`font-medium ${smartSiteEnabled ? "text-primary" : "text-muted-foreground"}`} style={{ fontSize: "1.2cqw" }}>
                          SmartSite
                        </span>
                        {smartSiteRequired && (
                          <span 
                            className="bg-primary/10 text-primary font-medium rounded-full"
                            style={{ fontSize: "0.8cqw", padding: "0.2cqw 0.6cqw" }}
                          >
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className={`font-bold transition-all ${smartSiteEnabled ? "text-foreground" : "text-muted-foreground/50"}`} style={{ fontSize: "1.5cqw" }}>
                        £{smartSiteFee.toFixed(2)}
                      </span>
                    </div>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.9cqw", marginTop: "0.3cqw", paddingLeft: "1.7cqw" }}
                    >
                      {smartSiteRequired 
                        ? "Your website's framework isn't compatible with our tracking tools. SmartSite ensures accurate conversion measurement."
                        : "Add SmartSite for enhanced conversion tracking and optimised landing pages."
                      }
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="bg-muted/30"
                  style={{ borderRadius: "1.5cqw", padding: "1.25cqw", marginBottom: "1.25cqw" }}
                >
                  <div className="flex justify-between items-end" style={{ gap: "1cqw" }}>
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: "1cqw", marginBottom: "0.2cqw" }}>
                        First payment total inc. VAT
                      </p>
                      <p className="font-bold text-foreground" style={{ fontSize: "3cqw" }}>
                        £{totalFirstMonth.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-right" style={{ fontSize: "1cqw" }}>
                      then £{monthlyAfterVAT.toFixed(2)}/mo inc. VAT
                    </p>
                  </div>
                </div>

                {/* Payment Providers */}
                <img
                  src={PaymentProviders}
                  alt="Payment providers"
                  style={{ width: "100%", marginBottom: "1.25cqw" }}
                />

                {/* CTA Button */}
                <Button
                  onClick={handleStartCampaign}
                  disabled={isSubmitting}
                  fullWidth
                  style={{ padding: "1.75cqw", fontSize: "1.4cqw", borderRadius: "0.8cqw" }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" style={{ width: "1.4cqw", height: "1.4cqw" }} />
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
