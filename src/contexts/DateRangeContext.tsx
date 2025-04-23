"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

interface DateRangeWithPreset extends DateRange {
  preset?: string;
}

type DateRangeContextType = {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  preset: string;
  setPreset: (preset: string) => void;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [preset, setPreset] = useState<string>("this-week");

  // Initialize from localStorage if available
  useEffect(() => {
    const savedFilter = localStorage.getItem("dateRangeFilter");
    if (savedFilter) {
      try {
        const { preset, from, to } = JSON.parse(savedFilter);
        setPreset(preset);
        
        if (from && to) {
          setDateRange({
            from: new Date(from),
            to: new Date(to)
          });
        }
      } catch (error) {
        console.error("Error parsing saved date range filter", error);
        initializeDefaultRange();
      }
    } else {
      initializeDefaultRange();
    }
  }, []);

  // Set default range (this week)
  const initializeDefaultRange = () => {
    const today = new Date();
    const from = startOfWeek(today, { weekStartsOn: 1 });
    const to = endOfWeek(today, { weekStartsOn: 1 });
    
    setDateRange({ from, to });
    setPreset("this-week");
    
    localStorage.setItem("dateRangeFilter", JSON.stringify({
      preset: "this-week",
      from: from.toISOString(),
      to: to.toISOString()
    }));
  };

  // Custom setter for date range that also extracts preset if available
  const handleSetDateRange = (range: DateRange | undefined) => {
    if (range) {
      // Extract preset if it exists
      const rangeWithPreset = range as DateRangeWithPreset;
      if (rangeWithPreset.preset) {
        setPreset(rangeWithPreset.preset);
        
        // Create a clean version of the range without the preset property
        const { preset: _, ...cleanRange } = rangeWithPreset;
        setDateRange(cleanRange);
      } else {
        setDateRange(range);
      }
    } else {
      setDateRange(undefined);
    }
  };

  return (
    <DateRangeContext.Provider value={{ 
      dateRange, 
      setDateRange: handleSetDateRange, 
      preset, 
      setPreset 
    }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
}
