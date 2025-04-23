import { Metadata } from "next";
import { db } from "@/db";
import { employees } from "@/db/schema";
import { desc } from "drizzle-orm";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmployeesTable, type Employee } from "@/components/data-display/EmployeesTable";

export const metadata: Metadata = {
  title: "Employees - Time Tracking System",
};

export default async function EmployeesPage() {
  // Fetch employees from the database
  const employeesList = await db
    .select({
      id: employees.id,
      name: employees.name,
      department: employees.department,
      employmentType: employees.employmentType,
      weeklyCommittedHours: employees.weeklyCommittedHours,
      startDate: employees.startDate,
      isActive: employees.isActive,
      clockifyName: employees.clockifyName
    })
    .from(employees)
    .orderBy(desc(employees.isActive), employees.name);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Manage employee information"
        action={{
          label: "Add New Employee",
          href: "/employees/new",
          icon: "PlusCircle"
        }}
      />

      <EmployeesTable employees={employeesList as Employee[]} />
    </div>
  );
}
