import { createContext, useContext, useState, ReactNode } from "react";

interface RecommendationData {
  product: "SEO" | "LeadGen" | "LSA" | null;
  isLoading: boolean;
}

interface RecommendationContextType {
  recommendation: RecommendationData;
  setRecommendation: (data: RecommendationData) => void;
  fetchRecommendation: (name: string, websiteUrl: string) => void;
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [recommendation, setRecommendation] = useState<RecommendationData>({
    product: null,
    isLoading: false,
  });

  const fetchRecommendation = async (name: string, websiteUrl: string) => {
    setRecommendation({ product: null, isLoading: true });
    
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
        
        setRecommendation({
          product: product === "SEO" ? "SEO" : product,
          isLoading: false,
        });
        console.log("Recommendation received:", product);
      } else {
        console.error("Webhook request failed:", response.status);
        setRecommendation({ product: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation({ product: null, isLoading: false });
    }
  };

  return (
    <RecommendationContext.Provider value={{ recommendation, setRecommendation, fetchRecommendation }}>
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
