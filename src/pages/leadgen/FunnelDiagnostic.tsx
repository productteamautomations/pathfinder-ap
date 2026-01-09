import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { ChevronRight } from "lucide-react";
import { buildPageWebhookPayload, sendPageWebhook } from "@/lib/webhookPayload";
import { useRecommendation } from "@/contexts/RecommendationContext";

// Import question images
import imgCTR from "@/assets/leadgen-ctr.svg";
import imgConversions from "@/assets/leadgen-tracking.svg";
import imgCPC from "@/assets/leadgen-cpc.svg";
import imgCPA from "@/assets/leadgen-cpa.svg";
import imgConversionRate from "@/assets/leadgen-conversion-rate.svg";
import imgCTA from "@/assets/leadgen-cta.svg";
import imgServicePages from "@/assets/leadgen-dedicated-service-pages.svg";
import imgLeadManagement from "@/assets/leadgen-lead-management.svg";
import imgResponseTime from "@/assets/leadgen-response-time.svg";

// Orange accent motif component
function OrangeAccent() {
  return (
    <div className="flex items-center gap-2 mt-4">
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

interface Question {
  id: string;
  section: string;
  question: string;
  options: string[];
  image: string;
}

const questions: Question[] = [
  {
    id: "avgCTR",
    section: "Traffic",
    question: "What's your average CTR over the last 30 days?",
    options: ["≥5%", "3–5%", "<2%", "Unsure"],
    image: imgCTR,
  },
  {
    id: "trackingConversions",
    section: "Traffic",
    question: "Are you tracking key conversions?",
    options: ["Form Fills", "Calls", "Both", "None"],
    image: imgConversions,
  },
  {
    id: "avgCPC",
    section: "Traffic",
    question: "What's your average CPC?",
    options: ["<£0.50", "£0.50–£3.00", "≥£3.00", "Unsure"],
    image: imgCPC,
  },
  {
    id: "costPerAcquisition",
    section: "Conversion",
    question: "What's your average cost-per-acquisition?",
    options: ["<£10", "£10–£50", "≥£50", "Unsure"],
    image: imgCPA,
  },
  {
    id: "conversionRate",
    section: "Conversion",
    question: "What's your website conversion rate?",
    options: ["≥5%", "2–5%", "1–2%", "<1%"],
    image: imgConversionRate,
  },
  {
    id: "ctaVisibility",
    section: "Conversion",
    question: "Is your primary CTA visible without scrolling?",
    options: ["Yes – both mobile & desktop", "Yes – desktop only", "Yes – mobile only", "No"],
    image: imgCTA,
  },
  {
    id: "servicePages",
    section: "Conversion",
    question: "Do you have dedicated service pages?",
    options: ["Yes – all services", "Yes – some", "No"],
    image: imgServicePages,
  },
  {
    id: "leadManagementSystem",
    section: "Lead Management",
    question: "Which best describes your lead management system?",
    options: ["Self dedicated admin time", "Assistant (Human/Virtual)", "Answer Every Call", "Organised Chaos"],
    image: imgLeadManagement,
  },
  {
    id: "responseTime",
    section: "Lead Management",
    question: "What's your average response time?",
    options: ["Same hour", "Same day", "Same week", "When I get a chance"],
    image: imgResponseTime,
  },
];

export default function FunnelDiagnostic() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, updateMaxStep, recommendation } = useRecommendation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const totalSteps = questions.length;

  // Guard against undefined question
  if (!question) {
    return null;
  }

  // Reset imageLoaded when question changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    // Prevent clicks during transition
    if (isTransitioning) return;

    setIsTransitioning(true);
    const newAnswers = { ...answers, [question.id]: answer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setTimeout(() => {
        try {
          const state = location.state as any;
          const newState = { ...state, diagnosticAnswers: newAnswers };
          updateMaxStep(4);
          const payload = buildPageWebhookPayload(
            {
              sessionId: session?.sessionId,
              googleId: session?.googleId,
              googleFullName: session?.googleFullName,
              googleEmail: session?.googleEmail,
              startTime: session?.startTime,
            },
            newState,
            null,
            false,
            false,
            { step: 4, totalSteps: 8, maxStep: Math.max(session?.maxStep || 0, 4) },
            { product: "LeadGen Trial", smartSiteIncluded: null }
          );
          sendPageWebhook(payload);
          navigate("/funnel-health/leadgen", { state: newState });
        } catch (e) {
          console.error("Webhook error:", e);
          const state = location.state as any;
          const newState = { ...state, diagnosticAnswers: newAnswers };
          navigate("/funnel-health/leadgen", { state: newState });
        }
      }, 300);
    } else {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 400);
    }
  };

  const handleBack = () => {
    if (isTransitioning) return;

    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      navigate("/product-recommendation/leadgen", { state: location.state });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader onBack={handleBack} currentStep={3} totalSteps={7} showProgress productLabel="Lead Generation" showSmartSite={recommendation.isBig3 === false} />

      {/* Content Area - Split Layout */}
      <div className="flex-1 pt-[73px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{
            width: "min(90vw, calc((100vh - 73px) * 0.9 * 1.65))",
            aspectRatio: "1.65",
            containerType: "size",
            borderRadius: "2.5cqw",
          }}
        >
          <div className="grid md:grid-cols-[0.65fr_1fr] h-full">
            {/* Left Side - Question & Options */}
            <div
              className="flex flex-col bg-muted/30 relative z-10 shadow-[8px_0_30px_-5px_rgba(0,0,0,0.15)] h-full"
              style={{ padding: "3cqw" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full"
                >
                  {/* Question Title at Top */}
                  <div className="flex-shrink-0" style={{ marginBottom: "2cqw" }}>
                    <span
                      className="font-semibold text-primary uppercase tracking-wider block"
                      style={{ fontSize: "1.2cqw", marginBottom: "0.5cqw" }}
                    >
                      {question.section}
                    </span>
                    <h2
                      className="font-display font-bold text-title leading-tight tracking-tight"
                      style={{ fontSize: "3.2cqw" }}
                    >
                      {question.question}
                    </h2>
                    <OrangeAccent />
                  </div>

                  {/* Step Indicator */}
                  <div className="flex-shrink-0" style={{ marginBottom: "2cqw" }}>
                    <div className="flex items-center" style={{ gap: "1cqw" }}>
                      <span
                        className="font-semibold text-primary uppercase tracking-wider"
                        style={{ fontSize: "1.2cqw" }}
                      >
                        Question
                      </span>
                      <span className="font-bold text-foreground" style={{ fontSize: "2.2cqw" }}>
                        {currentQuestion + 1}
                      </span>
                      <span className="text-muted-foreground" style={{ fontSize: "1.6cqw" }}>
                        —
                      </span>
                      <span className="font-bold text-muted-foreground" style={{ fontSize: "2.2cqw" }}>
                        {totalSteps}
                      </span>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: "1.3cqw", marginTop: "0.5cqw" }}>
                      Select one option
                    </p>
                  </div>

                  {/* Options */}
                  <div className="flex-1" style={{ display: "flex", flexDirection: "column", gap: "1cqw" }}>
                    {question.options.map((option, index) => (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleAnswer(option)}
                        className={`w-full border text-left font-medium transition-all duration-200 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                          answers[question.id] === option
                            ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                            : "border-border/30 bg-white text-foreground hover:border-primary/40 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                        }`}
                        style={{ fontSize: "1.5cqw", padding: "1.2cqw", borderRadius: "1.2cqw" }}
                      >
                        <span>{option}</span>
                        <ChevronRight className="transition-transform" style={{ width: "1.5cqw", height: "1.5cqw" }} />
                      </motion.button>
                    ))}
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={handleBack}
                    className="flex-shrink-0 font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                    style={{ fontSize: "1.2cqw", marginTop: "2cqw", gap: "1cqw" }}
                  >
                    <div
                      className="bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all"
                      style={{ width: "3.5cqw", height: "3.5cqw", borderRadius: "50%" }}
                    >
                      <ChevronRight
                        className="text-foreground rotate-180"
                        style={{ width: "1.3cqw", height: "1.3cqw" }}
                      />
                    </div>
                    <span className="uppercase tracking-wider">{currentQuestion > 0 ? "Back" : "Cancel"}</span>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Square Image Panel */}
            <div className="relative bg-white border-l border-border/20 overflow-hidden w-full h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`img-${currentQuestion}`}
                  src={question.image}
                  alt={question.question}
                  onLoad={() => setImageLoaded(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
