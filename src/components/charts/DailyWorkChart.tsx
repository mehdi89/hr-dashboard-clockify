"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDateRange } from "@/contexts/DateRangeContext";
import { format } from "date-fns";

type DailyWorkChartProps = {
  data: {
    date: string;
    totalHours: number;
    employeesCount: number;
  }[];
};

export function DailyWorkChart({ data }: DailyWorkChartProps) {
  const { dateRange } = useDateRange();

  const chartData = useMemo(() => {
    return data.map(day => ({
      date: format(new Date(day.date), "MMM dd"),
      hours: day.totalHours,
      employees: day.employeesCount,
      avgHoursPerEmployee: day.employeesCount > 0 
        ? Number((day.totalHours / day.employeesCount).toFixed(1)) 
        : 0
    }));
  }, [data]);

  const dateRangeText = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
  }, [dateRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Work Distribution</CardTitle>
        <CardDescription>
          Hours tracked per day {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "hours") return [`${value} hours`, "Total Hours"];
                  if (name === "employees") return [value, "Employees Working"];
                  if (name === "avgHoursPerEmployee") return [`${value} hours`, "Avg Hours/Employee"];
                  return [value, name];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="hours" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="hours"
              />
              <Area 
                type="monotone" 
                dataKey="avgHoursPerEmployee" 
                stackId="2" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                name="avgHoursPerEmployee"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
