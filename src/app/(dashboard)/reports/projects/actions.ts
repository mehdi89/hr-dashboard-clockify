"use server";

import { db } from "@/db";
import { timeEntries, employees } from "@/db/schema";
import { desc, sql, eq, and, gte, lte } from "drizzle-orm";

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
  const projectEmployeeDistribution = await db
    .select({
      employeeId: timeEntries.employeeId,
      employeeName: employees.name,
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
    })
    .from(timeEntries)
    .innerJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.employeeId, employees.name, timeEntries.project)
    .orderBy(employees.name, desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Get top projects by hours for the date range
  const topProjects = await db
    .select({
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      avgDuration: sql<number>`AVG(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      firstWorked: sql<string>`MIN(${timeEntries.date})`,
      lastWorked: sql<string>`MAX(${timeEntries.date})`,
      // Calculate average hours per day
      avgHoursPerDay: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL)) / COUNT(DISTINCT ${timeEntries.date})`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .groupBy(timeEntries.project)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`))
    .limit(10);

  // Calculate overall stats for the date range
  const totalHoursResult = await db
    .select({
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      uniqueProjects: sql<number>`COUNT(DISTINCT ${timeEntries.project})`,
    })
    .from(timeEntries)
    .where(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    )
    .then(result => result[0] || { totalHours: 0, uniqueProjects: 0 });

  return {
    projectEmployeeDistribution: projectEmployeeDistribution.map(item => ({
      employeeId: Number(item.employeeId),
      employeeName: item.employeeName,
      project: item.project,
      totalHours: Number(item.totalHours),
      entriesCount: Number(item.entriesCount),
    })),
    topProjects: topProjects.map(project => ({
      project: project.project,
      totalHours: Number(project.totalHours),
      entriesCount: Number(project.entriesCount),
      employeesCount: Number(project.employeesCount),
      avgDuration: Number(project.avgDuration),
      firstWorked: project.firstWorked,
      lastWorked: project.lastWorked,
      avgHoursPerDay: Number(project.avgHoursPerDay) || 0,
    })),
    totalProjectHours: Number(totalHoursResult.totalHours),
    uniqueProjects: Number(totalHoursResult.uniqueProjects),
  };
}
