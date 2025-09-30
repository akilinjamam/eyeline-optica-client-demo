import Footer from '@/component/Footer';
import TopFooter from '@/component/TopFooter';
import SidebarContactLens from '@/component/UI/SidebarContactLens';
import { getcontactLens } from '@/fetchData/fetchFrameData';
import { TContactLens, TData, } from '@/ts-definition/types';
import React, { ReactNode, Suspense } from 'react';

const ContactLensLayout = async ({ children }: { children: ReactNode }) => {
  const allFrameData = await getcontactLens({}) as TData<TContactLens[]>;
  const data = allFrameData?.data?.data;

  return (
    <div className="w-full bg-blue-50 relative">
      <div className="w-full mx-auto flex items-start">
       
        <Suspense fallback={<div>Loading filters...</div>}>
          <SidebarContactLens data={data} />
        </Suspense>
        {children}
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
};

export default ContactLensLayout;
