"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangeProvider, useDateRange } from "@/contexts/DateRangeContext";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Users, Clock, Upload, BarChart3, Briefcase, Calendar, 
  TrendingUp, AlertTriangle, CheckCircle, ArrowUpRight, 
  Globe, Moon, Sun, Sunrise, Sunset, Calendar as CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { DashboardData, fetchDashboardData } from "./actions";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function DashboardContent() {
  const { dateRange } = useDateRange();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      if (dateRange?.from && dateRange?.to) {
        setLoading(true);
        try {
          const startDate = dateRange.from.toISOString().split('T')[0];
          const endDate = dateRange.to.toISOString().split('T')[0];
          
          const dashboardData = await fetchDashboardData(startDate, endDate);
          setData(dashboardData);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadData();
  }, [dateRange]);

  // Function to determine efficiency status and color
  const getEfficiencyStatus = (efficiency: number) => {
    if (efficiency < 70) {
      return { label: "Low", color: "destructive", bgColor: "bg-red-100", textColor: "text-red-800" };
    } else if (efficiency < 90) {
      return { label: "Medium", color: "warning", bgColor: "bg-yellow-100", textColor: "text-yellow-800" };
    } else if (efficiency < 110) {
      return { label: "Good", color: "success", bgColor: "bg-green-100", textColor: "text-green-800" };
    } else {
      return { label: "High", color: "blue", bgColor: "bg-blue-100", textColor: "text-blue-800" };
    }
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of team performance and work patterns
          </p>
        </div>
      </div>

      <DateRangePicker showCard />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : data ? (
        <>
          {/* Top-Level KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-sm border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.teamHealth.efficiencyScore.toFixed(0)}%</div>
                <div className="mt-2">
                  <Progress 
                    value={Math.min(data.teamHealth.efficiencyScore, 150)} 
                    max={150}
                    className="h-2" 
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.teamHealth.totalHours.toFixed(1)} hrs / {data.teamHealth.committedHours.toFixed(1)} hrs committed
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.teamHealth.activeEmployees}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Out of {data.teamHealth.totalEmployees} total employees
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
                <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.teamHealth.capacityUtilizationRate.toFixed(0)}%
                </div>
                <div className="mt-2">
                  <Progress 
                    value={Math.min(data.teamHealth.capacityUtilizationRate, 100)} 
                    max={100}
                    className="h-2" 
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.teamHealth.totalHours.toFixed(1)} hrs / {(data.teamHealth.activeEmployees * 8 * data.workdaysInPeriod).toFixed(1)} hrs available
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest Import</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Upload className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.latestImport.date}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.latestImport.count} entries imported
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Efficiency Widget */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Employee Efficiency</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/reports/efficiency">
                      View Report <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>
                  Employees ranked by efficiency and hours worked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.employeeEfficiency
                    .sort((a, b) => b.efficiency - a.efficiency)
                    .slice(0, 5)
                    .map(employee => {
                      const status = getEfficiencyStatus(employee.efficiency);
                      return (
                        <div key={employee.employeeId} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${employee.needsSupport ? 'bg-red-500' : 'bg-green-500'}`} />
                            <Link href={`/employees/${employee.employeeId}`} className="font-medium hover:underline">
                              {employee.employeeName}
                            </Link>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-muted-foreground">
                              {employee.totalHours.toFixed(1)} hrs
                            </div>
                            <Badge variant={status.color as any}>
                              {employee.efficiency.toFixed(0)}%
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  
                  {data.employeeEfficiency.some(e => e.needsSupport) && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                        Employees Needing Support
                      </h4>
                      <div className="mt-2 space-y-2">
                        {data.employeeEfficiency
                          .filter(e => e.needsSupport)
                          .slice(0, 3)
                          .map(employee => (
                            <div key={`support-${employee.employeeId}`} className="flex items-center justify-between">
                              <Link href={`/employees/${employee.employeeId}`} className="text-sm hover:underline">
                                {employee.employeeName}
                              </Link>
                              <Badge variant="destructive">
                                {employee.efficiency.toFixed(0)}%
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Allocation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Allocation</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/reports/projects">
                      View Report <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>
                  Distribution of hours across projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.projectAllocation.slice(0, 5)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="totalHours"
                        nameKey="project"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {data.projectAllocation.slice(0, 5).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${typeof value === 'number' ? value.toFixed(1) : value} hrs`, 'Hours']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {data.projectAllocation.slice(0, 3).map((project, index) => (
                    <div key={project.project} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <Link href={`/reports/projects?project=${encodeURIComponent(project.project)}`} className="text-sm hover:underline">
                          {project.project}
                        </Link>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project.totalHours.toFixed(1)} hrs ({project.percentOfTotal.toFixed(0)}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Remote Work Insights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Remote Work Insights</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/reports/work">
                    View Report <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <CardDescription>
                Work patterns and time distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Work Hour Distribution */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Work Hour Distribution</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Early (5-9 AM)', value: data.workPatterns.earlyHours, icon: Sunrise },
                          { name: 'Core (9-5 PM)', value: data.workPatterns.coreHours, icon: Sun },
                          { name: 'Late (5-11 PM)', value: data.workPatterns.lateHours, icon: Sunset },
                          { name: 'Night (11PM-5AM)', value: data.workPatterns.nightHours, icon: Moon },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${typeof value === 'number' ? value.toFixed(1) : value} hrs`, 'Hours']} />
                        <Bar dataKey="value" fill="#8884d8">
                          {[
                            { value: data.workPatterns.earlyHours, color: '#FFBB28' },
                            { value: data.workPatterns.coreHours, color: '#00C49F' },
                            { value: data.workPatterns.lateHours, color: '#0088FE' },
                            { value: data.workPatterns.nightHours, color: '#FF8042' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Work-Life Balance Metrics */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Work-Life Balance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Weekend Work</span>
                        <span className="text-sm font-medium">
                          {data.workPatterns.weekendPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={data.workPatterns.weekendPercentage} 
                        max={100}
                        className={`h-2 ${data.workPatterns.weekendPercentage > 15 ? 'bg-amber-200' : 'bg-green-200'}`} 
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {data.workPatterns.weekendPercentage > 15 ? 
                          "High weekend work may indicate workload issues" : 
                          "Weekend work is within normal range"}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">After Hours Work</span>
                        <span className="text-sm font-medium">
                          {data.workPatterns.afterHoursPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={data.workPatterns.afterHoursPercentage} 
                        max={100}
                        className={`h-2 ${data.workPatterns.afterHoursPercentage > 30 ? 'bg-amber-200' : 'bg-green-200'}`} 
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {data.workPatterns.afterHoursPercentage > 30 ? 
                          "High after-hours work may indicate work-life balance issues" : 
                          "After-hours work is within normal range"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/time-entries">
                    View All <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <CardDescription>
                Latest time entries and system activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map(activity => (
                  <div key={`${activity.type}-${activity.id}`} className="flex items-start space-x-3 pb-3 border-b">
                    <div className={`mt-0.5 rounded-full p-1 ${
                      activity.type === 'import' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'import' ? (
                        <Upload className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <div className="flex items-center mt-1">
                        <CalendarIcon className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(activity.date), 'MMM dd, yyyy')}
                        </span>
                        {'employeeId' in activity && activity.employeeId && (
                          <>
                            <span className="mx-1 text-muted-foreground">•</span>
                            <Link 
                              href={`/employees/${activity.employeeId}`}
                              className="text-xs text-primary hover:underline"
                            >
                              View Employee
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No data available. Please select a date range.</p>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DateRangeProvider>
      <DashboardContent />
    </DateRangeProvider>
  );
}
