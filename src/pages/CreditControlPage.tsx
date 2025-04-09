
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  AlertTriangle,
  Ban,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  MoreHorizontal,
  PencilLine,
  Search,
  Users,
  Wallet,
  Wrench
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for overdue accounts
const overdueAccounts = [
  {
    id: "1",
    accountNumber: "NL-20876",
    customerName: "Tech Solutions Ltd",
    area: "Nelspruit",
    balance: "R 15,750.00",
    daysOverdue: 65,
    status: "legal-action",
    actions: ["final-notice", "disconnection-notice", "disconnected"],
    lastPaymentDate: "2023-01-22",
    lastPaymentAmount: "R 5,200.00",
    contactPerson: "James Smith",
    contactNumber: "071 234 5678",
    email: "accounts@techsolutions.co.za"
  },
  {
    id: "2",
    accountNumber: "MB-10067",
    customerName: "Green Gardens Hotel",
    area: "Mbombela",
    balance: "R 8,950.00",
    daysOverdue: 45,
    status: "disconnected",
    actions: ["final-notice", "disconnection-notice", "disconnected"],
    lastPaymentDate: "2023-02-10",
    lastPaymentAmount: "R 3,500.00",
    contactPerson: "Sarah Johnson",
    contactNumber: "082 345 6789",
    email: "accounts@greengardens.co.za"
  },
  {
    id: "3",
    accountNumber: "WR-30256",
    customerName: "Joe's Auto Repairs",
    area: "White River",
    balance: "R 4,230.00",
    daysOverdue: 30,
    status: "disconnection-notice",
    actions: ["final-notice", "disconnection-notice"],
    lastPaymentDate: "2023-02-28",
    lastPaymentAmount: "R 1,500.00",
    contactPerson: "Joe Nkosi",
    contactNumber: "073 456 7890",
    email: "joe@autorepairs.co.za"
  },
  {
    id: "4",
    accountNumber: "MB-10124",
    customerName: "City Apartments Block A",
    area: "Mbombela",
    balance: "R 12,780.00",
    daysOverdue: 25,
    status: "final-notice",
    actions: ["final-notice"],
    lastPaymentDate: "2023-03-05",
    lastPaymentAmount: "R 8,000.00",
    contactPerson: "Body Corporate",
    contactNumber: "013 123 4567",
    email: "manager@cityapartments.co.za"
  },
  {
    id: "5",
    accountNumber: "NL-20331",
    customerName: "Fresh Foods Market",
    area: "Nelspruit",
    balance: "R 5,670.00",
    daysOverdue: 15,
    status: "reminder",
    actions: ["reminder"],
    lastPaymentDate: "2023-03-15",
    lastPaymentAmount: "R 3,200.00",
    contactPerson: "John Venter",
    contactNumber: "083 567 8901",
    email: "accounts@freshfoods.co.za"
  }
];

// Mock data for credit control actions
const creditControlActions = [
  {
    id: "1",
    date: "2023-04-01",
    actionType: "disconnection",
    accountNumber: "NL-20876",
    customerName: "Tech Solutions Ltd",
    area: "Nelspruit",
    amount: "R 15,750.00",
    status: "completed",
    actionBy: "jacob.m@mbombela.gov.za",
    notes: "Customer disconnected due to non-payment after 60 days"
  },
  {
    id: "2",
    date: "2023-04-01",
    actionType: "legal-action",
    accountNumber: "NL-20876",
    customerName: "Tech Solutions Ltd",
    area: "Nelspruit",
    amount: "R 15,750.00",
    status: "pending",
    actionBy: "credit.control@mbombela.gov.za",
    notes: "Legal action initiated - case sent to municipal attorneys"
  },
  {
    id: "3",
    date: "2023-03-25",
    actionType: "disconnection",
    accountNumber: "MB-10067",
    customerName: "Green Gardens Hotel",
    area: "Mbombela",
    amount: "R 8,950.00",
    status: "completed",
    actionBy: "david.n@mbombela.gov.za",
    notes: "Customer disconnected after failed payment agreement"
  },
  {
    id: "4",
    date: "2023-03-20",
    actionType: "disconnection-notice",
    accountNumber: "WR-30256",
    customerName: "Joe's Auto Repairs",
    area: "White River",
    amount: "R 4,230.00",
    status: "completed",
    actionBy: "system@mbombela.gov.za",
    notes: "Automated disconnection notice sent"
  },
  {
    id: "5",
    date: "2023-03-15",
    actionType: "final-notice",
    accountNumber: "MB-10124",
    customerName: "City Apartments Block A",
    area: "Mbombela",
    amount: "R 12,780.00",
    status: "completed",
    actionBy: "system@mbombela.gov.za",
    notes: "Automated final notice sent"
  }
];

