
import { useState } from 'react';
import { format } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, Search, DownloadCloud, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for meter readings history
const meterReadingsHistory = [
  {
    id: "1",
    batchId: "B-2023-04-01",
    area: "Mbombela",
    date: "2023-04-01T08:30:00",
    status: "completed",
    totalReadings: 521,
    successfulReadings: 519,
    failedReadings: 2,
    importedBy: "admin@mbombela.gov.za"
  },
  {
    id: "2",
    batchId: "B-2023-03-31",
    area: "Nelspruit",
    date: "2023-03-31T10:15:00",
    status: "completed",
    totalReadings: 432,
    successfulReadings: 430,
    failedReadings: 2,
    importedBy: "meter@mbombela.gov.za"
  },
  {
    id: "3",
    batchId: "B-2023-03-30",
    area: "White River",
    date: "2023-03-30T09:45:00",
    status: "completed",
    totalReadings: 342,
    successfulReadings: 340,
    failedReadings: 2,
    importedBy: "meter@mbombela.gov.za"
  },
  {
    id: "4",
    batchId: "B-2023-03-15",
    area: "Mbombela",
    date: "2023-03-15T14:20:00",
    status: "error",
    totalReadings: 515,
    successfulReadings: 498,
    failedReadings: 17,
    importedBy: "admin@mbombela.gov.za"
  },
  {
    id: "5",
    batchId: "B-2023-03-01",
    area: "Nelspruit",
    date: "2023-03-01T11:10:00",
    status: "completed",
    totalReadings: 435,
    successfulReadings: 435,
    failedReadings: 0,
    importedBy: "meter@mbombela.gov.za"
  }
];

// Mock data for failed readings
const failedReadings = [
  {
    id: "1",
    accountNumber: "MB-10124",
    customerName: "Sarah Johnson",
    address: "78 River View, White River",
    meterNumber: "M56789",
    currentReading: "1245",
    previousReading: "1350",
    error: "Negative consumption detected"
  },
  {
    id: "2",
    accountNumber: "NL-20331",
    customerName: "Coffee Shop Ltd",
    address: "12 Market St, Nelspruit",
    meterNumber: "M12345",
    currentReading: "2890",
    previousReading: "1890",
    error: "Consumption too high"
  }
];

const MeterReadingsPage = () => {
  const [activeTab, setActiveTab] = useState("import");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Successful",
            description: `${selectedFile.name} has been processed successfully.`,
          });
          setActiveTab("history");
          setSelectedFile(null);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const filteredHistory = meterReadingsHistory.filter(item => 
    item.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (batchId: string) => {
    setSelectedBatch(batchId);
    setShowDetailsDialog(true);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Meter Readings</h1>
        <p className="text-muted-foreground">
          Import and manage water meter readings for billing.
        </p>
      </div>

      <Tabs defaultValue="import" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="import">Import Readings</TabsTrigger>
          <TabsTrigger value="history">Import History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="import" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-2">Import Meter Readings</h2>
                <p className="text-muted-foreground text-sm">
                  Upload meter reading data from the meter reading company. Supported formats: CSV, Excel.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="area">Select Area</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mbombela">Mbombela</SelectItem>
                        <SelectItem value="nelspruit">Nelspruit</SelectItem>
                        <SelectItem value="whiteriver">White River</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="importType">Import Type</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Import</SelectItem>
                        <SelectItem value="correction">Reading Corrections</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Reading Date</Label>
                    <Input type="date" id="date" />
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Upload File</Label>
                  <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <p className="text-sm font-medium">
                        {selectedFile ? selectedFile.name : "Drag and drop or click to upload"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Supported formats: CSV, XLS, XLSX
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv, .xls, .xlsx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="mt-4" asChild>
                        <span>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Browse Files
                        </span>
                      </Button>
                    </label>
                  </div>
                  
                  {selectedFile && !isUploading && (
                    <div className="mt-4">
                      <Button className="w-full" onClick={handleUpload}>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Import Readings
                      </Button>
                    </div>
                  )}
                  
                  {isUploading && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
              
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Import Guidelines</AlertTitle>
                <AlertDescription className="text-sm">
                  <p className="my-1">Ensure your file follows the required format:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>First row should contain headers</li>
                    <li>Required columns: Account Number, Meter Number, Reading Date, Reading Value</li>
                    <li>Each row should represent a single meter reading</li>
                  </ul>
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Download Template</Button>
                <Button variant="outline">Validate File</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-xl font-medium mb-2">Import History</h2>
                  <p className="text-muted-foreground text-sm">
                    View history of previous meter reading imports.
                  </p>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by batch ID or area..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableCaption>History of meter reading imports</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Readings</TableHead>
                      <TableHead>Imported By</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.batchId}</TableCell>
                        <TableCell>{item.area}</TableCell>
                        <TableCell>{format(new Date(item.date), 'dd/MM/yyyy HH:mm')}</TableCell>
                        <TableCell>
                          <Badge className={
                            item.status === 'completed' 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }>
                            {item.status === 'completed' ? (
                              <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                            ) : (
                              <AlertTriangle className="mr-1 h-3 w-3 inline" />
                            )}
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <span>{item.successfulReadings}/{item.totalReadings} successful</span>
                            <div className="w-24 h-2 bg-muted rounded-full mt-1">
                              <div 
                                className="h-full bg-green-500 rounded-full" 
                                style={{ width: `${(item.successfulReadings/item.totalReadings)*100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.importedBy}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8"
                            onClick={() => handleViewDetails(item.batchId)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button>
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Batch Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Batch Details: {selectedBatch}</DialogTitle>
            <DialogDescription>
              View the details and errors for this meter reading batch.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 my-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                  Completed
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Readings</p>
                <p className="font-medium">521</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Successful</p>
                <p className="font-medium text-green-700">519 (99.6%)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Failed</p>
                <p className="font-medium text-red-700">2 (0.4%)</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Failed Readings</h3>
              {failedReadings.length > 0 ? (
                <div className="max-h-64 overflow-y-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Meter</TableHead>
                        <TableHead>Reading</TableHead>
                        <TableHead>Error</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {failedReadings.map((reading) => (
                        <TableRow key={reading.id}>
                          <TableCell className="font-medium">{reading.accountNumber}</TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{reading.customerName}</p>
                              <p className="text-xs text-muted-foreground">{reading.address}</p>
                            </div>
                          </TableCell>
                          <TableCell>{reading.meterNumber}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>Current: {reading.currentReading}</p>
                              <p>Previous: {reading.previousReading}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                              {reading.error}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-4 border rounded-md bg-muted/20">
                  <p>No failed readings in this batch.</p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button>
              <DownloadCloud className="mr-2 h-4 w-4" />
              Export Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default MeterReadingsPage;
