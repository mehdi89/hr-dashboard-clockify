import { Metadata } from "next";
import { prisma } from "@/db";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmployeesTable, type Employee } from "@/components/data-display/EmployeesTable";

export const metadata: Metadata = {
  title: "Employees - Time Tracking System",
};

export default async function EmployeesPage() {
  // Fetch employees from the database
  const employeesData = await prisma.employees.findMany({
    select: {
      id: true,
      name: true,
      department: true,
      employmentType: true,
      weeklyCommittedHours: true,
      startDate: true,
      isActive: true,
      clockifyName: true
    },
    orderBy: [
      { isActive: 'desc' },
      { name: 'asc' }
    ]
  });
  
  // Format dates for the Employee type
  const employeesList = employeesData.map(employee => ({
    ...employee,
    startDate: employee.startDate ? employee.startDate.toISOString() : null
  }));

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

      <EmployeesTable employees={employeesList} />
    </div>
  );
}
