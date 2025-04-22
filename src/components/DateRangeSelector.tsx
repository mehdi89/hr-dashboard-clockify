"use client";

import React from "react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useDateRange } from "@/contexts/DateRangeContext";
import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

export function DateRangeSelector() {
  const { dateRange, setDateRange, preset, setPreset } = useDateRange();

  const handleDateRangeChange = (newRange: any) => {
    setDateRange(newRange);
    
    if (newRange?.from && newRange?.to) {
      localStorage.setItem("dateRangeFilter", JSON.stringify({
        preset: "custom",
        from: newRange.from.toISOString(),
        to: newRange.to.toISOString()
      }));
      setPreset("custom");
    }
  };

  const handlePresetChange = (newPreset: string) => {
    const today = new Date();
    let from: Date | undefined;
    let to: Date | undefined;

    switch (newPreset) {
      case "this-week": {
        from = startOfWeek(today, { weekStartsOn: 1 });
        to = endOfWeek(today, { weekStartsOn: 1 });
        break;
      }
      case "last-week": {
        const lastWeekStart = addDays(startOfWeek(today, { weekStartsOn: 1 }), -7);
        from = lastWeekStart;
        to = addDays(lastWeekStart, 6);
        break;
      }
      case "this-month": {
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      }
      case "last-month": {
        const lastMonthStart = addDays(startOfMonth(today), -1);
        from = startOfMonth(lastMonthStart);
        to = endOfMonth(lastMonthStart);
        break;
      }
      case "custom": {
        // Keep the current selection for custom
        setPreset(newPreset);
        return;
      }
      default: {
        from = undefined;
        to = undefined;
      }
    }

    setPreset(newPreset);
    
    if (from && to) {
      setDateRange({ from, to });
      
      // Save to localStorage
      localStorage.setItem("dateRangeFilter", JSON.stringify({
        preset: newPreset,
        from: from.toISOString(),
        to: to.toISOString()
      }));
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Date Range</h3>
          <DateRangePicker 
            value={dateRange} 
            onChange={handleDateRangeChange} 
            className="w-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
}
