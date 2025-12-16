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
      style={{ height: "10cqh" }}
    >
      <div className="h-full w-full" style={{ paddingLeft: "2cqw", paddingRight: "2cqw" }}>
        <div className="flex items-center justify-between h-full w-full">
          {onBack ? (
            <button
              onClick={onBack}
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center font-medium flex-shrink-0"
              style={{ gap: "0.5cqw", fontSize: "1cqw", minWidth: "5cqw" }}
            >
              <ArrowLeft style={{ width: "1.25cqw", height: "1.25cqw" }} />
              Back
            </button>
          ) : (
            <div style={{ width: "5cqw", flexShrink: 0 }} />
          )}
          {showProgress && currentStep && totalSteps && (
            <div className="flex-1 flex justify-center" style={{ maxWidth: "28cqw", margin: "0 auto" }}>
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}
          {productLabel ? (
            <div className="text-right flex-shrink-0" style={{ minWidth: "5cqw" }}>
              <span
                className="font-semibold text-green-600 bg-green-500/10 whitespace-nowrap inline-block"
                style={{
                  paddingTop: "0.4cqw",
                  paddingBottom: "0.4cqw",
                  paddingLeft: "0.8cqw",
                  paddingRight: "0.8cqw",
                  fontSize: "0.75cqw",
                  borderRadius: "1cqw",
                }}
              >
                Product: {productLabel}
              </span>
            </div>
          ) : (
            <div style={{ width: "5cqw", flexShrink: 0 }} />
          )}
        </div>
      </div>
    </div>
  );
}
