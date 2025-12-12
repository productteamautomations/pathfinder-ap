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
    <div className="flex items-center" style={{ gap: "0.6cqw", marginTop: "1cqw" }}>
      <div className="flex" style={{ gap: "0.4cqw" }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-primary"
            style={{ width: "0.5cqw", height: "0.5cqw" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 - i * 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
      <motion.div
        className="bg-gradient-to-r from-primary to-transparent rounded-full"
        style={{ height: "0.15cqw", width: "4cqw" }}
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
      <label className="block font-semibold text-[#173340]" style={{ fontSize: "1.4cqw", marginBottom: "0.8cqw" }}>
        {label}
        {required && (
          <span className="text-primary" style={{ marginLeft: "0.3cqw" }}>
            *
          </span>
        )}
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
    "w-full border-2 border-border/30 bg-white/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all duration-200";

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader onBack={() => navigate("/")} currentStep={1} totalSteps={7} showProgress />

      {/* Content Area */}
      <div className="flex-1 pt-[73px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-sm shadow-[0_25px_80px_rgba(0,0,0,0.08),0_10px_30px_rgba(0,0,0,0.04)] border border-border/20"
          style={{
            width: "min(90vw, calc((100vh - 73px) * 0.9 * 1.5))",
            aspectRatio: "1.5",
            containerType: "size",
            borderRadius: "2.5cqw",
            padding: "3cqw",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "2.5cqw" }}>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block font-semibold tracking-widest text-primary uppercase"
              style={{ fontSize: "1.1cqw", marginBottom: "0.8cqw" }}
            >
              Step 1 of 7
            </motion.span>
            <h2 className="font-display font-bold text-title" style={{ fontSize: "3.2cqw" }}>
              Business Information
            </h2>
            <p className="text-muted-foreground" style={{ marginTop: "0.5cqw", fontSize: "1.5cqw" }}>
              Help us understand your business better
            </p>
            <OrangeAccent />
          </div>

          {/* Form Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5cqw" }}>
            {/* Section 1: Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
              <h3
                className="font-semibold tracking-wider text-muted-foreground uppercase flex items-center"
                style={{ fontSize: "1.1cqw", gap: "0.8cqw" }}
              >
                <span
                  className="rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold"
                  style={{ width: "2cqw", height: "2cqw", fontSize: "1cqw" }}
                >
                  1
                </span>
                Timeline
              </h3>
              <div style={{ paddingLeft: "2.8cqw" }}>
                <FormField label="Business established" required>
                  <div className="grid grid-cols-2" style={{ gap: "1.2cqw", maxWidth: "35cqw" }}>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Month"
                      value={monthEstablished}
                      onChange={(e) => setMonthEstablished(e.target.value)}
                      className={inputStyles}
                      style={{ padding: "1.2cqw", borderRadius: "1.2cqw", fontSize: "1.4cqw" }}
                    />
                    <input
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      placeholder="Year"
                      value={yearEstablished}
                      onChange={(e) => setYearEstablished(e.target.value)}
                      className={inputStyles}
                      style={{ padding: "1.2cqw", borderRadius: "1.2cqw", fontSize: "1.4cqw" }}
                    />
                  </div>
                </FormField>
              </div>
            </div>

            {/* Section 2: Lead Generation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
              <h3
                className="font-semibold tracking-wider text-muted-foreground uppercase flex items-center"
                style={{ fontSize: "1.1cqw", gap: "0.8cqw" }}
              >
                <span
                  className="rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold"
                  style={{ width: "2cqw", height: "2cqw", fontSize: "1cqw" }}
                >
                  2
                </span>
                Lead Generation
              </h3>
              <div className="grid md:grid-cols-2" style={{ gap: "1.8cqw", paddingLeft: "2.8cqw" }}>
                <FormField label="Monthly leads" required>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter number"
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(e.target.value)}
                    className={inputStyles}
                    style={{ padding: "1.2cqw", borderRadius: "1.2cqw", fontSize: "1.4cqw" }}
                  />
                </FormField>

                <FormField label="Do you have a GMB account?" required>
                  <div className="flex" style={{ gap: "0.8cqw" }}>
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setHasGMB(option)}
                        className={`flex-1 border-2 font-medium transition-all duration-200 ${
                          hasGMB === option
                            ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "border-border/30 bg-white/80 text-foreground hover:border-primary/50 hover:bg-white"
                        }`}
                        style={{ padding: "1.2cqw", borderRadius: "1.2cqw", fontSize: "1.4cqw" }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </FormField>
              </div>
            </div>

            {/* Section 3: Business Channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
              <h3
                className="font-semibold tracking-wider text-muted-foreground uppercase flex items-center"
                style={{ fontSize: "1.1cqw", gap: "0.8cqw" }}
              >
                <span
                  className="rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold"
                  style={{ width: "2cqw", height: "2cqw", fontSize: "1cqw" }}
                >
                  3
                </span>
                Business Channels
              </h3>
              <div style={{ paddingLeft: "2.8cqw" }}>
              <FormField label="How do you generate business?" required className="">
                <div className="flex flex-wrap" style={{ gap: "0.8cqw" }}>
                  {generationOptions.map((option) => (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => toggleGeneration(option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`rounded-full border-2 font-medium transition-all duration-200 ${
                        businessGeneration.includes(option)
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "border-border/30 bg-white/80 text-foreground hover:border-primary/50 hover:bg-white"
                      }`}
                      style={{ padding: "0.8cqw 1.3cqw", fontSize: "1.3cqw" }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </FormField>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-end border-t border-border/20" style={{ paddingTop: "2cqw" }}>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid() || isWaitingForRecommendation}
                style={{ fontSize: "1.4cqw", padding: "1.3cqw 3.5cqw", borderRadius: "0.8cqw" }}
              >
                <span className="flex items-center" style={{ gap: "0.8cqw" }}>
                  {isWaitingForRecommendation ? (
                    <>
                      <Loader2 style={{ width: "1.4cqw", height: "1.4cqw" }} className="animate-spin" />
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
                  className="flex items-center text-destructive"
                  style={{ gap: "0.8cqw", fontSize: "1.3cqw", marginTop: "1.2cqw" }}
                >
                  <AlertCircle style={{ width: "1.4cqw", height: "1.4cqw" }} />
                  <span>Unable to get recommendation. Please try again.</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
