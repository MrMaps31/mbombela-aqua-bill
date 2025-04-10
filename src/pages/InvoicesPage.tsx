
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Plus } from "lucide-react";

const InvoicesPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Generate and manage customer invoices
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Invoice Management</CardTitle>
            <CardDescription>
              Create, view, and manage customer invoices
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Invoice Generation System</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-4">
                This section will contain functionality for creating invoices, applying tariffs,
                generating batch invoices, and tracking payment status.
              </p>
              <Button>Get Started</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvoicesPage;
