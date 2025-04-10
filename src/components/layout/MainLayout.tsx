
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto py-8 px-4">
      {children}
    </div>
  );
};

export default MainLayout;
