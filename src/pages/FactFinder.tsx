import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
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
          <div className="space-y-6">
            <Input
              type="date"
              value={tradingDate}
              onChange={(e) => setTradingDate(e.target.value)}
              className="bg-[#FAFAF8] border-transparent focus:border-primary/30 rounded-xl"
            />
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "dual-input":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Month"
                type="number"
                min="1"
                max="12"
                placeholder="1-12"
                value={monthEstablished}
                onChange={(e) => setMonthEstablished(e.target.value)}
                className="bg-[#FAFAF8] border-transparent focus:border-primary/30 rounded-xl"
              />
              <Input
                label="Year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder={new Date().getFullYear().toString()}
                value={yearEstablished}
                onChange={(e) => setYearEstablished(e.target.value)}
                className="bg-[#FAFAF8] border-transparent focus:border-primary/30 rounded-xl"
              />
            </div>
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "multi-select":
        return (
          <div className="space-y-2.5">
            {generationOptions.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => toggleGeneration(option)}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                  businessGeneration.includes(option)
                    ? "bg-primary text-primary-foreground shadow-[0_4px_16px_rgba(227,102,79,0.25)]"
                    : "bg-[#FAFAF8] text-foreground hover:bg-[#F5F5F3]"
                }`}
              >
                <span>{option}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  businessGeneration.includes(option)
                    ? "border-primary-foreground bg-primary-foreground"
                    : "border-muted-foreground/30"
                }`}>
                  {businessGeneration.includes(option) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </div>
              </motion.button>
            ))}
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth className="mt-6">
              Continue
            </Button>
          </div>
        );
      
      case "number":
        return (
          <div className="space-y-6">
            <Input
              type="number"
              min="0"
              placeholder="Enter number of leads"
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(e.target.value)}
              className="bg-[#FAFAF8] border-transparent focus:border-primary/30 rounded-xl"
            />
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "single-select":
        return (
          <div className="space-y-2.5">
            {["Yes", "No"].map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                  hasGMB === option
                    ? "bg-primary text-primary-foreground shadow-[0_4px_16px_rgba(227,102,79,0.25)]"
                    : "bg-[#FAFAF8] text-foreground hover:bg-[#F5F5F3]"
                }`}
              >
                <span>{option}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  hasGMB === option
                    ? "border-primary-foreground bg-primary-foreground"
                    : "border-muted-foreground/30"
                }`}>
                  {hasGMB === option && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FAFAF8]">
      {/* Subtle abstract background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={handleBack}
          currentStep={2}
          totalSteps={11}
          showProgress
        />

        {/* Content Area - Split Layout */}
        <div className="flex-1 pt-[73px] flex">
          <div className="w-full h-[calc(100vh-73px)] grid md:grid-cols-2">
            {/* Left Side - Question */}
            <div className="bg-white flex items-center justify-center p-12 md:p-20 lg:p-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="max-w-lg"
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                    {currentStep.question}
                  </h2>
                  
                  {/* Decorative Motif */}
                  <div className="mt-10 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 bg-primary rounded-full"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 16 + (i % 3) * 8,
                          opacity: 1 
                        }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Options */}
            <div className="bg-[#FAFAF8] flex items-center justify-center p-8 md:p-16 lg:p-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full max-w-md"
                >
                  {/* Step Indicator */}
                  <div className="mb-10">
                    <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                      Step {step + 1} — {totalSteps}
                    </p>
                    <p className="text-base text-muted-foreground mt-3">
                      {currentStep.subtitle}
                    </p>
                  </div>

                  {/* Options/Inputs Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                    <div className="max-h-[360px] overflow-y-auto">
                      {renderRightContent()}
                    </div>
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={handleBack}
                    className="mt-10 text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-center group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow">
                      <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
                    </div>
                    {step > 0 ? "Back" : "Cancel"}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
