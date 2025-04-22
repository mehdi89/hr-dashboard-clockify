import { Metadata } from "next";
import { Users, Clock, Upload, BarChart3, Briefcase, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { employees, timeEntries, importLogs } from "@/db/schema";
import { format } from "date-fns";
import { eq, and, gte, lte, sql, desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Dashboard - Employee Time Tracking System",
};

export default async function DashboardPage() {
  // Get employee count
  const employeeCountResult = await db
    .select({ count: sql`count(*)` })
    .from(employees)
    .where(eq(employees.isActive, true));
  
  const employeeCount = Number(employeeCountResult[0]?.count || 0);
  
  // Get total hours this week
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  const hoursResult = await db
    .select({
      totalHours: sql`sum(${timeEntries.hoursWorked})`
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startOfWeek.toISOString().split('T')[0]),
        lte(timeEntries.date, endOfWeek.toISOString().split('T')[0])
      )
    );
  
  const totalHours = Number(hoursResult[0]?.totalHours || 0);
  
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
  const weekStart = format(startOfWeek, 'MMM d');
  const weekEnd = format(endOfWeek, 'MMM d, yyyy');
  const currentWeek = `${weekStart} - ${weekEnd}`;

  return (
    <div className="space-y-10">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of employee time tracking data</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Overview</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription>Hours tracked per day this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground text-sm">Chart visualization will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
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
    </div>
  );
}
