"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ProjectSummary } from "../actions";

interface ProjectDistributionPieChartProps {
  data: ProjectSummary[];
}

// Colorful palette for the pie chart
const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e', '#facc15', '#64748b', '#6366f1'];

export function ProjectDistributionPieChart({ data }: ProjectDistributionPieChartProps) {
  const chartData = useMemo(() => {
    // Sort projects by total hours and take top 9, group the rest as "Others"
    const sortedData = [...data].sort((a, b) => b.totalHours - a.totalHours);
    
    if (sortedData.length <= 9) {
      return sortedData.map(project => ({
        name: project.project,
        value: project.totalHours,
        employeesCount: project.employeesCount,
        entriesCount: project.entriesCount
      }));
    }
    
    // Take top 8 projects
    const topProjects = sortedData.slice(0, 8).map(project => ({
      name: project.project,
      value: project.totalHours,
      employeesCount: project.employeesCount,
      entriesCount: project.entriesCount
    }));
    
    // Group the rest as "Others"
    const otherProjects = sortedData.slice(8);
    const otherHours = otherProjects.reduce((sum, project) => sum + project.totalHours, 0);
    const otherEmployeesCount = new Set(otherProjects.flatMap(p => p.employeesCount)).size;
    const otherEntriesCount = otherProjects.reduce((sum, project) => sum + project.entriesCount, 0);
    
    topProjects.push({
      name: "Others",
      value: otherHours,
      employeesCount: otherEmployeesCount,
      entriesCount: otherEntriesCount
    });
    
    return topProjects;
  }, [data]);

  const totalHours = useMemo(() => {
    return data.reduce((sum, project) => sum + project.totalHours, 0);
  }, [data]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Distribution</CardTitle>
        <CardDescription>
          Time allocation across projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => {
                    const percentage = ((value as number) / totalHours * 100).toFixed(1);
                    return [`${value} hours (${percentage}%)`, name];
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background p-2 border rounded shadow-sm">
                          <p className="font-bold">{data.name}</p>
                          <p>{`${data.value.toFixed(2)} hours (${((data.value / totalHours) * 100).toFixed(1)}%)`}</p>
                          <p className="text-xs mt-1">Employees: {data.employeesCount}</p>
                          <p className="text-xs">Entries: {data.entriesCount}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
