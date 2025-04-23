"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie, Sector } from "recharts";
import { useDateRange } from "@/contexts/DateRangeContext";
import { format } from "date-fns";
import { DailyDistribution, EmployeeEngagement } from "../actions";

type RemoteWorkInsightsProps = {
  dailyData: DailyDistribution[];
  employeeData: EmployeeEngagement[];
};

export function RemoteWorkInsightsChart({ dailyData, employeeData }: RemoteWorkInsightsProps) {
  const { dateRange } = useDateRange();

  // Calculate work hour distribution (early, core, late hours)
  const workHourDistribution = useMemo(() => {
    // Group entries by time of day
    const earlyHours = { name: 'Early (5-9 AM)', value: 0, color: '#8884d8' };
    const coreHours = { name: 'Core (9-5 PM)', value: 0, color: '#82ca9d' };
    const lateHours = { name: 'Late (5-11 PM)', value: 0, color: '#ffc658' };
    const nightHours = { name: 'Night (11PM-5AM)', value: 0, color: '#ff8042' };

    // For this demo, we'll generate some sample data
    // In a real implementation, this would be calculated from actual time entries
    earlyHours.value = Math.round(Math.random() * 20 + 10);
    coreHours.value = Math.round(Math.random() * 40 + 50);
    lateHours.value = Math.round(Math.random() * 20 + 15);
    nightHours.value = Math.round(Math.random() * 10 + 5);

    return [earlyHours, coreHours, lateHours, nightHours];
  }, []);

  // Calculate collaboration metrics
  const collaborationMetrics = useMemo(() => {
    // For this demo, we'll generate some sample data
    return [
      { name: 'Overlap Hours', value: Math.round(Math.random() * 3 + 2) },
      { name: 'Async Communication', value: Math.round(Math.random() * 20 + 70) },
      { name: 'Real-time Collaboration', value: Math.round(Math.random() * 20 + 30) },
    ];
  }, []);

  // Calculate work-life balance metrics
  const workLifeBalanceMetrics = useMemo(() => {
    // Calculate metrics based on employee engagement data
    const metrics = [
      { name: 'Weekend Work', value: 0 },
      { name: 'After Hours', value: 0 },
      { name: 'Consistent Schedule', value: 0 },
      { name: 'Break Frequency', value: 0 },
    ];

    // Calculate weekend work percentage
    const weekendDays = dailyData.filter(day => 
      day.dayOfWeek === 'Saturday' || day.dayOfWeek === 'Sunday'
    );
    
    const weekendHours = weekendDays.reduce((sum, day) => sum + day.totalHours, 0);
    const totalHours = dailyData.reduce((sum, day) => sum + day.totalHours, 0);
    
    metrics[0].value = totalHours > 0 ? Math.round((weekendHours / totalHours) * 100) : 0;
    
    // For demo purposes, generate other metrics
    metrics[1].value = Math.round(Math.random() * 30 + 10); // After hours percentage
    metrics[2].value = Math.round(Math.random() * 40 + 50); // Consistency score
    metrics[3].value = Math.round(Math.random() * 20 + 70); // Break frequency score

    return metrics;
  }, [dailyData]);

  // Calculate time zone distribution
  const timeZoneDistribution = useMemo(() => {
    // For this demo, we'll generate some sample data
    return [
      { name: 'UTC-8 to UTC-5 (Americas)', value: Math.round(Math.random() * 5 + 3), color: '#8884d8' },
      { name: 'UTC-1 to UTC+2 (Europe/Africa)', value: Math.round(Math.random() * 5 + 4), color: '#82ca9d' },
      { name: 'UTC+3 to UTC+6 (Middle East/Asia)', value: Math.round(Math.random() * 5 + 6), color: '#ffc658' },
      { name: 'UTC+7 to UTC+12 (Asia/Pacific)', value: Math.round(Math.random() * 5 + 2), color: '#ff8042' },
    ];
  }, []);

  const dateRangeText = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  }, [dateRange]);

  // Active index for pie chart animation
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Render active shape for pie chart
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} team members`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Remote Work Insights</CardTitle>
        <CardDescription>
          Key metrics for managing distributed teams {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Zone Distribution */}
          <div className="h-[300px]">
            <h3 className="text-sm font-medium mb-2">Time Zone Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={timeZoneDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {timeZoneDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Work Hour Distribution */}
          <div className="h-[300px]">
            <h3 className="text-sm font-medium mb-2">Work Hour Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={workHourDistribution}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: '% of Work Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Bar dataKey="value" name="% of Work Hours">
                  {workHourDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Work-Life Balance Metrics */}
          <div className="h-[300px]">
            <h3 className="text-sm font-medium mb-2">Work-Life Balance Metrics</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={workLifeBalanceMetrics}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                <Bar dataKey="value" fill="#8884d8" name="Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Collaboration Metrics */}
          <div className="h-[300px]">
            <h3 className="text-sm font-medium mb-2">Collaboration Metrics</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={collaborationMetrics}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip formatter={(value, name, props) => {
                  if (props.dataKey === "value" && props.name === "Overlap Hours") {
                    return [`${value} hours`, 'Average Daily'];
                  }
                  return [`${value}%`, 'Score'];
                }} />
                <Bar dataKey="value" fill="#82ca9d" name="Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>These insights help management and HR understand remote team dynamics:</p>
          <ul className="list-disc list-inside mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>Time zone distribution shows where your team is located globally</li>
            <li>Work hour patterns reveal when your team is most active</li>
            <li>Work-life balance metrics help identify potential burnout risks</li>
            <li>Collaboration metrics show how effectively the team works together</li>
            <li>Weekend work percentage may indicate workload issues</li>
            <li>Overlap hours show when most team members are available simultaneously</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
