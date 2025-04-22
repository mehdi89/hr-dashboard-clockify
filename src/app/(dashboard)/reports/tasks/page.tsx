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
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Tasks Report - Time Tracking System",
};

export default async function TasksReportPage() {
  // Get tasks with total hours
  const taskStats = await db
    .select({
      task: timeEntries.task,
      totalHours: sql<number>`SUM(CAST(SUBSTRING(${timeEntries.durationDecimal} FROM 1) AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      avgDuration: sql<number>`AVG(CAST(SUBSTRING(${timeEntries.durationDecimal} FROM 1) AS DECIMAL))`,
      lastWorked: sql<string>`MAX(${timeEntries.date})`,
    })
    .from(timeEntries)
    .where(isNotNull(timeEntries.task))
    .groupBy(timeEntries.task)
    .orderBy(desc(sql`SUM(CAST(SUBSTRING(${timeEntries.durationDecimal} FROM 1) AS DECIMAL))`));

  // Get top employees by task count
  const employeeTaskStats = await db
    .select({
      employeeId: timeEntries.employeeId,
      employeeName: employees.name,
      taskCount: sql<number>`COUNT(DISTINCT CASE WHEN ${timeEntries.task} IS NOT NULL THEN ${timeEntries.task} END)`,
      totalHours: sql<number>`SUM(CAST(SUBSTRING(${timeEntries.durationDecimal} FROM 1) AS DECIMAL))`,
    })
    .from(timeEntries)
    .innerJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(isNotNull(timeEntries.task))
    .groupBy(timeEntries.employeeId, employees.name)
    .orderBy(desc(sql`COUNT(DISTINCT CASE WHEN ${timeEntries.task} IS NOT NULL THEN ${timeEntries.task} END)`))
    .limit(5);

  // Calculate overall stats
  const totalTaskHours = taskStats.reduce((sum, task) => sum + Number(task.totalHours), 0);
  const totalTaskEntries = taskStats.reduce((sum, task) => sum + Number(task.entriesCount), 0);
  const uniqueTasks = taskStats.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Tasks Report
          </h1>
          <p className="text-muted-foreground">
            Analysis of time spent on different tasks
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
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Task Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTaskHours.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Hours tracked across all tasks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Task Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTaskEntries}</div>
            <p className="text-xs text-muted-foreground">
              Total number of task entries
