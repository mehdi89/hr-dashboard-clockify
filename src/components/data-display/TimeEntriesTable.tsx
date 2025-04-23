"use client";

import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { DataTable } from "@/components/data-display/DataTable";

// Define the time entry type
export type TimeEntryWithEmployee = {
  id: number;
  date: string;
  project: string;
  client: string | null;
  description: string | null;
  task: string | null;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  hoursWorked: string;
  durationDecimal: number | null;
  employeeId: number;
  employeeName: string;
};

interface TimeEntriesTableProps {
  entries: TimeEntryWithEmployee[];
  emptyMessage?: string;
}

export function TimeEntriesTable({ 
  entries, 
  emptyMessage = "No time entries found with the current filters." 
}: TimeEntriesTableProps) {
  // Define columns for the DataTable
  const columns = [
    {
      header: "Date",
      accessorKey: "date" as const,
      cell: (entry: TimeEntryWithEmployee) => format(new Date(entry.date), 'MM/dd/yyyy')
    },
    {
      header: "Employee",
      accessorKey: "employeeName" as const
    },
    {
      header: "Project",
      accessorKey: "project" as const
    },
    {
      header: "Client",
      cell: (entry: TimeEntryWithEmployee) => entry.client || '-'
    },
    {
      header: "Description",
      cell: (entry: TimeEntryWithEmployee) => (
        <div className="max-w-xs truncate" title={entry.description || undefined}>
          {entry.description ? (
            <span className="line-clamp-1">{entry.description}</span>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      )
    },
    {
      header: "Task",
      cell: (entry: TimeEntryWithEmployee) => entry.task || '-'
    },
    {
      header: "Start",
      cell: (entry: TimeEntryWithEmployee) => (
        `${format(new Date(entry.startDate), 'MM/dd/yyyy')} ${entry.startTime}`
      )
    },
    {
      header: "End",
      cell: (entry: TimeEntryWithEmployee) => (
        `${format(new Date(entry.endDate), 'MM/dd/yyyy')} ${entry.endTime}`
      )
    },
    {
      header: "Hours",
      accessorKey: "hoursWorked" as const
    },
    {
      header: "Actions",
      cell: (entry: TimeEntryWithEmployee) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/time-entries/${entry.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
      )
    }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <DataTable
        data={entries}
        columns={columns}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
