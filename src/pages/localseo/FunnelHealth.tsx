import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { FunnelVisualization } from "@/components/FunnelVisualization";
import { ImprovementCarousel } from "@/components/ImprovementCarousel";
import { ArrowRight } from "lucide-react";

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
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
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

// Calculate scores based on SEO diagnostic answers
function calculateScores(answers: Record<string, string | string[]>) {
  const scoreMap: Record<string, Record<string, number>> = {
    // Traffic questions
    avgRanking: { "1-10": 4, "10-20": 2, ">20": 1, Unsure: 0 },
    visibilityTracking: { Both: 4, GSC: 2, GBP: 2, Neither: 0 },
    // actionStatsTracking is multi-select, scored separately
    // Conversion questions
    ctaVisibility: { "Yes - on both desktop and mobile": 4, "Yes - Just on desktop": 2, "Yes - Just on mobile": 2, No: 0 },
    servicePages: { "Yes - For all services": 4, "Yes - For some services": 2, No: 0 },
    locationTargeting: { "Yes - Throughout the site": 4, "Yes - Just the homepage/main pages": 2, No: 0, Unsure: 0 },
    // Lead Management questions
    conversionTracking: { Both: 4, Calls: 2, "Form fills and/or emails": 2, None: 0 },
    leadManagementSystem: { "Answer every call": 4, "Assistant (human/virtual)": 3, "Self dedicated admin time": 2, "No system in place": 0 },
    responseTime: { "Same hour": 4, "Same day": 3, "Same week": 1, "When I can": 0 },
  };

  // Score multi-select question (actionStatsTracking)
  const actionStats = (answers.actionStatsTracking as string[]) || [];
  const actionStatsScore = actionStats.includes("None of the above") ? 0 : Math.min(actionStats.length, 3) * (4 / 3);

  const trafficQuestions = ["avgRanking", "visibilityTracking"];
  const conversionQuestions = ["ctaVisibility", "servicePages", "locationTargeting"];
  const leadQuestions = ["conversionTracking", "leadManagementSystem", "responseTime"];

  const calcCategoryScore = (questionIds: string[], additionalScore = 0, additionalMax = 0) => {
    const totalScore = questionIds.reduce((sum, id) => {
      const answer = answers[id];
      if (typeof answer === "string") {
        return sum + (scoreMap[id]?.[answer] ?? 0);
      }
      return sum;
    }, additionalScore);
    const maxScore = questionIds.length * 4 + additionalMax;
    return Math.round((totalScore / maxScore) * 100);
  };

  return {
    trafficScore: calcCategoryScore(trafficQuestions, actionStatsScore, 4),
    conversionScore: calcCategoryScore(conversionQuestions),
    leadScore: calcCategoryScore(leadQuestions),
  };
}

