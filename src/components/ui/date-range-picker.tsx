"use client";

import * as React from "react";
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDateRange } from "@/contexts/DateRangeContext";

export type DateRangePickerProps = {
  value?: DateRange | undefined;
  onChange?: (date: DateRange | undefined) => void;
  className?: string;
  showCard?: boolean;
  title?: string;
};

export function DateRangePicker({
  value: propValue,
  onChange: propOnChange,
  className,
  showCard = false,
  title = "Date Range",
}: DateRangePickerProps) {
  const { dateRange, setDateRange } = useDateRange();
  
  // Use props or context values
  const value = propValue !== undefined ? propValue : dateRange;
  const onChange = propOnChange || setDateRange;
  
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<string>("");

  // Presets for quick selection
  const handleSelectPreset = (preset: string) => {
    const today = new Date();
    let from: Date | undefined;
    let to: Date | undefined;

    switch (preset) {
      case "today": {
        from = today;
        to = today;
        break;
      }
      case "yesterday": {
        from = addDays(today, -1);
        to = addDays(today, -1);
        break;
      }
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
      case "last-3-months": {
        from = addDays(today, -90); // Approximately 3 months
        to = today;
        break;
      }
      case "custom": {
        // Keep the current selection for custom
        setIsOpen(true);
        setSelectedPreset(preset);
        return;
      }
      default: {
        from = undefined;
        to = undefined;
      }
    }

    setSelectedPreset(preset);
    
    if (from && to) {
      // Pass both the date range and the preset
      const rangeWithPreset = { from, to, preset };
      onChange(rangeWithPreset as DateRange);
      
      // Save to localStorage
      localStorage.setItem("dateRangeFilter", JSON.stringify({
        preset,
        from: from.toISOString(),
        to: to.toISOString()
      }));
    }
  };

  // Initialize from localStorage if available
  React.useEffect(() => {
    const savedFilter = localStorage.getItem("dateRangeFilter");
    if (savedFilter) {
      try {
        const { preset, from, to } = JSON.parse(savedFilter);
        setSelectedPreset(preset);
        
        if (preset === "custom" && from && to) {
          const fromDate = new Date(from);
          const toDate = new Date(to);
          
          if (isValid(fromDate) && isValid(toDate)) {
            onChange({ from: fromDate, to: toDate, preset: "custom" } as DateRange);
          }
        } else {
          // Re-apply the preset to ensure dates are current
          handleSelectPreset(preset);
        }
      } catch (error) {
        console.error("Error parsing saved date range filter", error);
      }
    } else {
      // Default to "this week" if no saved preference
      handleSelectPreset("this-week");
    }
  }, []);

  // Handle custom date selection
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      // Add the preset information
      const rangeWithPreset = { ...range, preset: "custom" };
      onChange(rangeWithPreset as DateRange);
      setSelectedPreset("custom");
      
      localStorage.setItem("dateRangeFilter", JSON.stringify({
        preset: "custom",
        from: range.from.toISOString(),
        to: range.to.toISOString()
      }));
    } else {
      onChange(range);
    }
  };

  const picker = (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center gap-2">
        <Select value={selectedPreset} onValueChange={handleSelectPreset}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, "LLL dd, y")} -{" "}
                    {format(value.to, "LLL dd, y")}
                  </>
                ) : (
                  format(value.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value?.from}
              selected={value}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  if (showCard) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            {picker}
          </div>
        </CardContent>
      </Card>
    );
  }

  return picker;
}
