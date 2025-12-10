import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { FunnelVisualization } from "@/components/FunnelVisualization";
import { ImprovementCarousel } from "@/components/ImprovementCarousel";
import { ArrowRight } from "lucide-react";
import AttentionIcon from "@/assets/attention-icon.svg";

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
        <div className="flex items-center justify-center gap-2">
          {score < 40 && <img src={AttentionIcon} alt="" className="w-5 h-5" />}
          <p className="text-lg font-semibold" style={{ color: getHealthColor(score) }}>
            {getHealthLabel(score)}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">Overall Health</p>
      </motion.div>
    </motion.div>
  );
}

// Calculate scores based on diagnostic answers (0-4 ranking per question)
function calculateScores(answers: Record<string, string>) {
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
    const maxScore = questionIds.length * 4;
    return Math.round((totalScore / maxScore) * 100);
  };

  return {
    trafficScore: calcCategoryScore(trafficQuestions),
    conversionScore: calcCategoryScore(conversionQuestions),
    leadScore: calcCategoryScore(leadQuestions),
  };
}

// Generate improvement explanations based on LeadGen answers
function getImprovementAreas(
  answers: Record<string, string>,
  trafficScore: number,
  conversionScore: number,
  leadScore: number
) {
  const areas: { title: string; score: number; explanations: string[]; recommendation: string }[] = [];

  if (trafficScore < 70) {
    const explanations: string[] = [];
    
    if (answers.avgCTR === "<2%" || answers.avgCTR === "Unsure") {
      explanations.push("Your click-through rate is below industry average, meaning your ads aren't compelling enough to drive clicks.");
    } else if (answers.avgCTR === "3–5%") {
      explanations.push("Your CTR is decent but there's room to improve ad relevance and copy to drive more qualified clicks.");
    }
    
    if (answers.trackingConversions === "None") {
      explanations.push("Without conversion tracking, you can't measure which campaigns are actually generating leads.");
    } else if (answers.trackingConversions === "Calls" || answers.trackingConversions === "Form Fills") {
      explanations.push("You're only tracking one conversion type. Leads come through both calls and forms.");
    }
    
    if (answers.avgCPC === "≥£3.00" || answers.avgCPC === "Unsure") {
      explanations.push("High cost-per-click eats into your budget quickly, leaving less room for actual conversions.");
    } else if (answers.avgCPC === "£0.50–£3.00") {
      explanations.push("Your CPC is moderate but optimising keywords and quality scores could reduce costs further.");
    }

    if (explanations.length === 0) {
      explanations.push("Your ad traffic metrics need improvement to drive more qualified visitors.");
    }

    areas.push({
      title: "Traffic Generation",
      score: trafficScore,
      explanations,
      recommendation: "Targeted Google Ads campaigns with optimised keywords, compelling ad copy, and proper conversion tracking will improve your CTR while reducing wasted spend.",
    });
  }

  if (conversionScore < 70) {
    const explanations: string[] = [];
    
    if (answers.costPerAcquisition === "≥£50" || answers.costPerAcquisition === "Unsure") {
      explanations.push("Your cost per acquisition is high, meaning you're spending more than necessary to win each customer.");
    } else if (answers.costPerAcquisition === "£10–£50") {
      explanations.push("Your CPA is reasonable but there's opportunity to improve landing page conversion rates.");
    }
    
    if (answers.conversionRate === "<1%") {
      explanations.push("A conversion rate under 1% means 99% of visitors leave without taking action. Your website isn't converting traffic into leads.");
    } else if (answers.conversionRate === "1–2%") {
      explanations.push("Your conversion rate is below average. Small improvements to your landing pages could significantly increase leads.");
    }
    
    if (answers.ctaVisibility === "No") {
      explanations.push("Your call-to-action isn't visible without scrolling, causing visitors to leave before seeing how to contact you.");
    } else if (answers.ctaVisibility === "Yes – desktop only" || answers.ctaVisibility === "Yes – mobile only") {
      explanations.push("Your CTA is only visible on one device type. With 60%+ of searches on mobile, this limits conversions.");
    }
    
    if (answers.servicePages === "No") {
      explanations.push("Without dedicated service pages, visitors from specific ad campaigns land on generic pages that don't match their intent.");
    } else if (answers.servicePages === "Yes – some") {
      explanations.push("Some services lack dedicated landing pages, reducing relevance and quality scores for those campaigns.");
    }

    if (explanations.length === 0) {
      explanations.push("Your website isn't converting paid traffic effectively.");
    }

    areas.push({
      title: "Website Conversions",
      score: conversionScore,
      explanations,
      recommendation: "SmartSite will optimise your landing pages with prominent CTAs, dedicated service pages, and conversion-focused design to turn more visitors into leads.",
    });
  }

  if (leadScore < 70) {
    const explanations: string[] = [];
    
    if (answers.leadManagementSystem === "Organised Chaos") {
      explanations.push("Without a proper lead management system, enquiries slip through the cracks and you lose potential customers.");
    } else if (answers.leadManagementSystem === "Self dedicated admin time") {
      explanations.push("Managing leads yourself takes time away from your core business and can cause delays in follow-up.");
    }
    
    if (answers.responseTime === "When I get a chance" || answers.responseTime === "Same week") {
      explanations.push("Slow response times are costing you leads. 78% of customers go with whoever responds first, and leads contacted within 5 minutes are 21x more likely to convert.");
    } else if (answers.responseTime === "Same day") {
      explanations.push("Same-day responses are good, but studies show responding within the first hour dramatically increases your chances of winning the lead.");
    }

    if (explanations.length === 0) {
      explanations.push("Your lead management process has gaps that are costing you customers.");
    }

    areas.push({
      title: "Lead Management",
      score: leadScore,
      explanations,
      recommendation: "Say Hello ensures instant response to every enquiry, keeping leads warm until you can speak with them personally. Never miss another opportunity.",
    });
  }

  return areas;
}

export default function FunnelHealthLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();

  const diagnosticAnswers = (location.state as any)?.diagnosticAnswers || {};
  const { trafficScore, conversionScore, leadScore } = calculateScores(diagnosticAnswers);
  const overallScore = Math.round((trafficScore + conversionScore + leadScore) / 3);
  
  const improvementAreas = getImprovementAreas(diagnosticAnswers, trafficScore, conversionScore, leadScore);

  const handleContinue = () => {
    navigate("/business-cycle/leadgen", { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-diagnostic/leadgen", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
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
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-title leading-tight tracking-tight">
                    Your Funnel Health Overview
                  </h2>

                  <OrangeAccent />

                  {improvementAreas.length > 0 ? (
                    <ImprovementCarousel areas={improvementAreas} />
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
                    Based on your responses, we've identified areas where Google Ads can help.
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