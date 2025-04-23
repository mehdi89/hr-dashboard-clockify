"use client";

import React, { ReactNode } from "react";
import { TableCell as UITableCell } from "@/components/ui/table";

interface TableCellProps {
  content: any;
  type?: "text" | "date" | "status" | "action" | "custom";
  format?: (value: any) => ReactNode;
}

export function TableCell({ content, type = "text", format }: TableCellProps) {
  const renderContent = () => {
    if (format) {
      return format(content);
    }

    if (content === null || content === undefined) {
      return "-";
    }

    if (typeof content === "object") {
      return JSON.stringify(content);
    }

    return String(content);
  };

  return <UITableCell>{renderContent()}</UITableCell>;
}
