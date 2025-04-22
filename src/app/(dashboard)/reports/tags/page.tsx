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
import { ArrowLeft, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Tags Report - Time Tracking System",
};

export default async function TagsReportPage() {
  // Get tags with total hours
  const tagStats = await db
    .select({
      tag: timeEntries.tags,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      entriesCount: sql<number>`COUNT(*)`,
      employeesCount: sql<number>`COUNT(DISTINCT ${timeEntries.employeeId})`,
      avgDuration: sql<number>`AVG(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
      lastWorked: sql<string>`MAX(${timeEntries.date})`,
    })
    .from(timeEntries)
    .where(isNotNull(timeEntries.tags))
    .groupBy(timeEntries.tags)
    .orderBy(desc(sql`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`));

  // Get top employees by tag count
  const employeeTagStats = await db
    .select({
      employeeId: timeEntries.employeeId,
      employeeName: employees.name,
      tagCount: sql<number>`COUNT(DISTINCT CASE WHEN ${timeEntries.tags} IS NOT NULL THEN ${timeEntries.tags} END)`,
      totalHours: sql<number>`SUM(CAST(${timeEntries.durationDecimal} AS DECIMAL))`,
    })
    .from(timeEntries)
    .innerJoin(employees, eq(timeEntries.employeeId, employees.id))
    .where(isNotNull(timeEntries.tags))
    .groupBy(timeEntries.employeeId, employees.name)
    .orderBy(desc(sql`COUNT(DISTINCT CASE WHEN ${timeEntries.tags} IS NOT NULL THEN ${timeEntries.tags} END)`))
    .limit(5);

  // Calculate overall stats
  const totalTagHours = tagStats.reduce((sum, tag) => sum + Number(tag.totalHours), 0);
  const totalTagEntries = tagStats.reduce((sum, tag) => sum + Number(tag.entriesCount), 0);
  const uniqueTags = tagStats.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Tag className="h-8 w-8" />
            Tags Report
          </h1>
          <p className="text-muted-foreground">
            Analysis of time spent on different tags
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
            <CardTitle className="text-sm font-medium">Total Tagged Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTagHours.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Hours tracked across all tagged entries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tagged Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTagEntries}</div>
            <p className="text-xs text-muted-foreground">
              Total number of entries with tags
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueTags}</div>
            <p className="text-xs text-muted-foreground">
              Different tags used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tags Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tags by Time Spent</CardTitle>
          <CardDescription>
            Breakdown of hours spent on each tag
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Entries</TableHead>
                <TableHead className="text-right">Employees</TableHead>
                <TableHead className="text-right">Avg. Duration</TableHead>
                <TableHead>Last Worked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tagStats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No tag data available
                  </TableCell>
                </TableRow>
              ) : (
                tagStats.map((tag) => (
                  <TableRow key={tag.tag}>
                    <TableCell className="font-medium">{tag.tag || "Unspecified"}</TableCell>
                    <TableCell className="text-right">{Number(tag.totalHours).toFixed(2)}</TableCell>
                    <TableCell className="text-right">{tag.entriesCount}</TableCell>
                    <TableCell className="text-right">{tag.employeesCount}</TableCell>
                    <TableCell className="text-right">{Number(tag.avgDuration).toFixed(2)}</TableCell>
                    <TableCell>{new Date(tag.lastWorked).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Employees by Tag Diversity */}
      <Card>
        <CardHeader>
          <CardTitle>Top Employees by Tag Diversity</CardTitle>
          <CardDescription>
            Employees working with the most different tags
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right">Unique Tags</TableHead>
                <TableHead className="text-right">Total Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeTagStats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No employee tag data available
                  </TableCell>
                </TableRow>
              ) : (
                employeeTagStats.map((employee) => (
                  <TableRow key={employee.employeeId}>
                    <TableCell className="font-medium">{employee.employeeName}</TableCell>
                    <TableCell className="text-right">{employee.tagCount}</TableCell>
                    <TableCell className="text-right">{Number(employee.totalHours).toFixed(2)}</TableCell>
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
