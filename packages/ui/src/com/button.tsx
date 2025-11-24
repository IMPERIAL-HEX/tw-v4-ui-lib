"use client";

import { cva } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "../utils/cn";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary";
  disabled?: boolean;
}

const buttonVariants = cva(
  "h-9 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-default-default hover:bg-default-hovered active:bg-default-active text-strong",
        primary:
          "bg-primary-default hover:bg-primary-hovered active:bg-primary-active text-soft",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Button = ({
  children,
  className,
  variant,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={cn(buttonVariants({ variant }), className)}
    >
      {children}
    </button>
  );
};
