import { prisma } from '../src/db';
import { EmploymentType } from '../src/generated/prisma';
import { hashPassword } from '../src/lib/auth';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

/**
 * Main seeding function that orchestrates the entire database seeding process
 */
async function seedDatabase() {
  console.log('Starting database seeding...');

  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable not set!');
    process.exit(1);
  }

  try {
    // Clear existing data
    await clearExistingData();
    
    // Create admin user(s)
    await seedAdminUsers();
    
    // Create employees
    const employees = await seedEmployees();
    
    // Create time entries
    // await seedTimeEntries(employees);
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    // Disconnect Prisma
    await prisma.$disconnect();
  }
}

/**
 * Clear all existing data from the database in the correct order
 */
async function clearExistingData() {
  console.log('Clearing existing data...');
  await prisma.time_entries.deleteMany({});
  await prisma.import_logs.deleteMany({});
  await prisma.employees.deleteMany({});
  await prisma.users.deleteMany({});
  console.log('All existing data cleared');
}

/**
 * Create admin user(s) for the application
 */
async function seedAdminUsers() {
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin';
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    console.log(`Creating admin user: ${username}`);
    
    // Hash the password
    const passwordHash = await hashPassword(password);
    
    // Create admin user
    await prisma.users.create({
      data: {
        username,
        passwordHash,
        name: 'Administrator',
        email,
        role: 'admin',
      }
    });
    
    console.log('Admin user created successfully');
    return true;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

/**
 * Helper function to determine department based on role and group
 */
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

/**
 * Helper function to determine employment type and hours
 */
function determineEmploymentDetails(dailyCapacity: string): { type: EmploymentType, weeklyHours: number } {
    const hours = parseFloat(dailyCapacity);

    if (hours >= 8) {
        return { type: EmploymentType.full_time, weeklyHours: 40 };
    } else if (hours >= 6) {
        return { type: EmploymentType.full_time, weeklyHours: 35 };
    } else if (hours >= 4) {
        return { type: EmploymentType.part_time, weeklyHours: 20 };
    } else {
        return { type: EmploymentType.part_time, weeklyHours: Math.round(hours * 5) };
    }
}

/**
 * Create employees in the database
 */
async function seedEmployees() {
    console.log('Creating employees...');
    
    // Employee records with names and details
    const records = [
        // Original employees
        {
            "Name": "Shahid Parvez",
            "Email": "support@tubeonai.com",
            "Billable Rate (USD)": "",
            "Role": "Support",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Rasin",
            "Email": "alrasin500@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Developer",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Mohaiminul TubeOnAI",
            "Email": "mohaiminul.tubeonai@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Designer",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Arpita Saha",
            "Email": "arpitasaha7423@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Marketing",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "HM Himel",
            "Email": "h.himel@tubeonai.com",
            "Billable Rate (USD)": "",
            "Role": "Content",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Ariful Hoque",
            "Email": "hoquea57@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Developer",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Maksud",
            "Email": "f.maksud@tubeonai.com",
            "Billable Rate (USD)": "",
            "Role": "HR",
            "Group": "Dev, Member",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "ArghyaRaj Niloy",
            "Email": "hello.arniloy@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Designer",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "4.00"
        },
        {
            "Name": "Rezaur Rahaman",
            "Email": "rezaurrahaman16@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "QA",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Faisal",
            "Email": "faisaljr623@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Developer",
            "Group": "Dev, Member",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        
        // Additional employees mentioned in error logs
        {
            "Name": "Sakib Islam",
            "Email": "islamsakib.official@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Developer",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Shadat Rahman",
            "Email": "shadat.rahman.464@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Developer",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Mushtafizur Rahman",
            "Email": "rahman.mushtafizur@gmail.com",
            "Billable Rate (USD)": "",
            "Role": "Developer",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Mehdi Hasan",
            "Email": "m.hasan@tubeonai.com",
            "Billable Rate (USD)": "",
            "Role": "Engineering",
            "Group": "Dev, Lead",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        },
        {
            "Name": "Rahaman R",
            "Email": "r.rahaman@tubeonai.com",
            "Billable Rate (USD)": "",
            "Role": "QA",
            "Group": "",
            "Status": "active",
            "Week start": "Monday",
            "Working days": "Mon, Tue, Wed, Thu, Fri",
            "Daily work capacity (h)": "8.00"
        }
    ];

    const createdEmployees = [];

    // Create each employee and collect them
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
            // Insert employee using Prisma
            const employee = await prisma.employees.create({
                data: {
                    name,
                    email,
                    department,
                    employmentType,
                    weeklyCommittedHours: weeklyHours,
                    startDate,
                    isActive: status,
                    clockifyName: name // Using name as clockifyName for backward compatibility
                }
            });

            createdEmployees.push(employee);
            console.log(`Created employee: ${name} (${email}) - ${department}`);
        } catch (error: any) {
            console.error(`Error creating employee ${name}: ${error.message}`);
        }
    }

    console.log(`Successfully created ${createdEmployees.length} out of ${records.length} employees`);
    return createdEmployees;
}

/**
 * Helper to generate a random time
 */
