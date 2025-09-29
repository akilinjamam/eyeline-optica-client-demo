import Footer from '@/component/Footer';
import TopFooter from '@/component/TopFooter';
import SidebarOld from '@/component/UI/SideBarOld';
import { getFrame } from '@/fetchData/fetchFrameData';
import { TData, TFrame } from '@/ts-definition/types';
import React, { ReactNode } from 'react';

const Sunglasses = async ({children}: {children:ReactNode}) => {
    const allFrameData = await getFrame({}) as TData<TFrame[]>;
    const data = allFrameData?.data?.data;
     return (
        <div className="w-full bg-blue-50 relative">
            <div className="w-full mx-auto flex items-start">
                <SidebarOld data={data}/>
                {children}
            </div>
            <TopFooter/>
            <Footer/>
        </div>
    );
};

export default Sunglasses;