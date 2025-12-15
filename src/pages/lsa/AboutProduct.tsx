import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, AlertTriangle, Lightbulb, TrendingUp, BadgeCheck, MapPin, Phone, PoundSterling } from "lucide-react";

const benefits = [
  { icon: TrendingUp, text: "More ready-to-book customers" },
  { icon: PoundSterling, text: "Zero wasted spend on irrelevant clicks" },
  { icon: MapPin, text: "Jobs only from your chosen service areas" },
  { icon: BadgeCheck, text: "The Google Guaranteed badge builds instant trust" },
  { icon: Phone, text: "Higher-quality leads and more booked work" },
];

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <PageHeader
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })}
        currentStep={2}
        totalSteps={4}
        showProgress
        productLabel="LSAs"
      />

      <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingTop: "73px" }}>
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center flex-shrink-0"
          style={{ padding: "1.5vh 2vw" }}
        >
          <h1 className="font-display font-bold text-title tracking-tight" style={{ fontSize: "3.5vw" }}>
            How Local Service Ads Work
          </h1>
        </motion.div>

        {/* Card Section */}
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
            <div className="grid md:grid-cols-3 h-full overflow-hidden" style={{ gap: "3cqw" }}>
              {/* The Problem */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "1.5cqh" }}>
                  <div
                    className="bg-red-500/10 flex items-center justify-center flex-shrink-0"
                    style={{ width: "3.5cqw", height: "3.5cqw", borderRadius: "0.8cqw" }}
                  >
                    <AlertTriangle style={{ width: "2cqw", height: "2cqw" }} className="text-red-500" />
                  </div>
                  <h2 className="font-display font-bold text-title" style={{ fontSize: "2cqw" }}>
                    The Problem
                  </h2>
                </div>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: "1.4cqw", lineHeight: "1.6" }}
                >
                  Most local businesses waste money on ads that don't turn into real jobs. You pay for clicks, enquiries come from the wrong areas, and customers don't always trust who they're calling.
                </p>
              </motion.div>

              {/* The Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "1.5cqh" }}>
                  <div
                    className="bg-blue-500/10 flex items-center justify-center flex-shrink-0"
                    style={{ width: "3.5cqw", height: "3.5cqw", borderRadius: "0.8cqw" }}
                  >
                    <Lightbulb style={{ width: "2cqw", height: "2cqw" }} className="text-blue-500" />
                  </div>
                  <h2 className="font-display font-bold text-title" style={{ fontSize: "2cqw" }}>
                    The Solution
                  </h2>
                </div>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: "1.4cqw", lineHeight: "1.6" }}
                >
                  Google Local Service Ads put your business right at the top of Google when people in your area are actively looking for your service. You only pay for real phone calls, not clicks — and only if the call lasts 30 seconds or more.
                </p>
              </motion.div>

              {/* The Benefit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "1.5cqh" }}>
                  <div
                    className="bg-green-500/10 flex items-center justify-center flex-shrink-0"
                    style={{ width: "3.5cqw", height: "3.5cqw", borderRadius: "0.8cqw" }}
                  >
                    <Check style={{ width: "2cqw", height: "2cqw" }} className="text-green-500" />
                  </div>
                  <h2 className="font-display font-bold text-title" style={{ fontSize: "2cqw" }}>
                    The Benefit
                  </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1cqh" }}>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center"
                      style={{ gap: "0.8cqw" }}
                    >
                      <div
                        className="bg-green-500 flex items-center justify-center flex-shrink-0"
                        style={{ width: "1.8cqw", height: "1.8cqw", borderRadius: "50%" }}
                      >
                        <Check
                          style={{ width: "1cqw", height: "1cqw" }}
                          className="text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-foreground" style={{ fontSize: "1.3cqw" }}>
                        {benefit.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex justify-center"
              style={{ marginTop: "2cqh" }}
            >
              <Button
                onClick={() => navigate("/about/lsa", { state: location.state })}
                style={{ fontSize: "1.4cqw", padding: "1.1cqh 3cqw", borderRadius: "0.8cqw" }}
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
