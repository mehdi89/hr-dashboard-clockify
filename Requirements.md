# Employee Time Tracking System - Phase 1 Requirements

## 1. System Overview

A simple yet effective system to track employee work hours against their committed hours. The system will import Clockify CSV reports, compare against pre-defined hour commitments, and generate basic reports and visualizations.

## 2. Core Features

### 2.1 Employee Management

- Add and edit employee profiles
- Set weekly committed hours
- Assign departments and employment type

#### Employee Profile Fields:
- Employee ID (system-generated)
- Name (as appears in Clockify)
- Department/Team
- Employment Type (Full-time/Part-time)
- Weekly Committed Hours
- Start Date
- Active/Inactive Status

### 2.2 Time Data Import

- CSV file upload from Clockify
- Duplicate detection to prevent reimporting the same data

#### Import Process:
- Upload Clockify CSV file (format matching the provided sample)
- System validates data and checks for duplicate date ranges
- System shows preview before confirmation
- Upon confirmation, data is imported into the system

#### Duplicate Detection:
- Check for matching user + date range combinations
- Alert if attempting to import previously imported data
- Option to override with confirmation

### 2.3 Basic Reporting

- Individual employee reports
- Team/department summaries
- Weekly and monthly views

#### Standard Reports:
- Weekly Commitment vs. Actual Hours
- Project Distribution (hours by project)
- Department Summary

#### Report Filters:
- Date Range (week/month)
- Employee(s)
- Department
- Project

### 2.4 Basic Dashboard

- Summary metrics
- Simple visualizations
- Weekly/monthly views

#### Key Visualizations:
- Completion Rate Chart (actual vs. committed hours)
- Hours by Project Bar Chart
- Weekly Trend Line Chart
- Department Distribution Pie Chart

## 3. Technical Requirements

### 3.1 Data Structure

#### Employee Data:
- Employee ID
- Name
- Department
- Employment Type
- Weekly Committed Hours
- Status (Active/Inactive)

#### Time Entry Data:
- Entry ID
- Employee ID (linked to employee)
- Date
- Project
- Hours Worked
- Import Batch ID

#### Import Log:
- Import ID
- Date Range
- Import Date
- Status (successful/failed)
- File Name

### 3.2 User Interface

#### Dashboard View:
- Weekly summary at the top
- 3-4 key visualizations
- Quick filters for date and department

#### Employee Management:
- List view with search and filter
- Simple form for adding/editing employees
- Bulk import option for initial setup

#### Import Interface:
- File upload area
- Preview table of data to be imported
- Confirmation button
- Error messages for duplicates or invalid data

#### Reports View:
- Report type selection
- Date range selector
- Export button (PDF/CSV)

## 4. Sample Workflows

### 4.1 Weekly Import Process

1. User downloads weekly report from Clockify as CSV
2. User navigates to import page in the system
3. User uploads CSV file
4. System validates the file format and checks for duplicates
5. System displays a preview of the data to be imported
6. User confirms the import
7. System processes the data and updates all reports

### 4.2 Viewing Employee Performance

1. User navigates to reports section
2. User selects "Weekly Commitment vs. Actual" report
3. User selects employee name and date range
4. System generates report showing:
   - Committed hours for the period
   - Actual hours worked
   - Difference (surplus/deficit)
   - Breakdown by project
5. User can export the report if needed

## 5. Implementation Approach

### 5.1 Technology Stack (Recommendation)
- Frontend: React or Vue.js
- Backend: Node.js with Express
- Database: MongoDB or PostgreSQL
- Visualizations: Chart.js or Recharts

### 5.2 Development Phases
1. Database setup and employee management
2. CSV import functionality with duplicate detection
3. Basic reporting engine
4. Dashboard and visualizations
5. Export functionality

## 6. CSV Format Compatibility

The system will be designed to work with Clockify CSV exports in the following format:

```
"User","Project","Client","14/04/2025","15/04/2025","16/04/2025","17/04/2025","18/04/2025","19/04/2025","20/04/2025","Total","Amount"
"Employee Name","Project Name","Client Name","00:00:00","00:00:00","00:00:00","00:00:00","00:00:00","00:00:00","00:00:00","00:00:00","0.0"
```

The system will parse this format to extract:
- Employee names
- Project names
- Daily hours
- Weekly totals