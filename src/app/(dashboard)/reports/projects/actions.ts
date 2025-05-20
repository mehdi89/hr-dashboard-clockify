"use server";

import { prisma } from "@/db";

export type EmployeeProjectDistribution = {
  employeeId: number;
  employeeName: string;
  project: string;
  totalHours: number;
  entriesCount: number;
};

export type ProjectSummary = {
  project: string;
  totalHours: number;
  entriesCount: number;
  employeesCount: number;
  avgDuration: number;
  firstWorked: string;
  lastWorked: string;
  avgHoursPerDay: number;
};

export type ProjectDistributionData = {
  projectEmployeeDistribution: EmployeeProjectDistribution[];
  topProjects: ProjectSummary[];
  totalProjectHours: number;
  uniqueProjects: number;
};

export async function fetchProjectDistributionData(startDate: string, endDate: string): Promise<ProjectDistributionData> {
  // Get project distribution by employee for the date range
  const projectEmployeeDistribution = await prisma.$queryRaw<Array<{
    employeeId: number;
    employeeName: string;
    project: string;
    totalHours: number;
    entriesCount: number;
  }>>`
    SELECT 
      "time_entries"."employee_id" as "employeeId",
      "employees"."name" as "employeeName",
      "time_entries"."project",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(*) as "entriesCount"
    FROM "time_entries"
    INNER JOIN "employees" ON "time_entries"."employee_id" = "employees"."id"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "time_entries"."employee_id", "employees"."name", "time_entries"."project"
    ORDER BY "employees"."name", SUM(CAST("duration_decimal" AS DECIMAL)) DESC
  `;

  // Get top projects by hours for the date range
  const topProjects = await prisma.$queryRaw<Array<{
    project: string;
    totalHours: number;
    entriesCount: number;
    employeesCount: number;
    avgDuration: number;
    firstWorked: Date;
    lastWorked: Date;
    avgHoursPerDay: number;
  }>>`
    SELECT 
      "project",
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(*) as "entriesCount",
      COUNT(DISTINCT "employee_id") as "employeesCount",
      AVG(CAST("duration_decimal" AS DECIMAL)) as "avgDuration",
      MIN("date") as "firstWorked",
      MAX("date") as "lastWorked",
      SUM(CAST("duration_decimal" AS DECIMAL)) / COUNT(DISTINCT "date") as "avgHoursPerDay"
    FROM "time_entries"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
    GROUP BY "project"
    ORDER BY SUM(CAST("duration_decimal" AS DECIMAL)) DESC
    LIMIT 10
  `;

  // Calculate overall stats for the date range
  const overallStats = await prisma.$queryRaw<Array<{
    totalHours: number;
    uniqueProjects: number;
  }>>`
    SELECT 
      SUM(CAST("duration_decimal" AS DECIMAL)) as "totalHours",
      COUNT(DISTINCT "project") as "uniqueProjects"
    FROM "time_entries"
    WHERE 
      "date" >= ${new Date(startDate)} AND 
      "date" <= ${new Date(endDate)}
  `;
  
  const totalHoursResult = overallStats[0] || { totalHours: 0, uniqueProjects: 0 };

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
    projectEmployeeDistribution: projectEmployeeDistribution.map((item: any) => ({
      employeeId: Number(item.employeeId),
      employeeName: item.employeeName,
      project: item.project,
      totalHours: Number(item.totalHours),
      entriesCount: Number(item.entriesCount),
    })),
    topProjects: topProjects.map((project: any) => ({
      project: project.project,
      totalHours: Number(project.totalHours),
      entriesCount: Number(project.entriesCount),
      employeesCount: Number(project.employeesCount),
      avgDuration: Number(project.avgDuration),
      firstWorked: project.firstWorked instanceof Date ? project.firstWorked.toISOString() : String(project.firstWorked),
      lastWorked: project.lastWorked instanceof Date ? project.lastWorked.toISOString() : String(project.lastWorked),
      avgHoursPerDay: Number(project.avgHoursPerDay) || 0,
    })),
    totalProjectHours: Number(totalHoursResult.totalHours),
    uniqueProjects: Number(totalHoursResult.uniqueProjects),
  };

  // Final safety check to catch any potential Decimal objects
  return convertDecimalToNumber(result);
}
