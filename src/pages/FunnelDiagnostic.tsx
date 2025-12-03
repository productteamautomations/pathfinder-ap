import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { ChevronRight } from "lucide-react";

// Import question images
import imgCTR from "@/assets/Average_CTR.png";
import imgConversions from "@/assets/Are_you_Tracking_key_conversions.png";
import imgCPC from "@/assets/Average_CPC.png";
import imgCPA from "@/assets/Average_Cost_per_acquisition.png";
import imgConversionRate from "@/assets/Average_webste_conversion_rate.png";
import imgCTA from "@/assets/Primary_call_to_action_visibility.png";
import imgServicePages from "@/assets/Dedicated_service_page.png";
import imgLeadManagement from "@/assets/Lead_managemnt_system.png";
import imgResponseTime from "@/assets/average_response_time.png";

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
    question: "Which best describes your current lead management system?",
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [imageLoaded, setImageLoaded] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const totalSteps = questions.length;

  // Reset imageLoaded when question changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [question.id]: answer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setTimeout(() => {
        navigate("/funnel-health", {
          state: {
            ...location.state,
            diagnosticAnswers: newAnswers,
          },
        });
      }, 300);
    } else {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      navigate("/fact-finder", { state: location.state });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        <PageHeader
          onBack={handleBack}
          currentStep={2}
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
                {/* Left Side - Question & Options */}
                <div className="p-6 md:p-10 lg:p-12 flex flex-col bg-muted/30 relative z-10 shadow-[8px_0_30px_-5px_rgba(0,0,0,0.15)]">
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
                      <div className="flex-shrink-0 mb-6">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">
                          {question.section}
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#173340] leading-tight tracking-tight">
                          {question.question}
                        </h2>
                        <OrangeAccent />
                      </div>

                      {/* Step Indicator */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Question</span>
                          <span className="text-2xl font-bold text-foreground">{currentQuestion + 1}</span>
                          <span className="text-muted-foreground text-lg">—</span>
                          <span className="text-2xl font-bold text-muted-foreground">{totalSteps}</span>
                        </div>
                        <p className="text-base text-muted-foreground mt-2">
                          Select one option
                        </p>
                      </div>

                      {/* Options */}
                      <div className="space-y-3 flex-1">
                        {question.options.map((option, index) => (
                          <motion.button
                            key={option}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleAnswer(option)}
                            className={`w-full p-4 rounded-2xl border text-left font-medium transition-all duration-200 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                              answers[question.id] === option
                                ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                                : "border-border/30 bg-white text-foreground hover:border-primary/40 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                            }`}
                          >
                            <span>{option}</span>
                            <ChevronRight className={`w-5 h-5 transition-transform ${answers[question.id] === option ? "text-primary-foreground" : "text-muted-foreground"}`} />
                          </motion.button>
                        ))}
                      </div>

                      {/* Back Button */}
                      <button
                        onClick={handleBack}
                        className="mt-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all">
                          <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
                        </div>
                        <span className="uppercase tracking-wider">{currentQuestion > 0 ? "Back" : "Cancel"}</span>
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Side - Image fills section corner to corner */}
                <div className="relative bg-white border-l border-border/20 overflow-hidden">
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
    </div>
  );
}
