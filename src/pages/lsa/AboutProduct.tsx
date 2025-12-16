import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { ChevronRight, Check } from "lucide-react";

// Import question images
import imgCTR from "@/assets/leadgen-ctr.svg";
import imgConversions from "@/assets/leadgen-tracking.svg";
import imgCPC from "@/assets/leadgen-cpc.svg";
import imgCTA from "@/assets/leadgen-cta.svg";
import imgServicePages from "@/assets/leadgen-dedicated-service-pages.svg";
import imgLeadManagement from "@/assets/leadgen-lead-management.svg";
import imgResponseTime from "@/assets/leadgen-response-time.svg";

// Orange accent motif component
function OrangeAccent() {
  return (
    <div className="flex items-center" style={{ gap: "0.5cqw", marginTop: "1cqw" }}>
      <div className="flex" style={{ gap: "0.4cqw" }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-primary"
            style={{ width: "0.5cqw", height: "0.5cqw" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 - i * 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
      <motion.div
        className="bg-gradient-to-r from-primary to-transparent rounded-full"
        style={{ height: "0.15cqw", width: "4cqw" }}
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
  multiSelect?: boolean;
}

const questions: Question[] = [
  // Traffic Questions
  {
    id: "avgRanking",
    section: "Traffic",
    question: "Do you know the average ranking of your top 10 most important search terms?",
    options: ["1-10", "10-20", ">20", "Unsure"],
    image: imgCTR,
  },
  {
    id: "visibilityTracking",
    section: "Traffic",
    question: "Are you tracking your key visibility stats in GSC and your GBP?",
    options: ["Both", "GSC", "GBP", "Neither"],
    image: imgConversions,
  },
  {
    id: "actionStatsTracking",
    section: "Traffic",
    question: "Are you tracking your key action stats in GSC, GBP and GA4?",
    options: ["GA4", "GSC", "GBP", "None of the above"],
    image: imgCPC,
    multiSelect: true,
  },
  // Conversion Questions
  {
    id: "ctaVisibility",
    section: "Conversions",
    question: "Is your primary call-to-action visible without scrolling?",
    options: ["Yes - on both desktop and mobile", "Yes - Just on desktop", "Yes - Just on mobile", "No"],
    image: imgCTA,
  },
  {
    id: "servicePages",
    section: "Conversions",
    question: "Does your site have dedicated pages for each service?",
    options: ["Yes - For all services", "Yes - For some services", "No"],
    image: imgServicePages,
  },
  {
    id: "locationTargeting",
    section: "Conversions",
    question: "Is your site correctly targeting your location in key areas like page titles and header tags?",
    options: ["Yes - Throughout the site", "Yes - Just the homepage/main pages", "No", "Unsure"],
    image: imgServicePages,
  },
  // Lead Management Questions
  {
    id: "conversionTracking",
    section: "Lead Management",
    question: "Are you tracking your key conversions in your analytics?",
    options: ["Calls", "Form fills and/or emails", "Both", "None"],
    image: imgConversions,
  },
  {
    id: "leadManagementSystem",
    section: "Lead Management",
    question: "What best describes your lead management system?",
    options: ["Self dedicated admin time", "Assistant (human/virtual)", "Answer every call", "No system in place"],
    image: imgLeadManagement,
  },
  {
    id: "responseTime",
    section: "Lead Management",
    question: "What is your average response time to an enquiry?",
    options: ["Same hour", "Same day", "Same week", "When I can"],
    image: imgResponseTime,
  },
];

export default function FunnelDiagnosticLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const totalSteps = questions.length;

  if (!question) {
    return null;
  }

  // Reset imageLoaded when question changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (isTransitioning) return;

    if (question.multiSelect) {
      // Toggle selection for multi-select
      const currentAnswers = (answers[question.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((a) => a !== answer)
        : [...currentAnswers, answer];
      setAnswers({ ...answers, [question.id]: newAnswers });
    } else {
      // Single select - immediately proceed
      setIsTransitioning(true);
      const newAnswers = { ...answers, [question.id]: answer };
      setAnswers(newAnswers);

      if (isLastQuestion) {
        setTimeout(() => {
          navigate("/funnel-health/localseo", {
            state: {
              ...location.state,
              diagnosticAnswers: newAnswers,
            },
          });
        }, 300);
      } else {
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setIsTransitioning(false);
        }, 400);
      }
    }
  };

  const handleContinue = () => {
    if (isTransitioning) return;

    const currentAnswers = (answers[question.id] as string[]) || [];
    if (currentAnswers.length === 0) return;

    setIsTransitioning(true);

    if (isLastQuestion) {
      setTimeout(() => {
        navigate("/funnel-health/localseo", {
          state: {
            ...location.state,
            diagnosticAnswers: answers,
          },
        });
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
      navigate("/product-recommendation/localseo", { state: location.state });
    }
  };

  const isMultiSelectAnswered = question.multiSelect && ((answers[question.id] as string[]) || []).length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader onBack={handleBack} currentStep={4} totalSteps={7} showProgress productLabel="Local SEO" />

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
                      style={{ fontSize: "2.8cqw" }}
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
                      {question.multiSelect ? "Select all that apply" : "Select one option"}
                    </p>
                  </div>

                  {/* Options - Text scaled by 20% (1.5cqw → 1.8cqw) */}
                  <div className="flex-1" style={{ display: "flex", flexDirection: "column", gap: "1cqw" }}>
                    {question.options.map((option, index) => {
                      const isSelected = question.multiSelect
                        ? ((answers[question.id] as string[]) || []).includes(option)
                        : answers[question.id] === option;

                      return (
                        <motion.button
                          key={option}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleAnswer(option)}
                          className={`w-full border text-left font-medium transition-all duration-200 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                              : "border-border/30 bg-white text-foreground hover:border-primary/40 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                          }`}
                          style={{ fontSize: "1.8cqw", padding: "1.2cqw", borderRadius: "1.2cqw" }}
                        >
                          <span>{option}</span>
                          {question.multiSelect ? (
                            <div
                              className={`flex items-center justify-center transition-all ${
                                isSelected ? "bg-white border-white" : "border-muted-foreground/30"
                              }`}
                              style={{
                                width: "1.8cqw",
                                height: "1.8cqw",
                                borderRadius: "0.36cqw",
                                borderWidth: "0.18cqw",
                                flexShrink: 0,
                              }}
                            >
                              {isSelected && (
                                <Check
                                  className="text-primary"
                                  strokeWidth={3}
                                  style={{ width: "1.2cqw", height: "1.2cqw" }}
                                />
                              )}
                            </div>
                          ) : (
                            <ChevronRight
                              className="transition-transform"
                              style={{ width: "1.8cqw", height: "1.8cqw", flexShrink: 0 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Continue Button for Multi-Select */}
                  {question.multiSelect && (
                    <motion.button
                      onClick={handleContinue}
                      disabled={!isMultiSelectAnswered}
                      className={`w-full font-semibold transition-all duration-200 ${
                        isMultiSelectAnswered
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                      style={{ marginTop: "1cqw", padding: "1.2cqw", borderRadius: "1.2cqw", fontSize: "1.8cqw" }}
                    >
                      Continue
                    </motion.button>
                  )}

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
