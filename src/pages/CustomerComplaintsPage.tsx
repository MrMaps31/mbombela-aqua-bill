
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Plus } from "lucide-react";

const CustomerComplaintsPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Complaints</h1>
          <p className="text-muted-foreground">
            Track and resolve customer issues and complaints
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Record Complaint
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Complaint Management</CardTitle>
            <CardDescription>
              Record and track resolution of customer complaints
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Customer Complaint Tracking</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-4">
                This section will contain functionality for recording, categorizing, assigning, and resolving customer complaints.
              </p>
              <Button>Get Started</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CustomerComplaintsPage;
