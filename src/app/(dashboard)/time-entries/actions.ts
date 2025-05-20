"use server";

import { prisma } from "@/db";
import { TimeEntryWithEmployee } from "@/components/data-display/TimeEntriesTable";

export type TimeEntriesFilters = {
  employeeId?: number;
  startDate?: string;
  endDate?: string;
  project?: string;
  client?: string;
};

export async function fetchTimeEntries(filters: TimeEntriesFilters) {
  // Build where conditions for the query
  const whereConditions: any = {};
  
  if (filters.employeeId) {
    whereConditions.employeeId = filters.employeeId;
  }
  
  if (filters.startDate && filters.endDate) {
    whereConditions.date = {
      gte: new Date(filters.startDate),
      lte: new Date(filters.endDate)
    };
  }
  
  if (filters.project) {
    whereConditions.project = {
      contains: filters.project
    };
  }
  
  if (filters.client) {
    whereConditions.client = {
      contains: filters.client
    };
  }
  
  // Execute the query with Prisma
  const entries = await prisma.time_entries.findMany({
    select: {
      id: true,
      date: true,
      project: true,
      client: true,
      description: true,
      task: true,
      startDate: true,
      startTime: true,
      endDate: true,
      endTime: true,
      hoursWorked: true,
      durationDecimal: true,
      employeeId: true,
      employee: {
        select: {
          name: true
        }
      }
    },
    where: whereConditions,
    orderBy: {
      date: 'desc'
    },
    take: 100
  });

  // Map entries to include employeeName at top level and format time fields
  return entries.map((entry: any) => {
    // Format the time fields to isolate just the time part
    let formattedEntry = {
      ...entry,
      employeeName: entry.employee.name,
      date: entry.date.toISOString(), // Ensure date is serializable
      startDate: entry.startDate.toISOString(),
      endDate: entry.endDate.toISOString(),
      // Format times for display
      startTime: entry.startTime.toISOString(),
      endTime: entry.endTime.toISOString(),
      // Convert hoursWorked to a string representation if needed
      hoursWorked: entry.hoursWorked.toISOString()
    };
    
    return formattedEntry;
  }) as TimeEntryWithEmployee[];
}

export async function fetchEmployees() {
  return await prisma.employees.findMany({
    select: {
      id: true,
      name: true,
      isActive: true
    },
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
    }
  });
}

export async function fetchProjects() {
  // Using raw query because Prisma doesn't have a direct groupBy with select
  return await prisma.$queryRaw<Array<{project: string}>>`
    SELECT DISTINCT "project"
    FROM "time_entries"
    ORDER BY "project"
  `;
}

export async function fetchClients() {
  // Using raw query because Prisma doesn't have a direct groupBy with select
  return await prisma.$queryRaw<Array<{client: string}>>`
    SELECT DISTINCT "client"
    FROM "time_entries"
    WHERE "client" IS NOT NULL
    ORDER BY "client"
  `;
}
