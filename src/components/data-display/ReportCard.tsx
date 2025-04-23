"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Tag, TrendingUp, BarChart3, PieChart } from "lucide-react";

interface ReportCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export function ReportCard({ title, description, icon, href }: ReportCardProps) {
  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="h-8 w-8 text-primary" />;
      case 'Tag':
        return <Tag className="h-8 w-8 text-primary" />;
      case 'TrendingUp':
        return <TrendingUp className="h-8 w-8 text-primary" />;
      case 'BarChart3':
        return <BarChart3 className="h-8 w-8 text-primary" />;
      case 'PieChart':
        return <PieChart className="h-8 w-8 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {renderIcon(icon)}
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <Button asChild>
            <Link href={href}>View Report</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
