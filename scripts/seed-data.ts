import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { employees, EmploymentType, timeEntries, importLogs, ImportStatus } from '../src/db/schema';
import { format } from 'date-fns';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// Define departments
const departments = [
  'Engineering',
  'Design',
  'Marketing',
  'Operations',
  'HR',
  'QA',
  'Support'
];

// Map project names to departments
const projectToDepartment: Record<string, string> = {
  'Mobile app': 'Engineering',
  'UI/UX': 'Design',
  'Backend': 'Engineering',
  'Email Marketing': 'Marketing',
  'SEO & Content': 'Marketing',
  'Web': 'Engineering',
  'Admin & Analytics': 'Operations',
  'HR': 'HR',
  'Graphics': 'Design',
  'QA': 'QA',
  'Support': 'Support'
};

// Define weekly committed hours by employment type
const committedHours: Record<EmploymentType, number> = {
  [EmploymentType.FULL_TIME]: 40,
  [EmploymentType.PART_TIME]: 20
};

async function seedDatabase() {
  console.log('Starting database seeding...');
  
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable not set!');
    process.exit(1);
  }
  
  // Create a PostgreSQL connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Create a Drizzle instance
  const db = drizzle(pool);

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(timeEntries);
    await db.delete(importLogs);
    await db.delete(employees);
    
    // Read the CSV file
    const csvFilePath = path.resolve(__dirname, '../Clockify_Time_Report_Weekly_14_04_2025-20_04_2025.csv');
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    
    // Parse the CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`Parsed ${records.length} records from CSV file`);
    
    // Extract unique employees and their projects
    const employeeProjects: Record<string, string[]> = {};
    records.forEach((record: any) => {
      const employeeName = record.User;
      const project = record.Project;
      
      if (!employeeProjects[employeeName]) {
        employeeProjects[employeeName] = [];
      }
      
      if (!employeeProjects[employeeName].includes(project)) {
        employeeProjects[employeeName].push(project);
      }
    });
    
    // Create import log
    console.log('Creating import log...');
    const importStartDate = new Date('2025-04-14');
    const importEndDate = new Date('2025-04-20');
    
    const [importLog] = await db.insert(importLogs).values({
      startDate: importStartDate.toISOString().split('T')[0],
      endDate: importEndDate.toISOString().split('T')[0],
      importDate: new Date(),
      status: ImportStatus.SUCCESS,
      fileName: 'Clockify_Time_Report_Weekly_14_04_2025-20_04_2025.csv'
    }).returning();
    
    console.log(`Created import log with ID: ${importLog.id}`);
    
    // Create employees
    console.log('Creating employees...');
    const employeeRecords = [];
    
    for (const [employeeName, projects] of Object.entries(employeeProjects)) {
      // Determine primary project and department
      const primaryProject = projects[0];
      const department = projectToDepartment[primaryProject] || departments[Math.floor(Math.random() * departments.length)];
      
      // Randomly assign employment type
      const employmentType = Math.random() > 0.3 ? EmploymentType.FULL_TIME : EmploymentType.PART_TIME;
      
      // Create random start date
      const randomStartDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      
      // Create employee record
      const employee = {
        name: employeeName,
        department,
        employmentType,
        weeklyCommittedHours: committedHours[employmentType],
        startDate: randomStartDate.toISOString().split('T')[0],
        isActive: true,
        clockifyName: employeeName
      };
      
      employeeRecords.push(employee);
    }
    
    const createdEmployees = await db.insert(employees).values(employeeRecords).returning();
    console.log(`Created ${createdEmployees.length} employees`);
    
    // Create a map of employee names to IDs
    const employeeMap = new Map(createdEmployees.map(emp => [emp.clockifyName, emp.id]));
    
    // Create time entries
    console.log('Creating time entries...');
    const timeEntryRecords = [];
    
    for (const record of records) {
      const employeeName = record.User;
      const employeeId = employeeMap.get(employeeName);
      
      if (!employeeId) {
        console.warn(`Employee not found: ${employeeName}`);
        continue;
      }
      
      // Process each day in the record
      const days = ['14/04/2025', '15/04/2025', '16/04/2025', '17/04/2025', '18/04/2025', '19/04/2025', '20/04/2025'];
      
      for (const day of days) {
        const hours = record[day];
        
        // Skip if no hours logged
        if (hours === '00:00:00') continue;
        
        // Parse the date
        const [dayPart, monthPart, yearPart] = day.split('/');
        const date = new Date(`${yearPart}-${monthPart}-${dayPart}`);
        
      // Create a unique entry ID
      const uniqueEntryId = `${employeeId}-${date.toISOString().split('T')[0]}-${Math.random().toString(36).substring(2, 10)}`;
      
      // Create time entry with all required fields
      timeEntryRecords.push({
        employeeId,
        date: date.toISOString().split('T')[0],
        project: record.Project,
        client: '',
        description: `Sample work for ${record.Project}`,
        task: '',
        group: '',
        email: '',
        tags: '',
        billable: Math.random() > 0.3, // Random billable status
        startDate: date.toISOString().split('T')[0],
        startTime: '09:00:00',
        endDate: date.toISOString().split('T')[0],
        endTime: '17:00:00',
        hoursWorked: hours,
        durationDecimal: (parseFloat(hours.split(':')[0]) + parseFloat(hours.split(':')[1]) / 60).toString(),
        uniqueEntryId,
        importBatchId: importLog.id
      });
      }
    }
    
    const createdTimeEntries = await db.insert(timeEntries).values(timeEntryRecords).returning();
    console.log(`Created ${createdTimeEntries.length} time entries`);

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }

  // Close the pool
  await pool.end();
  console.log('Database seeding completed!');
}

// Run the seeder
seedDatabase()
  .then(() => {
    console.log('Database is ready for use with sample data.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Unexpected error during database seeding:', err);
    process.exit(1);
  });
