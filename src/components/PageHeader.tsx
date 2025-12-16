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
      style={{ height: "73px" }}
    >
      <div className="max-w-7xl mx-auto h-full px-8">
        <div className="flex items-center justify-between h-full">
          {onBack ? (
            <button
              onClick={onBack}
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 font-medium text-base"
              style={{ minWidth: "80px" }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          ) : (
            <div style={{ width: "80px" }} />
          )}
          {showProgress && currentStep && totalSteps && (
            <div className="flex-1 flex justify-center max-w-md mx-auto">
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}
          {productLabel ? (
            <div className="text-right" style={{ minWidth: "80px" }}>
              <span className="font-semibold text-green-600 bg-green-500/10 rounded-full whitespace-nowrap inline-block text-xs px-3 py-1.5">
                Product: {productLabel}
              </span>
            </div>
          ) : (
            <div style={{ width: "80px" }} />
          )}
        </div>
      </div>
    </div>
  );
}
