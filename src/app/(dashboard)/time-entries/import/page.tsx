import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { ImportForm } from "@/components/forms/ImportForm";
import { prisma } from "@/db";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Import Time Data - Time Tracking System",
};

export default async function ImportPage() {
  // Get recent imports
  const recentImports = await prisma.import_logs.findMany({
    orderBy: {
      importDate: 'desc'
    },
    take: 5
  });

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Import Time Data</h1>
        <p className="text-muted-foreground mt-1">Upload Clockify time reports for processing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ImportForm />

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
