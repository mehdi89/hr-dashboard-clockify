"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useDateRange } from "@/contexts/DateRangeContext";
import { format } from "date-fns";
import { DailyDistribution } from "../actions";

type DailyWorkPatternChartProps = {
  data: DailyDistribution[];
};

export function DailyWorkPatternChart({ data }: DailyWorkPatternChartProps) {
  const { dateRange } = useDateRange();

  const chartData = useMemo(() => {
    // Sort data by date (ascending)
    const sortedData = [...data].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    return sortedData.map(day => ({
      date: format(new Date(day.date), "MMM dd"),
      hours: day.totalHours,
      employees: day.employeesCount,
      projects: day.projectsCount,
      dayOfWeek: day.dayOfWeek,
      average: day.averageForDay,
      // Calculate variance from average
      variance: day.totalHours - day.averageForDay,
    }));
  }, [data]);

  const dateRangeText = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  }, [dateRange]);

  // Calculate max value for Y axis scaling
  const maxValue = useMemo(() => {
    const maxHours = Math.max(...chartData.map(d => d.hours));
    const maxEmployees = Math.max(...chartData.map(d => d.employees));
    return Math.max(maxHours, maxEmployees) * 1.2; // Add 20% padding
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Work Pattern</CardTitle>
        <CardDescription>
          Work hours distribution across days {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value, index) => {
                  // Show day of week with date
                  const dayData = chartData[index];
                  return dayData ? `${value} (${dayData.dayOfWeek.slice(0, 3)})` : value;
                }}
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "hours") return [`${value} hours`, "Total Hours"];
                  if (name === "employees") return [value, "Employees Working"];
                  if (name === "projects") return [value, "Projects Active"];
                  if (name === "average") return [`${Number(value).toFixed(2)} hours`, "Day Average"];
                  if (name === "variance") {
                    const num = Number(value);
                    const sign = num >= 0 ? "+" : "";
                    return [`${sign}${num.toFixed(2)} hours`, "Variance from Average"];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => {
                  const item = chartData.find(d => d.date === label);
                  return item ? `${label} (${item.dayOfWeek})` : label;
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="hours" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                yAxisId="left"
                name="hours"
              />
              <Area 
                type="monotone" 
                dataKey="average" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.2}
                yAxisId="left"
                name="average"
                strokeDasharray="5 5"
              />
              <Area 
                type="monotone" 
                dataKey="employees" 
                stroke="#ffc658" 
                fill="#ffc658" 
                fillOpacity={0.4}
                yAxisId="right"
                name="employees"
              />
              <Area 
                type="monotone" 
                dataKey="projects" 
                stroke="#ff8042" 
                fill="#ff8042" 
                fillOpacity={0.3}
                yAxisId="right"
                name="projects"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>This chart shows daily work patterns, helping identify potential burnout risks and work distribution issues.</p>
          <ul className="list-disc list-inside mt-2">
            <li>Consistent hours across weekdays indicate balanced workload</li>
            <li>Spikes may indicate deadline pressure or overwork</li>
            <li>Weekend work patterns can reveal work-life balance issues</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
