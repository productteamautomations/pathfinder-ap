import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";

const generationOptions = [
  "None",
  "Social Media",
  "PPC / Paid Ads",
  "Word of Mouth",
  "Offline (Leaflets, press, etc)",
  "Tender Contracts",
  "Recurring",
];

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

// Form field component
function FormField({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-[#173340] mb-2">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function FactFinder() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tradingDate, setTradingDate] = useState("");
  const [monthEstablished, setMonthEstablished] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [businessGeneration, setBusinessGeneration] = useState<string[]>([]);
  const [monthlyLeads, setMonthlyLeads] = useState("");
  const [hasGMB, setHasGMB] = useState<string>("");

  const toggleGeneration = (option: string) => {
    setBusinessGeneration((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const isFormValid = () => {
    return (
      tradingDate &&
      monthEstablished &&
      yearEstablished &&
      businessGeneration.length > 0 &&
      monthlyLeads &&
      hasGMB
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
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

  const inputStyles =
    "w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all";

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={2}
          totalSteps={10}
          showProgress
        />

        {/* Content Area */}
        <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center py-8">
          <div className="w-full max-w-3xl">
            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] p-10 md:p-14"
            >
              {/* Header */}
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#173340]">
                  Business Information
                </h2>
                <OrangeAccent />
              </div>

              {/* Form Grid */}
              <div className="space-y-6">
                {/* Row 1: Trading Date & Established */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="When did you start trading?" required>
                    <input
                      type="date"
                      value={tradingDate}
                      onChange={(e) => setTradingDate(e.target.value)}
                      className={inputStyles}
                    />
                  </FormField>

                  <FormField label="Business established" required>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        min="1"
                        max="12"
                        placeholder="Month (1-12)"
                        value={monthEstablished}
                        onChange={(e) => setMonthEstablished(e.target.value)}
                        className={inputStyles}
                      />
                      <input
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="Year"
                        value={yearEstablished}
                        onChange={(e) => setYearEstablished(e.target.value)}
                        className={inputStyles}
                      />
                    </div>
                  </FormField>
                </div>

                {/* Row 2: Monthly Leads & GMB */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="Monthly leads" required>
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter number of leads"
                      value={monthlyLeads}
                      onChange={(e) => setMonthlyLeads(e.target.value)}
                      className={inputStyles}
                    />
                  </FormField>

                  <FormField label="Do you have a GMB account?" required>
                    <div className="flex gap-3">
                      {["Yes", "No"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setHasGMB(option)}
                          className={`flex-1 px-4 py-3 rounded-xl border font-medium transition-all ${
                            hasGMB === option
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border/50 bg-white text-foreground hover:border-primary/40"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </FormField>
                </div>

                {/* Row 3: Business Generation - Full Width */}
                <FormField label="How do you generate business?" required>
                  <div className="flex flex-wrap gap-2">
                    {generationOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleGeneration(option)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          businessGeneration.includes(option)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/50 bg-white text-foreground hover:border-primary/40"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </FormField>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
                    className="px-10"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
