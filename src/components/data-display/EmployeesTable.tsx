"use client";

import React from "react";
import { format } from "date-fns";
import { DataTable } from "@/components/data-display/DataTable";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, User } from "lucide-react";

// Define the employee type
export type Employee = {
  id: number;
  name: string;
  department: string;
  employmentType: string;
  weeklyCommittedHours: number;
  startDate: string | null;
  isActive: boolean;
  clockifyName: string | null;
};

interface EmployeesTableProps {
  employees: Employee[];
  emptyMessage?: string;
}

export function EmployeesTable({ 
  employees, 
  emptyMessage = "No employees found." 
}: EmployeesTableProps) {
  // Define columns for the DataTable
  const columns = [
    {
      header: "Name",
      accessorKey: "name" as const
    },
    {
      header: "Department",
      accessorKey: "department" as const
    },
    {
      header: "Employment Type",
      accessorKey: "employmentType" as const
    },
    {
      header: "Weekly Hours",
      accessorKey: "weeklyCommittedHours" as const
    },
    {
      header: "Start Date",
      cell: (employee: Employee) => (
        employee.startDate 
          ? format(new Date(employee.startDate), 'MM/dd/yyyy') 
          : '-'
      )
    },
    {
      header: "Status",
      cell: (employee: Employee) => (
        <StatusBadge status={employee.isActive ? "active" : "inactive"}>
          {employee.isActive ? "Active" : "Inactive"}
        </StatusBadge>
      )
    },
    {
      header: "Actions",
      cell: (employee: Employee) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/employees/${employee.id}`} className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </Button>
      )
    }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <DataTable
        data={employees}
        columns={columns}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
