import Footer from '@/component/Footer';
import TopFooter from '@/component/TopFooter';
import SidebarLens from '@/component/UI/SidebarLens';

import { getLens } from '@/fetchData/fetchFrameData';
import { TData, TLens } from '@/ts-definition/types';
import React, { ReactNode, Suspense } from 'react';

const LensLayout = async ({ children }: { children: ReactNode }) => {
  const allFrameData = await getLens({}) as TData<TLens[]>;
  const data = allFrameData?.data?.data;

  return (
    <div className="w-full bg-blue-50 relative">
      <div className="w-full mx-auto flex items-start">
       
        <Suspense fallback={<div>Loading filters...</div>}>
          <SidebarLens data={data} />
        </Suspense>
        {children}
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
};

export default LensLayout;
