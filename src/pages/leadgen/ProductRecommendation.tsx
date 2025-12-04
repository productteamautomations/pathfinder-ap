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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <PageHeader
        onBack={() => navigate("/funnel-health", { state: location.state })}
        currentStep={4}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lead Generation</h1>
            <p className="text-xl text-gray-600 mb-8">Why Google Ads is the Right Fit for you.</p>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Stay Ahead of Competitors In Google Search Results
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Get your business in front of customers actively searching for your services. With Google Ads, you
                appear at the top of search results exactly when potential customers are ready to buy.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Key Benefits:</h3>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => navigate("/business-cycle/leadgen", { state: location.state })}
                className="w-full sm:w-auto px-8"
              >
                Learn About Our Process
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden lg:block"
          >
            <LeadGenIllustration />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
