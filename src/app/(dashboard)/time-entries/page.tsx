import { Metadata } from "next";
import { db } from "@/db";
import { employees, timeEntries } from "@/db/schema";
import { desc, eq, and, between, gte, lte } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterCard } from "@/components/layout/FilterCard";
import { TimeEntriesTable, type TimeEntryWithEmployee } from "@/components/data-display/TimeEntriesTable";

export const metadata: Metadata = {
  title: "Time Entries - Time Tracking System",
};

export default async function TimeEntriesPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get filter parameters from URL - properly awaited
  const params = await Promise.resolve(searchParams);
  const employeeId = typeof params.employeeId === 'string' ? parseInt(params.employeeId) : undefined;
  const startDate = typeof params.startDate === 'string' ? params.startDate : undefined;
  const endDate = typeof params.endDate === 'string' ? params.endDate : undefined;

  // Fetch all employees for the filter dropdown
  const employeesList = await db
    .select({
      id: employees.id,
      name: employees.name,
      isActive: employees.isActive
    })
    .from(employees)
    .where(eq(employees.isActive, true))
    .orderBy(employees.name);

  // Build conditions for the query
  const conditions = [];
  
  if (employeeId) {
    conditions.push(eq(timeEntries.employeeId, employeeId));
  }
  
  if (startDate && endDate) {
    conditions.push(
      and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      )
    );
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Time Entries"
        description="View and manage employee time tracking records"
        action={{
          label: "Import Time Data",
          href: "/time-entries/import",
          icon: "Upload"
        }}
      />

      {/* Filter Controls */}
      <FilterCard title="Filter Time Entries">
        <div className="space-y-2">
          <label htmlFor="employeeFilter" className="text-sm font-medium">
            Employee
          </label>
          <select 
            id="employeeFilter" 
            name="employeeId" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={employeeId ? String(employeeId) : ""}
          >
            <option value="">All Employees</option>
            {employeesList.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Start Date
          </label>
          <Input 
            type="date" 
            id="startDate" 
            name="startDate"
            defaultValue={startDate} 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="endDate" className="text-sm font-medium">
            End Date
          </label>
          <Input 
            type="date" 
            id="endDate" 
            name="endDate"
            defaultValue={endDate}
          />
        </div>
      </FilterCard>

      {/* Data Table */}
      <TimeEntriesTable 
        entries={entries as TimeEntryWithEmployee[]} 
        emptyMessage="No time entries found with the current filters."
      />
    </div>
  );
}
