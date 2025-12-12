import { ArrowLeft } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface PageHeaderProps {
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
  productLabel?: string;
}

export function PageHeader({ onBack, currentStep, totalSteps, showProgress = false, productLabel }: PageHeaderProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
      style={{ height: "clamp(60px, 8vh, 73px)" }}
    >
      <div className="max-w-7xl mx-auto h-full" style={{ padding: "0 clamp(1rem, 2vw, 1.5rem)" }}>
        <div className="flex items-center justify-between h-full">
          {onBack ? (
            <button
              onClick={onBack}
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center font-medium"
              style={{ gap: "clamp(0.3rem, 0.5vw, 0.5rem)", fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
            >
              <ArrowLeft style={{ width: "clamp(1rem, 1.5vw, 1.25rem)", height: "clamp(1rem, 1.5vw, 1.25rem)" }} />
              Back
            </button>
          ) : (
            <div style={{ width: "clamp(4rem, 6vw, 5rem)" }} />
          )}
          {showProgress && currentStep && totalSteps && (
            <div
              className="flex-1 flex justify-center"
              style={{ maxWidth: "clamp(20rem, 35vw, 28rem)", margin: "0 auto" }}
            >
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}
          {productLabel ? (
            <div className="text-right">
              <span
                className="text-xs font-semibold text-green-600 bg-green-500/10 rounded-full whitespace-nowrap"
                style={{
                  padding: "clamp(0.25rem, 0.5vw, 0.375rem) clamp(0.625rem, 1vw, 0.75rem)",
                  fontSize: "clamp(0.7rem, 0.9vw, 0.75rem)",
                }}
              >
                Product: {productLabel}
              </span>
            </div>
          ) : (
            <div style={{ width: "clamp(4rem, 6vw, 5rem)" }} />
          )}
        </div>
      </div>
    </div>
  );
}
