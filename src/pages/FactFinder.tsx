import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
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

// Orange accent motif component
function OrangeAccent() {
  return (
    <div className="flex items-center gap-2 mt-8">
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
      navigate("/funnel-diagnostic", {
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
            <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
              <Input
                type="date"
                value={tradingDate}
                onChange={(e) => setTradingDate(e.target.value)}
                className="border-0 shadow-none focus:ring-0 bg-transparent"
              />
            </div>
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "dual-input":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Month"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="1-12"
                  value={monthEstablished}
                  onChange={(e) => setMonthEstablished(e.target.value)}
                  className="border-border/50"
                />
                <Input
                  label="Year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder={new Date().getFullYear().toString()}
                  value={yearEstablished}
                  onChange={(e) => setYearEstablished(e.target.value)}
                  className="border-border/50"
                />
              </div>
            </div>
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "multi-select":
        return (
          <div className="space-y-3">
            {generationOptions.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleGeneration(option)}
                className={`w-full p-4 rounded-2xl border text-left font-medium transition-all duration-200 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                  businessGeneration.includes(option)
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                    : "border-border/30 bg-white text-foreground hover:border-primary/40 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                }`}
              >
                <span>{option}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${businessGeneration.includes(option) ? "text-primary-foreground" : "text-muted-foreground"}`} />
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
            <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
              <Input
                type="number"
                min="0"
                placeholder="Enter number of leads"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(e.target.value)}
                className="border-0 shadow-none focus:ring-0 bg-transparent text-lg"
              />
            </div>
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              Continue
            </Button>
          </div>
        );
      
      case "single-select":
        return (
          <div className="space-y-4">
            {["Yes", "No"].map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-5 rounded-2xl border text-left font-medium transition-all duration-200 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                  hasGMB === option
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(227,102,79,0.25)]"
                    : "border-border/30 bg-white text-foreground hover:border-primary/40 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                }`}
              >
                <span className="text-lg">{option}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${hasGMB === option ? "text-primary-foreground" : "text-muted-foreground"}`} />
              </motion.button>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={handleBack}
          currentStep={2}
          totalSteps={11}
          showProgress
        />

        {/* Content Area - Split Layout */}
        <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            {/* Main Card with soft shadow, sitting above background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              <div className="grid md:grid-cols-2 min-h-[70vh]">
                {/* Left Side - Question Area */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#173340] leading-tight tracking-tight">
                        {currentStep.question}
                      </h2>
                      
                      {/* Orange Accent Motif */}
                      <OrangeAccent />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Side - Form Area */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {/* Step Indicator */}
                      <div className="mb-10">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Step</span>
                          <span className="text-2xl font-bold text-foreground">{step + 1}</span>
                          <span className="text-muted-foreground text-lg">—</span>
                          <span className="text-2xl font-bold text-muted-foreground">{totalSteps}</span>
                        </div>
                        <p className="text-base text-muted-foreground mt-3">
                          {currentStep.subtitle}
                        </p>
                      </div>

                      {/* Options/Inputs */}
                      <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                        {renderRightContent()}
                      </div>

                      {/* Back Button */}
                      <button
                        onClick={handleBack}
                        className="mt-10 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all">
                          <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
                        </div>
                        <span className="uppercase tracking-wider">{step > 0 ? "Back" : "Cancel"}</span>
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
