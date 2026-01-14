import { createContext, useContext, useState, ReactNode } from "react";

interface RecommendationData {
  product: "SEO" | "LeadGen" | "LSA" | null;
  isLoading: boolean;
  isBig3: boolean | null;
  isLsa: boolean | null;
  smartSite: boolean | null;
}

interface SessionData {
  sessionId: string | null;
  startTime: string | null;
  googleId: string | null;
  googleFullName: string | null;
  googleEmail: string | null;
  maxStep: number;
}

interface RecommendationContextType {
  recommendation: RecommendationData;
  session: SessionData;
  smartSiteEnabled: boolean;
  setSmartSiteEnabled: (enabled: boolean) => void;
  setRecommendation: (data: RecommendationData) => void;
  startSession: (googleId: string, fullName: string | null, email: string | null) => string;
  clearSession: () => void;
  updateMaxStep: (step: number) => void;
  fetchRecommendation: (name: string, websiteUrl: string) => void;
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [recommendation, setRecommendationState] = useState<RecommendationData>({
    product: null,
    isLoading: false,
    isBig3: null,
    isLsa: null,
    smartSite: null,
  });

  const [smartSiteEnabled, setSmartSiteEnabled] = useState(false);

  const [session, setSession] = useState<SessionData>({
    sessionId: null,
    startTime: null,
    googleId: null,
    googleFullName: null,
    googleEmail: null,
    maxStep: 0,
  });

  // Wrapper to also update smartSiteEnabled when recommendation changes
  const setRecommendation = (data: RecommendationData) => {
    setRecommendationState(data);
    // Auto-enable SmartSite if isBig3 is false (required)
    if (data.isBig3 === false) {
      setSmartSiteEnabled(true);
    }
  };

  const startSession = (googleId: string, fullName: string | null, email: string | null): string => {
    const sessionId = generateSessionId();
    const startTime = new Date().toISOString();
    const newSession = {
      sessionId,
      startTime,
      googleId,
      googleFullName: fullName,
      googleEmail: email,
      maxStep: 1, // Welcome is step 1
    };
    setSession(newSession);
    // Log session creation for debugging
    console.log("Session started:", newSession);
    return sessionId;
  };

  const clearSession = () => {
    setSession({
      sessionId: null,
      startTime: null,
      googleId: null,
      googleFullName: null,
      googleEmail: null,
      maxStep: 0,
    });
  };

  const updateMaxStep = (step: number) => {
    setSession(prev => ({
      ...prev,
      maxStep: Math.max(prev.maxStep, step),
    }));
  };

  const fetchRecommendation = async (name: string, websiteUrl: string) => {
    setRecommendation({ product: null, isLoading: true, isBig3: null, isLsa: null, smartSite: null });
    
    try {
      const response = await fetch(
        "https://n8n.addpeople.net/webhook/6ac34cbd-0bf9-4bca-a3b1-f5be2c59db6c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, websiteUrl }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        // Find smartsite value from the response
        const smartSiteObj = data.find((item: any) => item.smartsite !== undefined);
        const smartSite = smartSiteObj?.smartsite ?? null;
        
        // Find lsa value from the response (may be string "true" or boolean true)
        const lsaObj = data.find((item: any) => item.lsa !== undefined);
        const lsaValue = lsaObj?.lsa;
        const isLsa = lsaValue === true || lsaValue === "true" ? true : lsaValue === false || lsaValue === "false" ? false : null;
        
        // Find the is_big_3 value from the response
        const big3Obj = data.find((item: any) => item.is_big_3 !== undefined);
        const isBig3 = big3Obj?.is_big_3 ?? null;
        
        setRecommendation({
          product: null, // Product is now determined locally in FactFinder
          isLoading: false,
          isBig3,
          isLsa,
          smartSite,
        });
        console.log("Webhook data received - isLsa:", isLsa, "smartSite:", smartSite, "isBig3:", isBig3);
      } else {
        console.error("Webhook request failed:", response.status);
        setRecommendation({ product: null, isLoading: false, isBig3: null, isLsa: null, smartSite: null });
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation({ product: null, isLoading: false, isBig3: null, isLsa: null, smartSite: null });
    }
  };

  return (
    <RecommendationContext.Provider value={{ 
      recommendation, 
      session,
      smartSiteEnabled,
      setSmartSiteEnabled,
      setRecommendation, 
      startSession,
      clearSession,
      updateMaxStep,
      fetchRecommendation 
    }}>
      {children}
    </RecommendationContext.Provider>
  );
}

export function useRecommendation() {
  const context = useContext(RecommendationContext);
  if (context === undefined) {
    throw new Error("useRecommendation must be used within a RecommendationProvider");
  }
  return context;
}
