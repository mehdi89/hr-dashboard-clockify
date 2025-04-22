import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Clock, 
  Users, 
  Upload, 
  BarChart3, 
  Home, 
  Settings, 
  Bell, 
  HelpCircle, 
  User 
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: "Dashboard - Employee Time Tracking",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-card text-card-foreground p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Time Tracking</h1>
          <ThemeToggle />
        </div>
        
        <nav className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs uppercase text-muted-foreground font-medium mb-2 px-2">Main</p>
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              href="/employees" 
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Users className="h-4 w-4" />
              Employees
            </Link>
            <Link 
              href="/time-entries" 
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Clock className="h-4 w-4" />
              Time Entries
            </Link>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs uppercase text-muted-foreground font-medium mb-2 px-2">Data</p>
            <Link 
              href="/time-entries/import" 
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Upload className="h-4 w-4" />
              Import Data
            </Link>
            <Link 
              href="/reports" 
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              Reports
            </Link>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs uppercase text-muted-foreground font-medium mb-2 px-2">Account</p>
            <Link 
              href="/settings" 
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link 
              href="/help" 
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </Link>
          </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-background overflow-auto">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
