import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { employees } from "@/db/schema";
import { format } from "date-fns";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PlusCircle, Pencil } from "lucide-react";

export const metadata: Metadata = {
  title: "Employees - Time Tracking System",
};

export default async function EmployeesPage() {
  // Fetch employees from the database
  const employeesList = await db.query.employees.findMany({
    orderBy: (employees, { desc }) => [desc(employees.isActive), employees.name],
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Manage employee information</p>
        </div>
        <Button asChild>
          <Link href="/employees/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Employee
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Employment Type</TableHead>
              <TableHead>Weekly Hours</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeesList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No employees found. Add your first employee to get started.
                </TableCell>
              </TableRow>
            ) : (
              employeesList.map((employee) => (
                <TableRow key={employee.id} className={!employee.isActive ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.employmentType}</TableCell>
                  <TableCell>{employee.weeklyCommittedHours}</TableCell>
                  <TableCell>{format(new Date(employee.startDate), 'MM/dd/yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={employee.isActive ? "success" : "secondary"}>
                      {employee.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/employees/${employee.id}`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
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
