import Footer from '@/component/Footer';
import TopFooter from '@/component/TopFooter';
import SidebarSkeleton from '@/component/UI/sceleton/SidebarScheleton';
// import SidebarOld from '@/component/UI/SideBarOld';
import SidebarWrapper from '@/context/SidebarWrapper';
import { getFrame } from '@/fetchData/fetchFrameData';
import { TData, TFrame } from '@/ts-definition/types';
import React, { ReactNode, Suspense } from 'react';

const Sunglasses = async ({ children }: { children: ReactNode }) => {
  const allFrameData = await getFrame({}) as TData<TFrame[]>;
  const data = allFrameData?.data?.data;

  return (
    <div className="w-full bg-blue-50 relative">
      <div className="w-full mx-auto flex items-start">
       
        <Suspense fallback={<SidebarSkeleton/>}>
         <SidebarWrapper data={data}>
          {children}
        </SidebarWrapper>
        </Suspense>
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
};

export default Sunglasses;
