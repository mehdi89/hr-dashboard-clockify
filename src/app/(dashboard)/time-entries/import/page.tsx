import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileUp, Info, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { db } from "@/db";
import { importLogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Import Time Data - Time Tracking System",
};

export default async function ImportPage() {
  // Get recent imports
  const recentImports = await db
    .select()
    .from(importLogs)
    .orderBy(desc(importLogs.importDate))
    .limit(5);

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Import Time Data</h1>
        <p className="text-muted-foreground mt-1">Upload Clockify time reports for processing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upload Time Report</CardTitle>
                  <CardDescription>
                    Import time tracking data from Clockify CSV exports
                  </CardDescription>
                </div>
                <FileUp className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <form action="/api/import" method="post" encType="multipart/form-data" className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-primary/10 p-3">
                      <FileUp className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-sm font-medium">
                      Drag and drop your CSV file here, or click to browse
                    </div>
                    <Input 
                      type="file" 
                      id="file" 
                      name="file"
                      accept=".csv" 
                      required
                      className="w-full max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground max-w-md">
                      Upload a Clockify time report in CSV format. File should contain employee names, project names, dates, and durations.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-md mb-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Date range will be automatically extracted from the CSV file. No need to specify start and end dates.
                  </p>
                </div>
                
                {/* Hidden fields for API compatibility */}
                <input type="hidden" id="startDate" name="startDate" value="2025-01-01" />
                <input type="hidden" id="endDate" name="endDate" value="2025-12-31" />

                <div className="flex justify-end">
                  <Button type="submit" className="w-full sm:w-auto">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload and Process
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Import History</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Recent data imports</CardDescription>
            </CardHeader>
            <CardContent>
              {recentImports.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No import history available</p>
              ) : (
                <div className="space-y-4">
                  {recentImports.map((importLog) => (
                    <div key={importLog.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{importLog.fileName}</div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(importLog.startDate), 'MMM d')} - {format(new Date(importLog.endDate), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={importLog.status === 'successful' ? 'success' : 'destructive'}>
                          {importLog.status === 'successful' ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          )}
                          {importLog.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(importLog.importDate), 'MM/dd/yyyy HH:mm')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm sticky top-8">
            <CardHeader className="flex flex-row items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <span>Export detailed time reports from Clockify in CSV format</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <span>Make sure the report includes user names, projects, descriptions, tasks, and start/end times</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <span>Verify that employee names in Clockify match the names in the system</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <span className="text-xs font-bold text-primary">4</span>
                  </div>
                  <span>Upload the file and wait for confirmation</span>
                </li>
              </ul>
              <div className="mt-6 p-3 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">
                  <strong>Tip:</strong> The system automatically extracts the date range from the CSV file and creates unique IDs for each entry to prevent duplicates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
