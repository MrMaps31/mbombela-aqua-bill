
import { UserRound, FileText, ClipboardCheck } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const OwnershipChangesPage = () => {
  // Sample data
  const ownershipChanges = [
    {
      id: 1,
      requestNumber: "COO-2025-001",
      propertyAddress: "25 Palm Avenue, Mbombela",
      previousOwner: "James Wilson",
      newOwner: "Michael Thompson",
      dateRequested: "2025-04-07",
      status: "Pending",
    },
    {
      id: 2,
      requestNumber: "COO-2025-002",
      propertyAddress: "42 Oak Street, Nelspruit",
      previousOwner: "Sarah Johnson",
      newOwner: "Elizabeth Brown",
      dateRequested: "2025-04-05",
      status: "Processing",
    },
    {
      id: 3,
      requestNumber: "COO-2025-003",
      propertyAddress: "17 River View, White River",
      previousOwner: "Retail Properties Ltd",
      newOwner: "ABC Investments",
      dateRequested: "2025-04-02",
      status: "Complete",
    },
  ];

  // Function to get the appropriate badge variant
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Complete":
        return "secondary";
      case "Processing":
        return "default";
      case "Pending":
      default:
        return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ownership Changes</h1>
          <p className="text-muted-foreground">
            Manage change of ownership requests for properties
          </p>
        </div>
        <Button>
          <UserRound className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownershipChanges.filter(c => c.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownershipChanges.filter(c => c.status === "Processing").length}
            </div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complete</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownershipChanges.filter(c => c.status === "Complete").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Processed this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Ownership Changes</CardTitle>
          <CardDescription>
            View and manage property ownership change requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request #</TableHead>
                <TableHead>Property Address</TableHead>
                <TableHead>Previous Owner</TableHead>
                <TableHead>New Owner</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ownershipChanges.map((change) => (
                <TableRow key={change.id}>
                  <TableCell className="font-medium">{change.requestNumber}</TableCell>
                  <TableCell>{change.propertyAddress}</TableCell>
                  <TableCell>{change.previousOwner}</TableCell>
                  <TableCell>{change.newOwner}</TableCell>
                  <TableCell>{change.dateRequested}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(change.status)}>
                      {change.status}
                    </Badge>
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
    </DashboardLayout>
  );
};

export default OwnershipChangesPage;
