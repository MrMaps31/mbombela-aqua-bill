import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import RecentActivities from "@/components/dashboard/RecentActivities";
import QuickActions from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Mbombela Aqua Billing System
          </p>
        </div>

        <DashboardMetrics />
        
        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivities />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
