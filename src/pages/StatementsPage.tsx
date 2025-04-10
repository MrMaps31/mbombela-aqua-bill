
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarText, Send, Plus } from "lucide-react";

const StatementsPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Statements</h1>
          <p className="text-muted-foreground">
            Generate and distribute customer statements
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Statements
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generate Statements</CardTitle>
            <CalendarText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4">
            <Button className="w-full">Generate Monthly Statements</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distribute Statements</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4">
            <Button className="w-full">Email Statements</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Statement Management</CardTitle>
            <CardDescription>
              View and manage customer statements
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <CalendarText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Customer Statement System</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-4">
                This section will contain functionality for generating monthly statements,
                distributing statements via email/SMS, and tracking statement history.
              </p>
              <Button>View Statement History</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StatementsPage;
