"use server";

import { db } from "@/db";
import { timeEntries, employees, importLogs } from "@/db/schema";
import { desc, sql, eq, and, gte, lte, count } from "drizzle-orm";
import { format } from "date-fns";

export type TeamHealthMetrics = {
  totalEmployees: number;
  activeEmployees: number;
  totalHours: number;
  committedHours: number;
  efficiencyScore: number;
  weekendWorkPercentage: number;
  afterHoursPercentage: number;
  capacityUtilizationRate: number;
};

export type EmployeeEfficiencyData = {
  employeeId: number;
  employeeName: string;
  totalHours: number;
  committedHours: number;
  efficiency: number;
  department: string | null;
  daysWorked: number;
  consistency: number;
  needsSupport: boolean;
};

export type ProjectAllocationData = {
  project: string;
  totalHours: number;
  employeesCount: number;
  percentOfTotal: number;
  department: string | null;
};

export type WorkPatternData = {
  earlyHours: number;
  coreHours: number;
  lateHours: number;
  nightHours: number;
  weekendPercentage: number;
  afterHoursPercentage: number;
};

// Base type for all activities
export type BaseActivityData = {
  id: number;
  type: string;
  description: string;
  date: string;
};

// Time entry specific activity
export type TimeEntryActivityData = BaseActivityData & {
  employeeId: number;
  employeeName: string;
};

// Import specific activity
export type ImportActivityData = BaseActivityData;

// Union type for all activities
export type RecentActivityData = TimeEntryActivityData | ImportActivityData;

export type DashboardData = {
  teamHealth: TeamHealthMetrics;
  employeeEfficiency: EmployeeEfficiencyData[];
  projectAllocation: ProjectAllocationData[];
  workPatterns: WorkPatternData;
  recentActivity: RecentActivityData[];
  latestImport: {
    date: string;
    count: number;
  };
  workdaysInPeriod: number;
};

