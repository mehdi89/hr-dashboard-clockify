"use client";

import React from "react";
import { TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/data-display/StatusBadge";

type StatusType = "active" | "inactive" | "pending" | "error" | "warning" | "info";

interface StatusCellProps {
  status: boolean | string;
  labels?: {
    active?: string;
    inactive?: string;
  };
}

export function StatusCell({ 
  status, 
  labels = { active: "Active", inactive: "Inactive" } 
}: StatusCellProps) {
  // Convert boolean to string status
  let statusValue: StatusType;
  
  if (typeof status === 'boolean') {
    statusValue = status ? 'active' : 'inactive';
  } else if (
    status === 'active' || 
    status === 'inactive' || 
    status === 'pending' || 
    status === 'error' || 
    status === 'warning' || 
    status === 'info'
  ) {
    statusValue = status as StatusType;
  } else {
    // Default to info for unknown status values
    statusValue = 'info';
  }
  
  // Determine label based on status
  let label: string;
  if (statusValue === 'active' && labels.active) {
    label = labels.active;
  } else if (statusValue === 'inactive' && labels.inactive) {
    label = labels.inactive;
  } else {
    label = statusValue.charAt(0).toUpperCase() + statusValue.slice(1);
  }
  
  return (
    <TableCell>
      <StatusBadge status={statusValue}>
        {label}
      </StatusBadge>
    </TableCell>
  );
}
