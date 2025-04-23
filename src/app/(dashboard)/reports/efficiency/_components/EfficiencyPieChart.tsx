"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { EmployeeEfficiency } from "../actions";

interface EfficiencyPieChartProps {
  data: EmployeeEfficiency[];
}

const COLORS = ['#ef4444', '#f97316', '#22c55e', '#3b82f6'];
const EFFICIENCY_CATEGORIES = ["Low", "Medium", "Good", "High"];

export function EfficiencyPieChart({ data }: EfficiencyPieChartProps) {
  const chartData = useMemo(() => {
    // Group employees by efficiency category
    const categories = data.reduce((acc, employee) => {
      let category;
      if (employee.efficiency < 70) {
        category = "Low";
      } else if (employee.efficiency < 90) {
        category = "Medium";
      } else if (employee.efficiency < 110) {
        category = "Good";
      } else {
        category = "High";
      }

      const existingCategory = acc.find(item => item.name === category);
      if (existingCategory) {
        existingCategory.value += employee.totalHours;
        existingCategory.employees.push(employee.employeeName);
      } else {
        acc.push({
          name: category,
          value: employee.totalHours,
          employees: [employee.employeeName]
        });
      }
      return acc;
    }, [] as any[]);

    // Sort by category order
    return categories.sort((a, b) => {
      return EFFICIENCY_CATEGORIES.indexOf(a.name) - EFFICIENCY_CATEGORIES.indexOf(b.name);
    });
  }, [data]);

  const totalHours = useMemo(() => {
    return data.reduce((sum, employee) => sum + employee.totalHours, 0);
  }, [data]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Efficiency Distribution</CardTitle>
        <CardDescription>
          Employee efficiency categorization
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
                          <p className="text-xs mt-1">Employees: {data.employees.join(", ")}</p>
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
