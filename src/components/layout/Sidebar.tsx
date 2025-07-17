import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Users,
  FileText,
  DollarSign,
  Wrench,
  MessageSquare,
  Phone,
  Receipt,
  FileSpreadsheet,
  UserRound,
  Droplets,
  ChevronLeft,
  ChevronRight,
  Settings,
  Calendar,
  ClipboardList,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Applications", href: "/applications", icon: FileText },
  { name: "Ownership Changes", href: "/ownership-changes", icon: UserRound },
  { name: "Meter Replacements", href: "/meter-replacements", icon: Wrench },
  { name: "Financial Journals", href: "/financial-journals", icon: DollarSign },
  { name: "Customer Complaints", href: "/complaints", icon: MessageSquare },
  { name: "SMS Notifications", href: "/sms", icon: Phone },
  { name: "Invoices", href: "/invoices", icon: Receipt },
  { name: "Statements", href: "/statements", icon: FileSpreadsheet },
  { name: "Work Orders", href: "/work-orders", icon: ClipboardList },
  { name: "Maintenance Schedule", href: "/maintenance-schedule", icon: Calendar },
  { name: "Equipment Management", href: "/equipment-management", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">Mbombela Aqua</h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start mb-1",
                    collapsed && "justify-center"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;