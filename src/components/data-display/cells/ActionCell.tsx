"use client";

import React, { ReactNode } from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, Pencil, Trash } from "lucide-react";

type ActionType = "view" | "edit" | "delete" | "custom";

interface ActionCellProps {
  href?: string;
  onClick?: () => void;
  type?: ActionType;
  label?: string;
  icon?: string;
  children?: ReactNode;
}

export function ActionCell({ 
  href, 
  onClick, 
  type = "view", 
  label, 
  icon,
  children 
}: ActionCellProps) {
  // Determine icon based on type or provided icon
  const renderIcon = () => {
    if (children) return null;
    
    if (icon) {
      switch (icon) {
        case "Eye":
          return <Eye className="mr-2 h-4 w-4" />;
        case "Pencil":
          return <Pencil className="mr-2 h-4 w-4" />;
        case "Trash":
          return <Trash className="mr-2 h-4 w-4" />;
        default:
          return null;
      }
    } else {
      switch (type) {
        case "view":
          return <Eye className="mr-2 h-4 w-4" />;
        case "edit":
          return <Pencil className="mr-2 h-4 w-4" />;
        case "delete":
          return <Trash className="mr-2 h-4 w-4" />;
        default:
          return null;
      }
    }
  };

  // Determine label based on type or provided label
  const actionLabel = label || (
    type === "view" ? "View" :
    type === "edit" ? "Edit" :
    type === "delete" ? "Delete" : ""
  );

  // Render button content
  const buttonContent = (
    <>
      {renderIcon()}
      {actionLabel}
    </>
  );

  return (
    <TableCell>
      {children ? (
        children
      ) : href ? (
        <Button variant="ghost" size="sm" asChild>
          <Link href={href}>
            {buttonContent}
          </Link>
        </Button>
      ) : onClick ? (
        <Button variant="ghost" size="sm" onClick={onClick}>
          {buttonContent}
        </Button>
      ) : (
        <span className="text-muted-foreground">No action</span>
      )}
    </TableCell>
  );
}
