"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ImportResult = {
  success: boolean;
  importId: number;
  entriesImported: number;
  totalEntries: number;
  skippedEntries: number;
  errors?: string[];
};

export function ImportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred during import");
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Failed to process the import. Please try again.");
      console.error("Import error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        {result ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-primary/10 p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Import Successful</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-background rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Import ID</p>
                  <p className="text-2xl font-bold">{result.importId}</p>
                </div>
                <div className="bg-background rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Entries Imported</p>
                  <p className="text-2xl font-bold">{result.entriesImported}</p>
                </div>
                <div className="bg-background rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                  <p className="text-2xl font-bold">{result.totalEntries}</p>
                </div>
                <div className="bg-background rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Skipped Entries</p>
                  <p className="text-2xl font-bold">{result.skippedEntries}</p>
                </div>
              </div>
              {result.errors && result.errors.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Warnings</h4>
                      <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-400 list-disc pl-5 space-y-1">
                        {result.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center mt-6">
                <Button onClick={() => setResult(null)}>Import Another File</Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-destructive mr-2" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                <FileUp className="mr-2 h-4 w-4" />
                {isSubmitting ? "Processing..." : "Upload and Process"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
