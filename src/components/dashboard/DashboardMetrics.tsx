import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Droplets, AlertTriangle, TrendingUp, Clock } from "lucide-react";

const DashboardMetrics = () => {
  const metrics = [
    {
      title: "Active Customers",
      value: "2,847",
      description: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Monthly Revenue",
      value: "R 1,234,567",
      description: "+8% from last month",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Water Consumption",
      value: "45,678 kL",
      description: "This month",
      icon: Droplets,
      color: "text-blue-500",
    },
    {
      title: "Outstanding Bills",
      value: "R 234,567",
      description: "From 456 customers",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Collection Rate",
      value: "89.2%",
      description: "+2.1% from last month",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Pending Applications",
      value: "23",
      description: "Awaiting approval",
      icon: Clock,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardMetrics;