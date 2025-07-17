import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, Send, Database, FileText, Users, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const BulkOperationsPage = () => {
  const recentBulkOperations = [
    {
      id: "BULK-001",
      type: "Payment Import",
      status: "Completed",
      records: 2847,
      completedAt: "2024-01-15 14:30",
      success: 2843,
      errors: 4
    },
    {
      id: "BULK-002",
      type: "SMS Notifications",
      status: "In Progress",
      records: 15000,
      completedAt: null,
      success: 12456,
      errors: 12,
      progress: 83
    },
    {
      id: "BULK-003",
      type: "Bill Generation",
      status: "Completed",
      records: 96234,
      completedAt: "2024-01-14 09:15",
      success: 96234,
      errors: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-600";
      case "In Progress": return "text-blue-600";
      case "Failed": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Bulk Operations</h1>
            <p className="text-muted-foreground">Manage large-scale operations across your customer base</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-500" />
                Data Import
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select import type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payments">Payment Records</SelectItem>
                    <SelectItem value="customers">Customer Data</SelectItem>
                    <SelectItem value="readings">Meter Readings</SelectItem>
                    <SelectItem value="connections">New Connections</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="file" accept=".csv,.xlsx" />
                <Button className="w-full gap-2">
                  <Upload className="h-4 w-4" />
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Download className="h-5 w-5 text-green-500" />
                Data Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select export type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customers">Customer List</SelectItem>
                    <SelectItem value="bills">Billing Records</SelectItem>
                    <SelectItem value="payments">Payment History</SelectItem>
                    <SelectItem value="usage">Usage Reports</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Send className="h-5 w-5 text-purple-500" />
                Bulk Messaging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS Notification</SelectItem>
                    <SelectItem value="email">Email Notification</SelectItem>
                    <SelectItem value="both">SMS + Email</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="overdue">Overdue Accounts</SelectItem>
                    <SelectItem value="sector">Specific Sector</SelectItem>
                    <SelectItem value="commercial">Commercial Only</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Messages
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5 text-orange-500" />
                Batch Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Process type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Generate Bills</SelectItem>
                    <SelectItem value="statements">Generate Statements</SelectItem>
                    <SelectItem value="reconnections">Bulk Reconnections</SelectItem>
                    <SelectItem value="disconnections">Bulk Disconnections</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Number of records" type="number" />
                <Button className="w-full gap-2">
                  <Database className="h-4 w-4" />
                  Start Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bulk Message Composer</CardTitle>
            <CardDescription>Create and send notifications to multiple customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="Enter message subject" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Template</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payment-reminder">Payment Reminder</SelectItem>
                      <SelectItem value="maintenance-notice">Maintenance Notice</SelectItem>
                      <SelectItem value="bill-ready">Bill Ready</SelectItem>
                      <SelectItem value="welcome">Welcome Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message Content</label>
                <Textarea 
                  placeholder="Enter your message content here..." 
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Estimated recipients: 45,678 customers
                </div>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Send Bulk Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bulk Operations</CardTitle>
            <CardDescription>Track the status of your bulk operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBulkOperations.map((operation) => (
                <div key={operation.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{operation.type}</h3>
                      <p className="text-sm text-muted-foreground">{operation.id}</p>
                    </div>
                    <div className={`font-medium ${getStatusColor(operation.status)}`}>
                      {operation.status}
                    </div>
                  </div>
                  
                  {operation.status === "In Progress" && operation.progress && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{operation.progress}%</span>
                      </div>
                      <Progress value={operation.progress} className="w-full" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-4">
                      <span>Records: {operation.records.toLocaleString()}</span>
                      <span className="text-green-600">Success: {operation.success.toLocaleString()}</span>
                      <span className="text-red-600">Errors: {operation.errors}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {operation.completedAt || "In progress..."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BulkOperationsPage;