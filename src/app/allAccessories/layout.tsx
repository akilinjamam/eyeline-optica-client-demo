import Footer from '@/component/Footer';
import TopFooter from '@/component/TopFooter';
import SidebarSkeleton from '@/component/UI/sceleton/SidebarScheleton';
import SidebarAccessory from '@/component/UI/SideBarAccessory';
import { getAccessory,  } from '@/fetchData/fetchFrameData';
import { TAccessory, TData, } from '@/ts-definition/types';
import React, { ReactNode, Suspense } from 'react';

const AccessoryLensLayout = async ({ children }: { children: ReactNode }) => {
  const allAccessories = await getAccessory({}) as TData<TAccessory[]>;
  const data = allAccessories?.data?.data;
  return (
    <div className="w-full bg-blue-50 relative">
      <div className="w-full mx-auto flex items-start">
       
        <Suspense fallback={<SidebarSkeleton/>}>
          <SidebarAccessory data={data} />
        </Suspense>
        {children}
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
};

export default AccessoryLensLayout;
