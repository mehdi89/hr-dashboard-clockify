"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDateRange } from "@/contexts/DateRangeContext";
import { format } from "date-fns";
import { TimeOfDayDistribution } from "../actions";

type TimeOfDayHeatmapProps = {
  data: TimeOfDayDistribution[];
};

export function TimeOfDayHeatmap({ data }: TimeOfDayHeatmapProps) {
  const { dateRange } = useDateRange();

  const chartData = useMemo(() => {
    // Create a 24-hour array with 0 values for any missing hours
    const hourData = Array(24).fill(null).map((_, hour) => {
      const hourEntry = data.find(entry => entry.hour === hour);
      return {
        hour,
        totalHours: hourEntry?.totalHours || 0,
        entriesCount: hourEntry?.entriesCount || 0,
        employeesCount: hourEntry?.employeesCount || 0,
      };
    });
    
    return hourData;
  }, [data]);

  const dateRangeText = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  }, [dateRange]);

  // Calculate max values for color intensity
  const maxHours = useMemo(() => {
    return Math.max(...chartData.map(h => h.totalHours));
  }, [chartData]);

  const maxEmployees = useMemo(() => {
    return Math.max(...chartData.map(h => h.employeesCount));
  }, [chartData]);

  // Function to get color intensity based on value
  const getHeatColor = (value: number, max: number) => {
    if (max === 0) return 'bg-gray-100';
    
    const intensity = Math.min(1, value / max);
    
    // Color scale from light blue to dark blue
    if (intensity < 0.2) return 'bg-blue-50';
    if (intensity < 0.4) return 'bg-blue-100';
    if (intensity < 0.6) return 'bg-blue-200';
    if (intensity < 0.8) return 'bg-blue-300';
    return 'bg-blue-400';
  };

  // Function to format hour as AM/PM
  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Hours Distribution by Time of Day</CardTitle>
        <CardDescription>
          When employees are most active {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-1">
            {chartData.map((hourData) => (
              <div 
                key={hourData.hour}
                className={`aspect-square rounded ${getHeatColor(hourData.totalHours, maxHours)} flex items-center justify-center text-xs font-medium relative group`}
              >
                <span className="text-gray-700">{hourData.hour}</span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-background border rounded shadow-sm p-2 z-10 w-48">
                  <p className="font-bold">{formatHour(hourData.hour)}</p>
                  <p>{`${hourData.totalHours.toFixed(1)} hours logged`}</p>
                  <p>{`${hourData.entriesCount} entries`}</p>
                  <p>{`${hourData.employeesCount} employees active`}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm">12 AM</div>
            <div className="text-sm">6 AM</div>
            <div className="text-sm">12 PM</div>
            <div className="text-sm">6 PM</div>
            <div className="text-sm">11 PM</div>
          </div>
          
          {/* Color legend */}
          <div className="flex items-center space-x-2">
            <div className="text-sm">Intensity:</div>
            <div className="flex">
              <div className="w-6 h-6 bg-blue-50"></div>
              <div className="w-6 h-6 bg-blue-100"></div>
              <div className="w-6 h-6 bg-blue-200"></div>
              <div className="w-6 h-6 bg-blue-300"></div>
              <div className="w-6 h-6 bg-blue-400"></div>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Low</span> to <span className="text-gray-700">High</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>This heatmap shows when employees are most active throughout the day, helping understand work schedules in remote settings.</p>
            <ul className="list-disc list-inside mt-2">
              <li>Identify core working hours when most team members are available</li>
              <li>Spot potential timezone differences in distributed teams</li>
              <li>Recognize after-hours work patterns that may indicate workload issues</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
