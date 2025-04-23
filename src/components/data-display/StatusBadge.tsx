"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";

const statusVariants = cva("font-medium", {
  variants: {
    status: {
      active: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
      inactive: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
      error: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
      warning: "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    },
  },
  defaultVariants: {
    status: "info",
  },
});

export interface StatusBadgeProps extends VariantProps<typeof statusVariants> {
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ 
  children, 
  status, 
  className 
}: StatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={`${statusVariants({ status })} ${className || ""}`}
    >
      {children}
    </Badge>
  );
}
