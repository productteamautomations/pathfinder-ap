import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { FunnelVisualization } from "@/components/FunnelVisualization";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRecommendation } from "@/contexts/RecommendationContext";

// Orange accent motif component
function OrangeAccent() {
  return (
    <div className="flex items-center gap-2 mt-6">
      <div className="flex gap-1.5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 - i * 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
      <motion.div
        className="h-[2px] w-16 bg-gradient-to-r from-primary to-transparent rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      />
    </div>
  );
}

// Overall score ring component
function OverallScoreRing({ score }: { score: number }) {
  const getHealthColor = (score: number) => {
    if (score >= 70) return "#22c55e";
    if (score >= 40) return "#eab308";
    return "#E3664F";
  };

  const getHealthLabel = (score: number) => {
    if (score >= 70) return "Excellent";
    if (score >= 40) return "Good";
    return "Needs Improvement";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center"
    >
      <div className="relative w-36 h-36">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getHealthColor(score)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {score}%
          </motion.span>
        </div>
      </div>
      <motion.div
        className="text-center mt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-lg font-semibold" style={{ color: getHealthColor(score) }}>
          {getHealthLabel(score)}
        </p>
        <p className="text-sm text-muted-foreground">Overall Health</p>
      </motion.div>
    </motion.div>
  );
}

export default function FunnelHealth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendation } = useRecommendation();

  const trafficScore = 75;
  const conversionScore = 60;
  const leadScore = 45;
  const overallScore = Math.round((trafficScore + conversionScore + leadScore) / 3);

  const handleContinue = () => {
    // Map product to route
    const productRoutes: Record<string, string> = {
      SEO: "/product-recommendation/localseo",
      LeadGen: "/product-recommendation/leadgen",
      LSA: "/product-recommendation/lsa",
    };

    if (recommendation.product && productRoutes[recommendation.product]) {
      navigate(productRoutes[recommendation.product], { state: location.state });
    } else {
      // Fallback to service selector if no recommendation yet
      navigate("/service-selector", { state: location.state });
    }
  };

  const isWaitingForRecommendation = recommendation.isLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader onBack={() => navigate(-1)} currentStep={5} totalSteps={11} showProgress />

      {/* Content Area - Split Layout */}
      <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          {/* Main Card with soft shadow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 min-h-[70vh]">
              {/* Left Side - Results Overview */}
              <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                    Results
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#173340] leading-tight tracking-tight">
                    Your Funnel Health Overview
                  </h2>

                  {/* Orange Accent Motif */}
                  <OrangeAccent />

                  {/* Summary text */}
                  <p className="text-muted-foreground mt-8 text-lg leading-relaxed">
                    We've analyzed your funnel performance across three key areas to identify opportunities for growth.
                  </p>
                </motion.div>
              </div>

              {/* Right Side - Visualization */}
              <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Overall Score Ring */}
                  <OverallScoreRing score={overallScore} />

                  {/* Funnel Visualization */}
                  <motion.div
                    className="w-full h-40 mt-8 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <FunnelVisualization
                      trafficScore={trafficScore}
                      conversionScore={conversionScore}
                      leadScore={leadScore}
                    />
                  </motion.div>

                  {/* Continue Button */}
                  <Button
                    onClick={handleContinue}
                    fullWidth
                    className="group"
                    disabled={isWaitingForRecommendation}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isWaitingForRecommendation ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : recommendation.product ? (
                        <>
                          View Your Recommendation
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        <>
                          Choose Your Service
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>

                  {/* Insight text */}
                  <motion.p
                    className="text-sm text-muted-foreground text-center mt-6 max-w-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Based on your responses, we've identified the right product for you.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
