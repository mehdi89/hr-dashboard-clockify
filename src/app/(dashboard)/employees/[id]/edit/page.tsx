import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, User } from "lucide-react";

// Define an enum for EmploymentType to match Prisma schema
enum EmploymentType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  FREELANCE = "freelance"
}

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
  
  await prisma.employees.update({
    where: {
      id: id
    },
    data: {
      name,
      email,
      phone,
      department,
      employmentType,
      weeklyCommittedHours,
      startDate: new Date(startDate),
      isActive
    }
  });
  
  redirect(`/employees/${id}`);
}

export default async function EditEmployeePage(props: any) {
  const { params } = props;
  const employeeId = parseInt(params.id);
  
  if (isNaN(employeeId)) {
    return notFound();
  }

  // Fetch employee details using Prisma
  const employee = await prisma.employees.findUnique({
    where: {
      id: employeeId
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      department: true,
      employmentType: true,
      weeklyCommittedHours: true,
      startDate: true,
      isActive: true,
      clockifyName: true
    }
  });

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
                  defaultValue={employee.startDate ? employee.startDate.toISOString().split('T')[0] : ''} 
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
