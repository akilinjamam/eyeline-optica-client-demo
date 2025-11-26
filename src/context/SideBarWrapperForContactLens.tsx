// component/SidebarWrapperForContactLens.tsx
'use client';

import React, { ReactNode } from 'react';
import { SidebarProvider } from './SidebarContext';
import { TContactLens } from '@/ts-definition/types';
import SidebarContactLens from '@/component/UI/SidebarContactLens';

interface SidebarWrapperProps {
  children: ReactNode;
  data: TContactLens[] ; // Pass the data your Sidebar needs
}

// This component is the only one in this file that needs 'use client'
const SidebarWrapperForContactLens = ({ children, data }: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <div className="w-full mx-auto flex items-start">
        {/* The SidebarOld component is now inside the Provider */}
        <SidebarContactLens data={data} />
        {/* Children (ProductGallery page) can now access the context */}
        {children}
      </div>
    </SidebarProvider>
  );
};

export default SidebarWrapperForContactLens;