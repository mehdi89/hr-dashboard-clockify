"use server";

import { db } from "@/db";
import { employees, timeEntries } from "@/db/schema";
import { desc, eq, and, between, gte, lte, like, isNotNull } from "drizzle-orm";
import { TimeEntryWithEmployee } from "@/components/data-display/TimeEntriesTable";

export type TimeEntriesFilters = {
  employeeId?: number;
  startDate?: string;
  endDate?: string;
  project?: string;
  client?: string;
};

export async function fetchTimeEntries(filters: TimeEntriesFilters) {
  // Build conditions for the query
  const conditions = [];
  
  if (filters.employeeId) {
    conditions.push(eq(timeEntries.employeeId, filters.employeeId));
  }
  
  if (filters.startDate && filters.endDate) {
    conditions.push(
      and(
        gte(timeEntries.date, filters.startDate),
        lte(timeEntries.date, filters.endDate)
      )
    );
  }
  
  if (filters.project) {
    conditions.push(like(timeEntries.project, `%${filters.project}%`));
  }
  
  if (filters.client) {
    conditions.push(like(timeEntries.client || '', `%${filters.client}%`));
  }
  
  // Execute the query with all conditions
  const entries = await db.select({
    id: timeEntries.id,
    date: timeEntries.date,
    project: timeEntries.project,
    client: timeEntries.client,
    description: timeEntries.description,
    task: timeEntries.task,
    startDate: timeEntries.startDate,
    startTime: timeEntries.startTime,
    endDate: timeEntries.endDate,
    endTime: timeEntries.endTime,
    hoursWorked: timeEntries.hoursWorked,
    durationDecimal: timeEntries.durationDecimal,
    employeeId: timeEntries.employeeId,
    employeeName: employees.name
  })
  .from(timeEntries)
  .innerJoin(employees, eq(timeEntries.employeeId, employees.id))
  .where(conditions.length > 0 ? and(...conditions) : undefined)
  .orderBy(desc(timeEntries.date))
  .limit(100);

  return entries as TimeEntryWithEmployee[];
}

export async function fetchEmployees() {
  return await db
    .select({
      id: employees.id,
      name: employees.name,
      isActive: employees.isActive
    })
    .from(employees)
    .where(eq(employees.isActive, true))
    .orderBy(employees.name);
}

export async function fetchProjects() {
  return await db
    .select({
      project: timeEntries.project
    })
    .from(timeEntries)
    .groupBy(timeEntries.project)
    .orderBy(timeEntries.project);
}

export async function fetchClients() {
  return await db
    .select({
      client: timeEntries.client
    })
    .from(timeEntries)
    .where(
      // Only include non-null clients
      isNotNull(timeEntries.client)
    )
    .groupBy(timeEntries.client)
    .orderBy(timeEntries.client);
}
