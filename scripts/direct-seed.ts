import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// Define employment types
enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
}

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
  [EmploymentType.PART_TIME]: 20,
  [EmploymentType.CONTRACT]: 30,
  [EmploymentType.FREELANCE]: 15
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

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await pool.query('DELETE FROM time_entries');
    await pool.query('DELETE FROM import_logs');
    await pool.query('DELETE FROM employees');
    
    // Read the CSV file
    const csvFilePath = path.resolve(__dirname, '../Clockify_Time_Report_Detailed_14_04_2025-20_04_2025.csv');
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    
    // Parse the CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`Parsed ${records.length} records from CSV file`);
    
    // Extract unique employees and their projects
    const employeeProjects: Record<string, string[]> = {};
    const employeeEmails: Record<string, string> = {};
    
    records.forEach((record: any) => {
      const employeeName = record.User;
      const project = record.Project;
      const email = record.Email;
      
      if (!employeeProjects[employeeName]) {
        employeeProjects[employeeName] = [];
        if (email) {
          employeeEmails[employeeName] = email;
        }
      }
      
      if (!employeeProjects[employeeName].includes(project)) {
        employeeProjects[employeeName].push(project);
      }
    });
    
    // Create import log
    console.log('Creating import log...');
    const importStartDate = new Date('2025-04-14');
    const importEndDate = new Date('2025-04-20');
    
    const importLogResult = await pool.query(`
      INSERT INTO import_logs (start_date, end_date, import_date, status, file_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `, [
      importStartDate.toISOString().split('T')[0],
      importEndDate.toISOString().split('T')[0],
      new Date(),
      'SUCCESS',
      'Clockify_Time_Report_Detailed_14_04_2025-20_04_2025.csv'
    ]);
    
    const importLogId = importLogResult.rows[0].id;
    console.log(`Created import log with ID: ${importLogId}`);
    
    // Create employees
    console.log('Creating employees...');
    const employeeMap = new Map<string, number>();
    
    for (const [employeeName, projects] of Object.entries(employeeProjects)) {
      // Determine primary project and department
      const primaryProject = projects[0];
      const department = projectToDepartment[primaryProject] || departments[Math.floor(Math.random() * departments.length)];
      
      // Randomly assign employment type
      const employmentType = Math.random() > 0.3 ? EmploymentType.FULL_TIME : EmploymentType.PART_TIME;
      
      // Create random start date
      const randomStartDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      
      // Insert employee
      const employeeResult = await pool.query(`
        INSERT INTO employees (name, email, department, employment_type, weekly_committed_hours, start_date, is_active, clockify_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `, [
        employeeName,
        employeeEmails[employeeName] || `${employeeName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        department,
        employmentType,
        committedHours[employmentType],
        randomStartDate.toISOString().split('T')[0],
        true,
        employeeName
      ]);
      
      const employeeId = employeeResult.rows[0].id;
      employeeMap.set(employeeName, employeeId);
    }
    
    console.log(`Created ${employeeMap.size} employees`);
    
    // Create time entries
    console.log('Creating time entries...');
    let createdEntries = 0;
    
    for (const record of records) {
      const employeeName = record.User;
      const employeeId = employeeMap.get(employeeName);
      
      if (!employeeId) {
        console.warn(`Employee not found: ${employeeName}`);
        continue;
      }
      
      // Parse the dates
      const [startDay, startMonth, startYear] = record['Start Date'].split('/');
      const startDate = `${startYear}-${startMonth}-${startDay}`;
      
      const [endDay, endMonth, endYear] = record['End Date'].split('/');
      const endDate = `${endYear}-${endMonth}-${endDay}`;

      // Convert "Yes"/"No" to boolean for billable
      const billable = record.Billable === 'Yes';
      
      // Create a unique entry ID
      const uniqueEntryId = `${employeeId}-${startDate}-${Math.random().toString(36).substring(2, 10)}`;
      
      // Normalize hours worked to handle large durations
      let hoursWorked = record['Duration (h)'];
      if (hoursWorked.includes(':')) {
        const [hours, minutes, seconds] = hoursWorked.split(':').map(Number);
        if (hours >= 24) {
          hoursWorked = '23:59:59'; // Cap at 23:59:59
        }
      }

      try {
        // Insert time entry
        await pool.query(`
          INSERT INTO time_entries (
            employee_id, date, project, client, description, task, "group", email, tags, billable,
            start_date, start_time, end_date, end_time, hours_worked, duration_decimal, unique_entry_id, import_batch_id
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        `, [
          employeeId,
          startDate,
          record.Project,
          record.Client || '',
          record.Description || '',
          record.Task || '',
          record.Group || '',
          record.Email || '',
          record.Tags || '',
          billable,
          startDate,
          record['Start Time'],
          endDate,
          record['End Time'],
          hoursWorked,
          record['Duration (decimal)'],
          uniqueEntryId,
          importLogId
        ]);
      } catch (error: any) {
        console.warn(`Error inserting time entry for ${record.User} on ${startDate}: ${error.message || 'Unknown error'}`);
        continue;
      }
      
      createdEntries++;
    }
    
    console.log(`Created ${createdEntries} time entries`);

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
