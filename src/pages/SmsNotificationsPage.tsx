
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Plus } from "lucide-react";

const SmsNotificationsPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SMS Notifications</h1>
          <p className="text-muted-foreground">
            Send and manage bulk SMS notifications to customers
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New SMS Campaign
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>SMS Notifications</CardTitle>
            <CardDescription>
              Send SMS notifications to customers for important updates
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Send className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">SMS Notification System</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-4">
                This section will contain functionality for creating SMS templates, sending bulk messages,
                scheduling notifications, and tracking delivery status.
              </p>
              <Button>Get Started</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SmsNotificationsPage;
