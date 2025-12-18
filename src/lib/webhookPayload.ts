// Format LeadGen diagnostic answers in condensed format
export function formatLeadGenAnswers(answers: Record<string, string>) {
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
export function formatSEOAnswers(answers: Record<string, string | string[]>) {
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
export function calculateLeadGenScores(answers: Record<string, string>) {
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
export function calculateSEOScores(answers: Record<string, string | string[]>) {
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

// Build the complete webhook payload
export function buildWebhookPayload(
  state: Record<string, any>,
  pricingData: {
    product: string;
    requiresSmartSite: boolean;
    initialCost: string;
    monthlyCost: string;
    contractLength: string;
  }
) {
  const diagnosticAnswers = state?.diagnosticAnswers || {};
  const isLeadGen = pricingData.product === "LeadGen Trial";
  const isSEO = pricingData.product === "Local SEO";
  const isLSA = pricingData.product === "LSA";

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

  return {
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
    product: pricingData.product,
    smartSiteIncluded: pricingData.requiresSmartSite,
    initialCost: `£${pricingData.initialCost}`,
    monthlyCost: pricingData.monthlyCost === "N/A" ? "N/A" : `£${pricingData.monthlyCost}`,
    contractLength: pricingData.contractLength,
    
    submittedAt: new Date().toISOString(),
  };
}

// Send the webhook
export async function sendPricingWebhook(payload: ReturnType<typeof buildWebhookPayload>) {
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
  
  return response;
}