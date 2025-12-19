import { ArrowLeft, User } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { useAuth } from "@/contexts/AuthContext";

interface PageHeaderProps {
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
  productLabel?: string;
}

export function PageHeader({ onBack, currentStep, totalSteps, showProgress = false, productLabel }: PageHeaderProps) {
  const { user } = useAuth();
  const firstName = user?.fullName?.split(' ')[0] || '';

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
      style={{ height: "7.3vh" }}
    >
      <div className="max-w-7xl mx-auto h-full" style={{ padding: "0 2vw" }}>
        <div className="flex items-center justify-between h-full">
          {onBack ? (
            <button
              onClick={onBack}
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center font-medium"
              style={{ gap: "0.5vw", fontSize: "1vw", minWidth: "5vw" }}
            >
              <ArrowLeft style={{ width: "1.25vw", height: "1.25vw", minWidth: "16px", minHeight: "16px" }} />
              Back
            </button>
          ) : (
            <div style={{ width: "5vw" }} />
          )}
          {showProgress && currentStep && totalSteps && (
            <div className="flex-1 flex justify-center" style={{ maxWidth: "28vw", margin: "0 auto" }}>
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}
          <div className="flex items-center" style={{ gap: "1vw", minWidth: "5vw" }}>
            {firstName && (
              <div className="flex items-center text-foreground/80" style={{ gap: "0.4vw", fontSize: "0.85vw" }}>
                <User style={{ width: "1vw", height: "1vw", minWidth: "14px", minHeight: "14px" }} />
                <span className="font-medium">{firstName}</span>
              </div>
            )}
            {productLabel && (
              <span
                className="font-semibold text-green-600 bg-green-500/10 rounded-full whitespace-nowrap inline-block"
                style={{
                  padding: "0.4vh 0.8vw",
                  fontSize: "0.75vw",
                }}
              >
                Product: {productLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
