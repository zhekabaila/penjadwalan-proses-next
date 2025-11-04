import React from "react";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "default" | "lg";
  href?: string;
  variant?: "default" | "outline";
  type?: "button" | "submit" | "reset";
}

export const GlassButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, GlassButtonProps>(
  ({ children, onClick, className = "", size = "default", href, variant = "default", type }, ref) => {
    const sizeClasses = {
      default: "px-4 py-2 text-base",
      lg: "px-8 py-3 text-lg",
    };

    const variantClasses = variant === "outline" 
      ? `
        bg-transparent
        backdrop-blur-md border border-emerald-400/50
        text-emerald-400
        hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]
        group
      `
      : `
        bg-gradient-to-br from-emerald-500/20 to-green-600/20
        backdrop-blur-md border border-emerald-400/30
        text-white
        hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]
        hover:border-emerald-400/50
        group
      `;

    const baseClasses = `
      relative overflow-hidden rounded-xl
      transition-all duration-300
      ${variantClasses}
      ${sizeClasses[size]}
      ${className}
    `;

    const content = (
      <>
        {/* Glass shine effect - for both variants */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onClick}
          className={baseClasses}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={baseClasses}
        type={type}
      >
        {content}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
