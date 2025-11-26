// component/SidebarWrapperForLens.tsx
'use client';

import React, { ReactNode } from 'react';
import { SidebarProvider } from './SidebarContext';

import SidebarLens from '@/component/UI/SidebarLens';
import { TLens } from '@/ts-definition/types';

interface SidebarWrapperProps {
  children: ReactNode;
  data: TLens[] ; // Pass the data your Sidebar needs
}

// This component is the only one in this file that needs 'use client'
const SidebarWrapperForLens = ({ children, data }: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <div className="w-full mx-auto flex items-start">
        {/* The SidebarOld component is now inside the Provider */}
        <SidebarLens data={data} />
        {/* Children (ProductGallery page) can now access the context */}
        {children}
      </div>
    </SidebarProvider>
  );
};

export default SidebarWrapperForLens;