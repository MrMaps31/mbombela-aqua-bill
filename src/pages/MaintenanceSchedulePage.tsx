import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Settings } from "lucide-react";

const MaintenanceSchedulePage = () => {
  const maintenanceTasks = [
    {
      id: "MT-001",
      task: "Pump Station Inspection",
      location: "Pump Station A",
      frequency: "Monthly",
      nextDue: "2024-01-20",
      status: "Scheduled",
      assignedTo: "Mike Wilson",
      estimatedHours: 4
    },
    {
      id: "MT-002",
      task: "Valve Lubrication",
      location: "Distribution Network",
      frequency: "Quarterly",
      nextDue: "2024-01-25",
      status: "Overdue",
      assignedTo: "Sarah Johnson",
      estimatedHours: 6
    },
    {
      id: "MT-003",
      task: "Water Tank Cleaning",
      location: "Storage Tank 1",
      frequency: "Semi-Annual",
      nextDue: "2024-02-01",
      status: "Planned",
      assignedTo: "John Smith",
      estimatedHours: 8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "default";
      case "Overdue": return "destructive";
      case "Planned": return "secondary";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Maintenance Schedule</h1>
            <p className="text-muted-foreground">Manage preventive maintenance tasks and schedules</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Maintenance Task
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Scheduled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-muted-foreground">Tasks this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-500" />
                Overdue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-green-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          {maintenanceTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{task.task}</CardTitle>
                      <CardDescription className="text-sm">{task.id} • {task.location}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div><strong>Frequency:</strong> {task.frequency}</div>
                    <div><strong>Next Due:</strong> {task.nextDue}</div>
                  </div>
                  <div className="space-y-2">
                    <div><strong>Assigned to:</strong> {task.assignedTo}</div>
                    <div><strong>Estimated Hours:</strong> {task.estimatedHours}</div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
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

export default MaintenanceSchedulePage;