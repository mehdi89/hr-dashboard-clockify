"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { EmployeeProjectDistribution } from "../actions";

interface ProjectWorkloadDistributionProps {
  data: EmployeeProjectDistribution[];
}

// Colorful palette for the chart
const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#ec4899'];

export function ProjectWorkloadDistribution({ data }: ProjectWorkloadDistributionProps) {
  const chartData = useMemo(() => {
    // Group data by employee
    const employeeMap = new Map<number, { name: string, totalHours: number, projects: Record<string, number> }>();
    
    data.forEach(item => {
      if (!employeeMap.has(item.employeeId)) {
        employeeMap.set(item.employeeId, {
          name: item.employeeName,
          totalHours: 0,
          projects: {}
        });
      }
      
      const employee = employeeMap.get(item.employeeId)!;
      employee.totalHours += item.totalHours;
      employee.projects[item.project] = item.totalHours;
    });
    
    // Get top 5 projects by total hours
    const projectTotals = new Map<string, number>();
    data.forEach(item => {
      const current = projectTotals.get(item.project) || 0;
      projectTotals.set(item.project, current + item.totalHours);
    });
    
    const topProjects = Array.from(projectTotals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([project]) => project);
    
    // Format data for the chart
    return Array.from(employeeMap.values())
      .sort((a, b) => b.totalHours - a.totalHours)
      .slice(0, 8) // Take top 8 employees by hours
      .map(employee => {
        const result: any = { name: employee.name };
        
        // Add hours for top projects
        topProjects.forEach(project => {
          result[project] = employee.projects[project] || 0;
        });
        
        // Add total hours
        result.total = employee.totalHours;
        
        return result;
      });
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Workload Distribution</CardTitle>
        <CardDescription>
          How work is distributed across team members
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={60}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: any, name, props) => {
                    if (name === 'total') return null;
                    return [`${Number(value).toFixed(2)} hours`, name];
                  }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      // Filter out the 'total' key
                      const filteredPayload = payload.filter(p => p.dataKey !== 'total');
                      
                      if (filteredPayload.length === 0) return null;
                      
                      return (
                        <div className="bg-background p-2 border rounded shadow-sm">
                          <p className="font-bold">{label}</p>
                          {filteredPayload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {Number(entry.value).toFixed(2)} hours
                            </p>
                          ))}
                          <p className="font-medium mt-1">
                            Total: {Number(payload.find(p => p.dataKey === 'total')?.value || 0).toFixed(2)} hours
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                {useMemo(() => {
                  const topProjects = Object.keys(chartData[0] || {})
                    .filter(key => key !== 'name' && key !== 'total');
                  
                  return topProjects.map((project, index) => (
                    <Bar 
                      key={project}
                      dataKey={project}
                      stackId="a"
                      fill={COLORS[index % COLORS.length]}
                      name={project}
                    />
                  ));
                }, [chartData])}
              </BarChart>
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
