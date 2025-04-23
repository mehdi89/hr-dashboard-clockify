"use client";

import React from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ProjectEfficiency } from "../actions";

interface ProjectEfficiencyTableProps {
  data: ProjectEfficiency[];
  totalHours: number;
}

export function ProjectEfficiencyTable({ data, totalHours }: ProjectEfficiencyTableProps) {
  return (
    <div className="rounded-md border overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead className="text-right">Total Hours</TableHead>
            <TableHead className="text-right">% of Total</TableHead>
            <TableHead className="text-right">Average Hours/Entry</TableHead>
            <TableHead className="text-right">Employees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No project data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((project) => {
              const avgHoursPerEntry = Number(project.entriesCount) > 0 
                ? Number(project.totalHours) / Number(project.entriesCount)
                : 0;
              
              const percentOfTotal = totalHours > 0
                ? (Number(project.totalHours) / totalHours) * 100
                : 0;
              
              return (
                <TableRow key={project.project}>
                  <TableCell className="font-medium">{project.project}</TableCell>
                  <TableCell className="text-right">{Number(project.totalHours).toFixed(2)}</TableCell>
                  <TableCell className="text-right">{percentOfTotal.toFixed(1)}%</TableCell>
                  <TableCell className="text-right">{avgHoursPerEntry.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{project.employeesCount}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