// Mock payment arrangement data
const paymentArrangements = [
  {
    id: "1",
    accountNumber: "MB-10124",
    customerName: "City Apartments Block A",
    area: "Mbombela",
    originalAmount: "R 15,780.00",
    currentBalance: "R 12,780.00",
    arrangement: "R 3,000.00 per month",
    startDate: "2023-02-15",
    endDate: "2023-06-15",
    status: "active",
    progress: 20,
    payments: [
      { date: "2023-02-15", amount: "R 3,000.00", status: "paid" },
      { date: "2023-03-15", amount: "R 3,000.00", status: "pending" },
      { date: "2023-04-15", amount: "R 3,000.00", status: "upcoming" },
      { date: "2023-05-15", amount: "R 3,000.00", status: "upcoming" },
      { date: "2023-06-15", amount: "R 3,780.00", status: "upcoming" }
    ]
  },
  {
    id: "2",
    accountNumber: "NL-20331",
    customerName: "Fresh Foods Market",
    area: "Nelspruit",
    originalAmount: "R 8,670.00",
    currentBalance: "R 5,670.00",
    arrangement: "R 1,500.00 per month",
    startDate: "2023-03-01",
    endDate: "2023-07-01",
    status: "active",
    progress: 35,
    payments: [
      { date: "2023-03-01", amount: "R 1,500.00", status: "paid" },
      { date: "2023-03-15", amount: "R 1,500.00", status: "paid" },
      { date: "2023-04-15", amount: "R 1,500.00", status: "pending" },
      { date: "2023-05-15", amount: "R 1,500.00", status: "upcoming" },
      { date: "2023-06-15", amount: "R 1,500.00", status: "upcoming" },
      { date: "2023-07-01", amount: "R 1,170.00", status: "upcoming" }
    ]
  }
];

