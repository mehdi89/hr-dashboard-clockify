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
import { ArrowLeft, PieChart } from "lucide-react";
import { DateRangeProvider, useDateRange } from "@/contexts/DateRangeContext";
import { startOfWeek, endOfWeek } from "date-fns";
import { fetchProjectDistributionData, ProjectDistributionData, EmployeeProjectDistribution } from "./actions";
import { ProjectDistributionPieChart } from "./_components/ProjectDistributionPieChart";
import { ProjectTimelineChart } from "./_components/ProjectTimelineChart";
import { ProjectWorkloadDistribution } from "./_components/ProjectWorkloadDistribution";
import { TeamCollaborationMetrics } from "./_components/TeamCollaborationMetrics";
import { DateRangePicker } from "@/components/ui/date-range-picker";

// Define types for employee projects
type ProjectSummary = {
  project: string;
  totalHours: number;
  entriesCount: number;
};

type EmployeeProjectSummary = {
  employeeId: number;
  employeeName: string;
  projects: ProjectSummary[];
  totalHours: number;
};

function ProjectDistributionContent() {
  const { dateRange } = useDateRange();
  const [data, setData] = useState<ProjectDistributionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [employeeProjectsList, setEmployeeProjectsList] = useState<EmployeeProjectSummary[]>([]);

  useEffect(() => {
    async function loadData() {
      if (dateRange?.from && dateRange?.to) {
        setLoading(true);
        try {
          const startDate = dateRange.from.toISOString().split('T')[0];
          const endDate = dateRange.to.toISOString().split('T')[0];
          
          const projectData = await fetchProjectDistributionData(startDate, endDate);
          setData(projectData);
          
          // Group project-employee data by employee
          const employeeProjects: Record<number, EmployeeProjectSummary> = {};
          
          projectData.projectEmployeeDistribution.forEach(item => {
            const id = Number(item.employeeId);
            
            if (!employeeProjects[id]) {
              employeeProjects[id] = {
                employeeId: id,
                employeeName: item.employeeName,
                projects: [],
                totalHours: 0
              };
            }
            
            employeeProjects[id].projects.push({
              project: item.project,
              totalHours: Number(item.totalHours),
              entriesCount: Number(item.entriesCount)
            });
            
            employeeProjects[id].totalHours += Number(item.totalHours);
          });
          
          // Convert to array and sort by total hours
          const employeeProjectsList = Object.values(employeeProjects)
            .sort((a, b) => b.totalHours - a.totalHours);
          
          setEmployeeProjectsList(employeeProjectsList);
        } catch (error) {
          console.error("Error fetching project distribution data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadData();
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <PieChart className="h-8 w-8" />
            Project Distribution
          </h1>
          <p className="text-muted-foreground">
            Visualize time allocation across different projects and clients
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/reports">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Link>
        </Button>
      </div>

      <DateRangePicker showCard />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Project Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data ? data.totalProjectHours.toFixed(2) : "0.00"}</div>
                <p className="text-xs text-muted-foreground">
                  Hours tracked across all projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unique Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data ? data.uniqueProjects : 0}</div>
                <p className="text-xs text-muted-foreground">
                  Different projects tracked
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Hours per Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data && data.uniqueProjects > 0 ? (data.totalProjectHours / data.uniqueProjects).toFixed(2) : "0.00"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average hours spent per project
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visualization Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {data && <ProjectDistributionPieChart data={data.topProjects} />}
            {data && <ProjectTimelineChart data={data.topProjects} />}
            {/* {data && <ProjectWorkloadDistribution data={data.projectEmployeeDistribution} />} */}
            {/* {data && <TeamCollaborationMetrics data={data.projectEmployeeDistribution} />} */}
          </div>

          {/* Team collaboration Metrics  */}
          <Card>
            <CardHeader>
              <CardTitle>Team Collaboration Metrics</CardTitle>
              <CardDescription>
                How team members work together on projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data && <TeamCollaborationMetrics data={data.projectEmployeeDistribution} />}
            </CardContent>
          </Card>

          {/* Employee Project Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Project Distribution</CardTitle>
              <CardDescription>
                Projects worked on by each employee
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {employeeProjectsList.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  No employee project data available
                </div>
              ) : (
                employeeProjectsList.map((employee) => (
                  <div key={employee.employeeId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        <Link href={`/employees/${employee.employeeId}`} className="hover:underline">
                          {employee.employeeName}
                        </Link>
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {employee.totalHours.toFixed(2)} hours across {employee.projects.length} projects
                      </span>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead className="text-right">Hours</TableHead>
                          <TableHead className="text-right">Entries</TableHead>
                          <TableHead className="text-right">% of Employee Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employee.projects.map((project) => (
                          <TableRow key={`${employee.employeeId}-${project.project}`}>
                            <TableCell>{project.project}</TableCell>
                            <TableCell className="text-right">{project.totalHours.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{project.entriesCount}</TableCell>
                            <TableCell className="text-right">
                              {((project.totalHours / employee.totalHours) * 100).toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Top Projects Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Projects by Hours</CardTitle>
              <CardDescription>
                Projects with the most time spent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead className="text-right">Entries</TableHead>
                    <TableHead className="text-right">Employees</TableHead>
                    <TableHead className="text-right">Avg. Duration</TableHead>
                    <TableHead className="text-right">Avg. Hours/Day</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!data || data.topProjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No project data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.topProjects.map((project) => (
                      <TableRow key={project.project}>
                        <TableCell className="font-medium">{project.project}</TableCell>
                        <TableCell className="text-right">{project.totalHours.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{project.entriesCount}</TableCell>
                        <TableCell className="text-right">{project.employeesCount}</TableCell>
                        <TableCell className="text-right">{project.avgDuration.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{project.avgHoursPerDay.toFixed(2)}</TableCell>
                        
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

export default function ProjectsReportPage() {
  return (
    <DateRangeProvider>
      <div className="space-y-6">
        {/* <DateRangePicker showCard /> */}
        <ProjectDistributionContent />
      </div>
    </DateRangeProvider>
  );
}
