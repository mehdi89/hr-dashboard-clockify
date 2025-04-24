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
  committedHoursForPeriod: number;
};

export async function fetchEmployeeEfficiencyData(
  employeeId: number,
  startDate: string,
  endDate: string
): Promise<EmployeeEfficiency | null> {
  // Get employee details
  const employeeResult = await db
    .select({
      id: employees.id,
      name: employees.name,
      weeklyCommittedHours: employees.weeklyCommittedHours,
    })
    .from(employees)
    .where(eq(employees.id, employeeId))
    .limit(1);

  if (employeeResult.length === 0) {
    return null;
  }

  const employee = employeeResult[0];

  // Get total hours for the date range
  const timeEntryStats = await db
    .select({
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
    })
    .from(timeEntries)
    .where(
      and(
        eq(timeEntries.employeeId, employeeId),
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    );

  const totalHours = Number(timeEntryStats[0]?.totalHours || 0);
  const entriesCount = Number(timeEntryStats[0]?.entriesCount || 0);

  // Calculate days in the date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate weeks in the date range (used for committed hours calculation)
  const weeks = daysDiff / 5;
  
  // Calculate committed hours for the period
  const committedHoursForPeriod = employee.weeklyCommittedHours * weeks;
  
  // Calculate efficiency percentage
  const efficiency = committedHoursForPeriod > 0 
    ? (totalHours / committedHoursForPeriod) * 100 
    : 0;

  return {
    employeeId: employee.id,
    employeeName: employee.name,
    totalHours,
    entriesCount,
    weeklyCommittedHours: employee.weeklyCommittedHours,
    efficiency,
    committedHoursForPeriod,
  };
}

export async function fetchEmployeeProjectData(
  employeeId: number,
  startDate: string,
  endDate: string
) {
  // Get project statistics for the employee
  const projectStats = await db
    .select({
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
    })
    .from(timeEntries)
    .where(
      and(
        eq(timeEntries.employeeId, employeeId),
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.project)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  return projectStats;
}
