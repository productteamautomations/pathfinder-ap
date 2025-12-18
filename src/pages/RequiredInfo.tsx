import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Eye, EyeOff, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Orange accent motif component
function OrangeAccent() {
  return (
    <div className="flex items-center gap-2 mt-6">
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

// Format LeadGen diagnostic answers in condensed format
function formatLeadGenAnswers(answers: Record<string, string>) {
  const condensed: Record<string, string> = {};
  
  if (answers.avgCTR) condensed["CTR"] = answers.avgCTR;
  if (answers.trackingConversions) condensed["Tracking"] = answers.trackingConversions;
  if (answers.avgCPC) condensed["CPC"] = answers.avgCPC;
  if (answers.costPerAcquisition) condensed["CPA"] = answers.costPerAcquisition;
  if (answers.conversionRate) condensed["CR"] = answers.conversionRate;
  if (answers.ctaVisibility) condensed["CTA Visible without scrolling?"] = answers.ctaVisibility === "Yes – both mobile & desktop" ? "Yes - both" : answers.ctaVisibility === "Yes – desktop only" ? "Yes - desktop only" : answers.ctaVisibility === "Yes – mobile only" ? "Yes - mobile only" : "No";
  if (answers.servicePages) condensed["Dedicated service pages?"] = answers.servicePages === "Yes – all services" ? "Yes - all" : answers.servicePages === "Yes – some" ? "Yes - some" : "No";
  if (answers.leadManagementSystem) condensed["Lead management system"] = answers.leadManagementSystem;
  if (answers.responseTime) condensed["Average response time"] = answers.responseTime;
  
  return condensed;
}

// Format SEO diagnostic answers in condensed format
function formatSEOAnswers(answers: Record<string, string | string[]>) {
  const condensed: Record<string, string> = {};
  
  if (answers.avgRanking) condensed["Avg ranking top 10 terms"] = answers.avgRanking as string;
  if (answers.visibilityTracking) condensed["Visibility tracking (GSC/GBP)"] = answers.visibilityTracking as string;
  if (answers.actionStatsTracking) {
    const tracking = answers.actionStatsTracking;
    condensed["Action stats tracking"] = Array.isArray(tracking) ? (tracking.length > 0 ? tracking.join(", ") : "None") : tracking || "None";
  }
  if (answers.ctaVisibility) condensed["CTA Visible without scrolling?"] = answers.ctaVisibility === "Yes - on both desktop and mobile" ? "Yes - both" : answers.ctaVisibility === "Yes - Just on desktop" ? "Yes - desktop only" : answers.ctaVisibility === "Yes - Just on mobile" ? "Yes - mobile only" : "No";
  if (answers.servicePages) condensed["Dedicated service pages?"] = answers.servicePages === "Yes - For all services" ? "Yes - all" : answers.servicePages === "Yes - For some services" ? "Yes - some" : "No";
  if (answers.locationTargeting) condensed["Location targeting"] = answers.locationTargeting as string;
  if (answers.conversionTracking) condensed["Conversion tracking"] = answers.conversionTracking as string;
  if (answers.leadManagementSystem) condensed["Lead management system"] = answers.leadManagementSystem as string;
  if (answers.responseTime) condensed["Average response time"] = answers.responseTime as string;
  
  return condensed;
}

// Calculate funnel scores for LeadGen
function calculateLeadGenScores(answers: Record<string, string>) {
  const scoreMap: Record<string, Record<string, number>> = {
    avgCTR: { "≥5%": 4, "3–5%": 3, "<2%": 1, Unsure: 0 },
    trackingConversions: { Both: 4, "Form Fills": 2, Calls: 2, None: 0 },
    avgCPC: { "<£0.50": 4, "£0.50–£3.00": 2, "≥£3.00": 1, Unsure: 0 },
    costPerAcquisition: { "<£10": 4, "£10–£50": 2, "≥£50": 1, Unsure: 0 },
    conversionRate: { "≥5%": 4, "2–5%": 3, "1–2%": 2, "<1%": 0 },
    ctaVisibility: { "Yes – both mobile & desktop": 4, "Yes – desktop only": 2, "Yes – mobile only": 2, No: 0 },
    servicePages: { "Yes – all services": 4, "Yes – some": 2, No: 0 },
    leadManagementSystem: { "Assistant (Human/Virtual)": 4, "Answer Every Call": 3, "Self dedicated admin time": 2, "Organised Chaos": 0 },
    responseTime: { "Same hour": 4, "Same day": 3, "Same week": 1, "When I get a chance": 0 },
  };

  const trafficQuestions = ["avgCTR", "trackingConversions", "avgCPC"];
  const conversionQuestions = ["costPerAcquisition", "conversionRate", "ctaVisibility", "servicePages"];
  const leadQuestions = ["leadManagementSystem", "responseTime"];

  const calcCategoryScore = (questionIds: string[]) => {
    const totalScore = questionIds.reduce((sum, id) => sum + (scoreMap[id]?.[answers[id]] ?? 0), 0);
    const maxScore = questionIds.length * 4;
    return Math.round((totalScore / maxScore) * 100);
  };

  const trafficScore = calcCategoryScore(trafficQuestions);
  const conversionScore = calcCategoryScore(conversionQuestions);
  const leadScore = calcCategoryScore(leadQuestions);
  const overallScore = Math.round((trafficScore + conversionScore + leadScore) / 3);

  return { trafficScore, conversionScore, leadScore, overallScore };
}

// Calculate funnel scores for SEO
function calculateSEOScores(answers: Record<string, string | string[]>) {
  const scoreMap: Record<string, Record<string, number>> = {
    avgRanking: { "1-10": 4, "10-20": 2, ">20": 1, Unsure: 0 },
    visibilityTracking: { Both: 4, GSC: 2, GBP: 2, Neither: 0 },
    ctaVisibility: { "Yes - on both desktop and mobile": 4, "Yes - Just on desktop": 2, "Yes - Just on mobile": 2, No: 0 },
    servicePages: { "Yes - For all services": 4, "Yes - For some services": 2, No: 0 },
    locationTargeting: { "Yes - Throughout the site": 4, "Yes - Just the homepage/main pages": 2, No: 0, Unsure: 0 },
    conversionTracking: { Both: 4, "Calls": 2, "Form fills and/or emails": 2, None: 0 },
    leadManagementSystem: { "Assistant (human/virtual)": 4, "Answer every call": 3, "Self dedicated admin time": 2, "No system in place": 0 },
    responseTime: { "Same hour": 4, "Same day": 3, "Same week": 1, "When I can": 0 },
  };

  const trafficQuestions = ["avgRanking", "visibilityTracking"];
  const conversionQuestions = ["ctaVisibility", "servicePages", "locationTargeting"];
  const leadQuestions = ["conversionTracking", "leadManagementSystem", "responseTime"];

  const calcCategoryScore = (questionIds: string[]) => {
    let totalScore = 0;
    let questionCount = 0;
    
    for (const id of questionIds) {
      if (id === "actionStatsTracking") continue; // Multi-select handled separately
      if (scoreMap[id]?.[answers[id] as string] !== undefined) {
        totalScore += scoreMap[id][answers[id] as string];
        questionCount++;
      }
    }
    
    // Handle multi-select actionStatsTracking
    if (answers.actionStatsTracking) {
      const tracking = answers.actionStatsTracking;
      const trackingArray = Array.isArray(tracking) ? tracking : [];
      totalScore += Math.min(trackingArray.length, 3); // Max 3 points for selecting all 3
      questionCount++;
    }
    
    const maxScore = questionCount * 4;
    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  };

  const trafficScore = calcCategoryScore([...trafficQuestions, "actionStatsTracking"]);
  const conversionScore = calcCategoryScore(conversionQuestions);
  const leadScore = calcCategoryScore(leadQuestions);
  const overallScore = Math.round((trafficScore + conversionScore + leadScore) / 3);

  return { trafficScore, conversionScore, leadScore, overallScore };
}

export default function RequiredInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as Record<string, any> | null;
  
  const product = state?.product || "Unknown";
  const totalSteps = product === "LSA" ? 4 : 7;
  const productLabel = product === "LeadGen Trial" ? "Lead Generation" : product === "LSA" ? "LSAs" : product;

  const [clientName, setClientName] = useState("");
  const [contractSelected, setContractSelected] = useState("");
  const [recurringRevenue, setRecurringRevenue] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUrl, setLoginUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isForm1Valid = clientName && contractSelected && recurringRevenue;
  const isForm2Valid = username && password && loginUrl;
  const allValid = isForm1Valid && isForm2Valid;

  const handleSubmit = async () => {
    if (!allValid || isSubmitting) return;
    
    setIsSubmitting(true);

    // Build the payload
    const diagnosticAnswers = state?.diagnosticAnswers || {};
    const isLeadGen = product === "LeadGen Trial";
    const isSEO = product === "Local SEO";
    const isLSA = product === "LSA";

    // Format diagnostic answers
    let condensedAnswers: Record<string, string> = {};
    let funnelScores = { trafficScore: 0, conversionScore: 0, leadScore: 0, overallScore: 0 };
    
    if (isLeadGen) {
      condensedAnswers = formatLeadGenAnswers(diagnosticAnswers);
      funnelScores = calculateLeadGenScores(diagnosticAnswers);
    } else if (isSEO) {
      condensedAnswers = formatSEOAnswers(diagnosticAnswers);
      funnelScores = calculateSEOScores(diagnosticAnswers);
    }
    // LSA has no funnel diagnostic

    const payload = {
      // Welcome page data
      name: state?.name || "",
      websiteUrl: state?.noUrl ? "N/A" : (state?.url || ""),
      
      // FactFinder data
      factFinder: {
        monthEstablished: state?.monthEstablished || "",
        yearEstablished: state?.yearEstablished || "",
        businessGeneration: state?.businessGeneration || [],
        monthlyLeads: state?.monthlyLeads || "",
        hasGMB: state?.hasGMB || "",
      },
      
      // Diagnostic answers (condensed format)
      diagnosticAnswers: condensedAnswers,
      
      // Funnel scores
      funnelScores: isLSA ? null : {
        traffic: `${funnelScores.trafficScore}%`,
        conversions: `${funnelScores.conversionScore}%`,
        leadManagement: `${funnelScores.leadScore}%`,
        overall: `${funnelScores.overallScore}%`,
      },
      
      // Pricing data
      product: product,
      smartSiteIncluded: state?.requiresSmartSite || false,
      initialCost: `£${state?.initialCost || "0.00"}`,
      monthlyCost: state?.monthlyCost === "N/A" ? "N/A" : `£${state?.monthlyCost || "0.00"}`,
      contractLength: state?.contractLength || "",
      
      // RequiredInfo form data
      clientDetails: {
        clientName,
        contractSelected,
        recurringRevenue: `£${recurringRevenue}`,
      },
      websiteLogin: {
        username,
        loginUrl,
        // Note: password sent but should be handled securely on backend
        password,
      },
      
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://lgnengineers.app.n8n.cloud/webhook/7e3c68fb-a6bf-43a8-a339-cc1a34a5153d",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Campaign setup complete! Thank you for your information.");
        navigate("/");
      } else {
        throw new Error("Webhook request failed");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={totalSteps}
          totalSteps={totalSteps}
          showProgress
          productLabel={productLabel}
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
                {/* Left Side - Client Details */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                      Final Step
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-title leading-tight tracking-tight">
                      Client Details
                    </h2>
                    
                    {/* Orange Accent Motif */}
                    <OrangeAccent />

                    {/* Form Fields */}
                    <div className="mt-10 space-y-5">
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <Input
                          label="Client Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Enter client name"
                          className="border-0 shadow-none focus:ring-0 bg-transparent"
                        />
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <Input
                          label="Contract Selected"
                          value={contractSelected}
                          onChange={(e) => setContractSelected(e.target.value)}
                          placeholder="E.g., 12 Month Local SEO"
                          className="border-0 shadow-none focus:ring-0 bg-transparent"
                        />
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <Input
                          label="Recurring Revenue"
                          type="number"
                          value={recurringRevenue}
                          onChange={(e) => setRecurringRevenue(e.target.value)}
                          placeholder="£ per month"
                          className="border-0 shadow-none focus:ring-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Login Details */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <h3 className="text-2xl font-display font-bold text-title mb-8">Website Login Details</h3>

                    {/* Form Fields */}
                    <div className="space-y-5 mb-8">
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <Input
                          label="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter username"
                          className="border-0 shadow-none focus:ring-0 bg-transparent"
                        />
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full pr-12 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <Input
                          label="Login URL"
                          type="url"
                          value={loginUrl}
                          onChange={(e) => setLoginUrl(e.target.value)}
                          placeholder="https://yourwebsite.com/wp-admin"
                          className="border-0 shadow-none focus:ring-0 bg-transparent"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button onClick={handleSubmit} disabled={!allValid || isSubmitting} fullWidth>
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Complete Setup"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      All information is securely stored and encrypted
                    </p>

                    {/* Back Button */}
                    <button
                      onClick={() => navigate(-1)}
                      className="mt-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all">
                        <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
                      </div>
                      <span className="uppercase tracking-wider">Back</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
    </div>
  );
}