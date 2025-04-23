import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Clock, 
  Users, 
  Upload, 
  BarChart3, 
  Home, 
  Settings, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  PieChart,
  Briefcase,
  Tags,
  ListTodo,
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const [reportsOpen, setReportsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const reportLinks = [
    { href: '/reports/efficiency', label: 'Efficiency', icon: PieChart },
    { href: '/reports/projects', label: 'Projects', icon: Briefcase },
    { href: '/reports/work', label: 'Work', icon: Calendar },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card text-card-foreground p-6 shadow-sm transition-transform duration-300 ease-in-out",
          "md:translate-x-0 md:static md:z-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Time Tracking</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <nav className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs uppercase text-muted-foreground font-medium mb-2 px-2">Main</p>
            <NavLink href="/dashboard" icon={Home} label="Dashboard" isActive={isActive('/dashboard')} />
            <NavLink href="/employees" icon={Users} label="Employees" isActive={isActive('/employees')} />
            <NavLink href="/time-entries" icon={Clock} label="Time Entries" isActive={isActive('/time-entries')} />
          </div>
          
          <div className="space-y-1">
            <p className="text-xs uppercase text-muted-foreground font-medium mb-2 px-2">Data</p>
            <NavLink href="/time-entries/import" icon={Upload} label="Import Data" isActive={isActive('/time-entries/import')} />
            
            {/* Reports with submenu */}
            <div className="relative">
              <button
                onClick={() => setReportsOpen(!reportsOpen)}
                className={cn(
                  "flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive('/reports') 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4" />
                  <span>Reports</span>
                </div>
                {reportsOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {/* Submenu */}
              {reportsOpen && (
                <div className="pl-9 mt-1 space-y-1">
                  {reportLinks.map((link) => (
                    <NavLink 
                      key={link.href}
                      href={link.href} 
                      icon={link.icon} 
                      label={link.label} 
                      isActive={isActive(link.href)}
                      className="py-1.5"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs uppercase text-muted-foreground font-medium mb-2 px-2">Account</p>
            <NavLink href="/settings" icon={Settings} label="Settings" isActive={isActive('/settings')} />
            <NavLink href="/help" icon={HelpCircle} label="Help & Support" isActive={isActive('/help')} />
          </div>
        </nav>
      </aside>
    </>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  className?: string;
}

function NavLink({ href, icon: Icon, label, isActive, className }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
