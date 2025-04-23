"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DateRangeProvider, useDateRange } from "@/contexts/DateRangeContext";
import { EmployeeEfficiency, fetchEmployeeEfficiencyData } from "../actions";
import { Progress } from "@/components/ui/progress";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface EmployeeEfficiencyWidgetProps {
  employeeId: number;
}

function EmployeeEfficiencyContent({ employeeId }: EmployeeEfficiencyWidgetProps) {
  const { dateRange } = useDateRange();
  const [data, setData] = useState<EmployeeEfficiency | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      if (dateRange?.from && dateRange?.to) {
        setLoading(true);
        try {
          const startDate = dateRange.from.toISOString().split('T')[0];
          const endDate = dateRange.to.toISOString().split('T')[0];
          
          const efficiencyData = await fetchEmployeeEfficiencyData(employeeId, startDate, endDate);
          setData(efficiencyData);
        } catch (error) {
          console.error("Error fetching employee efficiency data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadData();
  }, [dateRange, employeeId]);

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

  const efficiencyStatus = data ? getEfficiencyStatus(data.efficiency) : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Efficiency Report</CardTitle>
        <CardDescription>
          Committed vs. actual hours worked
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : data ? (
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Weekly Committed</div>
                <div className="text-2xl font-bold">{data.weeklyCommittedHours.toFixed(2)} hrs</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Period Committed</div>
                <div className="text-2xl font-bold">{data.committedHoursForPeriod.toFixed(2)} hrs</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Actual Hours</div>
                <div className="text-2xl font-bold">{data.totalHours.toFixed(2)} hrs</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Entries</div>
                <div className="text-2xl font-bold">{data.entriesCount}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Efficiency</div>
                <Badge variant={efficiencyStatus?.color as any}>
                  {data.efficiency.toFixed(0)}% ({efficiencyStatus?.label})
                </Badge>
              </div>
              <Progress 
                value={Math.min(data.efficiency, 150)} 
                max={150}
                className={`h-2 ${efficiencyStatus?.bgColor}`} 
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
                <span>150%</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-sm font-medium mb-2">Hours Comparison</div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 text-blue-800">
                      Committed
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-800">
                      {data.committedHoursForPeriod.toFixed(2)} hrs
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${efficiencyStatus?.bgColor} ${efficiencyStatus?.textColor}`}>
                      Actual
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold inline-block ${efficiencyStatus?.textColor}`}>
                      {data.totalHours.toFixed(2)} hrs
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${Math.min((data.totalHours / data.committedHoursForPeriod) * 100, 100)}%` }} 
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${efficiencyStatus?.color === 'destructive' ? 'bg-red-500' : 
                      efficiencyStatus?.color === 'warning' ? 'bg-yellow-500' : 
                      efficiencyStatus?.color === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No efficiency data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function EmployeeEfficiencyWidget({ employeeId }: { employeeId: number }) {
  return (
    <DateRangeProvider>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Work Efficiency</h2>
                <p className="text-sm text-muted-foreground">
                  Tracking hour commitments vs. actual work
                </p>
              </div>
            </div>

            <DateRangePicker showCard title="Select Period" />
            
            <EmployeeEfficiencyContent employeeId={employeeId} />
          </div>
        </CardContent>
      </Card>
    </DateRangeProvider>
  );
}
