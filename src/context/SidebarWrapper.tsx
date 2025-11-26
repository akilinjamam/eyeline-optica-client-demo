/* eslint-disable @typescript-eslint/no-explicit-any */
// component/SidebarWrapper.tsx
'use client';

import React, { ReactNode } from 'react';
import { SidebarProvider } from './SidebarContext';

import SidebarOld from '@/component/UI/SideBarOld';

interface SidebarWrapperProps {
  children: ReactNode;
  data: any ; // Pass the data your Sidebar needs
}

// This component is the only one in this file that needs 'use client'
const SidebarWrapper = ({ children, data }: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <div className="w-full mx-auto flex items-start">
        {/* The SidebarOld component is now inside the Provider */}
        <SidebarOld data={data} />
        {/* Children (ProductGallery page) can now access the context */}
        {children}
      </div>
    </SidebarProvider>
  );
};

export default SidebarWrapper;