'use client'
import { TFrame, TRegardingInfoTab } from '@/ts-definition/types';
import React, { useState } from 'react';
import OtherDetailInfo from './OtherDetailInfo';
import Description from './Description';

const RegardingInfo = ({data}:{data:TFrame}) => {
    const [selectTab, setSelectTab] = useState<number>(0);

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
            <div className='flex items-center w-full mt-3 select-none'>
                {
                    info.map((tab:TRegardingInfoTab, index:number) => <p onClick={() => setSelectTab(index)} className={`mr-4 font-semibold ${selectTab === index ? 'border-b-2 border-gray-400' : ''} cursor-pointer`} key={index}>{tab.info}</p> )
                }
            </div>
             {selectTab === 0 && <OtherDetailInfo/>}
             {selectTab === 1 && <Description description={data.description as string}/>}
        </div>
    );
};

export default RegardingInfo;