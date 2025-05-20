"use server";

import { prisma } from "@/db";
import { format } from "date-fns";

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
  const projectDistribution = await prisma.$queryRaw<Array<{
    project: string;
    totalHours: number;
    entriesCount: number;
    employeesCount: number;
    avgDuration: number;
    lastWorked: Date;
    department: string | null;
  }>>`
    SELECT 
      "time_entries"."project",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(*) as "entriesCount",
      COUNT(DISTINCT "employee_id") as "employeesCount",
      AVG(CAST("duration_decimal" AS DECIMAL)) as "avgDuration",
      MAX("date") as "lastWorked",
      "employees"."department"
    FROM "time_entries"
    LEFT JOIN "employees" ON "time_entries"."employee_id" = "employees"."id"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "time_entries"."project", "employees"."department"
    ORDER BY SUM(CAST("duration_decimal" AS DECIMAL)) DESC
  `;

  // Get previous period data for trend comparison
  const previousPeriodProjects = await prisma.$queryRaw<Array<{
    project: string;
    totalHours: number;
  }>>`
    SELECT 
      "project",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours"
    FROM "time_entries"
    WHERE 
      "date" >= ${new Date(previousPeriodStartDate)} AND 
      "date" <= ${new Date(previousPeriodEndDate)}
    GROUP BY "project"
  `;

  // Helper function to ensure Decimal values are converted to numbers
  const convertDecimalToNumber = (value: any): any => {
    // Check if value is a Decimal object (has toNumber method)
    if (value !== null && value !== undefined && typeof value === 'object' && typeof value.toNumber === 'function') {
      return value.toNumber();
    }
    
    // If it's an array, convert each element
    if (Array.isArray(value)) {
      return value.map(item => convertDecimalToNumber(item));
    }
    
    // If it's an object, convert each property
    if (value !== null && typeof value === 'object') {
      const result: Record<string, any> = {};
      for (const key in value) {
        result[key] = convertDecimalToNumber(value[key]);
      }
      return result;
    }
    
    // Otherwise return the value as is
    return value;
  };

  // Create a map of previous period hours by project
  const previousPeriodHoursMap = new Map<string, number>();
  previousPeriodProjects.forEach((project: any) => {
    previousPeriodHoursMap.set(project.project, Number(project.totalHours));
  });

  // Calculate efficiency (comparing actual vs expected hours)
  // For this example, we'll use a simple metric: actual hours / (employees * 8 hours)
  const projectDistributionWithMetrics = projectDistribution.map((project: any) => {
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
  const dailyDistribution = await prisma.$queryRaw<Array<{
    date: Date;
    totalHours: number;
    entriesCount: number;
    employeesCount: number;
    projectsCount: number;
  }>>`
    SELECT 
      date,
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(*) as "entriesCount",
      COUNT(DISTINCT "employee_id") as "employeesCount",
      COUNT(DISTINCT "project") as "projectsCount"
    FROM "time_entries"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "date"
    ORDER BY "date" DESC
  `;

  // Calculate day of week and average for each day
  const dailyTotals = new Map<string, { count: number, total: number }>();
  
  dailyDistribution.forEach((day: any) => {
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

  const dailyDistributionWithMetrics = dailyDistribution.map((day: any) => {
    const date = new Date(day.date);
    const dayOfWeek = format(date, 'EEEE');
    const dayStats = dailyTotals.get(dayOfWeek)!;
    const averageForDay = dayStats.count > 0 ? dayStats.total / dayStats.count : 0;
    
    return {
      ...day,
      date: format(date, 'yyyy-MM-dd'),
      totalHours: Number(day.totalHours),
      dayOfWeek,
      averageForDay,
    };
  });

  // Get department workload distribution
  const departmentWorkload = await prisma.$queryRaw<Array<{
    department: string | null;
    totalHours: number;
    employeesCount: number;
    projectsCount: number;
  }>>`
    SELECT 
      "employees"."department",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(DISTINCT "employee_id") as "employeesCount",
      COUNT(DISTINCT "project") as "projectsCount"
    FROM "time_entries"
    LEFT JOIN "employees" ON "time_entries"."employee_id" = "employees"."id"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "employees"."department"
    ORDER BY SUM(CAST("duration_decimal" AS DECIMAL)) DESC
  `;

  const departmentWorkloadWithDefaults = departmentWorkload.map((dept: any) => ({
    ...dept,
    department: dept.department || 'Unassigned',
    totalHours: Number(dept.totalHours),
  }));

  // Get employee engagement metrics
  const employeeEngagement = await prisma.$queryRaw<Array<{
    employeeId: number;
    employeeName: string;
    totalHours: number;
    daysWorked: number;
  }>>`
    SELECT 
      "employee_id" as "employeeId",
      "employees"."name" as "employeeName",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(DISTINCT "date") as "daysWorked"
    FROM "time_entries"
    LEFT JOIN "employees" ON "time_entries"."employee_id" = "employees"."id"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "employee_id", "employees"."name"
    ORDER BY SUM(CAST("duration_decimal" AS DECIMAL)) DESC
  `;

  // Get daily hours for each employee to calculate consistency
  const employeeDailyHours = await prisma.$queryRaw<Array<{
    employeeId: number;
    date: Date;
    totalHours: number;
  }>>`
    SELECT 
      "employee_id" as "employeeId",
      "date",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours"
    FROM "time_entries"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "employee_id", "date"
  `;

  // Calculate consistency (standard deviation of hours worked per day)
  const employeeHoursMap = new Map<number, number[]>();
  employeeDailyHours.forEach((entry: any) => {
    if (!employeeHoursMap.has(entry.employeeId)) {
      employeeHoursMap.set(entry.employeeId, []);
    }
    employeeHoursMap.get(entry.employeeId)!.push(Number(entry.totalHours));
  });

  const employeeEngagementWithMetrics = employeeEngagement.map((employee: any) => {
    const hoursArray = employeeHoursMap.get(employee.employeeId) || [];
    const averageHoursPerDay = Number(employee.daysWorked) > 0 ? Number(employee.totalHours) / Number(employee.daysWorked) : 0;
    
    // Calculate standard deviation for consistency
    const mean = hoursArray.reduce((sum: number, val: number) => sum + val, 0) / hoursArray.length;
    const squareDiffs = hoursArray.map((val: number) => Math.pow(val - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((sum: number, val: number) => sum + val, 0) / squareDiffs.length;
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
  const timeOfDayDistribution = await prisma.$queryRaw<Array<{
    hour: number;
    totalHours: number;
    entriesCount: number;
    employeesCount: number;
  }>>`
    SELECT 
      EXTRACT(HOUR FROM "start_time") as "hour",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(*) as "entriesCount",
      COUNT(DISTINCT "employee_id") as "employeesCount"
    FROM "time_entries"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY EXTRACT(HOUR FROM "start_time")
    ORDER BY EXTRACT(HOUR FROM "start_time")
  `;

  const timeOfDayDistributionWithMetrics = timeOfDayDistribution.map((hour: any) => ({
    ...hour,
    hour: Number(hour.hour),
    totalHours: Number(hour.totalHours),
  }));

  // Calculate overall stats
  const totalHours = projectDistributionWithMetrics.reduce((sum: number, project: any) => sum + project.totalHours, 0);
  const totalEntries = projectDistributionWithMetrics.reduce((sum: number, project: any) => sum + Number(project.entriesCount), 0);
  const uniqueProjects = projectDistributionWithMetrics.length;
  const uniqueEmployees = employeeEngagementWithMetrics.length;

  // Convert all data to ensure no Decimal objects are returned
  const result = {
    projectDistribution: projectDistributionWithMetrics.map(project => ({
      ...project,
      totalHours: Number(project.totalHours),
      entriesCount: Number(project.entriesCount),
      employeesCount: Number(project.employeesCount),
      avgDuration: Number(project.avgDuration),
      efficiency: Number(project.efficiency),
      previousPeriodHours: project.previousPeriodHours ? Number(project.previousPeriodHours) : undefined,
      lastWorked: project.lastWorked instanceof Date ? project.lastWorked.toISOString() : String(project.lastWorked)
    })),
    dailyDistribution: dailyDistributionWithMetrics.map(day => ({
      ...day,
      totalHours: Number(day.totalHours),
      entriesCount: Number(day.entriesCount),
      employeesCount: Number(day.employeesCount),
      projectsCount: Number(day.projectsCount),
      averageForDay: Number(day.averageForDay)
    })),
    departmentWorkload: departmentWorkloadWithDefaults.map(dept => ({
      ...dept,
      totalHours: Number(dept.totalHours),
      employeesCount: Number(dept.employeesCount),
      projectsCount: Number(dept.projectsCount)
    })),
    employeeEngagement: employeeEngagementWithMetrics.map(emp => ({
      ...emp,
      employeeId: Number(emp.employeeId),
      totalHours: Number(emp.totalHours),
      daysWorked: Number(emp.daysWorked),
      averageHoursPerDay: Number(emp.averageHoursPerDay),
      consistency: Number(emp.consistency)
    })),
    timeOfDayDistribution: timeOfDayDistributionWithMetrics.map(time => ({
      ...time,
      hour: Number(time.hour),
      totalHours: Number(time.totalHours),
      entriesCount: Number(time.entriesCount),
      employeesCount: Number(time.employeesCount)
    })),
    totalHours: Number(totalHours),
    totalEntries: Number(totalEntries),
    uniqueProjects: Number(uniqueProjects),
    uniqueEmployees: Number(uniqueEmployees),
  };

  // Final safety check - run the entire result through the converter
  return convertDecimalToNumber(result);
}
