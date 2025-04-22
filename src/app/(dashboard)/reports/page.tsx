import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, FileText, PieChart, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Reports - Time Tracking System",
};

export default async function ReportsPage() {
  const reports = [
    {
      title: "Tasks Report",
      description: "View time spent on different tasks and their completion status",
      icon: <FileText className="h-8 w-8 text-primary" />,
      href: "/reports/tasks",
    },
    {
      title: "Efficiency Report",
      description: "Analyze productivity metrics and billable hours ratio",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      href: "/reports/efficiency",
    },
    {
      title: "Work Report",
      description: "Comprehensive breakdown of work activities and time distribution",
      icon: <BarChart className="h-8 w-8 text-primary" />,
      href: "/reports/work",
    },
    {
      title: "Project Distribution",
      description: "Visualize time allocation across different projects and clients",
      icon: <PieChart className="h-8 w-8 text-primary" />,
      href: "/reports/projects",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          Generate and view detailed reports on time tracking data
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              {report.icon}
              <div className="space-y-1">
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end">
                <Button asChild>
                  <Link href={report.href}>View Report</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
