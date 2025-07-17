
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OwnershipChangesPage from "./pages/OwnershipChangesPage";
import WorkOrdersPage from "./pages/WorkOrdersPage";
import MaintenanceSchedulePage from "./pages/MaintenanceSchedulePage";
import EquipmentManagementPage from "./pages/EquipmentManagementPage";
import CustomersPage from "./pages/CustomersPage";
import BulkOperationsPage from "./pages/BulkOperationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/ownership-changes" element={<OwnershipChangesPage />} />
          <Route path="/work-orders" element={<WorkOrdersPage />} />
          <Route path="/maintenance-schedule" element={<MaintenanceSchedulePage />} />
          <Route path="/equipment-management" element={<EquipmentManagementPage />} />
          <Route path="/bulk-operations" element={<BulkOperationsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
