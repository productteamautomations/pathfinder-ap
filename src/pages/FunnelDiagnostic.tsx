import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

interface Question {
  id: string;
  section: string;
  question: string;
  options: string[];
  hasImage?: boolean;
}

const questions: Question[] = [
  {
    id: "avgCTR",
    section: "Traffic",
    question: "Average CTR (30 days)",
    options: ["≥5%", "3–5%", "<2%", "Unsure"],
    hasImage: true,
  },
  {
    id: "trackingConversions",
    section: "Traffic",
    question: "Are you tracking key conversions?",
    options: ["Both", "Form fills", "Calls", "None"],
  },
  {
    id: "avgCPC",
    section: "Traffic",
    question: "Average CPC (last 30 days)",
    options: ["<£0.50", "£0.50–£3.00", "≥£3.00", "Unsure"],
  },
  {
    id: "costPerAcquisition",
    section: "Conversion",
    question: "Average cost-per-acquisition",
    options: ["<£10", "£10–£50", "≥£50", "Unsure"],
  },
  {
    id: "conversionRate",
    section: "Conversion",
    question: "Average website conversion rate",
    options: ["≥5%", "2–5%", "1–2%", "<1%"],
  },
  {
    id: "ctaVisibility",
    section: "Conversion",
    question: "Primary call-to-action visibility",
    options: ["Yes – both mobile & desktop", "Yes – desktop only", "Yes – mobile only", "No"],
  },
  {
    id: "servicePages",
    section: "Conversion",
    question: "Dedicated service pages?",
    options: ["Yes – all services", "Yes – some", "No"],
  },
  {
    id: "leadManagementSystem",
    section: "Lead Management",
    question: "Lead management system",
    options: ["Dedicated admin/assistant", "Answer every call", "Organised chaos"],
  },
  {
    id: "responseTime",
    section: "Lead Management",
    question: "Average response time",
    options: ["Same hour", "Same day", "Same week", "When I get a chance"],
  },
];

export default function FunnelDiagnostic() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

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
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        onBack={handleBack}
        currentStep={4}
        totalSteps={11}
        showProgress
      />

      <div className="pt-24 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8">
                  <div className="mb-6">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                      {question.section}
                    </span>
                    <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">
                      {question.question}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all hover:border-primary hover:bg-primary/5 ${
                          answers[question.id] === option
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="w-full h-96 bg-muted/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
                <p className="text-muted-foreground">Image Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