export async function fetchDashboardData(startDate: string, endDate: string): Promise<DashboardData> {
  // Calculate previous period for trend comparison
  const currentPeriodDays = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Get employee count
  const employeeCountResult = await db
    .select({
      total: count(),
      active: sql`SUM(CASE WHEN ${employees.isActive} = true THEN 1 ELSE 0 END)`,
    })
    .from(employees);
  
  const totalEmployees = Number(employeeCountResult[0]?.total || 0);
  const activeEmployees = Number(employeeCountResult[0]?.active || 0);
  
  // Get total hours and committed hours
  const hoursResult = await db
    .select({
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS FLOAT))`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    );
  
  const totalHours = Number(hoursResult[0]?.totalHours || 0);
  
  // Get employee data with actual hours and committed hours
  const employeeData = await db
    .select({
      id: employees.id,
      name: employees.name,
      department: employees.department,
      weeklyCommittedHours: employees.weeklyCommittedHours,
      isActive: employees.isActive,
      actualHours: sql<number>`COALESCE(SUM(CAST(${timeEntries.durationDecimal} AS FLOAT)), 0)`,
      daysWorked: sql<number>`COUNT(DISTINCT ${timeEntries.date})`,
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
    .groupBy(employees.id, employees.name, employees.department, employees.weeklyCommittedHours, employees.isActive);
  
  // Calculate weeks in the date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const weeks = daysDiff / 7;
  
  // Calculate total committed hours and efficiency
  let totalCommittedHours = 0;
  
  const employeeEfficiencyData = employeeData.map(employee => {
    const committedHoursForPeriod = employee.weeklyCommittedHours * weeks;
    totalCommittedHours += committedHoursForPeriod;
    
    const efficiency = committedHoursForPeriod > 0 
      ? (Number(employee.actualHours) / committedHoursForPeriod) * 100 
      : 100;
    
    // Determine if employee needs support (efficiency < 70%)
    const needsSupport = efficiency < 70;
    
    return {
      employeeId: employee.id,
      employeeName: employee.name,
      totalHours: Number(employee.actualHours),
      committedHours: committedHoursForPeriod,
      efficiency,
      department: employee.department,
      daysWorked: Number(employee.daysWorked),
      consistency: 0, // Will calculate later
      needsSupport,
    };
  });
  
  // Calculate overall efficiency score
  const efficiencyScore = totalCommittedHours > 0 
    ? (totalHours / totalCommittedHours) * 100 
    : 100;
  
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

  // Update consistency scores
  employeeEfficiencyData.forEach(employee => {
    const hoursArray = employeeHoursMap.get(employee.employeeId) || [];
    if (hoursArray.length > 0) {
      const mean = hoursArray.reduce((sum, val) => sum + val, 0) / hoursArray.length;
      const squareDiffs = hoursArray.map(val => Math.pow(val - mean, 2));
      const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
      const stdDev = Math.sqrt(avgSquareDiff);
      
      // Normalize consistency to a 0-100 scale (lower std dev = higher consistency)
      employee.consistency = mean > 0 ? Math.max(0, Math.min(100, 100 - (stdDev / mean * 50))) : 0;
    }
  });
  
  // Get project allocation data
  const projectAllocation = await db
    .select({
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      department: sql<string>`MAX(${employees.department})`,
    })
    .from(timeEntries)
    .leftJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.project)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));
  
  const projectAllocationData = projectAllocation.map(project => ({
    project: project.project,
    totalHours: Number(project.totalHours),
    employeesCount: Number(project.employeesCount),
    percentOfTotal: totalHours > 0 ? (Number(project.totalHours) / totalHours) * 100 : 0,
    department: project.department,
  }));
  
  // Calculate weekend work percentage
  const dailyDistribution = await db
    .select({
      date: timeEntries.date,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      dayOfWeek: sql<number>`EXTRACT(DOW FROM ${timeEntries.date})`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.date, sql`EXTRACT(DOW FROM ${timeEntries.date})`)
    .orderBy(timeEntries.date);
  
  let weekendHours = 0;
  dailyDistribution.forEach(day => {
    // PostgreSQL DOW: 0 = Sunday, 6 = Saturday
    if (day.dayOfWeek === 0 || day.dayOfWeek === 6) {
      weekendHours += Number(day.totalHours);
    }
  });
  
  const weekendWorkPercentage = totalHours > 0 ? (weekendHours / totalHours) * 100 : 0;
  
  // Calculate work hour distribution (early, core, late, night hours)
  const hourDistribution = await db
    .select({
      hour: sql<number>`EXTRACT(HOUR FROM ${timeEntries.startTime})`,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
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
  
  let earlyHours = 0;   // 5-9 AM
  let coreHours = 0;    // 9-5 PM
  let lateHours = 0;    // 5-11 PM
  let nightHours = 0;   // 11PM-5AM
  let afterHours = 0;   // Outside 9-5
  
  hourDistribution.forEach(entry => {
    const hour = Number(entry.hour);
    const hours = Number(entry.totalHours);
    
    if (hour >= 5 && hour < 9) {
      earlyHours += hours;
      afterHours += hours;
    } else if (hour >= 9 && hour < 17) {
      coreHours += hours;
    } else if (hour >= 17 && hour < 23) {
      lateHours += hours;
      afterHours += hours;
    } else {
      nightHours += hours;
      afterHours += hours;
    }
  });
  
  const afterHoursPercentage = totalHours > 0 ? (afterHours / totalHours) * 100 : 0;
  
  // Get latest import
  const latestImport = await db
    .select({
      importDate: importLogs.importDate,
      fileName: importLogs.fileName,
    })
    .from(importLogs)
    .orderBy(desc(importLogs.importDate))
    .limit(1);
  
  const latestImportDate = latestImport[0]?.importDate 
    ? format(new Date(latestImport[0].importDate), 'MM/dd/yyyy')
    : '--';
  
  // Count entries imported on the latest import date
  const latestImportCount = latestImport[0]?.importDate 
    ? await db
        .select({
          count: count(),
        })
        .from(timeEntries)
        .where(eq(timeEntries.date, format(new Date(latestImport[0].importDate), 'yyyy-MM-dd')))
        .then(result => Number(result[0]?.count || 0))
    : 0;
  
  // Get recent activity (latest time entries)
  const recentTimeEntries = await db
    .select({
      id: timeEntries.id,
      date: timeEntries.date,
      employeeId: timeEntries.employeeId,
      employeeName: employees.name,
      project: timeEntries.project,
      description: timeEntries.description,
    })
    .from(timeEntries)
    .innerJoin(employees, eq(timeEntries.employeeId, employees.id))
    .orderBy(desc(timeEntries.date), desc(timeEntries.id))
    .limit(5);
  
  const recentActivity: RecentActivityData[] = recentTimeEntries.map(entry => ({
    id: entry.id,
    type: 'time_entry',
    description: `${entry.employeeName} worked on ${entry.project}: ${entry.description}`,
    date: entry.date,
    employeeId: entry.employeeId,
    employeeName: entry.employeeName,
  }));
  
  // Add import activity if available
  if (latestImport.length > 0 && latestImport[0].importDate) {
    const importActivity: ImportActivityData = {
      id: 0,
      type: 'import',
      description: `Imported ${latestImportCount} time entries from ${latestImport[0].fileName}`,
      date: format(new Date(latestImport[0].importDate), 'yyyy-MM-dd'),
    };
    recentActivity.unshift(importActivity);
  }
  
  // Calculate capacity utilization rate
  // This represents what percentage of the team's total available hours are being utilized
  // Available hours = active employees * standard work hours per day * workdays in period
  const workdaysInPeriod = dailyDistribution.filter(day => 
    day.dayOfWeek !== 0 && day.dayOfWeek !== 6  // 0 = Sunday, 6 = Saturday in PostgreSQL
  ).length;
  
  // Assuming 8 hours per workday as standard
  const standardHoursPerDay = 8;
  const totalAvailableHours = activeEmployees * standardHoursPerDay * workdaysInPeriod;
  const capacityUtilizationRate = totalAvailableHours > 0 
    ? (totalHours / totalAvailableHours) * 100 
    : 0;
  
  return {
    teamHealth: {
      totalEmployees,
      activeEmployees,
      totalHours,
      committedHours: totalCommittedHours,
      efficiencyScore,
      weekendWorkPercentage,
      afterHoursPercentage,
      capacityUtilizationRate,
    },
    employeeEfficiency: employeeEfficiencyData,
    projectAllocation: projectAllocationData,
    workPatterns: {
      earlyHours,
      coreHours,
      lateHours,
      nightHours,
      weekendPercentage: weekendWorkPercentage,
      afterHoursPercentage,
    },
    recentActivity,
    latestImport: {
      date: latestImportDate,
      count: latestImportCount,
    },
    workdaysInPeriod,
  };
}
