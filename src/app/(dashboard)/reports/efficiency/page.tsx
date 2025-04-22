import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { timeEntries, employees } from "@/db/schema";
import { desc, sql, eq, and, isNotNull, gte, lte } from "drizzle-orm";
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
import { ArrowLeft, TrendingUp } from "lucide-react";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import { DateRangeSelector } from "@/components/DateRangeSelector";
import { startOfWeek, endOfWeek } from "date-fns";

export const metadata: Metadata = {
  title: "Efficiency Report - Time Tracking System",
};

export default async function EfficiencyReportPage() {
  // Get date range for the current week (default view)
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 1 });
  const startDate = startOfCurrentWeek.toISOString().split('T')[0];
  const endDate = endOfCurrentWeek.toISOString().split('T')[0];
  
  // Get total hours by employee for the date range
  const employeeEfficiency = await db
    .select({
      employeeId: timeEntries.employeeId,
      employeeName: employees.name,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
    })
    .from(timeEntries)
    .innerJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.employeeId, employees.name)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Get project statistics for the date range
  const projectEfficiency = await db
    .select({
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.project)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Calculate overall stats for the date range
  const totalHours = await db
    .select({
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .then(result => result[0]?.totalHours || 0);

  return (
    <DateRangeProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="h-8 w-8" />
              Efficiency Report
            </h1>
            <p className="text-muted-foreground">
              Analysis of productivity metrics and time distribution
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/reports">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reports
            </Link>
          </Button>
        </div>

        <DateRangeSelector />

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(totalHours).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Hours tracked across all entries
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Hours Per Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projectEfficiency.length > 0 
                  ? (Number(totalHours) / projectEfficiency.length).toFixed(2) 
                  : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground">
                Average hours spent per project
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Employee Hours Table */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Hours</CardTitle>
            <CardDescription>
              Employees ranked by total hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="text-right">Total Hours</TableHead>
                  <TableHead className="text-right">Average Hours/Entry</TableHead>
                  <TableHead className="text-right">Entries</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeEfficiency.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No employee data available
                    </TableCell>
                  </TableRow>
                ) : (
                  employeeEfficiency.map((employee) => {
                    const avgHoursPerEntry = Number(employee.entriesCount) > 0 
                      ? Number(employee.totalHours) / Number(employee.entriesCount)
                      : 0;
                    
                    return (
                      <TableRow key={employee.employeeId}>
                        <TableCell className="font-medium">
                          <Link href={`/employees/${employee.employeeId}`} className="hover:underline">
                            {employee.employeeName}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right">{Number(employee.totalHours).toFixed(2)}</TableCell>
                        <TableCell className="text-right">{avgHoursPerEntry.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{employee.entriesCount}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Project Hours Table */}
        <Card>
          <CardHeader>
            <CardTitle>Project Hours</CardTitle>
            <CardDescription>
              Projects ranked by total hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Total Hours</TableHead>
                  <TableHead className="text-right">Average Hours/Entry</TableHead>
                  <TableHead className="text-right">Employees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectEfficiency.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No project data available
                    </TableCell>
                  </TableRow>
                ) : (
                  projectEfficiency.map((project) => {
                    const avgHoursPerEntry = Number(project.entriesCount) > 0 
                      ? Number(project.totalHours) / Number(project.entriesCount)
                      : 0;
                    
                    return (
                      <TableRow key={project.project}>
                        <TableCell className="font-medium">{project.project}</TableCell>
                        <TableCell className="text-right">{Number(project.totalHours).toFixed(2)}</TableCell>
                        <TableCell className="text-right">{avgHoursPerEntry.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{project.employeesCount}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DateRangeProvider>
  );
}
