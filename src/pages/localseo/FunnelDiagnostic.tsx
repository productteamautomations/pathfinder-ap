import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { ChevronRight, Check } from "lucide-react";

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
  multiSelect?: boolean;
}

const questions: Question[] = [
  // Traffic Questions
  {
    id: "avgRanking",
    section: "Traffic",
    question: "Do you know the average ranking of your top 10 most important search terms?",
    options: ["1-10", "10-20", ">20", "Unsure"],
  },
  {
    id: "visibilityTracking",
    section: "Traffic",
    question: "Are you tracking your key visibility stats in GSC and your GBP?",
    options: ["Both", "GSC", "GBP", "Neither"],
  },
  {
    id: "actionStatsTracking",
    section: "Traffic",
    question: "Are you tracking your key action stats in GSC, GBP and GA4?",
    options: ["GA4", "GSC", "GBP", "None of the above"],
    multiSelect: true,
  },
  // Conversion Questions
  {
    id: "ctaVisibility",
    section: "Conversions",
    question: "Is your primary call-to-action visible without scrolling?",
    options: ["Yes - on both desktop and mobile", "Yes - Just on desktop", "Yes - Just on mobile", "No"],
  },
  {
    id: "servicePages",
    section: "Conversions",
    question: "Does your site have dedicated pages for each service?",
    options: ["Yes - For all services", "Yes - For some services", "No"],
  },
  {
    id: "locationTargeting",
    section: "Conversions",
    question: "Is your site correctly targeting your core location in key areas like page titles and header tags?",
    options: ["Yes - Throughout the site", "Yes - Just the homepage/main pages", "No", "Unsure"],
  },
  // Lead Management Questions
  {
    id: "conversionTracking",
    section: "Lead Management",
    question: "Are you tracking your key conversions in your analytics?",
    options: ["Calls", "Form fills and/or emails", "Both", "None"],
  },
  {
    id: "leadManagementSystem",
    section: "Lead Management",
    question: "What best describes your lead management system?",
    options: ["Self dedicated admin time", "Assistant (human/virtual)", "Answer every call", "No system in place"],
  },
  {
    id: "responseTime",
    section: "Lead Management",
    question: "What is your average response time to an enquiry?",
    options: ["Same hour", "Same day", "Same week", "When I can"],
  },
];

export default function FunnelDiagnosticLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const totalSteps = questions.length;

  if (!question) {
    return null;
  }

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

      <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="p-8 md:p-12 lg:p-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  {/* Question Title */}
                  <div className="mb-8">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">
                      {question.section}
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-title leading-tight tracking-tight">
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
                      {question.multiSelect ? "Select all that apply" : "Select one option"}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
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
                          className={`w-full p-4 rounded-2xl border text-left font-medium transition-all duration-200 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                              : "border-border/30 bg-white text-foreground hover:border-primary/40 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                          }`}
                        >
                          <span>{option}</span>
                          {question.multiSelect ? (
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isSelected ? "bg-white border-white" : "border-muted-foreground/30"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-primary" strokeWidth={3} />}
                            </div>
                          ) : (
                            <ChevronRight
                              className={`w-5 h-5 transition-transform ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}
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
                      className={`w-full p-4 rounded-2xl font-semibold transition-all duration-200 ${
                        isMultiSelectAnswered
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </motion.button>
                  )}

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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
