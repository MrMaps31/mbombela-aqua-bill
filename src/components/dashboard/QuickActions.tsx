import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  UserPlus, 
  Receipt, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  Wrench,
  Phone,
  FileSpreadsheet 
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "New Customer",
      description: "Register a new customer account",
      icon: UserPlus,
      href: "/customers/new",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Generate Invoice",
      description: "Create a new invoice for a customer",
      icon: Receipt,
      href: "/invoices/new",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Record Complaint",
      description: "Log a customer complaint",
      icon: MessageSquare,
      href: "/complaints/new",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "New Application",
      description: "Process a new service application",
      icon: FileText,
      href: "/applications/new",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Financial Entry",
      description: "Add a financial journal entry",
      icon: DollarSign,
      href: "/financial-journals/new",
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      title: "Meter Replacement",
      description: "Schedule a meter replacement",
      icon: Wrench,
      href: "/meter-replacements/new",
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      title: "Send SMS",
      description: "Send SMS notifications to customers",
      icon: Phone,
      href: "/sms/new",
      color: "bg-teal-500 hover:bg-teal-600",
    },
    {
      title: "Generate Statement",
      description: "Create customer statement",
      icon: FileSpreadsheet,
      href: "/statements/new",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Frequently used actions for managing your water billing system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.href}>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-muted"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;