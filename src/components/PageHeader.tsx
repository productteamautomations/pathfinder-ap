interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col items-center" style={{ gap: "0.5vw" }}>
      {/* Progress text */}
      <div className="flex items-center justify-center" style={{ gap: "0.5vw" }}>
        <span className="font-medium text-foreground" style={{ fontSize: "0.9vw" }}>
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted/30 rounded-full overflow-hidden" style={{ height: "0.5vw", minHeight: "6px" }}>
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
