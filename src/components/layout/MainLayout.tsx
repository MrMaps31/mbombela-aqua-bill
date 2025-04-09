
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={cn(
        "transition-all duration-300 flex flex-col",
        sidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mbombela Water Utility Billing System</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
