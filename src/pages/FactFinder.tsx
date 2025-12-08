import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { useRecommendation } from "@/contexts/RecommendationContext";
import { Loader2, AlertCircle } from "lucide-react";

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
    <div className="flex items-center gap-2 mt-3">
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
  const { recommendation, fetchRecommendation } = useRecommendation();
  const [retryError, setRetryError] = useState(false);
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false);
  const hasAttemptedRetry = useRef(false);

  const [monthEstablished, setMonthEstablished] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [businessGeneration, setBusinessGeneration] = useState<string[]>([]);
  const [monthlyLeads, setMonthlyLeads] = useState("");
  const [hasGMB, setHasGMB] = useState<string>("");

  const toggleGeneration = (option: string) => {
    setBusinessGeneration((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
  };

  const isFormValid = () => {
    return monthEstablished && yearEstablished && businessGeneration.length > 0 && monthlyLeads && hasGMB;
  };

  // Watch for when loading finishes after a retry attempt
  useEffect(() => {
    if (hasAttemptedRetry.current && !recommendation.isLoading && !recommendation.product) {
      setRetryError(true);
      hasAttemptedRetry.current = false;
    }
  }, [recommendation.isLoading, recommendation.product]);

  // Navigate when recommendation arrives after clicking submit
  useEffect(() => {
    if (hasClickedSubmit && recommendation.product && !recommendation.isLoading) {
      const productRoutes: Record<string, string> = {
        SEO: "/product-recommendation/localseo",
        LeadGen: "/product-recommendation/leadgen",
        LSA: "/product-recommendation/lsa",
      };
      
      const newState = {
        ...location.state,
        monthEstablished,
        yearEstablished,
        businessGeneration,
        monthlyLeads,
        hasGMB,
      };
      
      if (productRoutes[recommendation.product]) {
        navigate(productRoutes[recommendation.product], { state: newState });
      }
    }
  }, [hasClickedSubmit, recommendation.product, recommendation.isLoading]);

  const handleSubmit = () => {
    if (!isFormValid()) return;

    // If recommendation is already available, navigate immediately
    if (recommendation.product) {
      const productRoutes: Record<string, string> = {
        SEO: "/product-recommendation/localseo",
        LeadGen: "/product-recommendation/leadgen",
        LSA: "/product-recommendation/lsa",
      };
      
      const newState = {
        ...location.state,
        monthEstablished,
        yearEstablished,
        businessGeneration,
        monthlyLeads,
        hasGMB,
      };
      
      if (productRoutes[recommendation.product]) {
        navigate(productRoutes[recommendation.product], { state: newState });
      }
      return;
    }

    // If still loading, mark that we clicked and wait
    if (recommendation.isLoading) {
      setHasClickedSubmit(true);
      return;
    }

    // No recommendation available - retry the webhook
    const state = location.state as any;
    const name = state?.name || "";
    const websiteUrl = state?.url || "";

    if (name && websiteUrl) {
      setRetryError(false);
      setHasClickedSubmit(true);
      hasAttemptedRetry.current = true;
      fetchRecommendation(name, websiteUrl);
    } else {
      setRetryError(true);
    }
  };

  const isWaitingForRecommendation = hasClickedSubmit && recommendation.isLoading;
  const showError = retryError;

  const inputStyles =
    "w-full px-4 py-3 rounded-xl border-2 border-border/30 bg-white/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all duration-200";

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader onBack={() => navigate("/")} currentStep={1} totalSteps={7} showProgress />

      {/* Content Area */}
      <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-[0_25px_80px_rgba(0,0,0,0.08),0_10px_30px_rgba(0,0,0,0.04)] border border-border/20 p-6 md:p-8"
          >
            {/* Header */}
            <div className="mb-5">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-2"
              >
                Step 1 of 7
              </motion.span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Business Information</h2>
              <p className="text-muted-foreground mt-1 text-sm">Help us understand your business better</p>
              <OrangeAccent />
            </div>

            {/* Form Grid */}
            <div className="space-y-5">
              {/* Section 1: Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Timeline
                </h3>
                <div className="pl-7">
                  <FormField label="Business established" required>
                    <div className="grid grid-cols-2 gap-3 max-w-xs">
                      <input
                        type="number"
                        min="1"
                        max="12"
                        placeholder="Month"
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
              </div>

              {/* Section 2: Lead Generation */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Lead Generation
                </h3>
                <div className="grid md:grid-cols-2 gap-4 pl-7">
                  <FormField label="Monthly leads" required>
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter number"
                      value={monthlyLeads}
                      onChange={(e) => setMonthlyLeads(e.target.value)}
                      className={inputStyles}
                    />
                  </FormField>

                  <FormField label="Do you have a GMB account?" required>
                    <div className="flex gap-2">
                      {["Yes", "No"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setHasGMB(option)}
                          className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                            hasGMB === option
                              ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                              : "border-border/30 bg-white/80 text-foreground hover:border-primary/50 hover:bg-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </FormField>
                </div>
              </div>

              {/* Section 3: Business Channels */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Business Channels
                </h3>
                <FormField label="How do you generate business?" required className="pl-7">
                  <div className="flex flex-wrap gap-2">
                    {generationOptions.map((option) => (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => toggleGeneration(option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 ${
                          businessGeneration.includes(option)
                            ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "border-border/30 bg-white/80 text-foreground hover:border-primary/50 hover:bg-white"
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </FormField>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-end pt-4 border-t border-border/20">
                <Button 
                  onClick={handleSubmit} 
                  disabled={!isFormValid() || isWaitingForRecommendation} 
                  className="px-10"
                >
                  <span className="flex items-center gap-2">
                    {isWaitingForRecommendation ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </span>
                </Button>
                
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-destructive mt-3"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Unable to get recommendation. Please try again.</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
