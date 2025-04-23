"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from "recharts";
import { useDateRange } from "@/contexts/DateRangeContext";
import { format } from "date-fns";
import { DepartmentWorkload } from "../actions";

type DepartmentWorkloadChartProps = {
  data: DepartmentWorkload[];
};

// Custom colors for departments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

export function DepartmentWorkloadChart({ data }: DepartmentWorkloadChartProps) {
  const { dateRange } = useDateRange();
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);

  const chartData = useMemo(() => {
    // Sort by total hours descending
    return [...data]
      .sort((a, b) => b.totalHours - a.totalHours)
      .map(dept => ({
        name: dept.department,
        value: dept.totalHours,
        employees: dept.employeesCount,
        projects: dept.projectsCount,
        avgHoursPerEmployee: dept.employeesCount > 0 
          ? Number((dept.totalHours / dept.employeesCount).toFixed(1)) 
          : 0
      }));
  }, [data]);

  const dateRangeText = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  }, [dateRange]);

  const totalHours = useMemo(() => {
    return chartData.reduce((sum, dept) => sum + dept.value, 0);
  }, [chartData]);

  // Custom active shape for the pie chart
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    
    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill={fill} className="text-lg font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#999">
          {`${payload.value.toFixed(1)} hours (${(percent * 100).toFixed(1)}%)`}
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fill="#999">
          {`${payload.employees} employees, ${payload.projects} projects`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Workload Distribution</CardTitle>
        <CardDescription>
          Hours distribution by department {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
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
                          <p>{`${data.employees} employees, ${data.projects} projects`}</p>
                          <p>{`Avg: ${data.avgHoursPerEmployee.toFixed(1)} hours/employee`}</p>
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
              <p className="text-muted-foreground">No department data available</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>This chart shows workload distribution across departments, helping identify team balance and resource allocation.</p>
          <ul className="list-disc list-inside mt-2">
            <li>Balanced distribution indicates cross-functional collaboration</li>
            <li>Heavily skewed distribution may indicate resource allocation issues</li>
            <li>Compare employee count with hours to identify overloaded teams</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
