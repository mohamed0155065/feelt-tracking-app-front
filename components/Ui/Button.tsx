
import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

/**
 * Button — UI Primitive
 *
 * Reusable button component for all features.
 *
 * Design goals:
 * - Keep it domain-agnostic
 * - Support multiple visual variants
 * - Handle loading/disabled states safely
 * - Preserve native button behavior
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500",
  secondary: "bg-gray-700 text-white hover:bg-gray-600 focus-visible:ring-gray-500",
  danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 focus-visible:ring-red-500",
  ghost: "text-gray-300 hover:bg-white/5 focus-visible:ring-gray-500",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

