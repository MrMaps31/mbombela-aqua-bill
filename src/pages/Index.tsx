
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, CircleDollarSign, Droplet, Users, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Index = () => {
  const [period, setPeriod] = useState('monthly');

  // Mock data for demonstration
  const revenueData = [
    { name: 'Jan', Mbombela: 140000, Nelspruit: 118000, WhiteRiver: 95000 },
    { name: 'Feb', Mbombela: 150000, Nelspruit: 130000, WhiteRiver: 90000 },
    { name: 'Mar', Mbombela: 160000, Nelspruit: 125000, WhiteRiver: 100000 },
    { name: 'Apr', Mbombela: 175000, Nelspruit: 135000, WhiteRiver: 105000 },
    { name: 'May', Mbombela: 165000, Nelspruit: 140000, WhiteRiver: 110000 },
    { name: 'Jun', Mbombela: 180000, Nelspruit: 145000, WhiteRiver: 108000 }
  ];

  const consumptionData = [
    { name: 'Jan', consumption: 4500 },
    { name: 'Feb', consumption: 4800 },
    { name: 'Mar', consumption: 5100 },
    { name: 'Apr', consumption: 4900 },
    { name: 'May', consumption: 5200 },
    { name: 'Jun', consumption: 5400 }
  ];
  
  // Stats cards data
  const statsCards = [
    { 
      title: 'Total Revenue', 
      value: 'R 2,450,230', 
      change: '+8.2%', 
      status: 'increase',
      icon: <CircleDollarSign className="h-5 w-5 text-green-600" />,
      description: 'vs last month'
    },
    { 
      title: 'Water Consumption', 
      value: '421,560 kL',
      change: '+4.5%', 
      status: 'increase',
      icon: <Droplet className="h-5 w-5 text-aqua-600" />,
      description: 'vs last month'
    },
    { 
      title: 'Total Customers', 
      value: '15,432',
      change: '+1.2%', 
      status: 'increase',
      icon: <Users className="h-5 w-5 text-mbombela-600" />,
      description: 'vs last month'
    },
    { 
      title: 'Overdue Accounts', 
      value: '846',
      change: '-2.5%', 
      status: 'decrease',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      description: 'vs last month'
    }
  ];

  // Latest actions data
  const latestActions = [
    { id: 1, action: 'Customer Payment Received', customer: 'John Smit', amount: 'R 1,250.00', time: '10 minutes ago' },
    { id: 2, action: 'Meter Reading Imported', details: 'Batch #45632', count: '1,205 readings', time: '2 hours ago' },
    { id: 3, action: 'Account Disconnection Notice', customer: 'Tech Solutions Ltd', amount: 'R 15,750.00', time: '5 hours ago' },
    { id: 4, action: 'New Customer Added', customer: 'Sarah Johnson', area: 'White River', time: '1 day ago' },
    { id: 5, action: 'Credit Control Warning', customer: '24 accounts', amount: 'R 125,430.00', time: '1 day ago' },
  ];

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mbombela Water Utility Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Mbombela Aqua Bill management system. View and manage your water utility operations.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsCards.map((card, index) => (
          <Card key={index} className="dashboard-card">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">{card.title}</h2>
              <div className="p-2 rounded-full bg-muted/50">{card.icon}</div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{card.value}</p>
              <div className="flex items-center mt-1">
                <span className={cn(
                  "text-xs font-medium mr-1",
                  card.status === 'increase' ? 'text-green-600' : 'text-red-600'
                )}>
                  {card.change}
                  {card.status === 'increase' ? (
                    <ArrowUp className="h-3 w-3 inline ml-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 inline ml-0.5" />
                  )}
                </span>
                <span className="text-xs text-muted-foreground">{card.description}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="dashboard-card">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Revenue by Town</h2>
              <Tabs defaultValue="monthly" value={period} onValueChange={setPeriod} className="w-auto">
                <TabsList className="h-8 w-fit bg-muted">
                  <TabsTrigger value="monthly" className="text-xs h-7">Monthly</TabsTrigger>
                  <TabsTrigger value="quarterly" className="text-xs h-7">Quarterly</TabsTrigger>
                  <TabsTrigger value="yearly" className="text-xs h-7">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => `R ${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="Mbombela" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Nelspruit" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="WhiteRiver" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Water Consumption</h2>
              <Badge variant="outline" className="bg-aqua-50 text-aqua-700 border-aqua-200">
                In Kiloliters
              </Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consumptionData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => `${value.toLocaleString()} kL`} />
                  <Bar dataKey="consumption" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Latest Activity */}
      <div className="mb-8">
        <Card className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Latest Activity</h2>
            <Badge variant="outline">Today</Badge>
          </div>
          <div className="space-y-6">
            {latestActions.map((action) => (
              <div key={action.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
                  {action.action.includes('Payment') && <CircleDollarSign className="h-5 w-5 text-green-600" />}
                  {action.action.includes('Meter') && <Droplet className="h-5 w-5 text-aqua-600" />}
                  {action.action.includes('Disconnection') && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                  {action.action.includes('Customer') && <Users className="h-5 w-5 text-mbombela-600" />}
                  {action.action.includes('Credit') && <AlertTriangle className="h-5 w-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{action.action}</p>
                    <span className="text-xs text-muted-foreground">{action.time}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {action.customer && <span className="mr-3">{action.customer}</span>}
                    {action.amount && <span className="font-medium text-black dark:text-white">{action.amount}</span>}
                    {action.details && <span>{action.details}</span>}
                    {action.count && <span className="ml-2">{action.count}</span>}
                    {action.area && <span className="ml-2">{action.area}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;
