import { createContext, useContext, useState, ReactNode } from "react";

interface RecommendationData {
  product: "SEO" | "LeadGen" | "LSA" | null;
  isLoading: boolean;
  isBig3: boolean | null;
}

interface SessionData {
  sessionId: string | null;
  startTime: string | null;
  googleId: string | null;
  googleFullName: string | null;
  googleEmail: string | null;
}

interface RecommendationContextType {
  recommendation: RecommendationData;
  session: SessionData;
  setRecommendation: (data: RecommendationData) => void;
  startSession: (googleId: string, fullName: string | null, email: string | null) => string;
  clearSession: () => void;
  fetchRecommendation: (name: string, websiteUrl: string) => void;
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [recommendation, setRecommendation] = useState<RecommendationData>({
    product: null,
    isLoading: false,
    isBig3: null,
  });

  const [session, setSession] = useState<SessionData>({
    sessionId: null,
    startTime: null,
    googleId: null,
    googleFullName: null,
    googleEmail: null,
  });

  const startSession = (googleId: string, fullName: string | null, email: string | null): string => {
    const sessionId = generateSessionId();
    const startTime = new Date().toISOString();
    setSession({
      sessionId,
      startTime,
      googleId,
      googleFullName: fullName,
      googleEmail: email,
    });
    return sessionId;
  };

  const clearSession = () => {
    setSession({
      sessionId: null,
      startTime: null,
      googleId: null,
      googleFullName: null,
      googleEmail: null,
    });
  };

  const fetchRecommendation = async (name: string, websiteUrl: string) => {
    setRecommendation({ product: null, isLoading: true, isBig3: null });
    
    try {
      const response = await fetch(
        "https://lgnengineers.app.n8n.cloud/webhook/6ac34cbd-0bf9-4bca-a3b1-f5be2c59db6c",
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
        // Response is an array, find the object with "product" key
        const productObj = data.find((item: any) => item.product);
        const product = productObj?.product as "SEO" | "LeadGen" | "LSA" | null;
        
        // Find the is_big_3 value from the response
        const big3Obj = data.find((item: any) => item.is_big_3 !== undefined);
        const isBig3 = big3Obj?.is_big_3 ?? null;
        
        setRecommendation({
          product: product === "SEO" ? "SEO" : product,
          isLoading: false,
          isBig3,
        });
        console.log("Recommendation received:", product, "isBig3:", isBig3);
      } else {
        console.error("Webhook request failed:", response.status);
        setRecommendation({ product: null, isLoading: false, isBig3: null });
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation({ product: null, isLoading: false, isBig3: null });
    }
  };

  return (
    <RecommendationContext.Provider value={{ 
      recommendation, 
      session,
      setRecommendation, 
      startSession,
      clearSession,
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
