"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterCard } from "@/components/layout/FilterCard";
import { TimeEntriesTable, type TimeEntryWithEmployee } from "@/components/data-display/TimeEntriesTable";
import { DateRangeProvider, useDateRange } from "@/contexts/DateRangeContext";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { fetchTimeEntries, fetchEmployees, fetchProjects, fetchClients } from "./actions";
import { format } from "date-fns";

function TimeEntriesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { dateRange, setDateRange } = useDateRange();
  
  // State for data and loading
  const [entries, setEntries] = useState<TimeEntryWithEmployee[]>([]);
  const [employeesList, setEmployeesList] = useState<{ id: number; name: string; isActive: boolean }[]>([]);
  const [projectsList, setProjectsList] = useState<{ project: string }[]>([]);
  const [clientsList, setClientsList] = useState<{ client: string | null }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get filter parameters from URL
  const employeeId = searchParams.get('employeeId') ? parseInt(searchParams.get('employeeId')!) : undefined;
  const project = searchParams.get('project') || undefined;
  const client = searchParams.get('client') || undefined;
  
  // Function to update URL with filters
  const updateUrlWithFilters = (filters: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Update the URL without reloading the page
    router.push(`?${params.toString()}`);
  };
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    updateUrlWithFilters({
      [name]: value || undefined
    });
  };
  
  // Handle date or employee click in table
  const handleDateClick = (date: string) => {
    if (dateRange?.from && dateRange?.to) {
      // Set both start and end date to the clicked date
      const clickedDate = new Date(date);
      
      // Update URL parameters
      updateUrlWithFilters({
        startDate: format(clickedDate, 'yyyy-MM-dd'),
        endDate: format(clickedDate, 'yyyy-MM-dd')
      });
      
      // Update the date range context
      const newDateRange = {
        from: clickedDate,
        to: clickedDate,
        preset: 'custom'
      };
      
      // Save to localStorage and update context
      localStorage.setItem("dateRangeFilter", JSON.stringify({
        preset: 'custom',
        from: clickedDate.toISOString(),
        to: clickedDate.toISOString()
      }));
      
      // Update the date range context
      setDateRange(newDateRange);
    }
  };
  
  const handleEmployeeClick = (id: number) => {
    updateUrlWithFilters({
      employeeId: id.toString()
    });
  };
  
  const handleProjectClick = (projectName: string) => {
    updateUrlWithFilters({
      project: projectName
    });
  };
  
  const handleClientClick = (clientName: string) => {
    updateUrlWithFilters({
      client: clientName
    });
  };
  
  // Load data when filters change
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Get date range from context
        const startDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined;
        const endDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined;
        
        // Fetch time entries with filters
        const timeEntriesData = await fetchTimeEntries({
          employeeId,
          startDate,
          endDate,
          project,
          client
        });
        
        setEntries(timeEntriesData);
        setError(null);
      } catch (err) {
        console.error("Error fetching time entries:", err);
        setError("Failed to load time entries. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [dateRange, employeeId, project, client]);
  
  // Load filter options once
  useEffect(() => {
    async function loadFilterOptions() {
      try {
        const [employees, projects, clients] = await Promise.all([
          fetchEmployees(),
          fetchProjects(),
          fetchClients()
        ]);
        
        setEmployeesList(employees);
        setProjectsList(projects);
        setClientsList(clients);
      } catch (err) {
        console.error("Error fetching filter options:", err);
      }
    }
    
    loadFilterOptions();
  }, []);
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Time Entries"
        description="View and manage employee time tracking records"
        action={{
          label: "Import Time Data",
          href: "/time-entries/import",
          icon: "Upload"
        }}
      />

      {/* Date Range Picker */}
      <DateRangePicker showCard title="Date Range" />

      {/* Filter Controls */}
      <FilterCard 
        title="Filter Time Entries" 
        columns={3}
        onSubmit={(e) => {
          e.preventDefault();
          // The form will be submitted automatically via URL params
        }}
      >
        <div className="space-y-2">
          <label htmlFor="employeeFilter" className="text-sm font-medium">
            Employee
          </label>
          <select 
            id="employeeFilter" 
            name="employeeId" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={employeeId ? String(employeeId) : ""}
            onChange={handleFilterChange}
          >
            <option value="">All Employees</option>
            {employeesList.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="projectFilter" className="text-sm font-medium">
            Project
          </label>
          <select 
            id="projectFilter" 
            name="project" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={project || ""}
            onChange={handleFilterChange}
          >
            <option value="">All Projects</option>
            {projectsList.map(p => (
              <option key={p.project} value={p.project}>
                {p.project}
              </option>
            ))}
          </select>
        </div>
      </FilterCard>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 text-center">{error}</div>
      ) : (
        /* Data Table */
        <TimeEntriesTable 
          entries={entries} 
          emptyMessage="No time entries found with the current filters."
          onDateClick={handleDateClick}
          onEmployeeClick={handleEmployeeClick}
          onProjectClick={handleProjectClick}
          onClientClick={handleClientClick}
        />
      )}
    </div>
  );
}

export default function TimeEntriesPage() {
  return (
    <DateRangeProvider>
      <TimeEntriesContent />
    </DateRangeProvider>
  );
}
