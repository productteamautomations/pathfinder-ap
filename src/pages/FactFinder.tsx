import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { GlassCard } from "@/components/GlassCard";
import { TopographicBackground } from "@/components/TopographicBackground";
import { ChevronRight } from "lucide-react";

const generationOptions = [
  "None",
  "Social Media",
  "PPC / Paid Ads",
  "Word of Mouth",
  "Offline (Leaflets, press, etc)",
  "Tender Contracts",
  "Recurring",
];

interface StepConfig {
  question: string;
  subtitle: string;
  type: "date" | "dual-input" | "multi-select" | "number" | "single-select";
}

const steps: StepConfig[] = [
  {
    question: "When did you start trading?",
    subtitle: "Please enter your trading date",
    type: "date",
  },
  {
    question: "When was your business established?",
    subtitle: "Please enter month and year",
    type: "dual-input",
  },
  {
    question: "How do you generate business?",
    subtitle: "Select all that apply",
    type: "multi-select",
  },
  {
    question: "How many leads do you get monthly?",
    subtitle: "Please enter a number",
    type: "number",
  },
  {
    question: "Do you have a GMB account?",
    subtitle: "Please select one option",
    type: "single-select",
  },
];

export default function FactFinder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);
  
  const [tradingDate, setTradingDate] = useState("");
  const [monthEstablished, setMonthEstablished] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [businessGeneration, setBusinessGeneration] = useState<string[]>([]);
  const [monthlyLeads, setMonthlyLeads] = useState("");
  const [hasGMB, setHasGMB] = useState<string>("");

  const totalSteps = steps.length;
  const currentStep = steps[step];

  const toggleGeneration = (option: string) => {
    setBusinessGeneration((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const isStepValid = () => {
    switch (step) {
      case 0: return !!tradingDate;
      case 1: return !!monthEstablished && !!yearEstablished;
      case 2: return businessGeneration.length > 0;
      case 3: return !!monthlyLeads;
      case 4: return !!hasGMB;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      navigate("/business-details", {
        state: {
          ...location.state,
          tradingDate,
          monthEstablished,
          yearEstablished,
          businessGeneration,
          monthlyLeads,
          hasGMB,
        },
      });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleOptionSelect = (value: string) => {
    setHasGMB(value);
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const renderRightContent = () => {
    switch (currentStep.type) {
      case "date":
        return (
          <div className="space-y-4">
            <Input
              type="date"
              value={tradingDate}
              onChange={(e) => setTradingDate(e.target.value)}
            />
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "dual-input":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Month"
                type="number"
                min="1"
                max="12"
                placeholder="1-12"
                value={monthEstablished}
                onChange={(e) => setMonthEstablished(e.target.value)}
              />
              <Input
                label="Year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder={new Date().getFullYear().toString()}
                value={yearEstablished}
                onChange={(e) => setYearEstablished(e.target.value)}
              />
            </div>
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "multi-select":
        return (
          <div className="space-y-3">
            {generationOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleGeneration(option)}
                className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${
                  businessGeneration.includes(option)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white/80 text-foreground hover:border-primary/50"
                }`}
              >
                <span>{option}</span>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </button>
            ))}
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth className="mt-4">
              Continue
            </Button>
          </div>
        );
      
      case "number":
        return (
          <div className="space-y-4">
            <Input
              type="number"
              min="0"
              placeholder="Enter number of leads"
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(e.target.value)}
            />
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "single-select":
        return (
          <div className="space-y-3">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${
                  hasGMB === option
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white/80 text-foreground hover:border-primary/50"
                }`}
              >
                <span>{option}</span>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </button>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={handleBack}
          currentStep={2}
          totalSteps={11}
          showProgress
        />

        {/* Content Area - Split Layout */}
        <div className="flex-1 pt-[73px] px-4 md:px-8 flex items-center justify-center">
          <div className="w-full max-w-6xl h-[calc(100vh-140px)]">
            <GlassCard className="p-0 overflow-hidden rounded-3xl h-full">
              <div className="grid md:grid-cols-2 h-full">
                {/* Left Side - Question */}
                <div className="bg-white p-10 md:p-16 flex flex-col justify-center rounded-l-3xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-4xl md:text-5xl font-bold text-[#173340] leading-tight">
                        {currentStep.question}
                      </h2>
                      
                      {/* Decorative Element */}
                      <div className="mt-8 flex gap-1.5">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 bg-primary rounded-full"
                            initial={{ height: 0 }}
                            animate={{ height: 12 + Math.random() * 24 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Side - Options */}
                <div className="p-10 md:p-16 flex flex-col justify-center bg-white/50 rounded-r-3xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step Indicator */}
                      <div className="mb-8">
                        <p className="text-xl font-medium text-foreground">
                          Step {step + 1} — {totalSteps}
                        </p>
                        <p className="text-base text-muted-foreground mt-2">
                          {currentStep.subtitle}
                        </p>
                      </div>

                      {/* Options/Inputs */}
                      <div className="max-h-[400px] overflow-y-auto pr-2">
                        {renderRightContent()}
                      </div>

                      {/* Cancel Button */}
                      <button
                        onClick={handleBack}
                        className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
                      >
                        {step > 0 ? "BACK" : "CANCEL"}
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <ChevronRight className="w-5 h-5 text-primary-foreground rotate-180" />
                        </div>
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
