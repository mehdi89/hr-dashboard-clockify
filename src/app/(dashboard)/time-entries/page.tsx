import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { employees, timeEntries } from "@/db/schema";
import { format } from "date-fns";
import { desc, eq, and, between, gte, lte } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Eye } from "lucide-react";

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
    tags: timeEntries.tags,
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Time Entries</h1>
          <p className="text-muted-foreground">View and manage employee time tracking records</p>
        </div>
        <Button asChild>
          <Link href="/time-entries/import">
            <Upload className="mr-2 h-4 w-4" />
            Import Time Data
          </Link>
        </Button>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            
            <div className="flex items-end">
              <Button type="submit" variant="secondary">
                Apply Filters
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Data Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-muted-foreground">
                  No time entries found with the current filters.
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{format(new Date(entry.date), 'MM/dd/yyyy')}</TableCell>
                  <TableCell>{entry.employeeName}</TableCell>
                  <TableCell>{entry.project}</TableCell>
                  <TableCell>{entry.client || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate" title={entry.description || undefined}>
                    {entry.description ? (
                      <span className="line-clamp-1">{entry.description}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{entry.task || '-'}</TableCell>
                  <TableCell>{entry.tags || '-'}</TableCell>
                  <TableCell>
                    {format(new Date(entry.startDate), 'MM/dd/yyyy')} {entry.startTime}
                  </TableCell>
                  <TableCell>
                    {format(new Date(entry.endDate), 'MM/dd/yyyy')} {entry.endTime}
                  </TableCell>
                  <TableCell>{entry.hoursWorked}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/time-entries/${entry.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
