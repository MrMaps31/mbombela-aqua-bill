
import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  journalType: z.string().min(1, { message: "Journal type is required" }),
  referenceNumber: z.string().min(1, { message: "Reference number is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.string().min(1, { message: "Date is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const FinancialJournalsPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      journalType: "",
      referenceNumber: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast({
      title: "Journal created",
      description: `Journal ${values.referenceNumber} has been created.`,
    });
    setIsCreateDialogOpen(false);
    form.reset();
  };

  // Sample data
  const journals = [
    {
      id: 1,
      journalType: "Credit Note",
      referenceNumber: "CN-2025-001",
      amount: "R 2,500.00",
      description: "Billing correction for customer #12345",
      date: "2025-04-08",
      status: "Processed",
    },
    {
      id: 2,
      journalType: "Debit Note",
      referenceNumber: "DN-2025-002",
      amount: "R 1,875.50",
      description: "Additional consumption charge for customer #67890",
      date: "2025-04-07",
      status: "Pending",
    },
    {
      id: 3,
      journalType: "Adjustment",
      referenceNumber: "ADJ-2025-003",
      amount: "R 750.00",
      description: "Meter reading adjustment for customer #34521",
      date: "2025-04-06",
      status: "Processed",
    },
  ];

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financial Journals</h1>
          <p className="text-muted-foreground">
            Manage financial journals and accounting entries
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Journal
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Journals</CardTitle>
          <CardDescription>
            View and manage all financial journal entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref Number</TableHead>
                <TableHead>Journal Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journals.map((journal) => (
                <TableRow key={journal.id}>
                  <TableCell>{journal.referenceNumber}</TableCell>
                  <TableCell>{journal.journalType}</TableCell>
                  <TableCell>{journal.amount}</TableCell>
                  <TableCell>{journal.description}</TableCell>
                  <TableCell>{journal.date}</TableCell>
                  <TableCell>{journal.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {journals.length} of {journals.length} journals
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Financial Journal</DialogTitle>
            <DialogDescription>
              Create a new financial journal entry in the system.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="journalType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Journal Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Credit Note, Debit Note, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referenceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter reference number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (ZAR)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount in Rands" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter journal description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Create Journal</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default FinancialJournalsPage;
