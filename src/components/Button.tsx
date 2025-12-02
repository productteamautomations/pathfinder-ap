import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, fullWidth, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-6 py-3 rounded-xl font-semibold transition-all duration-300",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          fullWidth && "w-full",
          variant === "primary" &&
            "bg-primary text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-xl",
          variant === "secondary" &&
            "bg-secondary text-secondary-foreground hover:opacity-90",
          variant === "outline" &&
            "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
