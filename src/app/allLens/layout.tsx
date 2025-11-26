import Footer from '@/component/Footer';
import TopFooter from '@/component/TopFooter';
import SidebarSkeleton from '@/component/UI/sceleton/SidebarScheleton';
import SidebarWrapperForLens from '@/context/SideBarWrapperForLens';

import { getLens } from '@/fetchData/fetchFrameData';
import { TData, TLens } from '@/ts-definition/types';
import React, { ReactNode, Suspense } from 'react';

const LensLayout = async ({ children }: { children: ReactNode }) => {
  const allFrameData = await getLens({}) as TData<TLens[]>;
  const data = allFrameData?.data?.data;

  return (
    <div className="w-full bg-blue-50 relative">
      <div className="w-full mx-auto flex items-start">
       
        <Suspense fallback={<SidebarSkeleton/>}>
         <SidebarWrapperForLens data={data}>
          {children}
        </SidebarWrapperForLens>
        </Suspense>
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
};

export default LensLayout;
