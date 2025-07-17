import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const WorkOrdersPage = () => {
  const workOrders = [
    {
      id: "WO-001",
      title: "Water Main Repair",
      location: "Corner of Main St & Oak Ave",
      priority: "High",
      status: "In Progress",
      assignedTo: "John Smith",
      createdDate: "2024-01-15",
      description: "Repair burst water main affecting 15 customers"
    },
    {
      id: "WO-002",
      title: "Meter Installation",
      location: "123 Pine Street",
      priority: "Medium",
      status: "Pending",
      assignedTo: "Sarah Johnson",
      createdDate: "2024-01-14",
      description: "Install new water meter for new customer"
    },
    {
      id: "WO-003",
      title: "Pressure Testing",
      location: "Sector 7 Distribution Network",
      priority: "Low",
      status: "Completed",
      assignedTo: "Mike Wilson",
      createdDate: "2024-01-13",
      description: "Monthly pressure testing for distribution network"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "default";
      case "Pending": return "secondary";
      case "Completed": return "outline";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Work Orders</h1>
            <p className="text-muted-foreground">Manage maintenance and repair work orders</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Work Order
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search work orders..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid gap-4">
          {workOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{order.title}</CardTitle>
                      <CardDescription className="text-sm">{order.id} • {order.location}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(order.priority)}>{order.priority}</Badge>
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{order.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span><strong>Assigned to:</strong> {order.assignedTo}</span>
                    <span><strong>Created:</strong> {order.createdDate}</span>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkOrdersPage;