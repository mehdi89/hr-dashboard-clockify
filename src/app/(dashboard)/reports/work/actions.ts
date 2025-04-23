"use server";

import { db } from "@/db";
import { timeEntries, employees } from "@/db/schema";
import { desc, sql, eq, and, gte, lte } from "drizzle-orm";
import { format, parseISO } from "date-fns";

export type ProjectDistribution = {
  project: string;
  totalHours: number;
  entriesCount: number;
  employeesCount: number;
  avgDuration: number;
  lastWorked: string;
  department: string;
  efficiency: number;
  previousPeriodHours?: number;
};

export type DailyDistribution = {
  date: string;
  totalHours: number;
  entriesCount: number;
  employeesCount: number;
  projectsCount: number;
  dayOfWeek: string;
  averageForDay: number;
};

export type DepartmentWorkload = {
  department: string;
  totalHours: number;
  employeesCount: number;
  projectsCount: number;
};

export type EmployeeEngagement = {
  employeeId: number;
  employeeName: string | null;
  totalHours: number;
  daysWorked: number;
  averageHoursPerDay: number;
  consistency: number; // Standard deviation of hours worked per day
};

export type TimeOfDayDistribution = {
  hour: number;
  totalHours: number;
  entriesCount: number;
  employeesCount: number;
};

export type WorkReportData = {
  projectDistribution: ProjectDistribution[];
  dailyDistribution: DailyDistribution[];
  departmentWorkload: DepartmentWorkload[];
  employeeEngagement: EmployeeEngagement[];
  timeOfDayDistribution: TimeOfDayDistribution[];
  totalHours: number;
  totalEntries: number;
  uniqueProjects: number;
  uniqueEmployees: number;
};

export async function fetchWorkReportData(startDate: string, endDate: string): Promise<WorkReportData> {
  // Calculate previous period for trend comparison
  const currentPeriodDays = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const previousPeriodStartDate = new Date(new Date(startDate).getTime() - currentPeriodDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const previousPeriodEndDate = new Date(new Date(startDate).getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Get project distribution
  const projectDistribution = await db
    .select({
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      avgDuration: sql<number>`AVG(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      lastWorked: sql<string>`MAX(${timeEntries.date})`,
      department: employees.department,
    })
    .from(timeEntries)
    .leftJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.project, employees.department)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Get previous period data for trend comparison
  const previousPeriodProjects = await db
    .select({
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, previousPeriodStartDate),
        lte(timeEntries.date, previousPeriodEndDate)
      )
    )
    .groupBy(timeEntries.project);

  // Create a map of previous period hours by project
  const previousPeriodHoursMap = new Map<string, number>();
  previousPeriodProjects.forEach(project => {
    previousPeriodHoursMap.set(project.project, Number(project.totalHours));
  });

  // Calculate efficiency (comparing actual vs expected hours)
  // For this example, we'll use a simple metric: actual hours / (employees * 8 hours)
  const projectDistributionWithMetrics = projectDistribution.map(project => {
    const previousPeriodHours = previousPeriodHoursMap.get(project.project) || 0;
    const expectedHours = Number(project.employeesCount) * 8; // Assuming 8 hours per employee is expected
    const efficiency = expectedHours > 0 ? (Number(project.totalHours) / expectedHours) * 100 : 100;
    
    return {
      ...project,
      totalHours: Number(project.totalHours),
      avgDuration: Number(project.avgDuration),
      efficiency,
      previousPeriodHours,
      department: project.department || 'Unassigned',
    };
  });

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
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.date)
    .orderBy(desc(timeEntries.date));

  // Calculate day of week and average for each day
  const dailyTotals = new Map<string, { count: number, total: number }>();
  
  dailyDistribution.forEach(day => {
    const date = new Date(day.date);
    const dayOfWeek = format(date, 'EEEE'); // Monday, Tuesday, etc.
    
    if (!dailyTotals.has(dayOfWeek)) {
      dailyTotals.set(dayOfWeek, { count: 0, total: 0 });
    }
    
    const current = dailyTotals.get(dayOfWeek)!;
    current.count += 1;
    current.total += Number(day.totalHours);
    dailyTotals.set(dayOfWeek, current);
  });

  const dailyDistributionWithMetrics = dailyDistribution.map(day => {
    const date = new Date(day.date);
    const dayOfWeek = format(date, 'EEEE');
    const dayStats = dailyTotals.get(dayOfWeek)!;
    const averageForDay = dayStats.count > 0 ? dayStats.total / dayStats.count : 0;
    
    return {
      ...day,
      totalHours: Number(day.totalHours),
      dayOfWeek,
      averageForDay,
    };
  });

  // Get department workload distribution
  const departmentWorkload = await db
    .select({
      department: employees.department,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      projectsCount: sql<number>`COUNT(DISTINCT ${timeEntries.project})`,
    })
    .from(timeEntries)
    .leftJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(employees.department)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  const departmentWorkloadWithDefaults = departmentWorkload.map(dept => ({
    ...dept,
    department: dept.department || 'Unassigned',
    totalHours: Number(dept.totalHours),
  }));

  // Get employee engagement metrics
  const employeeEngagement = await db
    .select({
      employeeId: timeEntries.employeeId,
      employeeName: employees.name,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      daysWorked: sql<number>`COUNT(DISTINCT ${timeEntries.date})`,
    })
    .from(timeEntries)
    .leftJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.employeeId, employees.name)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Get daily hours for each employee to calculate consistency
  const employeeDailyHours = await db
    .select({
      employeeId: timeEntries.employeeId,
      date: timeEntries.date,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.employeeId, timeEntries.date);

  // Calculate consistency (standard deviation of hours worked per day)
  const employeeHoursMap = new Map<number, number[]>();
  employeeDailyHours.forEach(entry => {
    if (!employeeHoursMap.has(entry.employeeId)) {
      employeeHoursMap.set(entry.employeeId, []);
    }
    employeeHoursMap.get(entry.employeeId)!.push(Number(entry.totalHours));
  });

  const employeeEngagementWithMetrics = employeeEngagement.map(employee => {
    const hoursArray = employeeHoursMap.get(employee.employeeId) || [];
    const averageHoursPerDay = Number(employee.daysWorked) > 0 ? Number(employee.totalHours) / Number(employee.daysWorked) : 0;
    
    // Calculate standard deviation for consistency
    const mean = hoursArray.reduce((sum, val) => sum + val, 0) / hoursArray.length;
    const squareDiffs = hoursArray.map(val => Math.pow(val - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
    const stdDev = Math.sqrt(avgSquareDiff);
    
    // Normalize consistency to a 0-100 scale (lower std dev = higher consistency)
    // Using a simple formula: 100 - (stdDev / mean * 50)
    const consistency = mean > 0 ? Math.max(0, Math.min(100, 100 - (stdDev / mean * 50))) : 0;
    
    return {
      ...employee,
      totalHours: Number(employee.totalHours),
      daysWorked: Number(employee.daysWorked),
      averageHoursPerDay,
      consistency,
    };
  });

  // Get time of day distribution
  const timeOfDayDistribution = await db
    .select({
      hour: sql<number>`EXTRACT(HOUR FROM ${timeEntries.startTime})`,
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
    .groupBy(sql`EXTRACT(HOUR FROM ${timeEntries.startTime})`)
    .orderBy(sql`EXTRACT(HOUR FROM ${timeEntries.startTime})`);

  const timeOfDayDistributionWithMetrics = timeOfDayDistribution.map(hour => ({
    ...hour,
    hour: Number(hour.hour),
    totalHours: Number(hour.totalHours),
  }));

  // Calculate overall stats
  const totalHours = projectDistributionWithMetrics.reduce((sum, project) => sum + project.totalHours, 0);
  const totalEntries = projectDistributionWithMetrics.reduce((sum, project) => sum + Number(project.entriesCount), 0);
  const uniqueProjects = projectDistributionWithMetrics.length;
  const uniqueEmployees = employeeEngagementWithMetrics.length;

  return {
    projectDistribution: projectDistributionWithMetrics,
    dailyDistribution: dailyDistributionWithMetrics,
    departmentWorkload: departmentWorkloadWithDefaults,
    employeeEngagement: employeeEngagementWithMetrics,
    timeOfDayDistribution: timeOfDayDistributionWithMetrics,
    totalHours,
    totalEntries,
    uniqueProjects,
    uniqueEmployees,
  };
}
