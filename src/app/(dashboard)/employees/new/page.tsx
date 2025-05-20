import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import { EmploymentType } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Add New Employee - Time Tracking System",
};

async function createEmployee(formData: FormData) {
  "use server";
  
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string || null;
  const department = formData.get("department") as string;
  const employmentType = formData.get("employmentType") as EmploymentType;
  const weeklyCommittedHours = parseInt(formData.get("weeklyCommittedHours") as string);
  const startDate = formData.get("startDate") as string;
  const isActive = formData.get("isActive") === "true";
  const clockifyName = formData.get("clockifyName") as string;
  
  // Insert the new employee using Prisma
  const result = await prisma.employees.create({
    data: {
      name,
      email,
      phone,
      department,
      employmentType,
      weeklyCommittedHours: weeklyCommittedHours,
      startDate: new Date(startDate),
      isActive,
      clockifyName
    },
    select: {
      id: true
    }
  });
  
  // Redirect to the employee's page
  if (result) {
    redirect(`/employees/${result.id}`);
  } else {
    // If insertion failed, redirect to employees list
    redirect('/employees');
  }
}

export default async function NewEmployeePage() {
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

  // Get current date in YYYY-MM-DD format for the default start date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserPlus className="h-8 w-8" />
            Add New Employee
          </h1>
          <p className="text-muted-foreground">
            Create a new employee record
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </Button>
      </div>

      <form action={createEmployee} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the employee's personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Full Name</div>
              <Input 
                id="name" 
                name="name" 
                placeholder="John Doe"
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Email</div>
              <Input 
                id="email" 
                name="email" 
                type="email"
                placeholder="john.doe@example.com"
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Phone</div>
              <Input 
                id="phone" 
                name="phone" 
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Clockify Name</div>
              <Input 
                id="clockifyName" 
                name="clockifyName" 
                placeholder="John Doe"
                required 
              />
              <p className="text-xs text-muted-foreground">
                This should match the employee's name in Clockify for time tracking integration
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
            <CardDescription>
              Enter employment status and department information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Department</div>
                <Select name="department" defaultValue="Engineering">
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Employment Type</div>
                <Select name="employmentType" defaultValue={EmploymentType.full_time}>
                  <SelectTrigger id="employmentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EmploymentType.full_time}>Full Time</SelectItem>
                    <SelectItem value={EmploymentType.part_time}>Part Time</SelectItem>
                    <SelectItem value={EmploymentType.contract}>Contract</SelectItem>
                    <SelectItem value={EmploymentType.freelance}>Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Weekly Committed Hours</div>
                <Input 
                  id="weeklyCommittedHours" 
                  name="weeklyCommittedHours" 
                  type="number" 
                  min="1" 
                  max="80" 
                  defaultValue="40"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Status</div>
                <Select name="isActive" defaultValue="true">
                  <SelectTrigger id="isActive">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Start Date</div>
                <Input 
                  id="startDate" 
                  name="startDate" 
                  type="date" 
                  defaultValue={today}
                  required 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Create Employee
          </Button>
        </div>
      </form>
    </div>
  );
}
