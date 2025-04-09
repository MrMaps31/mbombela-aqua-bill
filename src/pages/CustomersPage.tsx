
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Filter, MoreHorizontal, Plus, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock data for customers
const customersMockData = [
  { 
    id: '1001', 
    name: 'John Smit', 
    accountNumber: 'MB-10045', 
    area: 'Mbombela', 
    address: '123 Main St, Mbombela', 
    status: 'active',
    balance: 'R 450.00',
    lastPayment: '2023-03-15',
  },
  { 
    id: '1002', 
    name: 'Tech Solutions Ltd', 
    accountNumber: 'NL-20876', 
    area: 'Nelspruit', 
    address: '45 Commerce Rd, Nelspruit', 
    status: 'overdue',
    balance: 'R 15,750.00',
    lastPayment: '2023-01-22',
  },
  { 
    id: '1003', 
    name: 'Sarah Johnson', 
    accountNumber: 'WR-30124', 
    area: 'White River', 
    address: '78 River View, White River', 
    status: 'active',
    balance: 'R 120.00',
    lastPayment: '2023-03-28',
  },
  { 
    id: '1004', 
    name: 'Premier Hotel', 
    accountNumber: 'MB-10089', 
    area: 'Mbombela', 
    address: '15 Tourism Dr, Mbombela', 
    status: 'paid',
    balance: 'R 0.00',
    lastPayment: '2023-04-01',
  },
  { 
    id: '1005', 
    name: 'Mbombela Primary School', 
    accountNumber: 'MB-10256', 
    area: 'Mbombela', 
    address: '200 Education St, Mbombela', 
    status: 'active',
    balance: 'R 2,450.00',
    lastPayment: '2023-02-28',
  },
  { 
    id: '1006', 
    name: 'Fresh Grocers', 
    accountNumber: 'NL-20342', 
    area: 'Nelspruit', 
    address: '56 Market Ave, Nelspruit', 
    status: 'disconnected',
    balance: 'R 8,750.00',
    lastPayment: '2022-11-15',
  },
  { 
    id: '1007', 
    name: 'White River Clinic', 
    accountNumber: 'WR-30078', 
    area: 'White River', 
    address: '12 Health Rd, White River', 
    status: 'active',
    balance: 'R 1,250.00',
    lastPayment: '2023-03-10',
  }
];

const CustomersPage = () => {
  const [customers] = useState(customersMockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const { toast } = useToast();

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter(customer => {
    // Search filter
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Area filter
    const matchesArea = areaFilter === 'all' || customer.area === areaFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

    return matchesSearch && matchesArea && matchesStatus;
  });

  const handleAddCustomer = () => {
    setIsAddCustomerOpen(false);
    toast({
      title: "New customer added successfully",
      description: "The customer has been added to the database.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Customers</h1>
        <p className="text-muted-foreground">
          View and manage customer accounts for Mbombela water utility.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers by name, account or address..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <Label className="text-xs">Filter by Area</Label>
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
                  <Label className="text-xs">Filter by Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="disconnected">Disconnected</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Create a new customer account in the system.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Customer name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="area" className="text-right">
                    Area
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mbombela">Mbombela</SelectItem>
                      <SelectItem value="Nelspruit">Nelspruit</SelectItem>
                      <SelectItem value="White River">White River</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Full address"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="accountType" className="text-right">
                    Account Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomer}>Save Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableCaption>Active customers for Mbombela water utility.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Account #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.accountNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.address}</p>
                    </div>
                  </TableCell>
                  <TableCell>{customer.area}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        customer.status === 'active' ? "bg-green-100 text-green-800 hover:bg-green-100" :
                        customer.status === 'overdue' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                        customer.status === 'disconnected' ? "bg-red-100 text-red-800 hover:bg-red-100" :
                        "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{customer.balance}</TableCell>
                  <TableCell>{customer.lastPayment}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                        <DropdownMenuItem>Billing History</DropdownMenuItem>
                        <DropdownMenuItem>Add Payment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </MainLayout>
  );
};

export default CustomersPage;
