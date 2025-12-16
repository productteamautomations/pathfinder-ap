import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full", className)} style={{ maxWidth: "28vw" }}>
      <div className="flex justify-between items-center" style={{ marginBottom: "0.4vw" }}>
        <span className="font-medium text-foreground" style={{ fontSize: "0.85vw" }}>
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-medium text-muted-foreground" style={{ fontSize: "0.85vw" }}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-muted rounded-full overflow-hidden" style={{ height: "0.5vw", minHeight: "6px" }}>
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
