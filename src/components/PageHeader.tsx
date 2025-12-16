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
          {productLabel ? (
            <div className="text-right" style={{ minWidth: "5vw" }}>
              <span
                className="font-semibold text-green-600 bg-green-500/10 rounded-full whitespace-nowrap inline-block"
                style={{
                  padding: "0.4vh 0.8vw",
                  fontSize: "0.75vw",
                }}
              >
                Product: {productLabel}
              </span>
            </div>
          ) : (
            <div style={{ width: "5vw" }} />
          )}
        </div>
      </div>
    </div>
  );
}
