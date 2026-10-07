import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 select-none rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs min-h-[38px]",
    md: "px-6 py-3 text-xs md:text-sm min-h-[46px]",
    lg: "px-8 py-4 text-sm md:text-base min-h-[52px]",
  };

  const variantStyles = {
    primary:
      "bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg focus:ring-amber-500",
    secondary:
      "bg-sky-900 text-white hover:bg-sky-950 shadow-md hover:shadow-lg focus:ring-sky-700",
    gold:
      "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-amber-500/25 focus:ring-amber-400",
    outline:
      "border-2 border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-600 hover:text-white focus:ring-amber-500",
    ghost:
      "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
