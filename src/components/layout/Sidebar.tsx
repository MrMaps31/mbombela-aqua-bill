
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Gauge, 
  Receipt, 
  AlertTriangle, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Droplets,
  Home,
  Building,
  FileText,
  FilePlus,
  UserRound,
  MessageSquare,
  Send,
  Mail,
  CalendarText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Customers', path: '/customers', icon: <Users className="h-5 w-5" /> },
    { name: 'Meter Readings', path: '/meter-readings', icon: <Gauge className="h-5 w-5" /> },
    { name: 'Billing', path: '/billing', icon: <Receipt className="h-5 w-5" /> },
    { name: 'Credit Control', path: '/credit-control', icon: <AlertTriangle className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const financialItems = [
    { name: 'Financial Journals', path: '/financial-journals', icon: <FileText className="h-5 w-5" /> },
    { name: 'New Applications', path: '/new-applications', icon: <FilePlus className="h-5 w-5" /> },
    { name: 'Ownership Changes', path: '/ownership-changes', icon: <UserRound className="h-5 w-5" /> },
    { name: 'Meter Replacements', path: '/meter-replacements', icon: <Gauge className="h-5 w-5" /> },
    { name: 'Customer Complaints', path: '/customer-complaints', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'SMS Notifications', path: '/sms-notifications', icon: <Send className="h-5 w-5" /> },
    { name: 'Invoices', path: '/invoices', icon: <Receipt className="h-5 w-5" /> },
    { name: 'Statements', path: '/statements', icon: <CalendarText className="h-5 w-5" /> },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-full border-r bg-sidebar transition-width duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {isOpen ? (
          <div className="flex items-center">
            <Droplets className="h-6 w-6 text-aqua-600" />
            <span className="ml-2 font-bold text-lg">Mbombela Aqua</span>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Droplets className="h-6 w-6 text-aqua-600" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:flex hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>

      <div className="py-4 px-2 overflow-y-auto">
        <div className={cn("space-y-1", isOpen ? "px-2" : "")}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return isOpen ? (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ) : (
              <TooltipProvider key={item.path}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex justify-center items-center p-2 text-sm rounded-md",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      {item.icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>

        {isOpen && (
          <>
            <div className="mt-6 px-4">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-sidebar-foreground/60">
                  BILLING GROUPS
                </div>
                <div className="space-y-1">
                  <Link 
                    to="/billing-groups/mbombela"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50"
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Mbombela
                  </Link>
                  <Link 
                    to="/billing-groups/nelspruit"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Nelspruit
                  </Link>
                  <Link 
                    to="/billing-groups/white-river"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    White River
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 px-4">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-sidebar-foreground/60">
                  FINANCIAL & CUSTOMER MANAGEMENT
                </div>
                <div className="space-y-1">
                  {financialItems.map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md",
                        location.pathname === item.path
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
