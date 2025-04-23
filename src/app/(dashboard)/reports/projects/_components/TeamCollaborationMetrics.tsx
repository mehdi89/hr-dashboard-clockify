"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployeeProjectDistribution } from "../actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TeamCollaborationMetricsProps {
  data: EmployeeProjectDistribution[];
}

type CollaborationPair = {
  employee1: string;
  employee2: string;
  employee1Id: number;
  employee2Id: number;
  sharedProjects: string[];
  totalHours: number;
};

export function TeamCollaborationMetrics({ data }: TeamCollaborationMetricsProps) {
  const collaborationMetrics = useMemo(() => {
    // Group data by employee
    const employeeProjects = new Map<number, { name: string, projects: Set<string> }>();
    
    // Create a map of projects to employees
    const projectEmployees = new Map<string, Set<number>>();
    
    // Process data
    data.forEach(item => {
      // Add to employee projects map
      if (!employeeProjects.has(item.employeeId)) {
        employeeProjects.set(item.employeeId, {
          name: item.employeeName,
          projects: new Set()
        });
      }
      employeeProjects.get(item.employeeId)!.projects.add(item.project);
      
      // Add to project employees map
      if (!projectEmployees.has(item.project)) {
        projectEmployees.set(item.project, new Set());
      }
      projectEmployees.get(item.project)!.add(item.employeeId);
    });
    
    // Calculate collaboration pairs
    const collaborationPairs: CollaborationPair[] = [];
    const processedPairs = new Set<string>();
    
    Array.from(employeeProjects.entries()).forEach(([id1, employee1]) => {
      Array.from(employeeProjects.entries()).forEach(([id2, employee2]) => {
        // Skip self-comparisons and already processed pairs
        if (id1 >= id2) return;
        
        const pairKey = `${id1}-${id2}`;
        if (processedPairs.has(pairKey)) return;
        processedPairs.add(pairKey);
        
        // Find shared projects
        const sharedProjects: string[] = [];
        let totalHours = 0;
        
        Array.from(employee1.projects).forEach(project => {
          if (employee2.projects.has(project)) {
            sharedProjects.push(project);
            
            // Calculate total hours for this project pair
            const projectHours = data
              .filter(item => 
                (item.employeeId === id1 || item.employeeId === id2) && 
                item.project === project
              )
              .reduce((sum, item) => sum + item.totalHours, 0);
            
            totalHours += projectHours;
          }
        });
        
        if (sharedProjects.length > 0) {
          collaborationPairs.push({
            employee1: employee1.name,
            employee2: employee2.name,
            employee1Id: id1,
            employee2Id: id2,
            sharedProjects,
            totalHours
          });
        }
      });
    });
    
    // Sort by number of shared projects and total hours
    return collaborationPairs.sort((a, b) => {
      if (b.sharedProjects.length !== a.sharedProjects.length) {
        return b.sharedProjects.length - a.sharedProjects.length;
      }
      return b.totalHours - a.totalHours;
    }).slice(0, 5); // Take top 5 collaboration pairs
  }, [data]);

  // Calculate team size and total collaboration pairs
  const teamStats = useMemo(() => {
    const uniqueEmployees = new Set(data.map(item => item.employeeId));
    const teamSize = uniqueEmployees.size;
    const maxPossiblePairs = (teamSize * (teamSize - 1)) / 2;
    const actualPairs = collaborationMetrics.length;
    const collaborationRate = maxPossiblePairs > 0 ? (actualPairs / maxPossiblePairs) * 100 : 0;
    
    return {
      teamSize,
      maxPossiblePairs,
      actualPairs,
      collaborationRate
    };
  }, [data, collaborationMetrics]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Collaboration</CardTitle>
        <CardDescription>
          How team members work together on projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-sm text-muted-foreground">Team Size</div>
            <div className="text-2xl font-bold">{teamStats.teamSize}</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-sm text-muted-foreground">Collaboration Rate</div>
            <div className="text-2xl font-bold">{teamStats.collaborationRate.toFixed(0)}%</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Top Collaborating Pairs</h3>
          
          {collaborationMetrics.length > 0 ? (
            <div className="space-y-3">
              {collaborationMetrics.map((pair, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">
                      <Link href={`/employees/${pair.employee1Id}`} className="hover:underline">
                        {pair.employee1}
                      </Link>
                      {" + "}
                      <Link href={`/employees/${pair.employee2Id}`} className="hover:underline">
                        {pair.employee2}
                      </Link>
                    </div>
                    <Badge variant="outline">
                      {pair.sharedProjects.length} shared project{pair.sharedProjects.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {pair.totalHours.toFixed(1)} hours of collaboration
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pair.sharedProjects.map((project, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No collaboration data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
