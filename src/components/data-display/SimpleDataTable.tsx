"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { format } from "date-fns";

export type ColumnType = "text" | "date" | "status" | "action" | "custom";

export interface Column {
  header: string;
  accessorKey?: string;
  type?: ColumnType;
}

interface SimpleDataTableProps {
  data: Record<string, any>[];
  columns: Column[];
  title?: string;
  emptyMessage?: string;
}

export function SimpleDataTable({
  data,
  columns,
  title,
  emptyMessage = "No data available",
}: SimpleDataTableProps) {
  // Make sure we have Status and Actions columns
  const hasStatusColumn = columns.some(col => col.type === 'status');
  const hasActionColumn = columns.some(col => col.type === 'action');
  
  // Add Status and Actions columns if they don't exist
  const updatedColumns = [...columns];
  if (!hasStatusColumn) {
    updatedColumns.push({
      header: "Status",
      accessorKey: "isActive",
      type: "status"
    });
  }
  if (!hasActionColumn) {
    updatedColumns.push({
      header: "Actions",
      type: "action"
    });
  }

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden overflow-x-auto">
            <Table className="w-full min-w-full table-fixed">
              <TableHeader>
                <TableRow>
                  {updatedColumns.map((column, index) => (
                    <TableHead key={index}>{column.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, rowIndex) => (
                  <TableRow key={item.id || rowIndex}>
                    {updatedColumns.map((column, colIndex) => {
                      const key = column.accessorKey;
                      const value = key ? item[key] : null;
                      
                      if (column.type === 'date' && value) {
                        try {
                          const formattedDate = format(new Date(value), "MM/dd/yyyy");
                          return <TableCell key={colIndex}>{formattedDate}</TableCell>;
                        } catch (error) {
                          console.error("Error formatting date:", error);
                          return <TableCell key={colIndex}>{value}</TableCell>;
                        }
                      } else if (column.type === 'status') {
                        const isActive = Boolean(value);
                        return (
                          <TableCell key={colIndex}>
                            <StatusBadge status={isActive ? "active" : "inactive"}>
                              {isActive ? "Active" : "Inactive"}
                            </StatusBadge>
                          </TableCell>
                        );
                      } else if (column.type === 'action') {
                        return (
                          <TableCell key={colIndex}>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/employees/${item.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </Button>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={colIndex}>
                            {value === null || value === undefined ? '-' : String(value)}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
