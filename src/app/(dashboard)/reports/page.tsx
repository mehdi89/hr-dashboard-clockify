import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportCard } from "@/components/data-display/ReportCard";

export const metadata: Metadata = {
  title: "Reports - Time Tracking System",
};

export default async function ReportsPage() {
  const reports = [
    {
      title: "Tasks Report",
      description: "View time spent on different tasks and their completion status",
      icon: "FileText",
      href: "/reports/tasks",
    },
    {
      title: "Tags Report",
      description: "Analyze time spent on different tags and their distribution",
      icon: "Tag",
      href: "/reports/tags",
    },
    {
      title: "Efficiency Report",
      description: "Analyze productivity metrics and time distribution",
      icon: "TrendingUp",
      href: "/reports/efficiency",
    },
    {
      title: "Work Report",
      description: "Comprehensive breakdown of work activities and time distribution",
      icon: "BarChart3",
      href: "/reports/work",
    },
    {
      title: "Project Distribution",
      description: "Visualize time allocation across different projects and clients",
      icon: "PieChart",
      href: "/reports/projects",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate and view detailed reports on time tracking data"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {reports.map((report) => (
          <ReportCard
            key={report.title}
            title={report.title}
            description={report.description}
            icon={report.icon}
            href={report.href}
          />
        ))}
      </div>
    </div>
  );
}