// Generate improvement explanations based on SEO answers
function getImprovementAreas(
  answers: Record<string, string | string[]>,
  trafficScore: number,
  conversionScore: number,
  leadScore: number
) {
  const areas: { title: string; score: number; explanations: string[]; recommendation: string }[] = [];

  if (trafficScore < 70) {
    const explanations: string[] = [];
    
    if (answers.avgRanking === ">20" || answers.avgRanking === "Unsure") {
      explanations.push("Your top keywords are ranking outside the top 20, which means you're missing out on significant organic traffic.");
    } else if (answers.avgRanking === "10-20") {
      explanations.push("Your keywords ranking between 10-20 are close to page one but not quite there. A small push could make a big difference.");
    }
    
    if (answers.visibilityTracking === "Neither") {
      explanations.push("Without tracking in Google Search Console or Google Business Profile, you can't measure what's working.");
    } else if (answers.visibilityTracking === "GSC" || answers.visibilityTracking === "GBP") {
      explanations.push("You're only tracking one platform. Combining GSC and GBP insights gives you the full picture.");
    }
    
    const actionStats = (answers.actionStatsTracking as string[]) || [];
    if (actionStats.includes("None of the above") || actionStats.length === 0) {
      explanations.push("You're not tracking key metrics in GA4, GSC, or GBP, making it hard to understand user behaviour.");
    } else if (actionStats.length < 3) {
      explanations.push(`You're only tracking in ${actionStats.join(" and ")}. Adding more sources would improve your visibility insights.`);
    }

    if (explanations.length === 0) {
      explanations.push("Your visibility tracking and keyword rankings need improvement to drive more organic traffic.");
    }

    areas.push({
      title: "Visibility & Tracking",
      score: trafficScore,
      explanations,
      recommendation: "Local SEO optimisation will improve your rankings for key search terms and ensure you're tracking the right metrics to measure success.",
    });
  }

  if (conversionScore < 70) {
    const explanations: string[] = [];
    
    if (answers.ctaVisibility === "No") {
      explanations.push("Your call-to-action isn't visible without scrolling, meaning visitors may leave before seeing how to contact you.");
    } else if (answers.ctaVisibility === "Yes - Just on desktop" || answers.ctaVisibility === "Yes - Just on mobile") {
      explanations.push("Your CTA is only visible on one device type. Mobile users account for over 60% of local searches.");
    }
    
    if (answers.servicePages === "No") {
      explanations.push("Without dedicated service pages, you're missing opportunities to rank for specific service-related searches.");
    } else if (answers.servicePages === "Yes - For some services") {
      explanations.push("Some services don't have dedicated pages, limiting your ability to rank for those specific terms.");
    }
    
    if (answers.locationTargeting === "No" || answers.locationTargeting === "Unsure") {
      explanations.push("Your site isn't optimised for your target location, making it harder to appear in local search results.");
    } else if (answers.locationTargeting === "Yes - Just the homepage/main pages") {
      explanations.push("Location targeting is limited to main pages. Extending this throughout your site strengthens local signals.");
    }

    if (explanations.length === 0) {
      explanations.push("Your website structure needs optimisation to better convert visitors into leads.");
    }

    areas.push({
      title: "Website Optimisation",
      score: conversionScore,
      explanations,
      recommendation: "SmartSite will optimise your website for local conversions with prominent CTAs, dedicated service pages, and proper location targeting throughout.",
    });
  }

  if (leadScore < 70) {
    const explanations: string[] = [];
    
    if (answers.conversionTracking === "None") {
      explanations.push("You're not tracking any conversions, so you can't measure which marketing efforts generate actual leads.");
    } else if (answers.conversionTracking === "Calls" || answers.conversionTracking === "Form fills and/or emails") {
      explanations.push("You're only tracking one type of conversion. Leads come through multiple channels.");
    }
    
    if (answers.leadManagementSystem === "No system in place") {
      explanations.push("Without a lead management system, enquiries can easily fall through the cracks.");
    } else if (answers.leadManagementSystem === "Self dedicated admin time") {
      explanations.push("Managing leads yourself takes time away from running your business and can delay responses.");
    }
    
    if (answers.responseTime === "When I can" || answers.responseTime === "Same week") {
      explanations.push("Slow response times mean competitors who respond faster will win the lead. 78% of customers go with the first responder.");
    } else if (answers.responseTime === "Same day") {
      explanations.push("Same-day responses are good, but leads contacted within an hour are 21x more likely to convert.");
    }

    if (explanations.length === 0) {
      explanations.push("Your lead management process needs improvement to capture and convert more enquiries.");
    }

    areas.push({
      title: "Lead Management",
      score: leadScore,
      explanations,
      recommendation: "Say Hello ensures you never miss a lead with instant response capabilities, keeping potential customers engaged until you can speak with them.",
    });
  }

  return areas;
}

export default function FunnelHealthLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();

  const diagnosticAnswers = (location.state as any)?.diagnosticAnswers || {};
  const { trafficScore, conversionScore, leadScore } = calculateScores(diagnosticAnswers);
  const overallScore = Math.round((trafficScore + conversionScore + leadScore) / 3);
  
  const improvementAreas = getImprovementAreas(diagnosticAnswers, trafficScore, conversionScore, leadScore);

  const handleContinue = () => {
    navigate("/business-cycle/localseo", { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-diagnostic/localseo", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Local SEO"
      />

      <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-6xl">
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
                  <h2 className="text-[57px] font-bold text-title font-display leading-tight">
                    Your SEO Health Overview
                  </h2>

                  <OrangeAccent />

                  {improvementAreas.length > 0 ? (
                    <ImprovementCarousel areas={improvementAreas} />
                  ) : (
                    <p className="text-muted-foreground mt-10 text-lg leading-relaxed">
                      Great work! Your SEO foundation is performing well across all key areas.
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
                  <OverallScoreRing score={overallScore} />

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

                  <Button onClick={handleContinue} fullWidth className="group">
                    <span className="flex items-center justify-center gap-2">
                      See How We Can Help
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>

                  <motion.p
                    className="text-sm text-muted-foreground text-center mt-6 max-w-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Based on your responses, we've identified areas where Local SEO can help.
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