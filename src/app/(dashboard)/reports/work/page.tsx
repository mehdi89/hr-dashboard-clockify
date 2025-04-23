"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowLeft, BarChart, TrendingDown, TrendingUp } from "lucide-react";
import { DateRangeProvider, useDateRange } from "@/contexts/DateRangeContext";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { fetchWorkReportData, WorkReportData } from "./actions";
import { DailyWorkPatternChart } from "./_components/DailyWorkPatternChart";
import { DepartmentWorkloadChart } from "./_components/DepartmentWorkloadChart";
import { EmployeeEngagementChart } from "./_components/EmployeeEngagementChart";
import { TimeOfDayHeatmap } from "./_components/TimeOfDayHeatmap";
import { RemoteWorkInsightsChart } from "./_components/RemoteWorkInsightsChart";

function WorkReportContent() {
  const { dateRange } = useDateRange();
  const [data, setData] = useState<WorkReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      if (dateRange?.from && dateRange?.to) {
        setLoading(true);
        try {
          const startDate = dateRange.from.toISOString().split('T')[0];
          const endDate = dateRange.to.toISOString().split('T')[0];
          
          const workReportData = await fetchWorkReportData(startDate, endDate);
          setData(workReportData);
        } catch (error) {
          console.error("Error fetching work report data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadData();
  }, [dateRange]);

  // Function to render trend indicator
  const renderTrend = (current: number, previous: number | undefined) => {
    if (previous === undefined || previous === 0) return null;
    
    const percentChange = ((current - previous) / previous) * 100;
    
    if (Math.abs(percentChange) < 1) return null; // No significant change
    
    if (percentChange > 0) {
      return (
        <span className="text-green-500 flex items-center text-xs ml-2">
          <TrendingUp className="h-3 w-3 mr-1" />
          {percentChange.toFixed(1)}%
        </span>
      );
    } else {
      return (
        <span className="text-red-500 flex items-center text-xs ml-2">
          <TrendingDown className="h-3 w-3 mr-1" />
          {Math.abs(percentChange).toFixed(1)}%
        </span>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart className="h-8 w-8" />
            Work Report
          </h1>
          <p className="text-muted-foreground">
            Comprehensive breakdown of work activities and time distribution
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/reports">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Link>
        </Button>
      </div>

      <DateRangePicker showCard title="Select Date Range" />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data ? data.totalHours.toFixed(2) : "0.00"}</div>
                <p className="text-xs text-muted-foreground">
                  Hours tracked across all entries
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data ? data.totalEntries : "0"}</div>
                <p className="text-xs text-muted-foreground">
                  Number of time entries recorded
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data ? data.uniqueProjects : "0"}</div>
                <p className="text-xs text-muted-foreground">
                  Different projects worked on
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data ? data.uniqueEmployees : "0"}</div>
                <p className="text-xs text-muted-foreground">
                  Team members with tracked time
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visualization Charts */}
          {/* Remote Work Insights - New component for remote team analytics */}
          {data && <RemoteWorkInsightsChart 
            dailyData={data.dailyDistribution} 
            employeeData={data.employeeEngagement} 
          />}

          <div className="grid gap-6 md:grid-cols-2">
            {data && <DailyWorkPatternChart data={data.dailyDistribution} />}
            {data && <DepartmentWorkloadChart data={data.departmentWorkload} />}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {data && <EmployeeEngagementChart data={data.employeeEngagement} />}
            {data && <TimeOfDayHeatmap data={data.timeOfDayDistribution} />}
          </div>

          {/* Daily Distribution Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Work Distribution</CardTitle>
              <CardDescription>
                Breakdown of work hours by day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead className="text-right">Avg. for Day</TableHead>
                    <TableHead className="text-right">Entries</TableHead>
                    <TableHead className="text-right">Employees</TableHead>
                    <TableHead className="text-right">Projects</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!data || data.dailyDistribution.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No daily data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.dailyDistribution.map((day) => (
                      <TableRow key={day.date}>
                        <TableCell className="font-medium">{new Date(day.date).toLocaleDateString()}</TableCell>
                        <TableCell>{day.dayOfWeek}</TableCell>
                        <TableCell className="text-right">{day.totalHours.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {day.averageForDay.toFixed(2)}
                          {day.totalHours > day.averageForDay ? (
                            <span className="text-green-500 ml-1">↑</span>
                          ) : day.totalHours < day.averageForDay ? (
                            <span className="text-red-500 ml-1">↓</span>
                          ) : null}
                        </TableCell>
                        <TableCell className="text-right">{day.entriesCount}</TableCell>
                        <TableCell className="text-right">{day.employeesCount}</TableCell>
                        <TableCell className="text-right">{day.projectsCount}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Project Distribution Table */}
          <Card>
            <CardHeader>
              <CardTitle>Project Distribution</CardTitle>
              <CardDescription>
                Breakdown of hours spent on each project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead className="text-right">vs Previous</TableHead>
                    <TableHead className="text-right">Efficiency</TableHead>
                    <TableHead className="text-right">Entries</TableHead>
                    <TableHead className="text-right">Employees</TableHead>
                    <TableHead className="text-right">Avg. Duration</TableHead>
                    <TableHead>Last Worked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!data || data.projectDistribution.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground">
                        No project data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.projectDistribution.map((project) => (
                      <TableRow key={project.project}>
                        <TableCell className="font-medium">{project.project}</TableCell>
                        <TableCell>{project.department}</TableCell>
                        <TableCell className="text-right">{project.totalHours.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {renderTrend(project.totalHours, project.previousPeriodHours)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={
                            project.efficiency >= 100 ? "text-green-500" :
                            project.efficiency >= 80 ? "text-yellow-500" :
                            "text-red-500"
                          }>
                            {project.efficiency.toFixed(0)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{project.entriesCount}</TableCell>
                        <TableCell className="text-right">{project.employeesCount}</TableCell>
                        <TableCell className="text-right">{project.avgDuration.toFixed(2)}</TableCell>
                        <TableCell>{new Date(project.lastWorked).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default function WorkReportPage() {
  return (
    <DateRangeProvider>
      <WorkReportContent />
    </DateRangeProvider>
  );
}
