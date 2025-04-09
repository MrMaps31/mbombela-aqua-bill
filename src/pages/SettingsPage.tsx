
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
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
import { useToast } from '@/hooks/use-toast';
import { 
  Building, 
  Home, 
  Mail, 
  Phone, 
  Plus, 
  Save, 
  AlertTriangle, 
  Users, 
  FileText, 
  Settings, 
  Bell,
  Trash2
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for billing groups
const billingGroups = [
  {
    id: "1",
    name: "Mbombela",
    code: "MB",
    accountPrefix: "MB-",
    customers: 654,
    active: true,
    description: "Main municipal area"
  },
  {
    id: "2",
    name: "Nelspruit",
    code: "NL",
    accountPrefix: "NL-",
    customers: 432,
    active: true,
    description: "Nelspruit service area"
  },
  {
    id: "3",
    name: "White River",
    code: "WR",
    accountPrefix: "WR-",
    customers: 209,
    active: true,
    description: "White River service area"
  }
];

// Mock data for users
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@mbombela.gov.za",
    role: "administrator",
    department: "IT",
    lastLogin: "2023-04-01 09:15"
  },
  {
    id: "2",
    name: "David Nkosi",
    email: "david.n@mbombela.gov.za",
    role: "supervisor",
    department: "Credit Control",
    lastLogin: "2023-04-01 10:30"
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah.j@mbombela.gov.za",
    role: "billing-clerk",
    department: "Finance",
    lastLogin: "2023-04-01 08:45"
  },
  {
    id: "4",
    name: "Jacob Mthembu",
    email: "jacob.m@mbombela.gov.za",
    role: "field-agent",
    department: "Operations",
    lastLogin: "2023-04-01 07:30"
  }
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isNewBillingGroupOpen, setIsNewBillingGroupOpen] = useState(false);
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleAddBillingGroup = () => {
    setIsNewBillingGroupOpen(false);
    toast({
      title: "Billing group added",
      description: "New billing group has been created successfully."
    });
  };

  const handleAddUser = () => {
    setIsNewUserOpen(false);
    toast({
      title: "User added",
      description: "New user account has been created successfully."
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure system settings for the water utility billing system.
        </p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing-groups">Billing Groups</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="bylaws">By-laws & Rules</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-2">General Settings</h2>
                <p className="text-muted-foreground text-sm">
                  Configure basic information and system settings for the billing system.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-4">Organization Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="organizationName">Organization Name</Label>
                        <Input 
                          id="organizationName" 
                          placeholder="Organization name" 
                          defaultValue="Mbombela Water Utility" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input 
                          id="contactEmail" 
                          type="email" 
                          placeholder="Contact email" 
                          defaultValue="info@mbombela.gov.za" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input 
                          id="contactPhone" 
                          placeholder="Contact phone" 
                          defaultValue="013 123 4567" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          placeholder="Physical address" 
                          defaultValue="1 Civic Centre, Mbombela" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalAddress">Postal Address</Label>
                        <Input 
                          id="postalAddress" 
                          placeholder="Postal address" 
                          defaultValue="P.O. Box 1234, Mbombela, 1200" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website" 
                          placeholder="Website URL" 
                          defaultValue="www.mbombela.gov.za" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-md font-medium mb-4">System Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currencySymbol">Currency Symbol</Label>
                        <Input 
                          id="currencySymbol" 
                          placeholder="Currency symbol" 
                          defaultValue="R" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select defaultValue="dd/MM/yyyy">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeZone">Time Zone</Label>
                        <Select defaultValue="Africa/Johannesburg">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Africa/Johannesburg">Africa/Johannesburg (GMT+2)</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingCycleDay">Default Billing Cycle Day</Label>
                        <Select defaultValue="1">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1st of month</SelectItem>
                            <SelectItem value="15">15th of month</SelectItem>
                            <SelectItem value="lastday">Last day of month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentDueDays">Default Payment Due Days</Label>
                        <Input 
                          id="paymentDueDays" 
                          type="number" 
                          placeholder="Days" 
                          defaultValue="15" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
                        <Select defaultValue="7">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">January (Calendar Year)</SelectItem>
                            <SelectItem value="4">April</SelectItem>
                            <SelectItem value="7">July</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-md font-medium mb-4">System Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoReminders">Automated Payment Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Send automatic reminders for upcoming and overdue payments
                        </p>
                      </div>
                      <Switch id="autoReminders" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoDisconnect">Automated Disconnection Notices</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically generate disconnection notices for overdue accounts
                        </p>
                      </div>
                      <Switch id="autoDisconnect" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailInvoices">Email Invoices</Label>
                        <p className="text-sm text-muted-foreground">
                          Send invoices automatically via email when generated
                        </p>
                      </div>
                      <Switch id="emailInvoices" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications via SMS for important account updates
                        </p>
                      </div>
                      <Switch id="smsNotifications" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveGeneralSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Billing Groups Tab */}
        <TabsContent value="billing-groups">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-2">Billing Groups</h2>
                <p className="text-muted-foreground text-sm">
                  Manage billing groups for different towns and service areas.
                </p>
              </div>
              <Dialog open={isNewBillingGroupOpen} onOpenChange={setIsNewBillingGroupOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Billing Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Billing Group</DialogTitle>
                    <DialogDescription>
                      Create a new billing group for a town or service area.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g. Hazyview"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="code" className="text-right">
                        Code
                      </Label>
                      <Input
                        id="code"
                        placeholder="e.g. HZ"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="prefix" className="text-right">
                        Account Prefix
                      </Label>
                      <Input
                        id="prefix"
                        placeholder="e.g. HZ-"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="description" className="text-right pt-2">
                        Description
                      </Label>
                      <Input
                        id="description"
                        placeholder="Description of this billing group"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">
                        Status
                      </Label>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Switch id="active" defaultChecked />
                        <Label htmlFor="active">Active</Label>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewBillingGroupOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddBillingGroup}>
                      Add Billing Group
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableCaption>List of billing groups for water utility</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Account Prefix</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {group.name === 'Mbombela' ? (
                            <Building className="h-4 w-4 mr-2 text-primary" />
                          ) : (
                            <Home className="h-4 w-4 mr-2 text-primary" />
                          )}
                          {group.name}
                        </div>
                      </TableCell>
                      <TableCell>{group.code}</TableCell>
                      <TableCell>{group.accountPrefix}</TableCell>
                      <TableCell>{group.customers}</TableCell>
                      <TableCell>
                        <Badge className={
                          group.active 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }>
                          {group.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
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
        
        {/* User Management Tab */}
        <TabsContent value="users">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-2">User Management</h2>
                <p className="text-muted-foreground text-sm">
                  Manage users and their access to the billing system.
                </p>
              </div>
              <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account to access the system.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="username"
                        placeholder="Full name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="useremail" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="useremail"
                        type="email"
                        placeholder="Email address"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="administrator">Administrator</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="billing-clerk">Billing Clerk</SelectItem>
                          <SelectItem value="field-agent">Field Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Department
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Credit Control">Credit Control</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">
                        Permissions
                      </Label>
                      <div className="space-y-2 col-span-3">
                        <div className="flex items-center space-x-2">
                          <Switch id="billing-access" />
                          <Label htmlFor="billing-access">Billing Access</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="credit-control" defaultChecked />
                          <Label htmlFor="credit-control">Credit Control</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="meter-readings" defaultChecked />
                          <Label htmlFor="meter-readings">Meter Readings</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="reports" />
                          <Label htmlFor="reports">Reports & Analytics</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>
                      Add User
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableCaption>List of system users</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.role === 'administrator' ? "bg-purple-100 text-purple-800 hover:bg-purple-100" :
                            user.role === 'supervisor' ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                            user.role === 'billing-clerk' ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            "bg-orange-100 text-orange-800 hover:bg-orange-100"
                          }
                        >
                          {user.role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
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
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <div>
              <h2 className="text-xl font-medium mb-2">Notification Settings</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Configure email and SMS notification templates and settings.
              </p>
            </div>
            
            <Tabs defaultValue="email" className="space-y-4">
              <TabsList>
                <TabsTrigger value="email">Email Notifications</TabsTrigger>
                <TabsTrigger value="sms">SMS Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium mb-4">Email Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtpServer">SMTP Server</Label>
                          <Input 
                            id="smtpServer" 
                            placeholder="SMTP server address" 
                            defaultValue="smtp.mbombela.gov.za" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPort">SMTP Port</Label>
                          <Input 
                            id="smtpPort" 
                            placeholder="SMTP port" 
                            defaultValue="587" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpUser">SMTP Username</Label>
                          <Input 
                            id="smtpUser" 
                            placeholder="SMTP username" 
                            defaultValue="notifications@mbombela.gov.za" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="senderName">Sender Name</Label>
                          <Input 
                            id="senderName" 
                            placeholder="Sender name" 
                            defaultValue="Mbombela Water Utility" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="senderEmail">Sender Email</Label>
                          <Input 
                            id="senderEmail" 
                            type="email" 
                            placeholder="Sender email" 
                            defaultValue="notifications@mbombela.gov.za" 
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                          <Button variant="outline" size="sm">
                            Test Connection
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-md font-medium mb-4">Email Templates</h3>
                    <div className="space-y-4">
                      <Card className="p-4 border">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Bell className="h-5 w-5 mr-2 text-yellow-600" />
                            <div>
                              <h4 className="font-medium">Payment Reminder</h4>
                              <p className="text-sm text-muted-foreground">Sent to remind customers of upcoming payments</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit Template
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-4 border">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            <div>
                              <h4 className="font-medium">Invoice Notification</h4>
                              <p className="text-sm text-muted-foreground">Sent when a new invoice is issued</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit Template
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-4 border">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                            <div>
                              <h4 className="font-medium">Disconnection Notice</h4>
                              <p className="text-sm text-muted-foreground">Sent prior to service disconnection</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit Template
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sms" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium mb-4">SMS Gateway Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="smsProvider">SMS Provider</Label>
                          <Select defaultValue="clickatell">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clickatell">Clickatell</SelectItem>
                              <SelectItem value="twilio">Twilio</SelectItem>
                              <SelectItem value="bulksms">BulkSMS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smsApiKey">API Key</Label>
                          <Input 
                            id="smsApiKey" 
                            placeholder="API key for SMS gateway" 
                            defaultValue="••••••••••••••••" 
                            type="password"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="senderID">Sender ID</Label>
                          <Input 
                            id="senderID" 
                            placeholder="SMS Sender ID" 
                            defaultValue="MbombelaH2O" 
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                          <Button variant="outline" size="sm">
                            Test SMS
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-md font-medium mb-4">SMS Templates</h3>
                    <div className="space-y-4">
                      <Card className="p-4 border">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Bell className="h-5 w-5 mr-2 text-yellow-600" />
                            <div>
                              <h4 className="font-medium">Payment Reminder</h4>
                              <p className="text-sm text-muted-foreground">Short message reminding about payment</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit Template
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-4 border">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                            <div>
                              <h4 className="font-medium">Disconnection Alert</h4>
                              <p className="text-sm text-muted-foreground">Urgent notice about imminent disconnection</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit Template
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-6">
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* By-laws Tab */}
        <TabsContent value="bylaws">
          <Card className="p-6">
            <div>
              <h2 className="text-xl font-medium mb-2">By-laws & Rules</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Configure system rules according to City of Mbombela water supply and credit control by-laws.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-4">Credit Control Rules</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentDue">Payment Due Period</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="paymentDue" 
                          type="number" 
                          placeholder="Days" 
                          defaultValue="15" 
                          className="w-24"
                        />
                        <span>days after invoice issue</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reminderDays">Payment Reminder</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="reminderDays" 
                          type="number" 
                          placeholder="Days" 
                          defaultValue="5" 
                          className="w-24"
                        />
                        <span>days before due date</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finalNoticeDays">Final Notice Period</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="finalNoticeDays" 
                          type="number" 
                          placeholder="Days" 
                          defaultValue="7" 
                          className="w-24"
                        />
                        <span>days after due date</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="disconnectionDays">Disconnection Notice Period</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="disconnectionDays" 
                          type="number" 
                          placeholder="Days" 
                          defaultValue="14" 
                          className="w-24"
                        />
                        <span>days after due date</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disconnectionExecutionDays">Disconnection Execution</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="disconnectionExecutionDays" 
                          type="number" 
                          placeholder="Days" 
                          defaultValue="7" 
                          className="w-24"
                        />
                        <span>days after disconnection notice</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="legalActionDays">Legal Action Initiation</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="legalActionDays" 
                          type="number" 
                          placeholder="Days" 
                          defaultValue="30" 
                          className="w-24"
                        />
                        <span>days after disconnection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-md font-medium mb-4">Interest & Penalties</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (Monthly)</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="interestRate" 
                          type="number" 
                          step="0.1" 
                          placeholder="Percentage" 
                          defaultValue="2" 
                          className="w-24"
                        />
                        <span>% per month on overdue amounts</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reconnectionFee">Reconnection Fee</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="reconnectionFee" 
                          type="number" 
                          placeholder="Amount" 
                          defaultValue="350" 
                          className="w-24"
                        />
                        <span>ZAR (South African Rand)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="penaltyFee">Late Payment Penalty</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="penaltyFee" 
                          type="number" 
                          placeholder="Amount" 
                          defaultValue="150" 
                          className="w-24"
                        />
                        <span>ZAR (South African Rand)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminFee">Administrative Fee</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="adminFee" 
                          type="number" 
                          placeholder="Amount" 
                          defaultValue="75" 
                          className="w-24"
                        />
                        <span>ZAR (South African Rand)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-md font-medium mb-4">By-laws Documents</h3>
                <div className="space-y-4">
                  <Card className="p-4 border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Water Supply By-laws</h4>
                          <p className="text-sm text-muted-foreground">City of Mbombela water supply by-laws</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Credit Control By-laws</h4>
                          <p className="text-sm text-muted-foreground">City of Mbombela credit control by-laws</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Tariff Policy</h4>
                          <p className="text-sm text-muted-foreground">Water tariff policy and regulations</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save By-law Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default SettingsPage;
