import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function FactFinder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tradingDate, setTradingDate] = useState("");
  const [monthEstablished, setMonthEstablished] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [businessGeneration, setBusinessGeneration] = useState<string[]>([]);
  const [monthlyLeads, setMonthlyLeads] = useState("");
  const [hasGMB, setHasGMB] = useState<string>("");

  const generationOptions = [
    "None",
    "Social Media",
    "PPC / Paid Ads",
    "Word of Mouth",
    "Offline (Leaflets, press, etc)",
    "Tender Contracts",
    "Recurring",
  ];

  const toggleGeneration = (option: string) => {
    setBusinessGeneration((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const isValid =
    tradingDate && monthEstablished && yearEstablished && businessGeneration.length > 0 && monthlyLeads && hasGMB;

  const handleContinue = () => {
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
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={2}
        totalSteps={11}
        showProgress
      />

      {/* Fixed Title Section */}
      <div className="fixed top-[73px] left-0 right-0 bg-background z-40 border-b border-border/50 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-foreground">Fact Finder</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Help us understand your business better
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 pt-[145px] pb-[88px] px-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8">
              <div className="space-y-6">
                <Input
                  label="Trading Date"
                  type="date"
                  value={tradingDate}
                  onChange={(e) => setTradingDate(e.target.value)}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Month Established"
                    type="number"
                    min="1"
                    max="12"
                    placeholder="1-12"
                    value={monthEstablished}
                    onChange={(e) => setMonthEstablished(e.target.value)}
                    required
                  />
                  <Input
                    label="Year Established"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder={new Date().getFullYear().toString()}
                    value={yearEstablished}
                    onChange={(e) => setYearEstablished(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Business Generation <span className="text-secondary">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {generationOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleGeneration(option)}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          businessGeneration.includes(option)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Monthly Leads"
                  type="number"
                  min="0"
                  placeholder="Enter number of leads"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Do you have a GMB account? <span className="text-secondary">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setHasGMB(option)}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          hasGMB === option
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Fixed Button Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-background z-40 border-t border-border/50 px-6 py-5">
        <div className="max-w-3xl mx-auto">
          <Button onClick={handleContinue} disabled={!isValid} fullWidth>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
