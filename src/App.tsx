
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomersPage from "./pages/CustomersPage";
import MeterReadingsPage from "./pages/MeterReadingsPage";
import BillingPage from "./pages/BillingPage";
import CreditControlPage from "./pages/CreditControlPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import FinancialJournalsPage from "./pages/FinancialJournalsPage";
import NewApplicationsPage from "./pages/NewApplicationsPage";
import OwnershipChangesPage from "./pages/OwnershipChangesPage";
import MeterReplacementsPage from "./pages/MeterReplacementsPage";
import CustomerComplaintsPage from "./pages/CustomerComplaintsPage";
import SmsNotificationsPage from "./pages/SmsNotificationsPage";
import InvoicesPage from "./pages/InvoicesPage";
import StatementsPage from "./pages/StatementsPage";

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
          <Route path="/meter-readings" element={<MeterReadingsPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/credit-control" element={<CreditControlPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Financial and Customer Management Routes */}
          <Route path="/financial-journals" element={<FinancialJournalsPage />} />
          <Route path="/new-applications" element={<NewApplicationsPage />} />
          <Route path="/ownership-changes" element={<OwnershipChangesPage />} />
          <Route path="/meter-replacements" element={<MeterReplacementsPage />} />
          <Route path="/customer-complaints" element={<CustomerComplaintsPage />} />
          <Route path="/sms-notifications" element={<SmsNotificationsPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/statements" element={<StatementsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
