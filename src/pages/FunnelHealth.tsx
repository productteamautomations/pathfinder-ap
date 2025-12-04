import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { FunnelVisualization } from "@/components/FunnelVisualization";
import { ArrowRight, Loader2, AlertCircle, RefreshCw } from "lucide-react";
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

// Calculate scores based on diagnostic answers (0-4 ranking per question)
function calculateScores(answers: Record<string, string>) {
  // Score mapping: each answer ranked 0-4 (4 = best, 0 = worst)
  const scoreMap: Record<string, Record<string, number>> = {
    // Traffic questions
    avgCTR: { "≥5%": 4, "3–5%": 3, "<2%": 1, Unsure: 0 },
    trackingConversions: { Both: 4, "Form Fills": 2, Calls: 2, None: 0 },
    avgCPC: { "<£0.50": 4, "£0.50–£3.00": 2, "≥£3.00": 1, Unsure: 0 },
    // Conversion questions
    costPerAcquisition: { "<£10": 4, "£10–£50": 2, "≥£50": 1, Unsure: 0 },
    conversionRate: { "≥5%": 4, "2–5%": 3, "1–2%": 2, "<1%": 0 },
    ctaVisibility: { "Yes – both mobile & desktop": 4, "Yes – desktop only": 2, "Yes – mobile only": 2, No: 0 },
    servicePages: { "Yes – all services": 4, "Yes – some": 2, No: 0 },
    // Lead Management questions
    leadManagementSystem: {
      "Assistant (Human/Virtual)": 4,
      "Answer Every Call": 3,
      "Self dedicated admin time": 2,
      "Organised Chaos": 0,
    },
    responseTime: { "Same hour": 4, "Same day": 3, "Same week": 1, "When I get a chance": 0 },
  };

  const trafficQuestions = ["avgCTR", "trackingConversions", "avgCPC"];
  const conversionQuestions = ["costPerAcquisition", "conversionRate", "ctaVisibility", "servicePages"];
  const leadQuestions = ["leadManagementSystem", "responseTime"];

  const calcCategoryScore = (questionIds: string[]) => {
    const totalScore = questionIds.reduce((sum, id) => sum + (scoreMap[id]?.[answers[id]] ?? 0), 0);
    const maxScore = questionIds.length * 4; // Each question max is 4
    return Math.round((totalScore / maxScore) * 100);
  };

  return {
    trafficScore: calcCategoryScore(trafficQuestions),
    conversionScore: calcCategoryScore(conversionQuestions),
    leadScore: calcCategoryScore(leadQuestions),
  };
}

export default function FunnelHealth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendation, fetchRecommendation } = useRecommendation();
  const [retryError, setRetryError] = useState(false);
  const hasAttemptedRetry = useRef(false);

  const diagnosticAnswers = (location.state as any)?.diagnosticAnswers || {};
  const { trafficScore, conversionScore, leadScore } = calculateScores(diagnosticAnswers);
  const overallScore = Math.round((trafficScore + conversionScore + leadScore) / 3);

  // Watch for when loading finishes after a retry attempt
  useEffect(() => {
    if (hasAttemptedRetry.current && !recommendation.isLoading && !recommendation.product) {
      setRetryError(true);
      hasAttemptedRetry.current = false;
    }
  }, [recommendation.isLoading, recommendation.product]);

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
      // No recommendation available - retry the webhook
      const state = location.state as any;
      const name = state?.name || "";
      const websiteUrl = state?.url || ""; // Welcome page passes 'url' not 'websiteUrl'
      
      if (name && websiteUrl) {
        setRetryError(false);
        hasAttemptedRetry.current = true;
        fetchRecommendation(name, websiteUrl);
      } else {
        setRetryError(true);
      }
    }
  };

  const isWaitingForRecommendation = recommendation.isLoading;
  const showError = retryError;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-diagnostic", { state: location.state })}
        currentStep={3}
        totalSteps={7}
        showProgress
      />

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

                  {/* Improvement Insights - show when any score is under 70% */}
                  {trafficScore < 70 || conversionScore < 70 || leadScore < 70 ? (
                    <div className="mt-10 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#173340] mb-3">Areas of Improvement</h3>
                        <div className="flex flex-wrap gap-2">
                          {trafficScore < 70 && (
                            <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                              Traffic Generation
                            </span>
                          )}
                          {conversionScore < 70 && (
                            <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                              Website Conversions
                            </span>
                          )}
                          {leadScore < 70 && (
                            <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                              Lead Management
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#173340] mb-3">Our Recommended Solutions</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          {trafficScore < 70 && (
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              <span>Targeted advertising or SEO optimisation to drive qualified traffic</span>
                            </li>
                          )}
                          {conversionScore < 70 && (
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              <span>SmartSite to optimise your website for conversions</span>
                            </li>
                          )}
                          {leadScore < 70 && (
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              <span>Say Hello to never miss a lead</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground mt-10 text-lg leading-relaxed">
                      Great work! Your funnel is performing well across all key areas.
                    </p>
                  )}
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
                  <Button onClick={handleContinue} fullWidth className="group" disabled={isWaitingForRecommendation}>
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
                          <RefreshCw className="w-4 h-4" />
                          Retry Analysis
                        </>
                      )}
                    </span>
                  </Button>

                  {/* Error message */}
                  {showError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm text-destructive mt-4"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Unable to get recommendation. Please try again.</span>
                    </motion.div>
                  )}

                  {/* Insight text */}
                  <motion.p
                    className="text-sm text-muted-foreground text-center mt-6 max-w-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {recommendation.product 
                      ? "Based on your responses, we've identified the right product for you."
                      : "Click above to analyze your business and get a personalized recommendation."}
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
