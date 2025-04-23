"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ProjectSummary } from "../actions";

interface ProjectTimelineChartProps {
  data: ProjectSummary[];
}

export function ProjectTimelineChart({ data }: ProjectTimelineChartProps) {
  const chartData = useMemo(() => {
    // Sort projects by total hours
    const topProjects = [...data]
      .sort((a, b) => b.totalHours - a.totalHours)
      .slice(0, 5); // Take top 5 projects for better visualization
    
    // Create a map of project timelines
    const projectTimelines = topProjects.map(project => {
      return {
        project: project.project,
        startDate: new Date(project.firstWorked),
        endDate: new Date(project.lastWorked),
        totalHours: project.totalHours,
        avgHoursPerDay: project.avgHoursPerDay
      };
    });
    
    return projectTimelines;
  }, [data]);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>
          Activity periods for top projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] overflow-y-auto pr-1">
          {chartData.length > 0 ? (
            <div className="space-y-4">
              {chartData.map((project, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="font-medium truncate max-w-[200px]" title={project.project}>
                      {project.project}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.totalHours.toFixed(1)} hrs
                    </div>
                  </div>
                  <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground"
                      style={{ 
                        width: '100%',
                        opacity: 0.2
                      }}
                    />
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground"
                      style={{ 
                        width: `${Math.min(100, project.avgHoursPerDay * 20)}%`
                      }}
                    >
                      {project.avgHoursPerDay.toFixed(1)}/day
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div>{formatDate(project.startDate)}</div>
                    <div>{formatDate(project.endDate)}</div>
                  </div>
                </div>
              ))}
            </div>
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
