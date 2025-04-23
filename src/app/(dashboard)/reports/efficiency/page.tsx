"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { DateRangeProvider, useDateRange } from "@/contexts/DateRangeContext";
import { startOfWeek, endOfWeek } from "date-fns";
import { fetchEfficiencyData, EfficiencyData } from "./actions";
import { EmployeeEfficiencyTable } from "./_components/EmployeeEfficiencyTable";
import { ProjectEfficiencyTable } from "./_components/ProjectEfficiencyTable";
import { EfficiencyPieChart } from "./_components/EfficiencyPieChart";
import { DateRangePicker } from "@/components/ui/date-range-picker";

function EfficiencyReportContent() {
  const { dateRange } = useDateRange();
  const [data, setData] = useState<EfficiencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      if (dateRange?.from && dateRange?.to) {
        setLoading(true);
        try {
          const startDate = dateRange.from.toISOString().split('T')[0];
          const endDate = dateRange.to.toISOString().split('T')[0];
          
          const efficiencyData = await fetchEfficiencyData(startDate, endDate);
          setData(efficiencyData);
        } catch (error) {
          console.error("Error fetching efficiency data:", error);
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
            <TrendingUp className="h-8 w-8" />
            Efficiency Report
          </h1>
          <p className="text-muted-foreground">
            Analysis of productivity metrics and time distribution
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
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data ? Number(data.totalHours).toFixed(2) : "0.00"}</div>
                <p className="text-xs text-muted-foreground">
                  Hours tracked across all entries
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Hours Per Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data && data.projectEfficiency.length > 0 
                    ? (Number(data.totalHours) / data.projectEfficiency.length).toFixed(2) 
                    : "0.00"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average hours spent per project
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Efficiency Chart */}
          {data && data.employeeEfficiency.length > 0 && (
            <EfficiencyPieChart data={data.employeeEfficiency} />
          )}

          {/* Employee Hours Table */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Hours</CardTitle>
              <CardDescription>
                Employees ranked by efficiency and hours worked
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data && <EmployeeEfficiencyTable data={data.employeeEfficiency} />}
            </CardContent>
          </Card>

          {/* Project Hours Table */}
          <Card>
            <CardHeader>
              <CardTitle>Project Hours</CardTitle>
              <CardDescription>
                Projects ranked by total hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data && <ProjectEfficiencyTable data={data.projectEfficiency} totalHours={data.totalHours} />}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default async function EfficiencyReportPage() {
  return (
    <DateRangeProvider>
      <div className="space-y-6">
        <EfficiencyReportContent />
      </div>
    </DateRangeProvider>
  );
}
