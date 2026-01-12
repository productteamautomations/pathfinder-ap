const WEBHOOK_URL = "https://lgnengineers.app.n8n.cloud/webhook/7e3c68fb-a6bf-43a8-a339-cc1a34a5153d";

// Format LeadGen diagnostic answers in condensed format
export function formatLeadGenAnswers(answers: Record<string, string>) {
  const condensed: Record<string, string> = {};

  if (answers.avgCTR) condensed["CTR"] = answers.avgCTR;
  if (answers.trackingConversions) condensed["Tracking"] = answers.trackingConversions;
  if (answers.avgCPC) condensed["CPC"] = answers.avgCPC;
  if (answers.costPerAcquisition) condensed["CPA"] = answers.costPerAcquisition;
  if (answers.conversionRate) condensed["CR"] = answers.conversionRate;
  if (answers.ctaVisibility)
    condensed["CTA Visible without scrolling?"] =
      answers.ctaVisibility === "Yes – both mobile & desktop"
        ? "Yes - both"
        : answers.ctaVisibility === "Yes – desktop only"
          ? "Yes - desktop only"
          : answers.ctaVisibility === "Yes – mobile only"
            ? "Yes - mobile only"
            : "No";
  if (answers.servicePages)
    condensed["Dedicated service pages?"] =
      answers.servicePages === "Yes – all services"
        ? "Yes - all"
        : answers.servicePages === "Yes – some"
          ? "Yes - some"
          : "No";
  if (answers.leadManagementSystem) condensed["Lead management system"] = answers.leadManagementSystem;
  if (answers.responseTime) condensed["Average response time"] = answers.responseTime;

  return condensed;
}

// Format SEO diagnostic answers in condensed format
export function formatSEOAnswers(answers: Record<string, string | string[]>) {
  const condensed: Record<string, string> = {};

  if (answers.avgRanking) condensed["Avg ranking top 10 terms"] = answers.avgRanking as string;
  if (answers.visibilityTracking) condensed["Visibility tracking (GSC/GBP)"] = answers.visibilityTracking as string;
  if (answers.actionStatsTracking) {
    const tracking = answers.actionStatsTracking;
    condensed["Action stats tracking"] = Array.isArray(tracking)
      ? tracking.length > 0
        ? tracking.join(", ")
        : "None"
      : tracking || "None";
  }
  if (answers.ctaVisibility)
    condensed["CTA Visible without scrolling?"] =
      answers.ctaVisibility === "Yes - on both desktop and mobile"
        ? "Yes - both"
        : answers.ctaVisibility === "Yes - Just on desktop"
          ? "Yes - desktop only"
          : answers.ctaVisibility === "Yes - Just on mobile"
            ? "Yes - mobile only"
            : "No";
  if (answers.servicePages)
    condensed["Dedicated service pages?"] =
      answers.servicePages === "Yes - For all services"
        ? "Yes - all"
        : answers.servicePages === "Yes - For some services"
          ? "Yes - some"
          : "No";
  if (answers.locationTargeting) condensed["Location targeting"] = answers.locationTargeting as string;
  if (answers.conversionTracking) condensed["Conversion tracking"] = answers.conversionTracking as string;
  if (answers.leadManagementSystem) condensed["Lead management system"] = answers.leadManagementSystem as string;
  if (answers.responseTime) condensed["Average response time"] = answers.responseTime as string;

  return condensed;
}

