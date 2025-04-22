"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { useDateRange } from "@/contexts/DateRangeContext";

type EmployeeCommitmentChartProps = {
  data: {
    id: number;
    name: string;
    weeklyCommittedHours: number;
    actualHours: number;
  }[];
};

export function EmployeeCommitmentChart({ data }: EmployeeCommitmentChartProps) {
  const { dateRange } = useDateRange();

  const chartData = useMemo(() => {
    return data.map(employee => ({
      name: employee.name,
      committed: employee.weeklyCommittedHours,
      actual: employee.actualHours,
      difference: employee.actualHours - employee.weeklyCommittedHours,
      efficiency: Math.round((employee.actualHours / employee.weeklyCommittedHours) * 100)
    }));
  }, [data]);

  const dateRangeText = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
  }, [dateRange]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Employee Commitment</CardTitle>
        <CardDescription>
          Comparing committed hours vs. actual hours worked {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                interval={0}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "efficiency") return [`${value}%`, "Efficiency"];
                  return [value, name === "committed" ? "Committed Hours" : name === "actual" ? "Actual Hours" : "Difference"];
                }}
              />
              <Legend />
              <Bar dataKey="committed" name="Committed Hours" fill="#8884d8" />
              <Bar dataKey="actual" name="Actual Hours" fill="#82ca9d">
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.difference >= 0 ? "#82ca9d" : "#ff8042"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
