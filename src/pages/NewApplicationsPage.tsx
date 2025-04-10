
import { FilePlus, Plus, FileCheck } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const NewApplicationsPage = () => {
  // Sample data
  const applications = [
    {
      id: 1,
      applicationNumber: "APP-2025-001",
      customerName: "John Smith",
      propertyAddress: "123 Main Street, Mbombela",
      applicationType: "Residential",
      dateSubmitted: "2025-04-05",
      status: "Pending",
    },
    {
      id: 2,
      applicationNumber: "APP-2025-002",
      customerName: "Business Enterprises Ltd",
      propertyAddress: "45 Commercial Drive, Nelspruit",
      applicationType: "Commercial",
      dateSubmitted: "2025-04-04",
      status: "Under Review",
    },
    {
      id: 3,
      applicationNumber: "APP-2025-003",
      customerName: "Sarah Johnson",
      propertyAddress: "78 Riverside Road, White River",
      applicationType: "Residential",
      dateSubmitted: "2025-04-03",
      status: "Approved",
    },
    {
      id: 4,
      applicationNumber: "APP-2025-004",
      customerName: "City Hospital",
      propertyAddress: "10 Healthcare Avenue, Mbombela",
      applicationType: "Institutional",
      dateSubmitted: "2025-04-02",
      status: "Pending",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Under Review":
        return "info";
      case "Rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Applications</h1>
          <p className="text-muted-foreground">
            Manage applications for new water service connections
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FilePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M17.5 12h.01"/><path d="M12 12h.01"/><path d="M6.5 12h.01"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter(app => app.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter(app => app.status === "Under Review").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Being processed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <FileCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter(app => app.status === "Approved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for installation
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application List</CardTitle>
          <CardDescription>
            View and manage all applications for new water connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Property Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.applicationNumber}</TableCell>
                  <TableCell>{app.customerName}</TableCell>
                  <TableCell>{app.propertyAddress}</TableCell>
                  <TableCell>{app.applicationType}</TableCell>
                  <TableCell>{app.dateSubmitted}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(app.status) as any}>{app.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default NewApplicationsPage;
