/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {  TAccessoryItem, TContactLens, TFrame, TLens, TRegardingInfoTab } from '@/ts-definition/types';
import React, { useState } from 'react';
import OtherDetailInfo from './OtherDetailInfo';
import Description from './Description';
import { usePathname } from 'next/navigation';
import OtherDetailInfoForLens from './otherDetailInfoForLens';
import OtherDetailInfoForContactLens from './OtherDetailInfoForContactLens';
import OtherDetailInfoForAccessory from './OtherDetailInfoforAccessory';

const RegardingInfo = ({data}:{data:TFrame | TLens | TAccessoryItem |any}) => {
    const [selectTab, setSelectTab] = useState<number>(0);

    const location = usePathname();
    const currentLocation = location?.split('/')?.[1];

    const info:TRegardingInfoTab[] = [
        {
            info: 'Details'
        },
        {
            info: 'Description'
        },
        {
            info: 'Reviews'
        },
    ]

    return (
        <div className='min-h-[300px]'>
            <div className='flex items-center w-full mt-3 select-none lg:ml-0 md:ml-0 ml-4 text-black'>
                {
                    info.map((tab:TRegardingInfoTab, index:number) => <p onClick={() => setSelectTab(index)} className={`mr-4 font-semibold ${selectTab === index ? 'border-b-2 border-gray-400' : ''} cursor-pointer`} key={index}>{tab.info}</p> )
                }
            </div>
             {(selectTab === 0 && (currentLocation === "productDetail") ) && <OtherDetailInfo detail={data as TFrame}/>}
             {(selectTab === 0 && (currentLocation === "lensDetail") ) && <OtherDetailInfoForLens detail={data as TLens}/>}
             {(selectTab === 0 && (currentLocation === "contactLensDetail") ) && <OtherDetailInfoForContactLens detail={data as TContactLens}/>}
             {(selectTab === 0 && (currentLocation === "accessoryDetail") ) && <OtherDetailInfoForAccessory detail={data as any}/>}
             {selectTab === 1 && (currentLocation !== "accessoryDetail" ) && <Description description={data.description as any  }/>}
             {selectTab === 1 && (currentLocation === "accessoryDetail" ) && <Description description={data.items.map((item:TAccessoryItem) => item?.description)?.join(",") as any  }/>}
        </div>
    ); 
};

export default RegardingInfo;