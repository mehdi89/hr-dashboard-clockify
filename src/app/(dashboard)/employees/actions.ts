"use server";

import { prisma } from "@/db";

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
  const employee = await prisma.employees.findUnique({
    where: {
      id: employeeId
    },
    select: {
      id: true,
      name: true,
      weeklyCommittedHours: true
    }
  });

  if (!employee) {
    return null;
  }

  // Get total hours for the date range
  const timeEntryStats = await prisma.time_entries.aggregate({
    _sum: {
      durationDecimal: true
    },
    _count: {
      id: true
    },
    where: {
      employeeId: employeeId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }
  });

  const totalHours = Number(timeEntryStats._sum.durationDecimal || 0);
  const entriesCount = Number(timeEntryStats._count.id || 0);

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
  // Get project statistics for the employee using raw query for groupBy and aggregation
  const projectStats = await prisma.$queryRaw<Array<{project: string, totalHours: number, entriesCount: number}>>`
    SELECT 
      project,
      SUM(CAST("durationDecimal" AS DECIMAL)) as "totalHours",
      COUNT(*) as "entriesCount"
    FROM "time_entries"
    WHERE 
      "employeeId" = ${employeeId} AND
      date >= ${new Date(startDate)} AND 
      date <= ${new Date(endDate)}
    GROUP BY project
    ORDER BY SUM(CAST("durationDecimal" AS DECIMAL)) DESC
  `;

  return projectStats;
}
