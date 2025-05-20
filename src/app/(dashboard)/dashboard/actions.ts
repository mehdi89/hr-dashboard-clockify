"use server";

import { prisma } from "@/db";
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
  const totalEmployees = await prisma.employees.count();
  const activeEmployees = await prisma.employees.count({
    where: {
      isActive: true
    }
  });
  
  // Get total hours and committed hours
  const hoursResult = await prisma.time_entries.aggregate({
    _sum: {
      durationDecimal: true
    },
    where: {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }
  });
  
  const totalHours = Number(hoursResult._sum.durationDecimal || 0);
  
  // Get employee data with actual hours and committed hours
  const employeeData = await prisma.employees.findMany({
    where: {
      isActive: true
    },
    select: {
      id: true,
      name: true,
      department: true,
      weeklyCommittedHours: true,
      isActive: true,
      time_entries: {
        where: {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate)
          }
        },
        select: {
          durationDecimal: true,
          date: true
        }
      }
    }
  });

  // Process the employee data to calculate hours and days worked
  const processedEmployeeData = employeeData.map((employee: any) => {
    const actualHours = employee.time_entries.reduce(
      (sum: number, entry: any) => sum + Number(entry.durationDecimal || 0), 
      0
    );
    
    // Count unique days worked
    const uniqueDates = new Set(
      employee.time_entries.map((entry: any) => entry.date.toISOString().split('T')[0])
    );
    
    return {
      id: employee.id,
      name: employee.name,
      department: employee.department,
      weeklyCommittedHours: employee.weeklyCommittedHours,
      isActive: employee.isActive,
      actualHours,
      daysWorked: uniqueDates.size
    };
  });
  
  // Calculate weeks in the date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const weeks = daysDiff / 7;
  
  // Calculate total committed hours and efficiency
  let totalCommittedHours = 0;
  
  const employeeEfficiencyData = processedEmployeeData.map((employee: any) => {
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
  // Group by employee ID and date to get total hours for each employee per day
  const employeeDailyHours = await prisma.$queryRaw<Array<{employeeId: number, date: Date, totalHours: number}>>`
    SELECT 
      "employee_id" AS "employeeId", 
      date,
      SUM(CAST("duration_decimal" AS DECIMAL)) AS "totalHours"
    FROM "time_entries"
    WHERE date >= ${new Date(startDate)} AND date <= ${new Date(endDate)}
    GROUP BY "employee_id", date
  `;

  // Calculate consistency (standard deviation of hours worked per day)
  const employeeHoursMap = new Map<number, number[]>();
  employeeDailyHours.forEach((entry: any) => {
    if (!employeeHoursMap.has(entry.employeeId)) {
      employeeHoursMap.set(entry.employeeId, []);
    }
    employeeHoursMap.get(entry.employeeId)!.push(Number(entry.totalHours));
  });

  // Update consistency scores
  employeeEfficiencyData.forEach((employee: any) => {
    const hoursArray = employeeHoursMap.get(employee.employeeId) || [];
    if (hoursArray.length > 0) {
      const mean = hoursArray.reduce((sum: number, val: number) => sum + val, 0) / hoursArray.length;
      const squareDiffs = hoursArray.map((val: number) => Math.pow(val - mean, 2));
      const avgSquareDiff = squareDiffs.reduce((sum: number, val: number) => sum + val, 0) / squareDiffs.length;
      const stdDev = Math.sqrt(avgSquareDiff);
      
      // Normalize consistency to a 0-100 scale (lower std dev = higher consistency)
      employee.consistency = mean > 0 ? Math.max(0, Math.min(100, 100 - (stdDev / mean * 50))) : 0;
    }
  });
  
  // Get project allocation data
  const projectAllocation = await prisma.$queryRaw<Array<{project: string, totalHours: number, employeesCount: number, department: string}>>`
    SELECT 
      "time_entries"."project",
      SUM(CAST("duration_decimal" AS DECIMAL)) AS "totalHours",
      COUNT(DISTINCT "employee_id") AS "employeesCount",
      MAX("employees"."department") AS "department"
    FROM "time_entries"
    LEFT JOIN "employees" ON "time_entries"."employee_id" = "employees"."id"
    WHERE "time_entries"."date" >= ${new Date(startDate)} AND "time_entries"."date" <= ${new Date(endDate)}
    GROUP BY "time_entries"."project"
    ORDER BY SUM(CAST("duration_decimal" AS DECIMAL)) DESC
  `;
  
  const projectAllocationData = projectAllocation.map((project: any) => ({
    project: project.project,
    totalHours: Number(project.totalHours),
    employeesCount: Number(project.employeesCount),
    percentOfTotal: totalHours > 0 ? (Number(project.totalHours) / totalHours) * 100 : 0,
    department: project.department,
  }));
  
  // Calculate weekend work percentage
  const dailyDistribution = await prisma.$queryRaw<Array<{date: Date, totalHours: number, dayOfWeek: number}>>`
    SELECT 
      date, 
      SUM(CAST("duration_decimal" AS DECIMAL)) AS "totalHours",
      EXTRACT(DOW FROM date) AS "dayOfWeek"
    FROM "time_entries"
    WHERE date >= ${new Date(startDate)} AND date <= ${new Date(endDate)}
    GROUP BY date, EXTRACT(DOW FROM date)
    ORDER BY date
  `;
  
  let weekendHours = 0;
  dailyDistribution.forEach((day: any) => {
    // PostgreSQL DOW: 0 = Sunday, 6 = Saturday
    if (day.dayOfWeek === 0 || day.dayOfWeek === 6) {
      weekendHours += Number(day.totalHours);
    }
  });
  
  const weekendWorkPercentage = totalHours > 0 ? (weekendHours / totalHours) * 100 : 0;
  
  // Calculate work hour distribution (early, core, late, night hours)
  const hourDistribution = await prisma.$queryRaw<Array<{hour: number, totalHours: number}>>`
    SELECT 
      EXTRACT(HOUR FROM "start_time") AS "hour",
      SUM(CAST("duration_decimal" AS DECIMAL)) AS "totalHours"
    FROM "time_entries"
    WHERE date >= ${new Date(startDate)} AND date <= ${new Date(endDate)}
    GROUP BY EXTRACT(HOUR FROM "start_time")
    ORDER BY EXTRACT(HOUR FROM "start_time")
  `;
  
  let earlyHours = 0;   // 5-9 AM
  let coreHours = 0;    // 9-5 PM
  let lateHours = 0;    // 5-11 PM
  let nightHours = 0;   // 11PM-5AM
  let afterHours = 0;   // Outside 9-5
  
  hourDistribution.forEach((entry: any) => {
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
  const latestImport = await prisma.import_logs.findMany({
    select: {
      importDate: true,
      fileName: true
    },
    orderBy: {
      importDate: 'desc'
    },
    take: 1
  });
  
  const latestImportDate = latestImport[0]?.importDate 
    ? format(new Date(latestImport[0].importDate), 'MM/dd/yyyy')
    : '--';
  
  // Count entries imported on the latest import date
  const latestImportCount = latestImport[0]?.importDate 
    ? await prisma.time_entries.count({
        where: {
          date: new Date(format(new Date(latestImport[0].importDate), 'yyyy-MM-dd'))
        }
      })
    : 0;
  
  // Get recent activity (latest time entries)
  const recentTimeEntries = await prisma.time_entries.findMany({
    select: {
      id: true,
      date: true,
      employeeId: true,
      project: true,
      description: true,
      employee: {
        select: {
          name: true
        }
      }
    },
    orderBy: [
      { date: 'desc' },
      { id: 'desc' }
    ],
    take: 5
  });
  
  const recentActivity: RecentActivityData[] = recentTimeEntries.map((entry: any) => ({
    id: entry.id,
    type: 'time_entry',
    description: `${entry.employee.name} worked on ${entry.project}: ${entry.description || 'No description'}`,
    date: format(new Date(entry.date), 'yyyy-MM-dd'),
    employeeId: entry.employeeId,
    employeeName: entry.employee.name,
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
  const workdaysInPeriod = dailyDistribution.filter((day: any) => 
    day.dayOfWeek !== 0 && day.dayOfWeek !== 6  // 0 = Sunday, 6 = Saturday in PostgreSQL
  ).length;
  
  // Assuming 8 hours per workday as standard
  const standardHoursPerDay = 8;
  const totalAvailableHours = activeEmployees * standardHoursPerDay * workdaysInPeriod;
  const capacityUtilizationRate = totalAvailableHours > 0 
    ? (totalHours / totalAvailableHours) * 100 
    : 0;
  
  // Helper function to convert Decimal objects to Numbers
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

  // Construct the result with explicit number conversions for all numeric values
  const result = {
    teamHealth: {
      totalEmployees: Number(totalEmployees),
      activeEmployees: Number(activeEmployees),
      totalHours: Number(totalHours),
      committedHours: Number(totalCommittedHours),
      efficiencyScore: Number(efficiencyScore),
      weekendWorkPercentage: Number(weekendWorkPercentage),
      afterHoursPercentage: Number(afterHoursPercentage),
      capacityUtilizationRate: Number(capacityUtilizationRate),
    },
    employeeEfficiency: employeeEfficiencyData.map(emp => ({
      ...emp,
      employeeId: Number(emp.employeeId),
      totalHours: Number(emp.totalHours),
      committedHours: Number(emp.committedHours),
      efficiency: Number(emp.efficiency),
      daysWorked: Number(emp.daysWorked),
      consistency: Number(emp.consistency),
    })),
    projectAllocation: projectAllocationData.map(proj => ({
      ...proj,
      totalHours: Number(proj.totalHours),
      employeesCount: Number(proj.employeesCount),
      percentOfTotal: Number(proj.percentOfTotal),
    })),
    workPatterns: {
      earlyHours: Number(earlyHours),
      coreHours: Number(coreHours),
      lateHours: Number(lateHours),
      nightHours: Number(nightHours),
      weekendPercentage: Number(weekendWorkPercentage),
      afterHoursPercentage: Number(afterHoursPercentage),
    },
    recentActivity,
    latestImport: {
      date: latestImportDate,
      count: Number(latestImportCount),
    },
    workdaysInPeriod: Number(workdaysInPeriod),
  };

  // Final safety check to catch any potential Decimal objects
  return convertDecimalToNumber(result);
}
