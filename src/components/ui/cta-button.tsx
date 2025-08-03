import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "commercial";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidthMobile?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ 
    variant = "primary", 
    size = "md", 
    icon, 
    iconPosition = "left", 
    fullWidthMobile = true,
    className,
    children,
    asChild = false,
    ...props 
  }, ref) => {
    
    const baseClasses = "rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1";
    
    const sizeClasses = {
      sm: "text-sm px-4 py-2",
      md: "text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4",
      lg: "text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5"
    };
    
    const variantClasses = {
      primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent",
      commercial: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
    };
    
    const iconClasses = {
      left: "mr-2 sm:mr-3 h-4 w-4 lg:h-5 lg:w-5",
      right: "ml-2 sm:ml-3 h-4 w-4 lg:h-5 lg:w-5"
    };
    
    const mobileWidthClass = fullWidthMobile ? "w-full sm:w-auto" : "";
    
    const buttonContent = (
      <>
        {icon && iconPosition === "left" && React.cloneElement(icon as React.ReactElement, { 
          className: iconClasses.left 
        })}
        {children}
        {icon && iconPosition === "right" && React.cloneElement(icon as React.ReactElement, { 
          className: iconClasses.right 
        })}
      </>
    );
    
    return (
      <Button
        ref={ref}
        asChild={asChild}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          mobileWidthClass,
          className
        )}
        {...props}
      >
        {asChild ? children : buttonContent}
      </Button>
    );
  }
);

CTAButton.displayName = "CTAButton";