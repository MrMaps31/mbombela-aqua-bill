import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Filter, Download, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const CustomersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 25;

  // Simulated customer data with pagination
  const generateCustomers = (page: number, search: string, status: string) => {
    const allCustomers = Array.from({ length: 98547 }, (_, i) => ({
      id: `CUST-${String(i + 1).padStart(6, '0')}`,
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@email.com`,
      phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      address: `${Math.floor(Math.random() * 9999) + 1} Street ${Math.floor(Math.random() * 100) + 1}`,
      status: Math.random() > 0.1 ? "Active" : Math.random() > 0.5 ? "Inactive" : "Suspended",
      accountBalance: (Math.random() * 500 - 100).toFixed(2),
      lastPayment: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      connectionType: Math.random() > 0.7 ? "Commercial" : "Residential"
    }));

    let filteredCustomers = allCustomers;
    
    if (search) {
      filteredCustomers = allCustomers.filter(customer => 
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.id.includes(search)
      );
    }

    if (status !== "all") {
      filteredCustomers = filteredCustomers.filter(customer => 
        customer.status.toLowerCase() === status.toLowerCase()
      );
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      customers: filteredCustomers.slice(startIndex, endIndex),
      totalCount: filteredCustomers.length,
      totalPages: Math.ceil(filteredCustomers.length / itemsPerPage)
    };
  };

  const { customers, totalCount, totalPages } = generateCustomers(currentPage, searchTerm, statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Inactive": return "secondary";
      case "Suspended": return "destructive";
      default: return "outline";
    }
  };

  const getBalanceColor = (balance: string) => {
    const amount = parseFloat(balance);
    if (amount < 0) return "text-red-500";
    if (amount > 100) return "text-green-500";
    return "text-gray-500";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customers</h1>
            <p className="text-muted-foreground">
              Manage your customer base of {totalCount.toLocaleString()} customers
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98,547</div>
              <p className="text-sm text-muted-foreground">+2.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96,234</div>
              <p className="text-sm text-muted-foreground">97.7% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Commercial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">29,564</div>
              <p className="text-sm text-muted-foreground">30% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Avg. Monthly Bill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89.50</div>
              <p className="text-sm text-muted-foreground">+$4.20 from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers by name, email, or ID..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>
              Showing {customers.length} of {totalCount.toLocaleString()} customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm">
                      <div>{customer.email}</div>
                      <div className="text-muted-foreground">{customer.phone}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Balance: 
                        <span className={`ml-1 ${getBalanceColor(customer.accountBalance)}`}>
                          ${customer.accountBalance}
                        </span>
                      </div>
                      <div className="text-muted-foreground">{customer.connectionType}</div>
                    </div>
                    <Badge variant={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} • {totalCount.toLocaleString()} total customers
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, currentPage - 2) + i;
                    if (pageNum > totalPages) return null;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;