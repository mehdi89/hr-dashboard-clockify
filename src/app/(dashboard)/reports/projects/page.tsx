import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { timeEntries, employees } from "@/db/schema";
import { desc, sql, eq, and, isNotNull } from "drizzle-orm";
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

export const metadata: Metadata = {
  title: "Project Distribution - Time Tracking System",
};

export default async function ProjectsReportPage() {
  // Get project distribution by employee
  const projectEmployeeDistribution = await db
    .select({
      employeeId: timeEntries.employeeId,
      employeeName: employees.name,
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
    })
    .from(timeEntries)
    .innerJoin(employees, eq(timeEntries.employeeId, employees.id))
    .groupBy(timeEntries.employeeId, employees.name, timeEntries.project)
    .orderBy(employees.name, desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Get top projects by hours
  const topProjects = await db
    .select({
      project: timeEntries.project,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      avgDuration: sql<number>`AVG(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      firstWorked: sql<string>`MIN(${timeEntries.date})`,
      lastWorked: sql<string>`MAX(${timeEntries.date})`,
    })
    .from(timeEntries)
    .groupBy(timeEntries.project)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`))
    .limit(10);

  // Get project-client relationship
  const projectClientRelationship = await db
    .select({
      project: timeEntries.project,
      client: timeEntries.client,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
    })
    .from(timeEntries)
    .where(isNotNull(timeEntries.client))
    .groupBy(timeEntries.project, timeEntries.client)
    .orderBy(timeEntries.project, desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

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

  // Group project-employee data by employee
  const employeeProjects: Record<number, EmployeeProjectSummary> = {};
  
  projectEmployeeDistribution.forEach(item => {
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
  const employeeProjectsList: EmployeeProjectSummary[] = Object.values(employeeProjects)
    .sort((a, b) => b.totalHours - a.totalHours);

  // Calculate overall stats
  const totalProjectHours = topProjects.reduce((sum, project) => sum + Number(project.totalHours), 0);
  const uniqueProjects = topProjects.length;

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

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Project Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjectHours.toFixed(2)}</div>
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
            <div className="text-2xl font-bold">{uniqueProjects}</div>
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
              {uniqueProjects > 0 ? (totalProjectHours / uniqueProjects).toFixed(2) : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">
              Average hours spent per project
            </p>
          </CardContent>
        </Card>
      </div>

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
                <TableHead>Date Range</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No project data available
                  </TableCell>
                </TableRow>
              ) : (
                topProjects.map((project) => (
                  <TableRow key={project.project}>
                    <TableCell className="font-medium">{project.project}</TableCell>
                    <TableCell className="text-right">{Number(project.totalHours).toFixed(2)}</TableCell>
                    <TableCell className="text-right">{project.entriesCount}</TableCell>
                    <TableCell className="text-right">{project.employeesCount}</TableCell>
                    <TableCell className="text-right">{Number(project.avgDuration).toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(project.firstWorked).toLocaleDateString()} - {new Date(project.lastWorked).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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

      {/* Project-Client Relationship */}
      <Card>
        <CardHeader>
          <CardTitle>Project-Client Relationship</CardTitle>
          <CardDescription>
            Mapping of projects to clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Entries</TableHead>
                <TableHead className="text-right">Employees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectClientRelationship.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No project-client data available
                  </TableCell>
                </TableRow>
              ) : (
                projectClientRelationship.map((relation, index) => (
                  <TableRow key={`${relation.project}-${relation.client}-${index}`}>
                    <TableCell className="font-medium">{relation.project}</TableCell>
                    <TableCell>{relation.client || "Unspecified"}</TableCell>
                    <TableCell className="text-right">{Number(relation.totalHours).toFixed(2)}</TableCell>
                    <TableCell className="text-right">{relation.entriesCount}</TableCell>
                    <TableCell className="text-right">{relation.employeesCount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
