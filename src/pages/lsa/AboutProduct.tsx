import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, AlertTriangle, Lightbulb } from "lucide-react";
import { TopographicBackground } from "@/components/TopographicBackground";
import TheProblemImage from "@/assets/lsa-the-problem.svg";
import TheSolutionImage from "@/assets/lsa-the-solution.svg";
import TheBenefitImage from "@/assets/lsa-the-benefit.svg";

const benefits = [
  "More ready-to-book customers",
  "Zero wasted spend on irrelevant clicks",
  "Jobs only from your chosen service areas",
  "The Google Guaranteed badge builds instant trust",
  "Higher-quality leads and more booked work",
];

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background relative">
      <TopographicBackground />
      <PageHeader
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })}
        currentStep={2}
        totalSteps={4}
        showProgress
        productLabel="LSAs"
      />

      <div className="flex-1 flex flex-col relative z-10" style={{ paddingTop: "73px", containerType: "size" }}>
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center flex-shrink-0"
          style={{ paddingLeft: "2cqw", paddingRight: "2cqw", paddingTop: "0.5cqh", paddingBottom: "0.5cqh" }}
        >
          <h1 className="font-display font-bold text-title tracking-tight" style={{ fontSize: "2.8cqw" }}>
            How Local Service Ads Work
          </h1>
        </motion.div>

        {/* Cards Section */}
        <div
          className="flex-1 flex items-center justify-center overflow-hidden"
          style={{ paddingLeft: "2cqw", paddingRight: "2cqw", paddingBottom: "0.5cqh" }}
        >
          <div
            className="flex flex-col md:flex-row w-full h-full"
            style={{ gap: "1.2cqw", maxWidth: "90cqw" }}
          >
            {/* The Problem Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex-1 border border-border/30 shadow-lg flex flex-col bg-white"
              style={{ borderRadius: "1.2cqw", padding: "1.5cqw" }}
            >
              <div className="flex items-center justify-center" style={{ gap: "0.6cqw", marginBottom: "0.8cqw" }}>
                <div
                  className="bg-red-500/10 flex items-center justify-center flex-shrink-0 rounded-lg"
                  style={{ width: "2.5cqw", height: "2.5cqw", borderRadius: "0.6cqw" }}
                >
                  <AlertTriangle className="text-red-500" style={{ width: "1.5cqw", height: "1.5cqw" }} />
                </div>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "1.8cqw" }}>
                  The Problem
                </h2>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <img
                  src={TheProblemImage}
                  alt="The Problem"
                  className="w-auto object-contain"
                  style={{ maxHeight: "38cqh" }}
                />
              </div>

              <p className="text-foreground text-center font-medium" style={{ fontSize: "1.3cqw", lineHeight: "1.3", marginTop: "0.5cqh" }}>
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
              style={{ borderRadius: "1.2cqw", padding: "1.5cqw" }}
            >
              <div className="flex items-center justify-center" style={{ gap: "0.6cqw", marginBottom: "0.8cqw" }}>
                <div
                  className="bg-amber-500/10 flex items-center justify-center flex-shrink-0"
                  style={{ width: "2.5cqw", height: "2.5cqw", borderRadius: "0.6cqw" }}
                >
                  <Lightbulb className="text-amber-500" style={{ width: "1.5cqw", height: "1.5cqw" }} />
                </div>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "1.8cqw" }}>
                  The Solution
                </h2>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <img
                  src={TheSolutionImage}
                  alt="The Solution"
                  className="w-auto object-contain"
                  style={{ maxHeight: "38cqh" }}
                />
              </div>

              <p className="text-foreground text-center font-medium" style={{ fontSize: "1.3cqw", lineHeight: "1.3", marginTop: "0.5cqh" }}>
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
              style={{ borderRadius: "1.2cqw", padding: "1.5cqw" }}
            >
              <div className="flex items-center justify-center" style={{ gap: "0.6cqw", marginBottom: "0.8cqw" }}>
                <div
                  className="bg-green-500/10 flex items-center justify-center flex-shrink-0"
                  style={{ width: "2.5cqw", height: "2.5cqw", borderRadius: "0.6cqw" }}
                >
                  <Check className="text-green-500" style={{ width: "1.5cqw", height: "1.5cqw" }} />
                </div>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "1.8cqw" }}>
                  The Benefit
                </h2>
              </div>

              <div className="flex items-center justify-center" style={{ marginBottom: "1cqh" }}>
                <img
                  src={TheBenefitImage}
                  alt="Google Guaranteed"
                  className="w-auto object-contain"
                  style={{ height: "6cqh" }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-center" style={{ gap: "0.8cqh" }}>
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
                      style={{ width: "1.5cqw", height: "1.5cqw", marginTop: "0.15cqw" }}
                    >
                      <Check className="text-white" strokeWidth={3} style={{ width: "1cqw", height: "1cqw" }} />
                    </div>
                    <span className="text-foreground leading-tight" style={{ fontSize: "1.3cqw" }}>
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
          style={{ paddingTop: "1cqh", paddingBottom: "1.5cqh" }}
        >
          <Button
            onClick={() => navigate("/about/lsa", { state: location.state })}
            style={{
              fontSize: "1.4cqw",
              paddingLeft: "3cqw",
              paddingRight: "3cqw",
              paddingTop: "1cqh",
              paddingBottom: "1cqh",
            }}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
