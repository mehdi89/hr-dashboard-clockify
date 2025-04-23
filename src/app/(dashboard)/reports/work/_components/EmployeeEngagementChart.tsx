"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { useDateRange } from "@/contexts/DateRangeContext";
import { format } from "date-fns";
import { EmployeeEngagement } from "../actions";

type EmployeeEngagementChartProps = {
  data: EmployeeEngagement[];
};

export function EmployeeEngagementChart({ data }: EmployeeEngagementChartProps) {
  const { dateRange } = useDateRange();

  const chartData = useMemo(() => {
    // Sort by total hours descending and take top 10
    return [...data]
      .sort((a, b) => b.totalHours - a.totalHours)
      .slice(0, 10)
      .map(employee => ({
        name: employee.employeeName || 'Unknown',
        hours: employee.totalHours,
        days: employee.daysWorked,
        avgHours: employee.averageHoursPerDay,
        consistency: employee.consistency,
      }));
  }, [data]);

  const dateRangeText = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  }, [dateRange]);

  // Function to determine bar color based on consistency score
  const getConsistencyColor = (consistency: number) => {
    if (consistency >= 80) return "#4CAF50"; // High consistency - green
    if (consistency >= 60) return "#8BC34A"; // Good consistency - light green
    if (consistency >= 40) return "#FFC107"; // Medium consistency - yellow
    if (consistency >= 20) return "#FF9800"; // Low consistency - orange
    return "#F44336"; // Very low consistency - red
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Engagement Metrics</CardTitle>
        <CardDescription>
          Work consistency and engagement patterns {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={60}
                  tickFormatter={(value) => {
                    // Truncate long names
                    return value.length > 10 ? `${value.substring(0, 10)}...` : value;
                  }}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === "hours") return [`${value} hours`, "Total Hours"];
                    if (name === "days") return [`${value} days`, "Days Worked"];
                    if (name === "avgHours") return [`${Number(value).toFixed(1)} hours/day`, "Average Daily Hours"];
                    if (name === "consistency") return [`${Number(value).toFixed(0)}%`, "Work Consistency"];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Employee: ${label}`}
                />
                <Legend />
                <Bar 
                  dataKey="hours" 
                  fill="#8884d8" 
                  name="hours"
                  barSize={20}
                />
                <Bar 
                  dataKey="consistency" 
                  name="consistency"
                  barSize={20}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getConsistencyColor(entry.consistency)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No employee engagement data available</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>This chart shows employee engagement metrics, helping identify work patterns and potential issues.</p>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-1"></div>
              <span>High consistency (80-100%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#FFC107] mr-1"></div>
              <span>Medium consistency (40-60%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#F44336] mr-1"></div>
              <span>Low consistency (0-20%)</span>
            </div>
          </div>
          <ul className="list-disc list-inside mt-2">
            <li>High consistency indicates regular, predictable work patterns</li>
            <li>Low consistency may indicate irregular schedules or potential burnout</li>
            <li>Compare hours with consistency to identify potential issues</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
