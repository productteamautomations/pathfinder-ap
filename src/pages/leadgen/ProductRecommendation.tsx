import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, MousePointerClick, TrendingUp, Target, Zap } from "lucide-react";

const benefits = [
  "Appear at the top of Google Search results",
  "Pay only when potential customers click",
  "Target customers by location, device & time",
  "Track every lead back to its source",
];

function LeadGenIllustration() {
  return (
    <div className="relative w-full mx-auto">
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

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/fact-finder", { state: location.state })}
        currentStep={3}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 flex flex-col" style={{ paddingTop: "73px" }}>
        {/* Title and Subtitle Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
          style={{ padding: "2vh 2vw" }}
        >
          <h1 className="font-display font-bold text-title tracking-tight" style={{ fontSize: "4vw" }}>
            Lead Generation
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "1.5vw", marginTop: "1vh", maxWidth: "50vw", marginLeft: "auto", marginRight: "auto" }}
          >
            Why Google Ads is the <span className="text-green-600 font-semibold">Right Fit</span> for you.
          </p>
        </motion.div>

        {/* Card Section with max 5% bottom margin */}
        <div className="flex-1 flex items-center justify-center" style={{ paddingBottom: "5vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white border border-border/30 shadow-lg"
            style={{
              width: "min(90vw, calc((100vh - 73px - 12vh) * 2.2))",
              height: "calc(100vh - 73px - 12vh - 5vh)",
              maxHeight: "calc(100vh - 73px - 12vh - 5vh)",
              containerType: "size",
              borderRadius: "2.5cqw",
              padding: "3cqw",
            }}
          >
            <div className="grid md:grid-cols-2 items-center h-full" style={{ gap: "4cqw" }}>
              <div>
                <h2
                  className="font-display font-bold text-title"
                  style={{ fontSize: "2.5cqw", marginBottom: "1.5cqw" }}
                >
                  Stay Ahead of Competitors In Google Search Results
                </h2>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: "1.3cqw", marginBottom: "2.5cqw" }}
                >
                  Get your business in front of customers actively searching for your services. With Google Ads, you
                  appear at the top of search results exactly when potential customers are ready to buy.
                </p>

                <div style={{ marginBottom: "3cqw" }}>
                  <h3
                    className="font-semibold text-muted-foreground uppercase tracking-wider"
                    style={{ fontSize: "1cqw", marginBottom: "1.5cqw" }}
                  >
                    Key Benefits:
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
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
                          style={{ width: "1.8cqw", height: "1.8cqw", borderRadius: "50%" }}
                        >
                          <Check style={{ width: "1.1cqw", height: "1.1cqw" }} className="text-white" strokeWidth={3} />
                        </div>
                        <span className="text-foreground" style={{ fontSize: "1.3cqw" }}>
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/funnel-diagnostic/leadgen", { state: location.state })}
                  style={{ fontSize: "1.3cqw", padding: "1.2cqw 2.5cqw", borderRadius: "0.8cqw" }}
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
