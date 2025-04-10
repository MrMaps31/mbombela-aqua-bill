
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Plus } from "lucide-react";

const MeterReplacementsPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meter Replacements</h1>
          <p className="text-muted-foreground">
            Manage meter replacements and maintenance
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Replacement
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Meter Replacements</CardTitle>
            <CardDescription>
              Schedule and track meter replacement activities
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Gauge className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Meter Replacement Management</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-4">
                This section will contain functionality for requesting, scheduling, and tracking meter replacements.
              </p>
              <Button>Get Started</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MeterReplacementsPage;
