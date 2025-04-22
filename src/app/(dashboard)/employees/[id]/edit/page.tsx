import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { employees, EmploymentType } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Edit Employee - Time Tracking System",
};

async function updateEmployee(formData: FormData) {
  "use server";
  
  const id = parseInt(formData.get("id") as string);
  
  if (isNaN(id)) {
    throw new Error("Invalid employee ID");
  }
  
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const department = formData.get("department") as string;
  const employmentType = formData.get("employmentType") as EmploymentType;
  const weeklyCommittedHours = parseInt(formData.get("weeklyCommittedHours") as string);
  const startDate = formData.get("startDate") as string;
  const isActive = formData.get("isActive") === "true";
  
  await db.update(employees)
    .set({
      name,
      email,
      phone,
      department,
      employmentType,
      weeklyCommittedHours,
      startDate,
      isActive
    })
    .where(eq(employees.id, id));
  
  redirect(`/employees/${id}`);
}

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  // Await params before using its properties
  const paramsData = await params;
  const employeeId = parseInt(paramsData.id);
  
  if (isNaN(employeeId)) {
    return notFound();
  }

  // Fetch employee details
  const employeeResults = await db
    .select({
      id: employees.id,
      name: employees.name,
      email: employees.email,
      phone: employees.phone,
      department: employees.department,
      employmentType: employees.employmentType,
      weeklyCommittedHours: employees.weeklyCommittedHours,
      startDate: employees.startDate,
      isActive: employees.isActive,
      clockifyName: employees.clockifyName
    })
    .from(employees)
    .where(eq(employees.id, employeeId))
    .limit(1);
  
  const employee = employeeResults[0];

  if (!employee) {
    return notFound();
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8" />
            Edit Employee
          </h1>
          <p className="text-muted-foreground">
            Update employee information
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/employees/${employeeId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </Button>
      </div>

      <form action={updateEmployee} className="space-y-8">
        <input type="hidden" name="id" value={employeeId} />
        
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Update the employee's personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Full Name</div>
              <Input 
                id="name" 
                name="name" 
                defaultValue={employee.name} 
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Email</div>
              <Input 
                id="email" 
                name="email" 
                type="email"
                defaultValue={employee.email} 
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Phone</div>
              <Input 
                id="phone" 
                name="phone" 
                type="tel"
                defaultValue={employee.phone || ""} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
            <CardDescription>
              Update employment status and department information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Department</div>
                <Select name="department" defaultValue={employee.department}>
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
                <Select name="employmentType" defaultValue={employee.employmentType}>
                  <SelectTrigger id="employmentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EmploymentType.FULL_TIME}>Full Time</SelectItem>
                    <SelectItem value={EmploymentType.PART_TIME}>Part Time</SelectItem>
                    <SelectItem value={EmploymentType.CONTRACT}>Contract</SelectItem>
                    <SelectItem value={EmploymentType.FREELANCE}>Freelance</SelectItem>
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
                  defaultValue={employee.weeklyCommittedHours} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Status</div>
                <Select name="isActive" defaultValue={employee.isActive ? "true" : "false"}>
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
                  defaultValue={employee.startDate} 
                  required 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
