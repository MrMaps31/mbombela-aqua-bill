import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: "payment",
      customer: "John Doe",
      description: "Payment received",
      amount: "R 1,250.00",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "complaint",
      customer: "Sarah Wilson",
      description: "Low water pressure complaint",
      amount: null,
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "application",
      customer: "Mike Johnson",
      description: "New connection application",
      amount: null,
      time: "6 hours ago",
      status: "processing",
    },
    {
      id: 4,
      type: "ownership",
      customer: "Lisa Brown",
      description: "Ownership transfer request",
      amount: null,
      time: "8 hours ago",
      status: "approved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>
          Latest customer interactions and system updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {activity.customer.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.customer}</p>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                  {activity.amount && (
                    <span className="font-medium text-green-600 ml-2">
                      {activity.amount}
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;