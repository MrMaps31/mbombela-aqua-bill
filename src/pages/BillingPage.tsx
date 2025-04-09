
import { useState } from 'react';
import { format } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Printer, 
  Download, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Banknote, 
  Calendar, 
  ChevronsUpDown,
  Eye 
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for billing cycles
const billingCycles = [
  {
    id: "1",
    name: "April 2023",
    startDate: "2023-04-01",
    endDate: "2023-04-30",
    status: "in-progress",
    billedAccounts: 943,
    totalAccounts: 1295,
    totalAmount: "R 2,450,230",
    generatedBy: "system@mbombela.gov.za",
    createdAt: "2023-04-01T08:00:00"
  },
  {
    id: "2",
    name: "March 2023",
    startDate: "2023-03-01",
    endDate: "2023-03-31",
    status: "completed",
    billedAccounts: 1289,
    totalAccounts: 1289,
    totalAmount: "R 2,356,780",
    generatedBy: "system@mbombela.gov.za",
    createdAt: "2023-03-01T08:00:00"
  },
  {
    id: "3",
    name: "February 2023",
    startDate: "2023-02-01",
    endDate: "2023-02-28",
    status: "completed",
    billedAccounts: 1278,
    totalAccounts: 1278,
    totalAmount: "R 2,289,450",
    generatedBy: "system@mbombela.gov.za",
    createdAt: "2023-02-01T08:00:00"
  }
];

// Mock data for invoices
const invoices = [
  {
    id: "INV-2023-04-10001",
    accountNumber: "MB-10045",
    customerName: "John Smit",
    area: "Mbombela",
    billingPeriod: "April 2023",
    issueDate: "2023-04-05",
    dueDate: "2023-04-20",
    amount: "R 450.00",
    status: "pending",
    waterConsumption: "15 kL"
  },
  {
    id: "INV-2023-04-10002",
    accountNumber: "NL-20876",
    customerName: "Tech Solutions Ltd",
    area: "Nelspruit",
    billingPeriod: "April 2023",
    issueDate: "2023-04-05",
    dueDate: "2023-04-20",
    amount: "R 15,750.00",
    status: "overdue",
    waterConsumption: "523 kL"
  },
  {
    id: "INV-2023-04-10003",
    accountNumber: "WR-30124",
    customerName: "Sarah Johnson",
    area: "White River",
    billingPeriod: "April 2023",
    issueDate: "2023-04-05",
    dueDate: "2023-04-20",
    amount: "R 320.00",
    status: "paid",
    waterConsumption: "11 kL"
  },
  {
    id: "INV-2023-04-10004",
    accountNumber: "MB-10089",
    customerName: "Premier Hotel",
    area: "Mbombela",
    billingPeriod: "April 2023",
    issueDate: "2023-04-05",
    dueDate: "2023-04-20",
    amount: "R 8,950.00",
    status: "paid",
    waterConsumption: "298 kL"
  },
  {
    id: "INV-2023-04-10005",
    accountNumber: "MB-10256",
    customerName: "Mbombela Primary School",
    area: "Mbombela",
    billingPeriod: "April 2023",
    issueDate: "2023-04-05",
    dueDate: "2023-04-20",
    amount: "R 2,450.00",
    status: "pending",
    waterConsumption: "82 kL"
  }
];

