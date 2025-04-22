import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { timeEntries, employees } from "@/db/schema";
import { desc, sql, eq, and, isNotNull } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowLeft, BarChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Work Report - Time Tracking System",
};

export default async function WorkReportPage() {
  // Get project distribution
  const projectDistribution = await db
    .select({
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      avgDuration: sql<number>`AVG(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      lastWorked: sql<string>`MAX(${timeEntries.date})`,
    })
    .from(timeEntries)
    .groupBy(timeEntries.project)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Get client distribution
  const clientDistribution = await db
    .select({
      client: timeEntries.client,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      projectsCount: sql<number>`COUNT(DISTINCT ${timeEntries.project})`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
    })
    .from(timeEntries)
    .where(isNotNull(timeEntries.client))
    .groupBy(timeEntries.client)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Get daily work distribution
  const dailyDistribution = await db
    .select({
      date: timeEntries.date,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      projectsCount: sql<number>`COUNT(DISTINCT ${timeEntries.project})`,
    })
    .from(timeEntries)
    .groupBy(timeEntries.date)
    .orderBy(desc(timeEntries.date))
    .limit(14); // Last 14 days

  // Calculate overall stats
  const totalHours = projectDistribution.reduce((sum, project) => sum + Number(project.totalHours), 0);
  const totalEntries = projectDistribution.reduce((sum, project) => sum + Number(project.entriesCount), 0);
  const uniqueProjects = projectDistribution.length;
  const uniqueClients = clientDistribution.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart className="h-8 w-8" />
            Work Report
          </h1>
          <p className="text-muted-foreground">
            Comprehensive breakdown of work activities and time distribution
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/reports">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Hours tracked across all entries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEntries}</div>
            <p className="text-xs text-muted-foreground">
              Number of time entries recorded
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueProjects}</div>
            <p className="text-xs text-muted-foreground">
              Different projects worked on
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueClients}</div>
            <p className="text-xs text-muted-foreground">
              Different clients served
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Distribution Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Distribution</CardTitle>
          <CardDescription>
            Breakdown of hours spent on each project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Entries</TableHead>
                <TableHead className="text-right">Employees</TableHead>
                <TableHead className="text-right">Avg. Duration</TableHead>
                <TableHead>Last Worked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectDistribution.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No project data available
                  </TableCell>
                </TableRow>
              ) : (
                projectDistribution.map((project) => (
                  <TableRow key={project.project}>
                    <TableCell className="font-medium">{project.project}</TableCell>
                    <TableCell className="text-right">{Number(project.totalHours).toFixed(2)}</TableCell>
                    <TableCell className="text-right">{project.entriesCount}</TableCell>
                    <TableCell className="text-right">{project.employeesCount}</TableCell>
                    <TableCell className="text-right">{Number(project.avgDuration).toFixed(2)}</TableCell>
                    <TableCell>{new Date(project.lastWorked).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Client Distribution Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client Distribution</CardTitle>
          <CardDescription>
            Breakdown of hours spent for each client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Projects</TableHead>
                <TableHead className="text-right">Entries</TableHead>
                <TableHead className="text-right">Employees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientDistribution.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No client data available
                  </TableCell>
                </TableRow>
              ) : (
                clientDistribution.map((client) => (
                  <TableRow key={client.client}>
                    <TableCell className="font-medium">{client.client || "Unspecified"}</TableCell>
                    <TableCell className="text-right">{Number(client.totalHours).toFixed(2)}</TableCell>
                    <TableCell className="text-right">{client.projectsCount}</TableCell>
                    <TableCell className="text-right">{client.entriesCount}</TableCell>
                    <TableCell className="text-right">{client.employeesCount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Daily Distribution Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Work Distribution</CardTitle>
          <CardDescription>
            Breakdown of work hours by day (last 14 days)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Entries</TableHead>
                <TableHead className="text-right">Employees</TableHead>
                <TableHead className="text-right">Projects</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyDistribution.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No daily data available
                  </TableCell>
                </TableRow>
              ) : (
                dailyDistribution.map((day) => (
                  <TableRow key={day.date}>
                    <TableCell className="font-medium">{new Date(day.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{Number(day.totalHours).toFixed(2)}</TableCell>
                    <TableCell className="text-right">{day.entriesCount}</TableCell>
                    <TableCell className="text-right">{day.employeesCount}</TableCell>
                    <TableCell className="text-right">{day.projectsCount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
