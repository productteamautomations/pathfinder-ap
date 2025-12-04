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
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {onBack ? (
            <button
              onClick={onBack}
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          ) : (
            <div className="w-20" />
          )}
          {showProgress && currentStep && totalSteps && (
            <div className="flex-1 flex justify-center max-w-md mx-auto">
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}
          {productLabel ? (
            <div className="w-32 text-right">
              <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full">
                {productLabel}
              </span>
            </div>
          ) : (
            <div className="w-20" />
          )}
        </div>
      </div>
    </div>
  );
}
