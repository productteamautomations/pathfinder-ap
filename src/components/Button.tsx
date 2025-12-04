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
          "px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transform active:scale-[0.98]",
          fullWidth && "w-full",
          variant === "primary" &&
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(227,102,79,0.39)] hover:shadow-[0_6px_20px_rgba(227,102,79,0.4)]",
          variant === "secondary" &&
            "bg-secondary text-secondary-foreground hover:bg-secondary/90",
          variant === "outline" &&
            "border border-border bg-white/50 text-foreground hover:bg-white/80 hover:border-primary/50",
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
