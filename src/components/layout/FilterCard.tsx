"use client";

import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterCardProps {
  title: string;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  className?: string;
  columns?: number;
}

export function FilterCard({ 
  title, 
  children, 
  onSubmit, 
  submitLabel = "Apply Filters",
  className,
  columns = 4
}: FilterCardProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  // Generate responsive grid columns based on the columns prop
  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  }[Math.min(Math.max(columns, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6];

  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader className="px-4 sm:px-6">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form 
          className={cn("grid gap-4", gridColsClass)}
          onSubmit={handleSubmit}
          method={onSubmit ? undefined : "get"}
        >
          {children}
          
          {/* <div className="flex items-end justify-start sm:justify-end mt-2">
            <Button 
              type="submit" 
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {submitLabel}
            </Button>
          </div> */}
        </form>
      </CardContent>
    </Card>
  );
}
