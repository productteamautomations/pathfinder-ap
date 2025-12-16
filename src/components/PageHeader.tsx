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
      style={{ height: "73px", containerType: "inline-size" }}
    >
      <div className="h-full" style={{ paddingLeft: "2cqi", paddingRight: "2cqi", maxWidth: "100%" }}>
        <div className="flex items-center justify-between h-full">
          {onBack ? (
            <button
              onClick={onBack}
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center font-medium"
              style={{ gap: "0.5cqi", fontSize: "1cqi", minWidth: "5cqi" }}
            >
              <ArrowLeft style={{ width: "1.25cqi", height: "1.25cqi" }} />
              Back
            </button>
          ) : (
            <div style={{ width: "5cqi" }} />
          )}
          {showProgress && currentStep && totalSteps && (
            <div className="flex-1 flex justify-center" style={{ maxWidth: "28cqi", margin: "0 auto" }}>
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}
          {productLabel ? (
            <div className="text-right" style={{ minWidth: "5cqi" }}>
              <span
                className="font-semibold text-green-600 bg-green-500/10 whitespace-nowrap inline-block"
                style={{
                  paddingTop: "0.4cqi",
                  paddingBottom: "0.4cqi",
                  paddingLeft: "0.8cqi",
                  paddingRight: "0.8cqi",
                  fontSize: "0.75cqi",
                  borderRadius: "1cqi",
                }}
              >
                Product: {productLabel}
              </span>
            </div>
          ) : (
            <div style={{ width: "5cqi" }} />
          )}
        </div>
      </div>
    </div>
  );
}
