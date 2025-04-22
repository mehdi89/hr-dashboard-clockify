"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useDateRange } from "@/contexts/DateRangeContext";

type EfficiencyChartProps = {
  data: {
    id: number;
    name: string;
    weeklyCommittedHours: number;
    actualHours: number;
  }[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function EfficiencyChart({ data }: EfficiencyChartProps) {
  const { dateRange } = useDateRange();

  const chartData = useMemo(() => {
    // Calculate efficiency for each employee
    const employeeEfficiency = data.map(employee => {
      const efficiency = Math.round((employee.actualHours / employee.weeklyCommittedHours) * 100);
      return {
        name: employee.name,
        value: employee.actualHours,
        efficiency,
        committed: employee.weeklyCommittedHours,
        // Categorize efficiency
        category: 
          efficiency < 70 ? "Low" :
          efficiency < 90 ? "Medium" :
          efficiency < 110 ? "Good" :
          "High"
      };
    });

    // Group by efficiency category
    const categories = employeeEfficiency.reduce((acc, curr) => {
      const existingCategory = acc.find(item => item.name === curr.category);
      if (existingCategory) {
        existingCategory.value += curr.value;
        existingCategory.employees.push(curr.name);
      } else {
        acc.push({
          name: curr.category,
          value: curr.value,
          employees: [curr.name]
        });
      }
      return acc;
    }, [] as any[]);

    return categories.sort((a, b) => {
      const order = ["Low", "Medium", "Good", "High"];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });
  }, [data]);

  const dateRangeText = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
  }, [dateRange]);

  const totalHours = useMemo(() => {
    return data.reduce((sum, employee) => sum + employee.actualHours, 0);
  }, [data]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
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
          Employee efficiency categorization {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
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
                      <div className="bg-white p-2 border rounded shadow-sm">
                        <p className="font-bold">{data.name}</p>
                        <p>{`${data.value} hours (${((data.value / totalHours) * 100).toFixed(1)}%)`}</p>
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
        </div>
      </CardContent>
    </Card>
  );
}
