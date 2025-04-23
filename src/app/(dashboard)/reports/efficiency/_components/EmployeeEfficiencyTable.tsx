"use client";

import React from "react";
import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { EmployeeEfficiency } from "../actions";
import { Badge } from "@/components/ui/badge";

interface EmployeeEfficiencyTableProps {
  data: EmployeeEfficiency[];
}

export function EmployeeEfficiencyTable({ data }: EmployeeEfficiencyTableProps) {
  // Function to determine efficiency status and color
  const getEfficiencyStatus = (efficiency: number) => {
    if (efficiency < 70) {
      return { label: "Low", color: "destructive" };
    } else if (efficiency < 90) {
      return { label: "Medium", color: "warning" };
    } else if (efficiency < 110) {
      return { label: "Good", color: "success" };
    } else {
      return { label: "High", color: "blue" };
    }
  };

  return (
    <div className="rounded-md border overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead className="text-right">Committed Hours</TableHead>
            <TableHead className="text-right">Actual Hours</TableHead>
            <TableHead className="text-right">Efficiency</TableHead>
            <TableHead className="text-right">Entries</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No employee data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((employee) => {
              const efficiencyStatus = getEfficiencyStatus(employee.efficiency);
              
              // Calculate committed hours for the period
              const start = new Date();
              const end = new Date();
              const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
              const weeks = daysDiff / 7;
              const committedHoursForPeriod = employee.weeklyCommittedHours * weeks;
              
              return (
                <TableRow key={employee.employeeId}>
                  <TableCell className="font-medium">
                    <Link href={`/employees/${employee.employeeId}`} className="hover:underline">
                      {employee.employeeName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">{employee.weeklyCommittedHours.toFixed(2)}/week</TableCell>
                  <TableCell className="text-right">{employee.totalHours.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={efficiencyStatus.color as any}>
                      {employee.efficiency.toFixed(0)}% ({efficiencyStatus.label})
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{employee.entriesCount}</TableCell>
                  <TableCell className="text-right">
                    <Link 
                      href={`/employees/${employee.employeeId}`} 
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
