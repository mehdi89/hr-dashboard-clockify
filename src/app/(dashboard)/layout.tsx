import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard - Employee Time Tracking",
};

// Client component is separated to avoid metadata export issues
import { DashboardLayoutClient } from '@/components/layout/DashboardLayoutClient';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
