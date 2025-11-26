// context/SidebarContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface SidebarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  // or (isOpen: boolean) => void if using useState directly
}

// Create the Context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Custom Hook to use the context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Provider Component (MUST be a client component)
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};