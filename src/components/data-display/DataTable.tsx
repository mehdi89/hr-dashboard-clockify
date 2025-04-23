"use client";

import React, { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Column<T extends Record<string, any>> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
  // Optional minimum width for the column
  minWidth?: number;
  // Optional hide on mobile flag
  hideOnMobile?: boolean;
}

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  emptyMessage = "No data available",
  className,
}: DataTableProps<T>) {
  // Pre-process the data to add unique IDs if needed
  const processedData = data.map((item, index) => {
    if (!('id' in item)) {
      return { ...item, id: `row-${index}` };
    }
    return item;
  });

  // Render cell content based on accessorKey or cell function
  const renderCell = (item: T, column: Column<T>): ReactNode => {
    if (column.cell) {
      return column.cell(item);
    }
    
    if (column.accessorKey) {
      const value = item[column.accessorKey];
      // Convert the value to a string or ReactNode
      if (value === null || value === undefined) {
        return '-';
      }
      
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
      }
      
      return String(value);
    }
    
    return null;
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader className="px-4 sm:px-6">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="px-2 sm:px-6">
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden overflow-x-auto">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead 
                      key={index}
                      className={cn(
                        column.className,
                        column.hideOnMobile && "hidden sm:table-cell",
                        column.minWidth && `min-w-[${column.minWidth}px]`
                      )}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.map((item, rowIndex) => (
                  <TableRow key={item.id || rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell 
                        key={`${rowIndex}-${colIndex}`}
                        className={cn(
                          column.className,
                          column.hideOnMobile && "hidden sm:table-cell",
                          "whitespace-nowrap sm:whitespace-normal"
                        )}
                      >
                        {renderCell(item, column)}
                      </TableCell>
                    ))}
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
