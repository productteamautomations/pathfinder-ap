import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { ChevronRight } from "lucide-react";

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

interface StepConfig {
  question: string;
  subtitle: string;
  field: "cms" | "industry" | "postcode";
  placeholder: string;
}

const steps: StepConfig[] = [
  {
    question: "What CMS do you use?",
    subtitle: "Tell us about your website platform",
    field: "cms",
    placeholder: "WordPress, Shopify, Custom, etc.",
  },
  {
    question: "What industry are you in?",
    subtitle: "Help us understand your market",
    field: "industry",
    placeholder: "E.g., Retail, Healthcare, Technology",
  },
  {
    question: "What's your postcode?",
    subtitle: "We'll use this for local targeting",
    field: "postcode",
    placeholder: "E.g., SW1A 1AA",
  },
];

export default function BusinessDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [cms, setCms] = useState("");
  const [industry, setIndustry] = useState("");
  const [postcode, setPostcode] = useState("");

  const totalSteps = steps.length;
  const currentStep = steps[step];

  const getValue = () => {
    switch (currentStep.field) {
      case "cms": return cms;
      case "industry": return industry;
      case "postcode": return postcode;
    }
  };

  const setValue = (value: string) => {
    switch (currentStep.field) {
      case "cms": setCms(value); break;
      case "industry": setIndustry(value); break;
      case "postcode": setPostcode(value); break;
    }
  };

  const isStepValid = () => !!getValue();

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      navigate("/funnel-diagnostic", {
        state: {
          ...location.state,
          cms,
          industry,
          postcode,
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={handleBack}
          currentStep={3}
          totalSteps={11}
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

                      {/* Input */}
                      <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                          <Input
                            placeholder={currentStep.placeholder}
                            value={getValue()}
                            onChange={(e) => setValue(e.target.value)}
                            className="border-0 shadow-none focus:ring-0 bg-transparent text-lg"
                          />
                        </div>
                        <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
                          Continue
                        </Button>
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
