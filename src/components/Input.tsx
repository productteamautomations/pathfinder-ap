import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, required, ...props }, ref) => {
    return (
      <div className="space-y-3">
        {label && (
          <label className="block text-base font-medium text-foreground">
            {label}
            {required && <span className="text-secondary ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-5 py-4 rounded-lg border border-border text-lg",
            "bg-white text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
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
