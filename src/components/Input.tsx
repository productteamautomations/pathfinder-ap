import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-secondary ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl border-2 border-border",
            "bg-card text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-all duration-200",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