const CreditControlPage = () => {
  const [activeTab, setActiveTab] = useState("overdue");
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isNewActionOpen, setIsNewActionOpen] = useState(false);
  const [isPaymentArrangementOpen, setIsPaymentArrangementOpen] = useState(false);
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(overdueAccounts[0]);
  const { toast } = useToast();

  const handleViewCustomer = (customer: typeof overdueAccounts[0]) => {
    setSelectedCustomer(customer);
    setIsCustomerDetailOpen(true);
  };

  const handleCreateAction = () => {
    setIsNewActionOpen(false);
    toast({
      title: "Credit control action created",
      description: "The action has been scheduled successfully",
    });
  };

  const handleCreatePaymentArrangement = () => {
    setIsPaymentArrangementOpen(false);
    toast({
      title: "Payment arrangement created",
      description: "Payment plan has been set up for the customer",
    });
  };

  // Filter overdue accounts based on search and filters
  const filteredOverdueAccounts = overdueAccounts.filter(account => {
    // Search filter
    const matchesSearch = 
      account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Area filter
    const matchesArea = areaFilter === 'all' || account.area === areaFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;

    return matchesSearch && matchesArea && matchesStatus;
  });

  // Filter credit control actions based on search
  const filteredActions = creditControlActions.filter(action =>
    action.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.actionType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'reminder':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Payment Reminder</Badge>;
      case 'final-notice':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Final Notice</Badge>;
      case 'disconnection-notice':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Disconnection Notice</Badge>;
      case 'disconnected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Disconnected</Badge>;
      case 'legal-action':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Legal Action</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Credit Control</h1>
        <p className="text-muted-foreground">
          Manage overdue accounts and credit control actions for water utility customers.
        </p>
      </div>

      <Tabs defaultValue="overdue" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overdue">Overdue Accounts</TabsTrigger>
          <TabsTrigger value="actions">Credit Actions</TabsTrigger>
          <TabsTrigger value="arrangements">Payment Arrangements</TabsTrigger>
        </TabsList>

        {/* Overdue Accounts Tab */}
        <TabsContent value="overdue">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Overdue Accounts</h2>
                <p className="text-muted-foreground text-sm">
                  View and manage customer accounts that have overdue payments.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-start">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search accounts..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Label className="text-xs">Area</Label>
                      <Select value={areaFilter} onValueChange={setAreaFilter}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Areas</SelectItem>
                          <SelectItem value="Mbombela">Mbombela</SelectItem>
                          <SelectItem value="Nelspruit">Nelspruit</SelectItem>
                          <SelectItem value="White River">White River</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-2 pt-0">
                      <Label className="text-xs">Status</Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="reminder">Payment Reminder</SelectItem>
                          <SelectItem value="final-notice">Final Notice</SelectItem>
                          <SelectItem value="disconnection-notice">Disconnection Notice</SelectItem>
                          <SelectItem value="disconnected">Disconnected</SelectItem>
                          <SelectItem value="legal-action">Legal Action</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Dialog open={isNewActionOpen} onOpenChange={setIsNewActionOpen}>
                  <DialogTrigger asChild>
                    <Button>Take Action</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create Credit Control Action</DialogTitle>
                      <DialogDescription>
                        Apply credit control actions to selected overdue accounts.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="action">Action Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="reminder">Send Payment Reminder</SelectItem>
                              <SelectItem value="final-notice">Issue Final Notice</SelectItem>
                              <SelectItem value="disconnection-notice">Issue Disconnection Notice</SelectItem>
                              <SelectItem value="disconnect">Schedule Disconnection</SelectItem>
                              <SelectItem value="legal-action">Initiate Legal Action</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="accounts">Apply To</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select accounts" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="selected">Selected Accounts</SelectItem>
                              <SelectItem value="all">All Overdue Accounts</SelectItem>
                              <SelectItem value="30days">Accounts 30+ Days Overdue</SelectItem>
                              <SelectItem value="60days">Accounts 60+ Days Overdue</SelectItem>
                              <SelectItem value="90days">Accounts 90+ Days Overdue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="date">Action Date</Label>
                          <Input type="date" id="date" />
                        </div>

                        <div>
                          <Label htmlFor="notes">Notes</Label>
                          <Input
                            id="notes"
                            placeholder="Additional notes for this action"
                          />
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox id="autoNotify" />
                          <label
                            htmlFor="autoNotify"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Automatically notify customers via email/SMS
                          </label>
                        </div>
                      </div>
                      
                      <div className="rounded-md border overflow-auto max-h-40">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                <Checkbox />
                              </TableHead>
                              <TableHead>Account</TableHead>
                              <TableHead>Customer</TableHead>
                              <TableHead>Days Overdue</TableHead>
                              <TableHead>Balance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {overdueAccounts.map(account => (
                              <TableRow key={account.id}>
                                <TableCell className="p-2">
                                  <Checkbox />
                                </TableCell>
                                <TableCell className="p-2">{account.accountNumber}</TableCell>
                                <TableCell className="p-2">{account.customerName}</TableCell>
                                <TableCell className="p-2">{account.daysOverdue}</TableCell>
                                <TableCell className="p-2">{account.balance}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewActionOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateAction}>
                        Create Action
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableCaption>List of accounts with overdue payments</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Account #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOverdueAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">{account.accountNumber}</TableCell>
                      <TableCell>{account.customerName}</TableCell>
                      <TableCell>{account.area}</TableCell>
                      <TableCell className="font-medium">{account.balance}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            account.daysOverdue > 60 ? "border-red-200 bg-red-50 text-red-700" :
                            account.daysOverdue > 30 ? "border-orange-200 bg-orange-50 text-orange-700" :
                            "border-yellow-200 bg-yellow-50 text-yellow-700"
                          }
                        >
                          {account.daysOverdue} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(account.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCustomer(account)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsPaymentArrangementOpen(true)}>
                              Create Payment Plan
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuItem>Issue Final Notice</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Disconnection</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Credit Control Actions Tab */}
        <TabsContent value="actions">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Credit Control Actions</h2>
                <p className="text-muted-foreground text-sm">
                  View a history of all credit control actions taken.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search actions..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableCaption>History of credit control actions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Action Type</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell>{action.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            action.actionType === 'disconnection' ? "bg-red-100 text-red-800 hover:bg-red-100" :
                            action.actionType === 'legal-action' ? "bg-purple-100 text-purple-800 hover:bg-purple-100" :
                            action.actionType === 'disconnection-notice' ? "bg-orange-100 text-orange-800 hover:bg-orange-100" :
                            action.actionType === 'final-notice' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                            "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          }
                        >
                          {action.actionType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{action.accountNumber}</TableCell>
                      <TableCell>{action.customerName}</TableCell>
                      <TableCell>{action.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            action.status === 'completed' ? "border-green-200 bg-green-50 text-green-700" :
                            "border-blue-200 bg-blue-50 text-blue-700"
                          }
                        >
                          {action.status.charAt(0).toUpperCase() + action.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{action.actionBy}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Payment Arrangements Tab */}
        <TabsContent value="arrangements">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Payment Arrangements</h2>
                <p className="text-muted-foreground text-sm">
                  View and manage payment plans for customers with outstanding balances.
                </p>
              </div>
              <Button onClick={() => setIsPaymentArrangementOpen(true)}>
                New Payment Plan
              </Button>
            </div>

            <div className="space-y-6">
              {paymentArrangements.map((arrangement) => (
                <Card key={arrangement.id} className="p-5 border shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{arrangement.customerName}</h3>
                          <p className="text-sm text-muted-foreground">Account: {arrangement.accountNumber}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Active
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Original Amount</p>
                          <p className="font-medium">{arrangement.originalAmount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Current Balance</p>
                          <p className="font-medium">{arrangement.currentBalance}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Arrangement</p>
                          <p className="font-medium">{arrangement.arrangement}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Period</p>
                          <p className="text-sm">{arrangement.startDate} to {arrangement.endDate}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{arrangement.progress}%</span>
                        </div>
                        <Progress value={arrangement.progress} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Payment Schedule</h4>
                      <div className="space-y-2">
                        {arrangement.payments.map((payment, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span>{payment.date}</span>
                            <span className="font-medium">{payment.amount}</span>
                            <Badge className={
                              payment.status === 'paid' ? "bg-green-100 text-green-800 hover:bg-green-100" :
                              payment.status === 'pending' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                              "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          <PencilLine className="h-4 w-4 mr-1" />
                          Edit Plan
                        </Button>
                        <Button size="sm">
                          Record Payment
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Detail Dialog */}
      <Dialog open={isCustomerDetailOpen} onOpenChange={setIsCustomerDetailOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Customer Account Details</DialogTitle>
            <DialogDescription>
              Account #{selectedCustomer?.accountNumber}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mb-1">{selectedCustomer?.customerName}</h2>
                <p className="text-sm text-muted-foreground">{selectedCustomer?.area}</p>
              </div>
              {selectedCustomer && getStatusBadge(selectedCustomer.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Account Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Account Number:</span>
                    <span>{selectedCustomer?.accountNumber}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Outstanding Balance:</span>
                    <span className="font-bold text-red-600">{selectedCustomer?.balance}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Days Overdue:</span>
                    <span>{selectedCustomer?.daysOverdue} days</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Last Payment:</span>
                    <span>{selectedCustomer?.lastPaymentAmount} on {selectedCustomer?.lastPaymentDate}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Contact Person:</span>
                    <span>{selectedCustomer?.contactPerson}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{selectedCustomer?.contactNumber}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{selectedCustomer?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Credit Control Actions Taken</h3>
              <div className="space-y-3">
                {selectedCustomer?.actions.map((action, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-4">
                      {action === 'final-notice' && <FileText className="h-4 w-4" />}
                      {action === 'disconnection-notice' && <AlertTriangle className="h-4 w-4" />}
                      {action === 'disconnected' && <Ban className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {action.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? '15 days ago' : index === 1 ? '10 days ago' : '5 days ago'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="sm:flex-1">Call Customer</Button>
            <Button variant="outline" className="sm:flex-1">Send Email</Button>
            <Button className="sm:flex-1" onClick={() => setIsPaymentArrangementOpen(true)}>
              Create Payment Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Arrangement Dialog */}
      <Dialog open={isPaymentArrangementOpen} onOpenChange={setIsPaymentArrangementOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Payment Arrangement</DialogTitle>
            <DialogDescription>
              Set up a payment plan for the customer to clear overdue balance.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Select defaultValue={selectedCustomer?.id}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {overdueAccounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.customerName} ({account.accountNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalAmount" className="text-right">
                  Total Amount
                </Label>
                <Input
                  id="totalAmount"
                  defaultValue="R 15,750.00"
                  className="col-span-3"
                  disabled
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="initialPayment" className="text-right">
                  Initial Payment
                </Label>
                <Input
                  id="initialPayment"
                  placeholder="e.g. R 5,000.00"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="installments" className="text-right">
                  Installments
                </Label>
                <Select defaultValue="6">
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="paymentDay" className="text-right">
                  Payment Day
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st of each month</SelectItem>
                    <SelectItem value="15">15th of each month</SelectItem>
                    <SelectItem value="25">25th of each month</SelectItem>
                    <SelectItem value="lastday">Last day of each month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">
                  Notes
                </Label>
                <Input
                  id="notes"
                  placeholder="Additional notes for this payment plan"
                  className="col-span-3"
                />
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">Payment Schedule Preview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Initial Payment (Today)</span>
                  <span className="font-medium">R 5,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>6 Monthly Payments of</span>
                  <span className="font-medium">R 1,791.67</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Total to be Paid</span>
                  <span className="font-bold">R 15,750.00</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentArrangementOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePaymentArrangement}>
              Create Payment Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default CreditControlPage;
