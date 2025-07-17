import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Plus, Filter, Search, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";

const EquipmentManagementPage = () => {
  const equipment = [
    {
      id: "EQ-001",
      name: "Water Pump A1",
      type: "Centrifugal Pump",
      location: "Pump Station A",
      status: "Operational",
      manufacturer: "Grundfos",
      model: "CR32-4",
      installDate: "2020-03-15",
      nextMaintenance: "2024-02-01",
      condition: "Good"
    },
    {
      id: "EQ-002",
      name: "Control Valve B2",
      type: "Control Valve",
      location: "Distribution Network",
      status: "Maintenance Required",
      manufacturer: "Emerson",
      model: "CV-250",
      installDate: "2019-08-10",
      nextMaintenance: "2024-01-18",
      condition: "Fair"
    },
    {
      id: "EQ-003",
      name: "Flow Meter C1",
      type: "Electromagnetic Flow Meter",
      location: "Main Distribution",
      status: "Operational",
      manufacturer: "Endress+Hauser",
      model: "Proline 300",
      installDate: "2021-11-22",
      nextMaintenance: "2024-03-15",
      condition: "Excellent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational": return "default";
      case "Maintenance Required": return "destructive";
      case "Out of Service": return "secondary";
      default: return "outline";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent": return "default";
      case "Good": return "secondary";
      case "Fair": return "outline";
      case "Poor": return "destructive";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Equipment Management</h1>
            <p className="text-muted-foreground">Monitor and manage water system equipment</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Equipment
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-green-500" />
                Operational
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">Working normally</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-500" />
                Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-sm text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-red-500" />
                Out of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-sm text-muted-foreground">Not operational</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Total Equipment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-sm text-muted-foreground">In inventory</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search equipment..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid gap-4">
          {equipment.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="text-sm">{item.id} • {item.type}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                    <Badge variant={getConditionColor(item.condition)}>{item.condition}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div><strong>Location:</strong> {item.location}</div>
                    <div><strong>Manufacturer:</strong> {item.manufacturer}</div>
                    <div><strong>Model:</strong> {item.model}</div>
                  </div>
                  <div className="space-y-2">
                    <div><strong>Install Date:</strong> {item.installDate}</div>
                    <div><strong>Next Maintenance:</strong> {item.nextMaintenance}</div>
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

export default EquipmentManagementPage;