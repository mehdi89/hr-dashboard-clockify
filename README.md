# Employee Time Tracking System

A Next.js application for tracking employee working hours using data imported from Clockify time reports.

## Features

- **Employee Management**: Add, edit, and manage employee information
- **Time Tracking**: Import time data from Clockify CSV exports
- **Reporting**: View detailed time reports by employee, project, and date range
- **Dashboard**: View summary statistics and recent activity

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Optimized for Vercel deployment

## Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL database named `timetable` running locally

### Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```
   # Create a .env.local file with:
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/timetable
   ```

4. Generate database migrations:
   ```bash
   npm run db:generate
   ```

5. Run database migrations:
   ```bash
   npm run db:migrate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

- **employees**: Employee information including department and employment type
- **time_entries**: Time tracking records imported from Clockify
- **import_logs**: Records of CSV imports including status and summary information

## Deployment

This application is configured for seamless deployment to Vercel with PostgreSQL support:

1. Create a new project in Vercel
2. Connect your repository
3. Add the Vercel PostgreSQL integration
4. Deploy!

## Data Import Format

The application expects Clockify CSV reports with the following columns:
- User (employee's name in Clockify)
- Project
- Start Date
- Duration (decimal) or Duration (h)

All employees in the Clockify report must first be added to the system with matching `clockifyName` values.
