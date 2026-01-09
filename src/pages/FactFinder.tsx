import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { useRecommendation } from "@/contexts/RecommendationContext";
import { Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { buildPageWebhookPayload, sendPageWebhook } from "@/lib/webhookPayload";

const radiusOptions = ["0-5 miles", "0-50 miles", "50+ miles"];
const timelineOptions = ["ASAP", "Time to let it build up"];

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
  const { recommendation, fetchRecommendation, session, updateMaxStep } = useRecommendation();
  const [retryError, setRetryError] = useState(false);
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false);
  const hasAttemptedRetry = useRef(false);
  const hasSetProductWebhook = useRef(false);

  // Check if user selected "No URL" on welcome page
  const isNoUrlFlow = (location.state as any)?.noUrl === true;

  const [monthEstablished, setMonthEstablished] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [businessGeneration, setBusinessGeneration] = useState<string[]>([]);
  const [monthlyLeads, setMonthlyLeads] = useState("");
  const [hasGMB, setHasGMB] = useState<string>("");
  const [isVatRegistered, setIsVatRegistered] = useState<string>("");
  const [radiusCovered, setRadiusCovered] = useState<string>("");
  const [resultTimeline, setResultTimeline] = useState<string>("");
  const [runsPPC, setRunsPPC] = useState<string>("");
  const [timelineDropdownOpen, setTimelineDropdownOpen] = useState(false);

  const toggleGeneration = (option: string) => {
    setBusinessGeneration((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
  };

  const isFormValid = () => {
    return (
      monthEstablished && yearEstablished && businessGeneration.length > 0 && monthlyLeads && hasGMB && isVatRegistered && radiusCovered && resultTimeline && runsPPC
    );
  };

  // Determine the effective product based on VAT registration
  const getEffectiveProduct = (product: string | null) => {
    if (product === "LSA" && isVatRegistered === "No") {
      return "SEO";
    }
    return product;
  };

  // Watch for when loading finishes after a retry attempt
  useEffect(() => {
    if (hasAttemptedRetry.current && !recommendation.isLoading && !recommendation.product) {
      setRetryError(true);
      hasAttemptedRetry.current = false;
    }
  }, [recommendation.isLoading, recommendation.product]);

  // Send webhook when product becomes available after button click
  useEffect(() => {
    if (hasClickedSubmit && recommendation.product && !recommendation.isLoading && !hasSetProductWebhook.current) {
      hasSetProductWebhook.current = true;

      const newState = {
        ...location.state,
        monthEstablished,
        yearEstablished,
        businessGeneration,
        monthlyLeads,
        hasGMB,
        isVatRegistered,
        radiusCovered,
        resultTimeline,
        runsPPC,
      };

      const effectiveProduct = getEffectiveProduct(recommendation.product);

      // Send webhook with product information
      try {
        const payload = buildPageWebhookPayload(
          {
            sessionId: session.sessionId,
            googleId: session.googleId,
            googleFullName: session.googleFullName,
            googleEmail: session.googleEmail,
            startTime: session.startTime,
          },
          newState,
          null,
          false,
          false,
          { step: 2, totalSteps: null, maxStep: Math.max(session.maxStep, 2) },
          { product: effectiveProduct, smartSiteIncluded: null },
        );
        sendPageWebhook(payload);
      } catch (e) {
        console.error("Webhook error:", e);
      }
    }
  }, [hasClickedSubmit, recommendation.product, recommendation.isLoading]);

  // Navigate when recommendation arrives after clicking submit (only for normal URL flow)
  useEffect(() => {
    if (isNoUrlFlow) return; // Skip for no URL flow

    if (hasClickedSubmit && recommendation.product && !recommendation.isLoading) {
      const effectiveProduct = getEffectiveProduct(recommendation.product);

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
        isVatRegistered,
        radiusCovered,
        resultTimeline,
        runsPPC,
      };

      if (effectiveProduct && productRoutes[effectiveProduct]) {
        navigate(productRoutes[effectiveProduct], { state: newState });
      }
    }
  }, [hasClickedSubmit, recommendation.product, recommendation.isLoading, isNoUrlFlow, isVatRegistered]);

  const handleSubmit = () => {
    if (!isFormValid()) return;

    // Update maxStep to 2 (FactFinder page)
    updateMaxStep(2);

    const state = location.state as any;
    const newState = {
      ...state,
      monthEstablished,
      yearEstablished,
      businessGeneration,
      monthlyLeads,
      hasGMB,
      isVatRegistered,
      radiusCovered,
      resultTimeline,
      runsPPC,
    };

    const effectiveProduct = getEffectiveProduct(recommendation.product);

    // Send webhook with session data from context - wrapped in try-catch so navigation always works
    try {
      const payload = buildPageWebhookPayload(
        {
          sessionId: session.sessionId,
          googleId: session.googleId,
          googleFullName: session.googleFullName,
          googleEmail: session.googleEmail,
          startTime: session.startTime,
        },
        newState,
        null,
        false,
        false,
        { step: 2, totalSteps: null, maxStep: Math.max(session.maxStep, 2) },
        effectiveProduct ? { product: effectiveProduct, smartSiteIncluded: null } : null,
      );
      sendPageWebhook(payload);
    } catch (e) {
      console.error("Webhook error:", e);
    }

    // No URL flow - skip webhook wait and go straight to LeadGen
    if (isNoUrlFlow) {
      navigate("/product-recommendation/leadgen", { state: newState });
      return;
    }

    // If recommendation is already available, navigate immediately
    if (recommendation.product) {
      const productRoutes: Record<string, string> = {
        SEO: "/product-recommendation/localseo",
        LeadGen: "/product-recommendation/leadgen",
        LSA: "/product-recommendation/lsa",
      };

      if (effectiveProduct && productRoutes[effectiveProduct]) {
        navigate(productRoutes[effectiveProduct], { state: newState });
      }
      return;
    }

    // If still loading, mark that we clicked and wait
    if (recommendation.isLoading) {
      setHasClickedSubmit(true);
      return;
    }

    // No recommendation available - retry the webhook
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
          className="bg-white/95 backdrop-blur-sm shadow-[0_25px_80px_rgba(0,0,0,0.08),0_10px_30px_rgba(0,0,0,0.04)] border border-border/20 flex flex-col"
          style={{
            width: "min(90vw, calc((100vh - 73px) * 0.92 * 1.5))",
            height: "calc((100vh - 73px) * 0.92)",
            containerType: "size",
            borderRadius: "2.5cqw",
            padding: "3cqw",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "2cqw" }}>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block font-semibold tracking-widest text-primary uppercase"
              style={{ fontSize: "1.1cqw", marginBottom: "0.6cqw" }}
            >
              Step 1 of 7
            </motion.span>
            <h2 className="font-display font-bold text-title" style={{ fontSize: "3cqw" }}>
              Business Information
            </h2>
            <p className="text-muted-foreground" style={{ marginTop: "0.4cqw", fontSize: "1.4cqw" }}>
              Help us understand your business better
            </p>
            <OrangeAccent />
          </div>

          {/* Form Grid - flex-1 to take remaining space */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Main form sections */}
            <div className="flex flex-col" style={{ gap: "1.8cqw" }}>
            {/* Row 1: Timeline + Service Area */}
            <div className="grid md:grid-cols-2" style={{ gap: "2cqw" }}>
              {/* Section 1: Timeline */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8cqw" }}>
                <h3
                  className="font-semibold tracking-wider text-muted-foreground uppercase flex items-center"
                  style={{ fontSize: "0.9cqw", gap: "0.6cqw" }}
                >
                  <span
                    className="rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold"
                    style={{ width: "1.6cqw", height: "1.6cqw", fontSize: "0.8cqw" }}
                  >
                    1
                  </span>
                  Timeline
                </h3>
                <div style={{ paddingLeft: "2.2cqw" }}>
                  <FormField label="Business trading date" required>
                    <div className="grid grid-cols-2" style={{ gap: "0.8cqw" }}>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        placeholder="Month"
                        value={monthEstablished}
                        onChange={(e) => setMonthEstablished(e.target.value)}
                        className={inputStyles}
                        style={{ padding: "0.9cqw", borderRadius: "1cqw", fontSize: "1.2cqw" }}
                      />
                      <input
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="Year"
                        value={yearEstablished}
                        onChange={(e) => setYearEstablished(e.target.value)}
                        className={inputStyles}
                        style={{ padding: "0.9cqw", borderRadius: "1cqw", fontSize: "1.2cqw" }}
                      />
                    </div>
                  </FormField>
                </div>
              </div>

              {/* Section 2: Service Area */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8cqw" }}>
                <h3
                  className="font-semibold tracking-wider text-muted-foreground uppercase flex items-center"
                  style={{ fontSize: "0.9cqw", gap: "0.6cqw" }}
                >
                  <span
                    className="rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold"
                    style={{ width: "1.6cqw", height: "1.6cqw", fontSize: "0.8cqw" }}
                  >
                    2
                  </span>
                  Service Area
                </h3>
                <div style={{ paddingLeft: "2.2cqw" }}>
                  <FormField label="What radius do you cover?" required>
                    <div className="flex" style={{ gap: "0.6cqw" }}>
                      {radiusOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setRadiusCovered(option)}
                          className={`flex-1 border-2 font-medium transition-all duration-200 ${
                            radiusCovered === option
                              ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                              : "border-border/30 bg-white/80 text-foreground hover:border-primary/50 hover:bg-white"
                          }`}
                          style={{ padding: "0.9cqw", borderRadius: "1cqw", fontSize: "1.2cqw" }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </FormField>
                </div>
              </div>
            </div>

            {/* Row 2: Lead Generation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8cqw" }}>
              <h3
                className="font-semibold tracking-wider text-muted-foreground uppercase flex items-center"
                style={{ fontSize: "0.9cqw", gap: "0.6cqw" }}
              >
                <span
                  className="rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold"
                  style={{ width: "1.6cqw", height: "1.6cqw", fontSize: "0.8cqw" }}
                >
                  3
                </span>
                Lead Generation
              </h3>
              <div className="grid md:grid-cols-3" style={{ gap: "1.5cqw", paddingLeft: "2.2cqw" }}>
                <FormField label="Monthly leads" required>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter number"
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(e.target.value)}
                    className={inputStyles}
                    style={{ padding: "0.9cqw", borderRadius: "1cqw", fontSize: "1.2cqw" }}
                  />
                </FormField>

                <FormField label="Do you have a GMB account?" required>
                  <div className="flex" style={{ gap: "0.6cqw" }}>
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
                        style={{ padding: "0.9cqw", borderRadius: "1cqw", fontSize: "1.2cqw" }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </FormField>

                <FormField label="Do you currently run PPC campaigns?" required>
                  <div className="flex" style={{ gap: "0.6cqw" }}>
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setRunsPPC(option)}
                        className={`flex-1 border-2 font-medium transition-all duration-200 ${
                          runsPPC === option
                            ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "border-border/30 bg-white/80 text-foreground hover:border-primary/50 hover:bg-white"
                        }`}
                        style={{ padding: "0.9cqw", borderRadius: "1cqw", fontSize: "1.2cqw" }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </FormField>
              </div>
            </div>

            {/* Row 3: Business Channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8cqw" }}>
              <h3
                className="font-semibold tracking-wider text-muted-foreground uppercase flex items-center"
                style={{ fontSize: "0.9cqw", gap: "0.6cqw" }}
              >
                <span
                  className="rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold"
                  style={{ width: "1.6cqw", height: "1.6cqw", fontSize: "0.8cqw" }}
                >
                  4
                </span>
                Business Channels
              </h3>
              <div style={{ paddingLeft: "2.2cqw" }}>
                <FormField label="How do you generate business?" required className="">
                  <div className="flex flex-wrap" style={{ gap: "0.6cqw" }}>
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
                        style={{ padding: "0.6cqw 1cqw", fontSize: "1.1cqw" }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </FormField>
              </div>
            </div>
            </div>

            {/* Bottom Row: VAT + Timeline + Continue */}
            <div className="flex items-end justify-between border-t border-border/20" style={{ paddingTop: "1.5cqw", gap: "2cqw" }}>
              {/* VAT Toggle */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6cqw" }}>
                <label className="font-semibold text-[#173340]" style={{ fontSize: "1.2cqw" }}>
                  Are you VAT-registered or a limited company? <span className="text-primary">*</span>
                </label>
                <div className="flex" style={{ gap: "0.5cqw" }}>
                  {["Yes", "No"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setIsVatRegistered(option)}
                      className={`border-2 font-medium transition-all duration-200 ${
                        isVatRegistered === option
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "border-border/30 bg-white/80 text-foreground hover:border-primary/50 hover:bg-white"
                      }`}
                      style={{ padding: "0.8cqw 1.5cqw", borderRadius: "0.8cqw", fontSize: "1.1cqw" }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Dropdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6cqw" }}>
                <label className="font-semibold text-[#173340]" style={{ fontSize: "1.2cqw" }}>
                  When do you need to start seeing results? <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTimelineDropdownOpen(!timelineDropdownOpen)}
                    className={`w-full border-2 font-medium transition-all duration-200 flex items-center justify-between ${
                      resultTimeline
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "border-border/30 bg-white/80 text-foreground hover:border-primary/50 hover:bg-white"
                    }`}
                    style={{ padding: "0.8cqw 1.2cqw", borderRadius: "0.8cqw", fontSize: "1.1cqw", gap: "0.6cqw", minWidth: "14cqw" }}
                  >
                    <span className={resultTimeline ? "" : "text-muted-foreground/50"}>
                      {resultTimeline || "Select timeline"}
                    </span>
                    <ChevronDown 
                      style={{ width: "1.2cqw", height: "1.2cqw" }} 
                      className={`transition-transform duration-200 ${timelineDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {timelineDropdownOpen && (
                    <div 
                      className="absolute z-50 w-full bg-white border-2 border-border/30 shadow-lg"
                      style={{ borderRadius: "0.8cqw", marginTop: "0.3cqw", overflow: "hidden" }}
                    >
                      {timelineOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setResultTimeline(option);
                            setTimelineDropdownOpen(false);
                          }}
                          className={`w-full text-left font-medium transition-all duration-200 hover:bg-primary/10 ${
                            resultTimeline === option ? "bg-primary/10 text-primary" : "text-foreground"
                          }`}
                          style={{ padding: "0.8cqw 1.2cqw", fontSize: "1.1cqw" }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex flex-col items-end">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