// Calculate funnel scores for LeadGen
export function calculateLeadGenScores(answers: Record<string, string>) {
  const scoreMap: Record<string, Record<string, number>> = {
    avgCTR: { "≥5%": 4, "3–5%": 3, "<2%": 1, Unsure: 0 },
    trackingConversions: { Both: 4, "Form Fills": 2, Calls: 2, None: 0 },
    avgCPC: { "<£0.50": 4, "£0.50–£3.00": 2, "≥£3.00": 1, Unsure: 0 },
    costPerAcquisition: { "<£10": 4, "£10–£50": 2, "≥£50": 1, Unsure: 0 },
    conversionRate: { "≥5%": 4, "2–5%": 3, "1–2%": 2, "<1%": 0 },
    ctaVisibility: { "Yes – both mobile & desktop": 4, "Yes – desktop only": 2, "Yes – mobile only": 2, No: 0 },
    servicePages: { "Yes – all services": 4, "Yes – some": 2, No: 0 },
    leadManagementSystem: {
      "Assistant (Human/Virtual)": 4,
      "Answer Every Call": 3,
      "Self dedicated admin time": 2,
      "Organised Chaos": 0,
    },
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
export function calculateSEOScores(answers: Record<string, string | string[]>) {
  const scoreMap: Record<string, Record<string, number>> = {
    avgRanking: { "1-10": 4, "10-20": 2, ">20": 1, Unsure: 0 },
    visibilityTracking: { Both: 4, GSC: 2, GBP: 2, Neither: 0 },
    ctaVisibility: {
      "Yes - on both desktop and mobile": 4,
      "Yes - Just on desktop": 2,
      "Yes - Just on mobile": 2,
      No: 0,
    },
    servicePages: { "Yes - For all services": 4, "Yes - For some services": 2, No: 0 },
    locationTargeting: { "Yes - Throughout the site": 4, "Yes - Just the homepage/main pages": 2, No: 0, Unsure: 0 },
    conversionTracking: { Both: 4, Calls: 2, "Form fills and/or emails": 2, None: 0 },
    leadManagementSystem: {
      "Assistant (human/virtual)": 4,
      "Answer every call": 3,
      "Self dedicated admin time": 2,
      "No system in place": 0,
    },
    responseTime: { "Same hour": 4, "Same day": 3, "Same week": 1, "When I can": 0 },
  };

  const trafficQuestions = ["avgRanking", "visibilityTracking"];
  const conversionQuestions = ["ctaVisibility", "servicePages", "locationTargeting"];
  const leadQuestions = ["conversionTracking", "leadManagementSystem", "responseTime"];

  const calcCategoryScore = (questionIds: string[]) => {
    let totalScore = 0;
    let questionCount = 0;

    for (const id of questionIds) {
      if (id === "actionStatsTracking") continue;
      if (scoreMap[id]?.[answers[id] as string] !== undefined) {
        totalScore += scoreMap[id][answers[id] as string];
        questionCount++;
      }
    }

    if (answers.actionStatsTracking) {
      const tracking = answers.actionStatsTracking;
      const trackingArray = Array.isArray(tracking) ? tracking : [];
      totalScore += Math.min(trackingArray.length, 3);
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

// Session and tracking data
interface SessionInfo {
  sessionId: string | null;
  googleId: string | null;
  googleFullName: string | null;
  googleEmail: string | null;
  startTime: string | null;
}

// Full state from location.state
interface PageState {
  name?: string;
  url?: string;
  noUrl?: boolean;
  monthEstablished?: string;
  yearEstablished?: string;
  businessGeneration?: string[];
  monthlyLeads?: string;
  hasGMB?: string;
  isVatRegistered?: string;
  radiusCovered?: string;
  resultTimeline?: string;
  runsPPC?: string;
  diagnosticAnswers?: Record<string, string | string[]>;
}

// Pricing data (only filled on pricing page)
interface PricingInfo {
  product?: string;
  smartSiteIncluded?: boolean;
  initialCost?: string;
  monthlyCost?: string;
  contractLength?: string;
}

// Product info (available from step 2 onwards)
interface ProductInfo {
  product?: string | null;
  smartSiteIncluded?: boolean | null;
}

// Step tracking
interface StepInfo {
  step: number | null;
  totalSteps: number | null;
  maxStep?: number;
}

// Build the per-page webhook payload
export function buildPageWebhookPayload(
  sessionInfo: SessionInfo,
  pageState: PageState,
  pricingInfo: PricingInfo | null,
  isStartPage: boolean,
  isEndPage: boolean,
  stepInfo: StepInfo = { step: null, totalSteps: null, maxStep: 0 },
  productInfo: ProductInfo | null = null,
) {
  // Use maxStep if provided and > 0, otherwise use step
  const effectiveStep = (stepInfo.maxStep && stepInfo.maxStep > 0) ? stepInfo.maxStep : stepInfo.step;
  const diagnosticAnswers = pageState.diagnosticAnswers || {};
  const productType = pricingInfo?.product || null;
  
  // Format diagnostic answers based on product type
  let formattedDiagnosticAnswers: Record<string, string> = {};
  let funnelScores = { trafficScore: 0, conversionScore: 0, leadScore: 0, overallScore: 0 };
  
  if (Object.keys(diagnosticAnswers).length > 0) {
    if (productType === "Local SEO" || productType === "LSA") {
      formattedDiagnosticAnswers = formatSEOAnswers(diagnosticAnswers);
      funnelScores = calculateSEOScores(diagnosticAnswers);
    } else if (productType === "LeadGen Trial") {
      formattedDiagnosticAnswers = formatLeadGenAnswers(diagnosticAnswers as Record<string, string>);
      funnelScores = calculateLeadGenScores(diagnosticAnswers as Record<string, string>);
    } else {
      // Try to detect based on answer keys
      const hasLeadGenKeys = 'avgCTR' in diagnosticAnswers || 'avgCPC' in diagnosticAnswers;
      if (hasLeadGenKeys) {
        formattedDiagnosticAnswers = formatLeadGenAnswers(diagnosticAnswers as Record<string, string>);
        funnelScores = calculateLeadGenScores(diagnosticAnswers as Record<string, string>);
      } else {
        formattedDiagnosticAnswers = formatSEOAnswers(diagnosticAnswers);
        funnelScores = calculateSEOScores(diagnosticAnswers);
      }
    }
  }

  return {
    // Session identifiers
    sessionId: sessionInfo.sessionId || null,
    googleId: sessionInfo.googleId || null,
    googleFullName: sessionInfo.googleFullName || null,
    googleEmail: sessionInfo.googleEmail || null,
    
    // Page markers
    startPage: isStartPage,
    endPage: isEndPage,
    
    // Step tracking - use effectiveStep (maxStep if available, else step)
    step: effectiveStep,
    totalSteps: stepInfo.totalSteps,
    
    // Client info
    clientName: pageState.name || null,
    websiteUrl: pageState.noUrl ? "N/A" : (pageState.url || null),
    
    // Fact finder data
    factFinder: {
      monthEstablished: pageState.monthEstablished || null,
      yearEstablished: pageState.yearEstablished || null,
      businessGeneration: pageState.businessGeneration?.length ? pageState.businessGeneration : null,
      monthlyLeads: pageState.monthlyLeads || null,
      hasGMB: pageState.hasGMB || null,
      isVatRegistered: pageState.isVatRegistered || null,
      radiusCovered: pageState.radiusCovered || null,
      resultTimeline: pageState.resultTimeline || null,
      runsPPC: pageState.runsPPC || null,
    },
    
    // Diagnostic answers (condensed format)
    diagnosticAnswers: Object.keys(formattedDiagnosticAnswers).length > 0 ? {
      CTR: formattedDiagnosticAnswers["CTR"] || null,
      Tracking: formattedDiagnosticAnswers["Tracking"] || null,
      CPC: formattedDiagnosticAnswers["CPC"] || null,
      CPA: formattedDiagnosticAnswers["CPA"] || null,
      CR: formattedDiagnosticAnswers["CR"] || null,
      "CTA Visible without scrolling?": formattedDiagnosticAnswers["CTA Visible without scrolling?"] || null,
      "Dedicated service pages?": formattedDiagnosticAnswers["Dedicated service pages?"] || null,
      "Lead management system": formattedDiagnosticAnswers["Lead management system"] || null,
      "Average response time": formattedDiagnosticAnswers["Average response time"] || null,
    } : {
      CTR: null,
      Tracking: null,
      CPC: null,
      CPA: null,
      CR: null,
      "CTA Visible without scrolling?": null,
      "Dedicated service pages?": null,
      "Lead management system": null,
      "Average response time": null,
    },
    
    // Funnel scores
    funnelScores: Object.keys(diagnosticAnswers).length > 0 ? {
      traffic: `${funnelScores.trafficScore}%`,
      conversions: `${funnelScores.conversionScore}%`,
      leadManagement: `${funnelScores.leadScore}%`,
      overall: `${funnelScores.overallScore}%`,
    } : {
      traffic: null,
      conversions: null,
      leadManagement: null,
      overall: null,
    },
    
    // Pricing data
    product: pricingInfo?.product || productInfo?.product || null,
    smartSiteIncluded: pricingInfo?.smartSiteIncluded ?? productInfo?.smartSiteIncluded ?? null,
    initialCost: pricingInfo?.initialCost ? `£${pricingInfo.initialCost}` : null,
    monthlyCost: pricingInfo?.monthlyCost ? (pricingInfo.monthlyCost === "N/A" ? "N/A" : `£${pricingInfo.monthlyCost}`) : null,
    contractLength: pricingInfo?.contractLength || null,
    
    // Timestamps
    startTime: sessionInfo.startTime || null,
    timestamp: new Date().toISOString(),
  };
}

// Send the per-page webhook
export async function sendPageWebhook(payload: ReturnType<typeof buildPageWebhookPayload>) {
  try {
    if (import.meta.env.DEV) {
      console.log("Page webhook payload:", JSON.stringify(payload, null, 2));
    }

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Webhook sent:", response.status);
    return response;
  } catch (error) {
    console.error("Webhook error:", error);
    // Don't throw - we don't want to block navigation if webhook fails
  }
}
