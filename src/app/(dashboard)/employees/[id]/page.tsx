import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/db";
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
import { ArrowLeft, Clock, Edit, Mail, Phone, User } from "lucide-react";
import { EmployeeEfficiencyWidget } from "../_components/EmployeeEfficiencyWidget";

export const metadata: Metadata = {
  title: "Employee Details - Time Tracking System",
};

export default async function EmployeeDetailPage(props: any) {
  const { params } = props;
  const employeeId = parseInt(params.id);
  
  if (isNaN(employeeId)) {
    return notFound();
  }

  // Fetch employee details
  const employee = await prisma.employees.findUnique({
    where: {
      id: employeeId
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      department: true,
      employmentType: true,
      weeklyCommittedHours: true,
      startDate: true,
      isActive: true,
      clockifyName: true
    }
  });

  if (!employee) {
    return notFound();
  }

  // Fetch recent time entries
  const recentEntries = await prisma.time_entries.findMany({
    where: {
      employeeId: employeeId
    },
    select: {
      id: true,
      date: true,
      project: true,
      client: true,
      description: true,
      task: true,
      startDate: true,
      startTime: true,
      endDate: true,
      endTime: true,
      hoursWorked: true,
      durationDecimal: true
    },
    orderBy: [
      { date: 'desc' },
      { startTime: 'desc' }
    ],
    take: 10
  });

  // Define type for project stats
  type ProjectStat = {
    project: string;
    totalHours: number;
    entriesCount: number;
  };

  // Get project statistics
  const projectStats = await prisma.$queryRaw<ProjectStat[]>`
    SELECT 
      "project", 
      SUM("duration_decimal") as "totalHours",
      COUNT(*) as "entriesCount"
    FROM 
      "time_entries"
    WHERE 
      "employee_id" = ${employeeId}
    GROUP BY 
      "project"
    ORDER BY 
      SUM("duration_decimal") DESC
    LIMIT 5
  `;

  // Define type for total hours result
  type TotalHoursResult = {
    totalHours: number | bigint;
    entriesCount: number | bigint;
  };

  // Calculate total hours
  const totalHoursResult = await prisma.$queryRaw<TotalHoursResult[]>`
    SELECT 
      SUM("duration_decimal") as "totalHours",
      COUNT(*) as "entriesCount"
    FROM 
      "time_entries"
    WHERE 
      "employee_id" = ${employeeId}
  `;

  // Convert BigInt values to Numbers for calculations
  const totalHours = totalHoursResult[0]?.totalHours ? Number(totalHoursResult[0].totalHours) : 0;
  const entriesCount = totalHoursResult[0]?.entriesCount ? Number(totalHoursResult[0].entriesCount) : 0;
  const avgHoursPerEntry = entriesCount > 0 ? totalHours / entriesCount : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8" />
            Employee Profile
          </h1>
          <p className="text-muted-foreground">
            View and manage employee information
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/employees">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Employees
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/employees/${employeeId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* Employee Profile Card */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Basic employee details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-3 pb-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{employee.name}</h2>
              <div className="text-sm text-muted-foreground">{employee.department}</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{employee.phone || "Phone not available"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Started: {employee.startDate ? String(new Date(employee.startDate).toLocaleDateString()) : 'N/A'}</span>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="text-sm font-medium">Status</div>
              <div className="flex items-center gap-2 mt-1">
                <div className={`h-2.5 w-2.5 rounded-full ${employee.isActive ? "bg-green-500" : "bg-red-500"}`}></div>
                <span>{employee.isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Widget */}
      <div className="md:col-span-2 space-y-6">
        {/* Efficiency Report */}
        <EmployeeEfficiencyWidget employeeId={employeeId} />
        
        {/* Time Tracking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Time Tracking Summary</CardTitle>
            <CardDescription>
              Overview of tracked hours and projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Total Hours</div>
                <div className="text-2xl font-bold">{Number(totalHours).toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Time Entries</div>
                <div className="text-2xl font-bold">{entriesCount}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Avg Hours/Entry</div>
                <div className="text-2xl font-bold">{avgHoursPerEntry.toFixed(2)}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Top Projects</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead className="text-right">Entries</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectStats.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No project data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    projectStats.map((project) => (
                      <TableRow key={project.project}>
                        <TableCell className="font-medium">{project.project}</TableCell>
                        <TableCell className="text-right">{Number(project.totalHours).toFixed(2)}</TableCell>
                        <TableCell className="text-right">{project.entriesCount}</TableCell>
                        <TableCell className="text-right">
                          {totalHours > 0 ? ((Number(project.totalHours) / Number(totalHours)) * 100).toFixed(2) : "0.00"}%
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>

      {/* Recent Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
          <CardDescription>
            Latest time tracking records for this employee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Task</TableHead>
                <TableHead className="text-right">Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No time entries available
                  </TableCell>
                </TableRow>
              ) : (
                recentEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date ? String(new Date(entry.date).toLocaleDateString()) : '-'}</TableCell>
                    <TableCell>{entry.project}</TableCell>
                    <TableCell className="max-w-xs truncate" title={entry.description || undefined}>
                      {entry.description ? (
                        <span className="line-clamp-1">{entry.description}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{entry.task || "-"}</TableCell>
                    <TableCell className="text-right">{entry.durationDecimal?.toString() || '-'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" asChild>
              <Link href={`/time-entries?employeeId=${employeeId}`}>
                View All Entries
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