function randomTime(): string {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Generate and create time entries for employees
 */
async function seedTimeEntries(employees: any[]) {
    console.log('Creating time entries...');

    // Create a dummy import log to associate with time entries
    const dummyImportLog = await prisma.import_logs.create({
        data: {
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            endDate: new Date(),
            status: 'successful',
            fileName: 'seed-data-import.csv'
        }
    });
    
    console.log(`Created dummy import log with ID: ${dummyImportLog.id}`);
    
    // Sample projects
    const projects = [
        'Website Development',
        'Mobile App',
        'UI/UX Design',
        'Backend API',
        'Content Creation',
        'QA Testing',
        'Support',
        'Research'
    ];

    // Sample tasks
    const tasks = [
        'Implementation',
        'Bug Fix',
        'Design',
        'Testing',
        'Documentation',
        'Meeting',
        'Research',
        'Planning',
        'Review',
        'Deployment'
    ];

    // Sample clients
    const clients = [
        'TubeOnAI',
        'Internal',
        'Acme Corp',
        'Globex',
        'TechStart',
        'Innovate Inc',
        'BuildFast',
        ''
    ];

    // Today and 30 days ago for date range
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30);
    
    let totalEntriesCreated = 0;
    let batchCount = 0;
    
    // Generate entries for each employee
    for (const employee of employees) {
        // Full-time employees have more entries than part-time
        const entriesCount = employee.employmentType === 'full_time' ? 
            Math.floor(Math.random() * 30) + 40 : // 40-70 entries for full-time
            Math.floor(Math.random() * 20) + 15;  // 15-35 entries for part-time
        
        console.log(`Generating ${entriesCount} time entries for employee: ${employee.name}`);
        
        // Generate random entries batch
        const timeEntriesToInsert = [];
        
        for (let i = 0; i < entriesCount; i++) {
            // Random date between startDate and today
            const entryDate = new Date(startDate);
            entryDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
            
            // Format date to ISO string and get just the date part
            const formattedDate = entryDate.toISOString().split('T')[0];
            
            // Random project, task, client
            const project = projects[Math.floor(Math.random() * projects.length)];
            const task = tasks[Math.floor(Math.random() * tasks.length)];
            const client = clients[Math.floor(Math.random() * clients.length)];
            
            // Generate start and end times
            const startTime = randomTime();
            
            // Generate duration (30min to 8 hours in decimal, e.g., 0.5 to 8.0)
            const durationHours = (Math.floor(Math.random() * 15) + 1) / 2; // 0.5, 1.0, 1.5... to 8.0
            
            // Calculate end time (simplified)
            const startHours = parseInt(startTime.split(':')[0]);
            const startMinutes = parseInt(startTime.split(':')[1]);
            let endHours = startHours + Math.floor(durationHours);
            let endMinutes = startMinutes + Math.round((durationHours % 1) * 60);
            
            if (endMinutes >= 60) {
                endHours += 1;
                endMinutes -= 60;
            }
            
            // Ensure hours wrap around 24-hour clock
            endHours = endHours % 24;
            
            const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}:00`;
            
            // Format hours worked for display (hh:mm)
            const hoursWorkedHours = Math.floor(durationHours);
            const hoursWorkedMinutes = Math.round((durationHours - hoursWorkedHours) * 60);
            const hoursWorked = `${hoursWorkedHours.toString().padStart(2, '0')}:${hoursWorkedMinutes.toString().padStart(2, '0')}`;
            
            // Generate a unique entry ID
            const uniqueEntryId = `${employee.email}-${formattedDate}-${startTime}-${project}-${i}`.substring(0, 254);
            
            // Create a description
            const descriptions = [
                `Working on ${project} ${task.toLowerCase()}`,
                `${task} for ${project} project`,
                `${project}: ${task.toLowerCase()} development`,
                `${task} phase of ${project}`,
                `${client ? client + ' - ' : ''}${project} ${task.toLowerCase()}`
            ];
            
            const description = descriptions[Math.floor(Math.random() * descriptions.length)];
            
            // Add entry to batch
            timeEntriesToInsert.push({
                date: new Date(formattedDate),
                project,
                client,
                description,
                task,
                group: '',
                email: employee.email,
                startDate: new Date(formattedDate),
                startTime: new Date(`1970-01-01T${startTime}`),
                endDate: new Date(formattedDate),
                endTime: new Date(`1970-01-01T${endTime}`),
                hoursWorked: new Date(`1970-01-01T${hoursWorked}`),
                durationDecimal: durationHours,
                uniqueEntryId,
                // Connect to the employee and import log using Prisma relations
                employee: {
                    connect: {
                        id: employee.id
                    }
                },
                import_log: {
                    connect: {
                        id: dummyImportLog.id
                    }
                }
            });
        }
        
        // Insert batch
        for (const entry of timeEntriesToInsert) {
            try {
                await prisma.time_entries.create({
                    data: entry
                });
                totalEntriesCreated++;
            } catch (error: any) {
                // Skip duplicates but log other errors
                if (error.code !== 'P2002') {
                    console.error(`Error creating time entry: ${error.message}`);
                }
            }
        }
        
        batchCount++;
        console.log(`Created batch ${batchCount}/${employees.length}`);
    }
    
    console.log(`Successfully created ${totalEntriesCreated} time entries`);
    return totalEntriesCreated;
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
