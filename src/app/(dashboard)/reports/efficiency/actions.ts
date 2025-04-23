"use server";

import { db } from "@/db";
import { timeEntries, employees } from "@/db/schema";
import { desc, sql, eq, and, gte, lte } from "drizzle-orm";

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
  const employeeHours = await db
    .select({
      employeeId: timeEntries.employeeId,
      employeeName: employees.name,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      weeklyCommittedHours: employees.weeklyCommittedHours,
    })
    .from(timeEntries)
    .innerJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.employeeId, employees.name, employees.weeklyCommittedHours)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Calculate efficiency for each employee
  const employeeEfficiency = employeeHours.map(employee => {
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
  const totalHoursResult = await db
    .select({
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .then(result => result[0]?.totalHours || 0);

  return {
    employeeEfficiency: employeeEfficiency as EmployeeEfficiency[],
    projectEfficiency: projectEfficiency as ProjectEfficiency[],
    totalHours: Number(totalHoursResult),
  };
}
