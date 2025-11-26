// component/SidebarWrapperForLens.tsx
'use client';

import React, { ReactNode } from 'react';
import { SidebarProvider } from './SidebarContext';
import { TAccessory } from '@/ts-definition/types';
import SidebarAccessory from '@/component/UI/SideBarAccessory';

interface SidebarWrapperProps {
  children: ReactNode;
  data: TAccessory[] ; // Pass the data your Sidebar needs
}

// This component is the only one in this file that needs 'use client'
const SidebarWrapperForAccessory = ({ children, data }: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <div className="w-full mx-auto flex items-start">
        {/* The SidebarOld component is now inside the Provider */}
        <SidebarAccessory data={data} />
        {/* Children (ProductGallery page) can now access the context */}
        {children}
      </div>
    </SidebarProvider>
  );
};

export default SidebarWrapperForAccessory;