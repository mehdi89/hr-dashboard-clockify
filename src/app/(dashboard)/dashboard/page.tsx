import { Metadata } from "next";
import { Users, Clock, Upload, BarChart3, Briefcase, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { employees, timeEntries, importLogs } from "@/db/schema";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { eq, and, gte, lte, sql, desc } from "drizzle-orm";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import { DateRangeSelector } from "@/components/DateRangeSelector";
import { EmployeeCommitmentChart } from "@/components/charts/EmployeeCommitmentChart";
import { EfficiencyChart } from "@/components/charts/EfficiencyChart";
import { DailyWorkChart } from "@/components/charts/DailyWorkChart";

export const metadata: Metadata = {
  title: "Dashboard - Employee Time Tracking System",
};

export default async function DashboardPage() {
  // Get date range for the current week (default view)
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 1 });
  const startDate = startOfCurrentWeek.toISOString().split('T')[0];
  const endDate = endOfCurrentWeek.toISOString().split('T')[0];
  // Get employee count
  const employeeCountResult = await db
    .select({ count: sql`count(*)` })
    .from(employees)
    .where(eq(employees.isActive, true));
  
  const employeeCount = Number(employeeCountResult[0]?.count || 0);
  
  // Get total hours this week
  const hoursResult = await db
    .select({
      totalHours: sql`sum(cast(${timeEntries.durationDecimal} as float))`
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    );
  
  const totalHours = Number(hoursResult[0]?.totalHours || 0).toFixed(1);
  
  // Get employee data with actual hours for the current week
  const employeeData = await db
    .select({
      id: employees.id,
      name: employees.name,
      weeklyCommittedHours: employees.weeklyCommittedHours,
      actualHours: sql<number>`COALESCE(SUM(CAST(${timeEntries.durationDecimal} AS FLOAT)), 0)`
    })
    .from(employees)
    .leftJoin(
      timeEntries,
      and(
        eq(employees.id, timeEntries.employeeId),
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .where(eq(employees.isActive, true))
    .groupBy(employees.id, employees.name, employees.weeklyCommittedHours);
    
  // Get daily work distribution
  const dailyDistribution = await db
    .select({
      date: timeEntries.date,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS FLOAT))`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.date)
    .orderBy(timeEntries.date);
  
  // Get latest import
  const latestImport = await db
    .select()
    .from(importLogs)
    .orderBy(desc(importLogs.importDate))
    .limit(1);
  
  const latestImportDate = latestImport[0]?.importDate 
    ? format(new Date(latestImport[0].importDate), 'MM/dd/yyyy')
    : '--';

  // Get project count (placeholder for now)
  const projectCount = 8;
  
  // Get current week dates
  const weekStart = format(startOfCurrentWeek, 'MMM d');
  const weekEnd = format(endOfCurrentWeek, 'MMM d, yyyy');
  const currentWeek = `${weekStart} - ${weekEnd}`;

  return (
    <DateRangeProvider>
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of employee time tracking data</p>
        </div>
        
        <DateRangeSelector />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Summary Cards */}
        <Card className="shadow-sm border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeeCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Active employees</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours This Week</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}</div>
            <p className="text-xs text-muted-foreground mt-1">Hours logged</p>
          </CardContent>
          <CardFooter className="pt-0 pb-2 px-4">
            <p className="text-xs text-muted-foreground">{currentWeek}</p>
          </CardFooter>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Import</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <Upload className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestImportDate}</div>
            <p className="text-xs text-muted-foreground mt-1">Last data import</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Ongoing projects</p>
          </CardContent>
        </Card>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <EmployeeCommitmentChart data={employeeData} />
          <div className="grid grid-cols-1 gap-6">
            <EfficiencyChart data={employeeData} />
            <DailyWorkChart data={dailyDistribution} />
          </div>
        </div>
        
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription>Your latest time tracking activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Data Import</p>
                    <p className="text-xs text-muted-foreground">Weekly report imported</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {latestImportDate !== '--' ? latestImportDate : 'No recent imports'}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground text-center py-4">
                No additional recent activity to display
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DateRangeProvider>
  );
}
