import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { GlassCard } from "@/components/GlassCard";
import { WaveBackground } from "@/components/WaveBackground";

const generationOptions = [
  "None",
  "Social Media",
  "PPC / Paid Ads",
  "Word of Mouth",
  "Offline (Leaflets, press, etc)",
  "Tender Contracts",
  "Recurring",
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

  const totalSteps = 5;

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

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Trading Date</h2>
              <p className="text-sm text-muted-foreground mt-1">When did you start trading?</p>
            </div>
            <Input
              type="date"
              value={tradingDate}
              onChange={(e) => setTradingDate(e.target.value)}
              className="text-center"
            />
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">When was your business established?</h2>
              <p className="text-sm text-muted-foreground mt-1">Month and year of establishment</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Business Generation</h2>
              <p className="text-sm text-muted-foreground mt-1">How do you generate business? (Select all that apply)</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {generationOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleGeneration(option)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    businessGeneration.includes(option)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white/50 text-foreground hover:border-primary/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Monthly Leads</h2>
              <p className="text-sm text-muted-foreground mt-1">How many leads do you receive per month?</p>
            </div>
            <Input
              type="number"
              min="0"
              placeholder="Enter number of leads"
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(e.target.value)}
            />
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Google My Business</h2>
              <p className="text-sm text-muted-foreground mt-1">Do you have a GMB account?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => setHasGMB(option)}
                  className={`p-4 rounded-xl border text-lg font-medium transition-all ${
                    hasGMB === option
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white/50 text-foreground hover:border-primary/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WaveBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={handleBack}
          currentStep={2}
          totalSteps={11}
          showProgress
        />

        {/* Fixed Title Section */}
        <div className="fixed top-[73px] left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-primary">Fact Finder</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Step {step + 1} of {totalSteps}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 pt-[140px] pb-[100px] px-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-8">
                  {renderStep()}
                </GlassCard>
              </motion.div>
            </AnimatePresence>

            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === step ? "bg-primary w-8" : idx < step ? "bg-primary/50 w-1.5" : "bg-muted w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Button Section */}
        <div className="fixed bottom-0 left-0 right-0 z-40 px-6 py-5">
          <div className="max-w-md mx-auto">
            <Button onClick={handleNext} disabled={!isStepValid()} fullWidth>
              {step === totalSteps - 1 ? "Continue" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
