"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload, BarChart3, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
    icon?: string;
  };
  className?: string;
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  // Function to render the appropriate icon
  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    
    switch (iconName) {
      case 'PlusCircle':
        return <PlusCircle className="mr-2 h-4 w-4" />;
      case 'Upload':
        return <Upload className="mr-2 h-4 w-4" />;
      case 'BarChart3':
        return <BarChart3 className="mr-2 h-4 w-4" />;
      case 'Clock':
        return <Clock className="mr-2 h-4 w-4" />;
      case 'Users':
        return <Users className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6",
      className
    )}>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
        )}
      </div>
      
      {action && (
        <Button asChild className="w-full sm:w-auto mt-2 sm:mt-0">
          <Link href={action.href}>
            {renderIcon(action.icon)}
            {action.label}
          </Link>
        </Button>
      )}
    </div>
  );
}
