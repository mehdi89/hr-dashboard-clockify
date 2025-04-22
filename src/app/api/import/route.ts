import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { importLogs, ImportStatus, timeEntries, employees } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { parse } from 'csv-parse/sync';

// Helper function to parse the CSV data
function parseClockifyCSV(csvContent: string) {
  // Parse the CSV content
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Map CSV records to our data structure
  return records.map((record: any) => {
    // Parse dates and times from DD/MM/YYYY format
    const [startDay, startMonth, startYear] = record['Start Date'].split('/');
    const [endDay, endMonth, endYear] = record['End Date'].split('/');
    
    // Create Date objects in ISO format (YYYY-MM-DD)
    const startDateStr = `${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`;
    const endDateStr = `${endYear}-${endMonth.padStart(2, '0')}-${endDay.padStart(2, '0')}`;
    
    const startDate = new Date(startDateStr);
    const startTime = record['Start Time'];
    const endDate = new Date(endDateStr);
    const endTime = record['End Time'];
    
    // Create a unique ID for this entry to prevent duplicates
    const uniqueEntryId = `${record['User']}-${startDateStr}-${startTime}-${record['Project']}-${record['Description'] || ''}`;
    
    return {
      employeeClockifyName: record['User'],
      project: record['Project'],
      client: record['Client'] || '',
      description: record['Description'] || '',
      task: record['Task'] || '',
      group: record['Group'] || '',
      email: record['Email'] || '',
      tags: record['Tags'] || '',
      billable: record['Billable']?.toLowerCase() === 'yes',
      startDate,
      startTime,
      endDate,
      endTime,
      date: startDate, // Keep the original date field for compatibility
      duration: record['Duration (decimal)'] || record['Duration (h)'] || '0',
      uniqueEntryId
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Missing file' },
        { status: 400 }
      );
    }

    // Read file contents
    const fileContents = await file.text();
    
    // Parse the CSV
    const timeRecords = parseClockifyCSV(fileContents);
    
    if (!timeRecords.length) {
      return NextResponse.json(
        { error: 'No valid records found in CSV' },
        { status: 400 }
      );
    }
    
    // Extract date range from the CSV data
    const dates = timeRecords.map((record: { startDate: Date }) => record.startDate);
    const minDate = new Date(Math.min(...dates.map((d: Date) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d: Date) => d.getTime())));
    
    // Format dates for database
    const startDate = minDate.toISOString().split('T')[0];
    const endDate = maxDate.toISOString().split('T')[0];

    // Create a new import log
    const [importLog] = await db.insert(importLogs).values({
      startDate: new Date(startDate).toISOString().split('T')[0],
      endDate: new Date(endDate).toISOString().split('T')[0],
      status: ImportStatus.SUCCESS,
      fileName: file.name,
    }).returning();

    // Get all employees to match with Clockify names
    const employeesList = await db.query.employees.findMany();
    const employeeMap = new Map(
      employeesList.map(emp => [emp.clockifyName, emp])
    );

    // Prepare time entries for insertion
    const timeEntriesToInsert = [];
    const errors = [];

    for (const record of timeRecords) {
      const employee = employeeMap.get(record.employeeClockifyName);
      
      if (!employee) {
        errors.push(`Employee "${record.employeeClockifyName}" not found`);
        continue;
      }

      // Convert duration to hours:minutes format
      // Assuming duration is in decimal hours (e.g., 7.5 for 7 hours and 30 minutes)
      // Handle large durations by capping at 23:59 for database storage
      let hours = Math.floor(Number(record.duration));
      let minutes = Math.round((Number(record.duration) - hours) * 60);
      
      // Normalize minutes if they're 60
      if (minutes === 60) {
        hours += 1;
        minutes = 0;
      }
      
      // Cap hours at 23 for PostgreSQL TIME type compatibility
      // Store the original duration in the decimal field
      const hoursWorked = hours >= 24 
        ? '23:59' 
        : `${Math.min(hours, 23).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      // Format dates for database
      const formattedStartDate = record.startDate.toISOString().split('T')[0];
      const formattedEndDate = record.endDate.toISOString().split('T')[0];
      
      timeEntriesToInsert.push({
        employeeId: employee.id,
        date: formattedStartDate,
        project: record.project,
        client: record.client,
        description: record.description,
        task: record.task,
        group: record.group,
        email: record.email,
        tags: record.tags,
        billable: record.billable,
        startDate: formattedStartDate,
        startTime: record.startTime,
        endDate: formattedEndDate,
        endTime: record.endTime,
        hoursWorked,
        durationDecimal: record.duration,
        uniqueEntryId: record.uniqueEntryId,
        importBatchId: importLog.id,
      });
    }

    if (timeEntriesToInsert.length > 0) {
      // Insert time entries in batches to avoid hitting limits
      const batchSize = 100;
      for (let i = 0; i < timeEntriesToInsert.length; i += batchSize) {
        const batch = timeEntriesToInsert.slice(i, i + batchSize);
        await db.insert(timeEntries).values(batch);
      }
    }

    // Update import log status if there were errors
    if (errors.length > 0 && timeEntriesToInsert.length === 0) {
      await db
        .update(importLogs)
        .set({ status: ImportStatus.FAILED })
        .where(eq(importLogs.id, importLog.id));
      
      return NextResponse.json(
        { error: 'Import failed', details: errors },
        { status: 400 }
      );
    }

    // Return success response with import details
    return NextResponse.json({
      success: true,
      importId: importLog.id,
      entriesImported: timeEntriesToInsert.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Error processing import:', error);
    return NextResponse.json(
      { error: 'Failed to process import' },
      { status: 500 }
    );
  }
}
