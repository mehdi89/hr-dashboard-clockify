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
  onDateClick?: (date: string) => void;
  onEmployeeClick?: (employeeId: number) => void;
  onProjectClick?: (project: string) => void;
  onClientClick?: (client: string) => void;
}

export function TimeEntriesTable({ 
  entries, 
  emptyMessage = "No time entries found with the current filters.",
  onDateClick,
  onEmployeeClick,
  onProjectClick,
  onClientClick
}: TimeEntriesTableProps) {
  // Define columns for the DataTable
  const columns = [
    {
      header: "Date",
      accessorKey: "date" as const,
      cell: (entry: TimeEntryWithEmployee) => (
        <button 
          onClick={onDateClick ? () => onDateClick(entry.date) : undefined}
          className={`text-left ${onDateClick ? 'hover:underline text-primary' : ''}`}
          disabled={!onDateClick}
          type="button"
        >
          {format(new Date(entry.date), 'MM/dd/yyyy')}
        </button>
      ),
      minWidth: 100
    },
    {
      header: "Employee",
      accessorKey: "employeeName" as const,
      cell: (entry: TimeEntryWithEmployee) => (
        <button 
          onClick={onEmployeeClick ? () => onEmployeeClick(entry.employeeId) : undefined}
          className={`text-left ${onEmployeeClick ? 'hover:underline text-primary' : ''}`}
          disabled={!onEmployeeClick}
          type="button"
        >
          {entry.employeeName}
        </button>
      ),
      minWidth: 120
    },
    {
      header: "Project",
      accessorKey: "project" as const,
      cell: (entry: TimeEntryWithEmployee) => (
        <button 
          onClick={onProjectClick ? () => onProjectClick(entry.project) : undefined}
          className={`text-left ${onProjectClick ? 'hover:underline text-primary' : ''}`}
          disabled={!onProjectClick}
          type="button"
        >
          {entry.project}
        </button>
      ),
      minWidth: 120
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
      ),
      minWidth: 150,
      hideOnMobile: true
    },
    
    {
      header: "Hours",
      cell: (entry: TimeEntryWithEmployee) => (
        entry.durationDecimal ? 
          `${Number(entry.durationDecimal).toFixed(2)}` : 
          "-"
      ),
      minWidth: 70
    },
    {
      header: "Start",
      cell: (entry: TimeEntryWithEmployee) => {
        if (!entry.startTime) return "-";
        try {
          const startTimeDate = new Date(entry.startTime);
          return format(startTimeDate, 'HH:mm');
        } catch (error) {
          console.error("Error formatting start time:", error);
          return "-";
        }
      },
      hideOnMobile: true
    },
    {
      header: "End",
      cell: (entry: TimeEntryWithEmployee) => {
        if (!entry.endTime) return "-";
        try {
          const endTimeDate = new Date(entry.endTime);
          return format(endTimeDate, 'HH:mm');
        } catch (error) {
          console.error("Error formatting end time:", error);
          return "-";
        }
      },
      hideOnMobile: true
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
      ),
      minWidth: 100
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