// Mock data for tariffs
const tariffs = [
  {
    id: "1",
    name: "Residential Tariff",
    description: "Standard tariff for residential customers",
    applicableTo: "Residential",
    fixedCharge: "R 150.00",
    tier1Rate: "R 12.50 (0-6 kL)",
    tier2Rate: "R 18.75 (7-15 kL)",
    tier3Rate: "R 31.25 (16-30 kL)",
    tier4Rate: "R 43.75 (31+ kL)"
  },
  {
    id: "2",
    name: "Commercial Tariff",
    description: "Standard tariff for commercial customers",
    applicableTo: "Commercial",
    fixedCharge: "R 350.00",
    tier1Rate: "R 25.00 (0-100 kL)",
    tier2Rate: "R 31.25 (101-200 kL)",
    tier3Rate: "R 37.50 (201-500 kL)",
    tier4Rate: "R 43.75 (501+ kL)"
  },
  {
    id: "3",
    name: "Industrial Tariff",
    description: "Standard tariff for industrial customers",
    applicableTo: "Industrial",
    fixedCharge: "R 750.00",
    tier1Rate: "R 31.25 (0-500 kL)",
    tier2Rate: "R 37.50 (501-1000 kL)",
    tier3Rate: "R 43.75 (1001+ kL)",
    tier4Rate: "N/A"
  },
  {
    id: "4",
    name: "Government Tariff",
    description: "Standard tariff for government entities",
    applicableTo: "Government",
    fixedCharge: "R 500.00",
    tier1Rate: "R 25.00 (0-200 kL)",
    tier2Rate: "R 31.25 (201-500 kL)",
    tier3Rate: "R 37.50 (501+ kL)",
    tier4Rate: "N/A"
  }
];

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState("cycles");
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateCycleOpen, setIsCreateCycleOpen] = useState(false);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const { toast } = useToast();

  const handleCreateBillingCycle = () => {
    setIsCreateCycleOpen(false);
    toast({
      title: "Billing cycle created",
      description: "New billing cycle has been created successfully",
    });
  };

  const handleViewInvoice = () => {
    setShowInvoicePreview(true);
  };

  // Filter billing cycles based on search term
  const filteredBillingCycles = billingCycles.filter(cycle =>
    cycle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(invoice =>
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Billing</h1>
        <p className="text-muted-foreground">
          Manage billing cycles, invoices and tariffs for water utility.
        </p>
      </div>

      <Tabs defaultValue="cycles" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="cycles">Billing Cycles</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="tariffs">Tariff Settings</TabsTrigger>
        </TabsList>

        {/* Billing Cycles Tab */}
        <TabsContent value="cycles">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Billing Cycles</h2>
                <p className="text-muted-foreground text-sm">
                  Create and manage monthly billing cycles.
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search billing cycles..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Dialog open={isCreateCycleOpen} onOpenChange={setIsCreateCycleOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Cycle
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Billing Cycle</DialogTitle>
                      <DialogDescription>
                        Set up a new billing cycle for water billing.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cycleName" className="text-right">
                          Cycle Name
                        </Label>
                        <Input
                          id="cycleName"
                          placeholder="May 2023"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                          Start Date
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">
                          End Date
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="billingGroup" className="text-right">
                          Billing Group
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select billing group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Groups</SelectItem>
                            <SelectItem value="mbombela">Mbombela</SelectItem>
                            <SelectItem value="nelspruit">Nelspruit</SelectItem>
                            <SelectItem value="whiteriver">White River</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Options</Label>
                        <div className="col-span-3 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="autoGenerate" />
                            <label htmlFor="autoGenerate" className="text-sm font-medium">
                              Auto-generate invoices
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sendEmail" />
                            <label htmlFor="sendEmail" className="text-sm font-medium">
                              Send email notifications
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateCycleOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateBillingCycle}>
                        Create Cycle
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableCaption>List of billing cycles for water utility</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cycle Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBillingCycles.map((cycle) => (
                    <TableRow key={cycle.id}>
                      <TableCell className="font-medium">{cycle.name}</TableCell>
                      <TableCell>
                        {format(new Date(cycle.startDate), 'dd/MM/yyyy')} - {format(new Date(cycle.endDate), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          cycle.status === 'completed' 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }>
                          {cycle.status === 'completed' ? (
                            <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3 inline" />
                          )}
                          {cycle.status === 'completed' ? 'Completed' : 'In Progress'}
                        </Badge>
                      </TableCell>
                      <TableCell className="w-[180px]">
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>{cycle.billedAccounts}/{cycle.totalAccounts} billed</span>
                            <span className="font-medium">
                              {Math.round((cycle.billedAccounts / cycle.totalAccounts) * 100)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${(cycle.billedAccounts/cycle.totalAccounts)*100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{cycle.totalAmount}</TableCell>
                      <TableCell>{format(new Date(cycle.createdAt), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Customer Invoices</h2>
                <p className="text-muted-foreground text-sm">
                  View and manage all customer invoices.
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search invoices..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableCaption>List of customer invoices</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Billing Period</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{invoice.customerName}</p>
                          <p className="text-xs text-muted-foreground">{invoice.accountNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.billingPeriod}</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            invoice.status === 'paid' ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            invoice.status === 'overdue' ? "bg-red-100 text-red-800 hover:bg-red-100" :
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8" onClick={handleViewInvoice}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Tariffs Tab */}
        <TabsContent value="tariffs">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Water Tariff Settings</h2>
                <p className="text-muted-foreground text-sm">
                  Configure water tariff rates for different customer categories.
                </p>
              </div>
              <div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Tariff
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableCaption>Current water tariff rates</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Fixed Charge</TableHead>
                    <TableHead>Consumption Rates</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tariffs.map((tariff) => (
                    <TableRow key={tariff.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tariff.name}</p>
                          <p className="text-xs text-muted-foreground">{tariff.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{tariff.applicableTo}</TableCell>
                      <TableCell>{tariff.fixedCharge}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{tariff.tier1Rate}</p>
                          <p>{tariff.tier2Rate}</p>
                          <p>{tariff.tier3Rate}</p>
                          {tariff.tier4Rate !== "N/A" && <p>{tariff.tier4Rate}</p>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invoice Preview Dialog */}
      <Dialog open={showInvoicePreview} onOpenChange={setShowInvoicePreview}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogDescription>
              Invoice #INV-2023-04-10001
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 border rounded-md bg-white">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-aqua-800">Mbombela Water Utility</h2>
                <p className="text-sm">P.O. Box 1234, Mbombela, 1200</p>
                <p className="text-sm">Tel: 013 123 4567</p>
                <p className="text-sm">Email: billing@mbombela.gov.za</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Water Bill</h3>
                <p className="text-sm">Invoice #: INV-2023-04-10001</p>
                <p className="text-sm">Date: 05/04/2023</p>
                <p className="text-sm">Due Date: 20/04/2023</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border-t pt-3">
                <h4 className="text-sm font-semibold text-gray-500 mb-1">BILL TO</h4>
                <p className="font-medium">John Smit</p>
                <p className="text-sm">Account #: MB-10045</p>
                <p className="text-sm">123 Main St, Mbombela</p>
                <p className="text-sm">Tel: 071 234 5678</p>
              </div>
              <div className="border-t pt-3">
                <h4 className="text-sm font-semibold text-gray-500 mb-1">BILLING DETAILS</h4>
                <p className="text-sm">Billing Period: 01/04/2023 - 30/04/2023</p>
                <p className="text-sm">Meter #: M56789</p>
                <p className="text-sm">Previous Reading: 1350 kL (01/03/2023)</p>
                <p className="text-sm">Current Reading: 1365 kL (31/03/2023)</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium border-b pb-2 mb-2">Charges</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Fixed Monthly Charge</td>
                    <td className="py-1 text-right">R 150.00</td>
                  </tr>
                  <tr>
                    <td className="py-1">Water Consumption (15 kL)</td>
                    <td className="py-1 text-right">R 187.50</td>
                  </tr>
                  <tr>
                    <td className="py-1">Water Infrastructure Levy</td>
                    <td className="py-1 text-right">R 75.00</td>
                  </tr>
                  <tr>
                    <td className="py-1">Water Quality Management Fee</td>
                    <td className="py-1 text-right">R 37.50</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td className="py-2 font-medium">Total Due</td>
                    <td className="py-2 text-right font-bold">R 450.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mb-6">
              <h4 className="font-medium border-b pb-2 mb-2">Consumption History</h4>
              <div className="h-24 w-full bg-muted/20 flex items-end gap-1 px-2">
                <div className="h-[30%] w-full bg-aqua-300 relative">
                  <span className="absolute -top-5 left-0 text-xs">10kL</span>
                  <span className="absolute bottom-0 left-0 text-xs">Nov</span>
                </div>
                <div className="h-[40%] w-full bg-aqua-300 relative">
                  <span className="absolute -top-5 left-0 text-xs">13kL</span>
                  <span className="absolute bottom-0 left-0 text-xs">Dec</span>
                </div>
                <div className="h-[35%] w-full bg-aqua-300 relative">
                  <span className="absolute -top-5 left-0 text-xs">12kL</span>
                  <span className="absolute bottom-0 left-0 text-xs">Jan</span>
                </div>
                <div className="h-[42%] w-full bg-aqua-300 relative">
                  <span className="absolute -top-5 left-0 text-xs">14kL</span>
                  <span className="absolute bottom-0 left-0 text-xs">Feb</span>
                </div>
                <div className="h-[45%] w-full bg-aqua-300 relative">
                  <span className="absolute -top-5 left-0 text-xs">15kL</span>
                  <span className="absolute bottom-0 left-0 text-xs">Mar</span>
                </div>
                <div className="h-[45%] w-full bg-aqua-500 relative">
                  <span className="absolute -top-5 left-0 text-xs">15kL</span>
                  <span className="absolute bottom-0 left-0 text-xs">Apr</span>
                </div>
              </div>
            </div>

            <div className="text-sm border-t pt-4">
              <p className="font-medium mb-1">Payment Options:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>EFT: Mbombela Municipality, FNB, Acc #: 62341234567, Branch: 250655</li>
                <li>Online: www.mbombela-water.gov.za/payments</li>
                <li>In Person: Municipal Offices, 1 Civic Centre, Mbombela</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                Please include your account number as reference. For queries, please contact our customer service.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvoicePreview(false)}>
              Close
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" />
              Print Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default BillingPage;
