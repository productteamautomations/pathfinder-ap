import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, MousePointerClick, TrendingUp, Target, Zap } from "lucide-react";
import { buildPageWebhookPayload, sendPageWebhook } from "@/lib/webhookPayload";
import { useRecommendation } from "@/contexts/RecommendationContext";

const benefits = [
  "Appear at the top of Google Search results",
  "Pay only when potential customers click",
  "Target customers by location, device & time",
  "Track every lead back to its source",
];

function LeadGenIllustration() {
  return (
    <div className="relative w-full mx-auto" style={{ padding: "1.5cqw 2cqw 1cqw 0" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <div
          className="bg-white border border-border/20"
          style={{
            borderRadius: "1.2cqw",
            padding: "1.5cqw",
            marginBottom: "1cqw",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center" style={{ gap: "1.2cqw" }}>
            <div
              className="bg-primary/10 flex items-center justify-center"
              style={{ width: "3cqw", height: "3cqw", borderRadius: "0.8cqw" }}
            >
              <MousePointerClick style={{ width: "1.5cqw", height: "1.5cqw" }} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground" style={{ fontSize: "1.3cqw" }}>
                Sponsored Search Ads
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                Top of Google Results
              </p>
            </div>
            <span
              className="font-bold text-primary bg-primary/10"
              style={{ fontSize: "1cqw", padding: "0.3cqw 0.6cqw", borderRadius: "999px" }}
            >
              Ad
            </span>
          </div>
        </div>

        <div
          className="bg-white border border-border/20"
          style={{
            borderRadius: "1.2cqw",
            padding: "1.5cqw",
            marginBottom: "1cqw",
            marginLeft: "2cqw",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center" style={{ gap: "1.2cqw" }}>
            <div
              className="bg-green-500/10 flex items-center justify-center"
              style={{ width: "3cqw", height: "3cqw", borderRadius: "0.8cqw" }}
            >
              <TrendingUp style={{ width: "1.5cqw", height: "1.5cqw" }} className="text-green-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground" style={{ fontSize: "1.3cqw" }}>
                Click-Through Rate
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                Industry-leading CTR
              </p>
            </div>
            <span
              className="font-bold text-green-500 bg-green-50"
              style={{ fontSize: "1cqw", padding: "0.3cqw 0.6cqw", borderRadius: "999px" }}
            >
              +45%
            </span>
          </div>
        </div>

        <div
          className="bg-white border border-border/20"
          style={{
            borderRadius: "1.2cqw",
            padding: "1.5cqw",
            marginLeft: "1cqw",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center" style={{ gap: "1.2cqw" }}>
            <div
              className="bg-blue-500/10 flex items-center justify-center"
              style={{ width: "3cqw", height: "3cqw", borderRadius: "0.8cqw" }}
            >
              <Target style={{ width: "1.5cqw", height: "1.5cqw" }} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground" style={{ fontSize: "1.3cqw" }}>
                Precise Targeting
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                Location, device, demographics
              </p>
            </div>
            <span
              className="font-bold text-blue-500 bg-blue-50"
              style={{ fontSize: "1cqw", padding: "0.3cqw 0.6cqw", borderRadius: "999px" }}
            >
              Smart
            </span>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute bg-primary shadow-lg flex items-center justify-center"
          style={{ top: "-1cqw", right: "-1cqw", width: "4.5cqw", height: "4.5cqw", borderRadius: "50%" }}
        >
          <Zap style={{ width: "2.5cqw", height: "2.5cqw" }} className="text-white" strokeWidth={2} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductRecommendationLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, updateMaxStep, recommendation } = useRecommendation();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <PageHeader
        onBack={() => navigate("/fact-finder", { state: location.state })}
        currentStep={2}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
        showSmartSiteToggle
      />

      <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingTop: "73px" }}>
        {/* Title and Subtitle Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center flex-shrink-0"
          style={{ padding: "1.5vh 2vw" }}
        >
          <h1 className="font-display font-bold text-title tracking-tight" style={{ fontSize: "3.5vw" }}>
            Lead Generation
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "1.3vw", marginTop: "0.5vh", maxWidth: "50vw", marginLeft: "auto", marginRight: "auto" }}
          >
            Why Google Ads is the <span className="text-green-600 font-semibold">Right Fit</span> for you.
          </p>
        </motion.div>

        {/* Card Section with max 2.18:1 aspect ratio, 5% bottom margin */}
        <div className="flex-1 flex items-start justify-center overflow-hidden" style={{ padding: "1vh 0 5vh 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white border border-border/30 shadow-lg overflow-hidden"
            style={{
              height: "100%",
              aspectRatio: "2.18 / 1",
              maxWidth: "100vw",
              containerType: "size",
              borderRadius: "2.5cqh",
              padding: "3cqh 3cqw",
            }}
          >
            <div className="grid md:grid-cols-2 items-center h-full overflow-hidden" style={{ gap: "4cqw" }}>
              <div className="flex flex-col justify-center h-full overflow-hidden">
                <h2
                  className="font-display font-bold text-title"
                  style={{ fontSize: "min(3.3cqw, 8.5cqh)", marginBottom: "1.6cqh" }}
                >
                  Stay Ahead of Competitors In Google Search Results
                </h2>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: "min(1.5cqw, 3.2cqh)", marginBottom: "2.2cqh" }}
                >
                  Get your business in front of customers actively searching for your services. With Google Ads, you
                  appear at the top of search results exactly when potential customers are ready to buy.
                </p>

                <div style={{ marginBottom: "2.8cqh" }}>
                  <h3
                    className="font-semibold text-muted-foreground uppercase tracking-wider"
                    style={{ fontSize: "min(1.1cqw, 2.2cqh)", marginBottom: "1.4cqh" }}
                  >
                    Key Benefits:
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.1cqh" }}>
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center"
                        style={{ gap: "1cqw" }}
                      >
                        <div
                          className="bg-green-500 flex items-center justify-center flex-shrink-0"
                          style={{ width: "min(2cqw, 3.8cqh)", height: "min(2cqw, 3.8cqh)", borderRadius: "50%" }}
                        >
                          <Check
                            style={{ width: "min(1.2cqw, 2.4cqh)", height: "min(1.2cqw, 2.4cqh)" }}
                            className="text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-foreground" style={{ fontSize: "min(1.4cqw, 3cqh)" }}>
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    try {
                      updateMaxStep(3);
                      const state = location.state as any;
                      const payload = buildPageWebhookPayload(
                        {
                          sessionId: session?.sessionId,
                          googleId: session?.googleId,
                          googleFullName: session?.googleFullName,
                          googleEmail: session?.googleEmail,
                          startTime: session?.startTime,
                        },
                        state || {},
                        null,
                        false,
                        false,
                        { step: 3, totalSteps: 8, maxStep: Math.max(session?.maxStep || 0, 3) },
                        { product: "LeadGen Trial", smartSiteIncluded: null }
                      );
                      sendPageWebhook(payload);
                    } catch (e) {
                      console.error("Webhook error:", e);
                    }
                    navigate("/funnel-diagnostic/leadgen", { state: location.state });
                  }}
                  style={{ fontSize: "min(1.4cqw, 3cqh)", padding: "1.1cqh 2.4cqw", borderRadius: "0.8cqw" }}
                >
                  Start Your Assessment
                </Button>
              </div>

              <div className="hidden md:block">
                <LeadGenIllustration />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
