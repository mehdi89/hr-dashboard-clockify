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

// Define departments based on roles and groups
function determineDepartment(role: string, group: string): string {
  if (group.includes('Dev') || group.includes('Member')) {
    return 'Engineering';
  }
  
  if (role === 'Admin') {
    return 'Operations';
  }
  
  if (role === 'Owner') {
    return 'Management';
  }
  
  // Default departments based on common patterns
  if (role.includes('Design') || group.includes('Design')) {
    return 'Design';
  }
  
  if (role.includes('Market') || group.includes('Market')) {
    return 'Marketing';
  }
  
  // Default to a generic department
  return 'General';
}

// Determine employment type and weekly hours based on daily capacity
function determineEmploymentDetails(dailyCapacity: string): { type: EmploymentType, weeklyHours: number } {
  const hours = parseFloat(dailyCapacity);
  
  if (hours >= 8) {
    return { type: EmploymentType.FULL_TIME, weeklyHours: 40 };
  } else if (hours >= 6) {
    return { type: EmploymentType.FULL_TIME, weeklyHours: 35 };
  } else if (hours >= 4) {
    return { type: EmploymentType.PART_TIME, weeklyHours: 20 };
  } else {
    return { type: EmploymentType.PART_TIME, weeklyHours: Math.round(hours * 5) };
  }
}

async function seedEmployees() {
  console.log('Starting employee database seeding...');
  
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
    const csvFilePath = path.resolve(__dirname, '../Clockify_Members_23_04_2025.csv');
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    
    // Parse the CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`Parsed ${records.length} employee records from CSV file`);
    
    // Create employees
    console.log('Creating employees...');
    let createdEmployees = 0;
    
    for (const record of records) {
      const name = record.Name;
      const email = record.Email;
      const role = record.Role || '';
      const group = record.Group || '';
      const status = record.Status === 'active';
      const dailyCapacity = record['Daily work capacity (h)'];
      
      // Determine department
      const department = determineDepartment(role, group);
      
      // Determine employment type and weekly hours
      const { type: employmentType, weeklyHours } = determineEmploymentDetails(dailyCapacity);
      
      // Create a start date (first day of current month for simplicity)
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      
      try {
        // Insert employee
        await pool.query(`
          INSERT INTO employees (
            name, 
            email, 
            department, 
            employment_type, 
            weekly_committed_hours, 
            start_date, 
            is_active, 
            clockify_name
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          name,
          email,
          department,
          employmentType,
          weeklyHours,
          startDate.toISOString().split('T')[0],
          status,
          name // Using name as clockifyName for backward compatibility
        ]);
        
        createdEmployees++;
        console.log(`Created employee: ${name} (${email}) - ${department}`);
      } catch (error: any) {
        console.error(`Error creating employee ${name}: ${error.message}`);
      }
    }
    
    console.log(`Successfully created ${createdEmployees} out of ${records.length} employees`);

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
    console.log('Database seeding completed!');
  }
}

// Run the seeder
seedEmployees()
  .then(() => {
    console.log('Employee database is ready for use with sample data.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Unexpected error during database seeding:', err);
    process.exit(1);
  });
