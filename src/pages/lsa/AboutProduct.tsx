import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, AlertTriangle, Lightbulb } from "lucide-react";
import { TopographicBackground } from "@/components/TopographicBackground";
import TheProblemImage from "@/assets/lsa-the-problem.svg";
import TheSolutionImage from "@/assets/lsa-the-solution.svg";
import TheBenefitImage from "@/assets/lsa-the-benefit.svg";
import { buildPageWebhookPayload, sendPageWebhook } from "@/lib/webhookPayload";
import { useRecommendation } from "@/contexts/RecommendationContext";

const benefits = [
  "More ready-to-book customers",
  "Zero wasted spend on irrelevant clicks",
  "Jobs only from your chosen service areas",
  "The Google Guaranteed badge builds instant trust",
];

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, updateMaxStep, recommendation } = useRecommendation();
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background relative" style={{ containerType: "size" }}>
      <TopographicBackground />
      <PageHeader
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })}
        currentStep={2}
        totalSteps={4}
        showProgress
        productLabel="LSAs"
        showSmartSiteToggle
      />

      <div className="flex-1 flex flex-col relative z-10" style={{ paddingTop: "10cqh" }}>
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center flex-shrink-0"
          style={{
            paddingLeft: "max(5%, 4cqw)",
            paddingRight: "max(5%, 4cqw)",
            paddingTop: "1cqw",
            paddingBottom: "0.5cqw",
          }}
        >
          <h1 className="font-display font-bold text-title tracking-tight" style={{ fontSize: "3.5cqw" }}>
            How Local Service Ads Work
          </h1>
        </motion.div>

        {/* Cards Section */}
        <div
          className="flex-1 flex items-center justify-center overflow-hidden min-h-0"
          style={{
            paddingLeft: "max(5%, 4cqw)",
            paddingRight: "max(5%, 4cqw)",
            paddingBottom: "0.5cqw",
            paddingTop: "0.5cqw",
          }}
        >
          <div
            className="flex flex-col md:flex-row w-full h-full justify-center"
            style={{ gap: "1.3cqw", maxWidth: "75cqw", maxHeight: "100%" }}
          >
            {/* The Problem Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex-1 border border-border/30 shadow-lg flex flex-col bg-white"
              style={{ borderRadius: "1.2cqw", padding: "1.8cqw", aspectRatio: "1 / 1.1", maxHeight: "100%" }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ gap: "0.7cqw", marginBottom: "0.9cqw" }}
              >
                <div
                  className="bg-red-500/10 flex items-center justify-center flex-shrink-0 rounded-lg"
                  style={{ width: "3cqw", height: "3cqw", borderRadius: "0.7cqw" }}
                >
                  <AlertTriangle className="text-red-500" style={{ width: "1.7cqw", height: "1.7cqw" }} />
                </div>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "2.2cqw" }}>
                  The Problem
                </h2>
              </div>

              <div
                className="flex-1 flex items-center justify-center min-h-0"
                style={{ marginTop: "0.4cqw", marginBottom: "0.4cqw" }}
              >
                <img
                  src={TheProblemImage}
                  alt="The Problem"
                  className="w-full h-full object-contain"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>

              <p
                className="text-foreground text-center font-medium flex-shrink-0"
                style={{ fontSize: "1.2cqw", lineHeight: "1.35", marginTop: "0.9cqw" }}
              >
                Wasted budget on clicks, not jobs.
                <br />
                Wrong areas & lack of trust.
              </p>
            </motion.div>

            {/* The Solution Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex-1 border border-border/30 shadow-lg flex flex-col bg-white"
              style={{ borderRadius: "1.2cqw", padding: "1.8cqw", aspectRatio: "1 / 1.1", maxHeight: "100%" }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ gap: "0.7cqw", marginBottom: "0.9cqw" }}
              >
                <div
                  className="bg-amber-500/10 flex items-center justify-center flex-shrink-0"
                  style={{ width: "3cqw", height: "3cqw", borderRadius: "0.7cqw" }}
                >
                  <Lightbulb className="text-amber-500" style={{ width: "1.7cqw", height: "1.7cqw" }} />
                </div>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "2.2cqw" }}>
                  The Solution
                </h2>
              </div>

              <div
                className="flex-1 flex items-center justify-center min-h-0"
                style={{ marginTop: "0.4cqw", marginBottom: "0.4cqw" }}
              >
                <img
                  src={TheSolutionImage}
                  alt="The Solution"
                  className="w-full h-full object-contain"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>

              <p
                className="text-foreground text-center font-medium flex-shrink-0"
                style={{ fontSize: "1.2cqw", lineHeight: "1.35", marginTop: "0.9cqw" }}
              >
                Top placement on Google.
                <br />
                Pay only for qualified calls (30+ sec).
              </p>
            </motion.div>

            {/* The Benefit Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex-1 border border-border/30 shadow-lg flex flex-col bg-white"
              style={{ borderRadius: "1.2cqw", padding: "1.8cqw", aspectRatio: "1 / 1.1", maxHeight: "100%" }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ gap: "0.7cqw", marginBottom: "0.9cqw" }}
              >
                <div
                  className="bg-green-500/10 flex items-center justify-center flex-shrink-0"
                  style={{ width: "3cqw", height: "3cqw", borderRadius: "0.7cqw" }}
                >
                  <Check className="text-green-500" style={{ width: "1.7cqw", height: "1.7cqw" }} />
                </div>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "2.2cqw" }}>
                  The Benefit
                </h2>
              </div>

              <div className="flex items-center justify-center flex-shrink-0" style={{ marginBottom: "0.9cqw" }}>
                <img
                  src={TheBenefitImage}
                  alt="Google Guaranteed"
                  className="w-auto object-contain"
                  style={{ height: "4.125cqw" }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-center min-h-0" style={{ gap: "0.8cqw" }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start"
                    style={{ gap: "0.6cqw" }}
                  >
                    <div
                      className="bg-green-500 flex items-center justify-center flex-shrink-0 rounded-full"
                      style={{ width: "1.6cqw", height: "1.6cqw", marginTop: "0.15cqw" }}
                    >
                      <Check className="text-white" strokeWidth={3} style={{ width: "1cqw", height: "1cqw" }} />
                    </div>
                    <span className="text-foreground leading-tight" style={{ fontSize: "1.2cqw", lineHeight: "1.35" }}>
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex justify-center flex-shrink-0"
          style={{
            paddingTop: "0.8cqw",
            paddingBottom: "1.2cqw",
            paddingLeft: "max(5%, 4cqw)",
            paddingRight: "max(5%, 4cqw)",
          }}
        >
          <Button
            onClick={() => {
              try {
                updateMaxStep(4);
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
                  { step: 4, totalSteps: 5, maxStep: Math.max(session?.maxStep || 0, 4) },
                  { product: "LSA", smartSiteIncluded: false }
                );
                sendPageWebhook(payload);
              } catch (e) {
                console.error("Webhook error:", e);
              }
              navigate("/about/lsa", { state: location.state });
            }}
            style={{
              fontSize: "1.5cqw",
              paddingLeft: "3.5cqw",
              paddingRight: "3.5cqw",
              paddingTop: "1cqw",
              paddingBottom: "1cqw",
              borderRadius: "0.8cqw",
            }}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
