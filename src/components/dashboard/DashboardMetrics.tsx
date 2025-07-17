import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Droplets, AlertTriangle, TrendingUp, Clock } from "lucide-react";

const DashboardMetrics = () => {
  const metrics = [
    {
      title: "Active Customers",
      value: "96,234",
      description: "+2.3% from last month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Monthly Revenue",
      value: "R 12,847,532",
      description: "+8.4% from last month",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Water Consumption",
      value: "2,456,789 kL",
      description: "This month",
      icon: Droplets,
      color: "text-blue-500",
    },
    {
      title: "Outstanding Bills",
      value: "R 1,234,567",
      description: "From 2,847 customers",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Collection Rate",
      value: "94.7%",
      description: "+0.3% from last month",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Pending Applications",
      value: "247",
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