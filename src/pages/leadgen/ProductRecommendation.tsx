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
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 mb-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MousePointerClick className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Sponsored Search Ads</p>
              <p className="text-xs text-muted-foreground">Top of Google Results</p>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">Ad</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 mb-3 ml-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Click-Through Rate</p>
              <p className="text-xs text-muted-foreground">Industry-leading CTR</p>
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+45%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 ml-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Precise Targeting</p>
              <p className="text-xs text-muted-foreground">Location, device, demographics</p>
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Smart</span>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center"
        >
          <Zap className="w-7 h-7 text-white" strokeWidth={2} />
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
        onBack={() => navigate("/funnel-health", { state: location.state })}
        currentStep={4}
        totalSteps={7}
        showProgress
      />

      <div className="flex-1 pt-[73px] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 py-10 md:py-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Lead Generation</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Why Google Ads is the <span className="text-primary font-semibold">Right Fit</span> for you.
          </p>
        </motion.div>

        <div className="flex-1 px-6 md:px-12 lg:px-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-[2rem] p-10 md:p-14 lg:p-18 max-w-7xl mx-auto shadow-lg border border-border/30"
          >
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                  Stay Ahead of Competitors In Google Search Results
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  Get your business in front of customers actively searching for your services. 
                  With Google Ads, you appear at the top of search results exactly when 
                  potential customers are ready to buy.
                </p>

                <div className="space-y-5 mb-12">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Key Benefits:
                  </h3>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-foreground text-base">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => navigate("/business-cycle/leadgen", { state: location.state })}
                  className="px-8"
                >
                  Learn About Our Process
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
