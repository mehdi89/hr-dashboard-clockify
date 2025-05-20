"use server";

import { prisma } from "@/db";

export type EmployeeEfficiency = {
  employeeId: number;
  employeeName: string;
  totalHours: number;
  entriesCount: number;
  weeklyCommittedHours: number;
  efficiency: number;
};

export type ProjectEfficiency = {
  project: string;
  totalHours: number;
  entriesCount: number;
  employeesCount: number;
};

export type EfficiencyData = {
  employeeEfficiency: EmployeeEfficiency[];
  projectEfficiency: ProjectEfficiency[];
  totalHours: number;
};

export async function fetchEfficiencyData(startDate: string, endDate: string): Promise<EfficiencyData> {
  // Get total hours by employee for the date range
  const employeeHours = await prisma.$queryRaw<Array<{
    employeeId: number;
    employeeName: string;
    totalHours: number;
    entriesCount: number;
    weeklyCommittedHours: number;
  }>>`
    SELECT 
      "time_entries"."employee_id" as "employeeId",
      "employees"."name" as "employeeName",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(*) as "entriesCount",
      "employees"."weekly_committed_hours" as "weeklyCommittedHours"
    FROM "time_entries"
    INNER JOIN "employees" ON "time_entries"."employee_id" = "employees"."id"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "time_entries"."employee_id", "employees"."name", "employees"."weekly_committed_hours"
    ORDER BY SUM(CAST("duration_decimal" AS DECIMAL)) DESC
  `;

  // Calculate efficiency for each employee
  const employeeEfficiency = employeeHours.map((employee: any) => {
    // Calculate days in the date range
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate weeks in the date range (used for committed hours calculation)
    const weeks = daysDiff / 7;
    
    // Calculate committed hours for the period
    const committedHoursForPeriod = employee.weeklyCommittedHours * weeks;
    
    // Calculate efficiency percentage
    const efficiency = committedHoursForPeriod > 0 
      ? (Number(employee.totalHours) / committedHoursForPeriod) * 100 
      : 0;
    
    return {
      ...employee,
      totalHours: Number(employee.totalHours),
      efficiency,
    };
  });

  // Get project statistics for the date range
  const projectEfficiency = await prisma.$queryRaw<Array<{
    project: string;
    totalHours: number;
    entriesCount: number;
    employeesCount: number;
  }>>`
    SELECT 
      "project",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(*) as "entriesCount",
      COUNT(DISTINCT "employee_id") as "employeesCount"
    FROM "time_entries"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "project"
    ORDER BY SUM(CAST("duration_decimal" AS DECIMAL)) DESC
  `;

  // Calculate overall stats for the date range
  const totalHoursResult = await prisma.time_entries.aggregate({
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

  // Ensure all values are properly converted to JavaScript numbers
  const result = {
    employeeEfficiency: employeeEfficiency.map(employee => ({
      employeeId: Number(employee.employeeId),
      employeeName: employee.employeeName,
      totalHours: Number(employee.totalHours),
      entriesCount: Number(employee.entriesCount),
      weeklyCommittedHours: Number(employee.weeklyCommittedHours),
      efficiency: Number(employee.efficiency)
    })),
    projectEfficiency: projectEfficiency.map(project => ({
      project: project.project,
      totalHours: Number(project.totalHours),
      entriesCount: Number(project.entriesCount),
      employeesCount: Number(project.employeesCount)
    })),
    totalHours: Number(totalHoursResult._sum.durationDecimal || 0),
  };

  // Final safety check
  return convertDecimalToNumber(result);
}
