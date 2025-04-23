"use client";

import React from "react";
import { TableCell } from "@/components/ui/table";
import { format } from "date-fns";

interface DateCellProps {
  date: string;
  formatString?: string;
}

export function DateCell({ date, formatString = "MM/dd/yyyy" }: DateCellProps) {
  if (!date) return <TableCell>-</TableCell>;
  
  try {
    const formattedDate = format(new Date(date), formatString);
    return <TableCell>{formattedDate}</TableCell>;
  } catch (error) {
    console.error("Error formatting date:", error);
    return <TableCell>{date}</TableCell>;
  }
}
