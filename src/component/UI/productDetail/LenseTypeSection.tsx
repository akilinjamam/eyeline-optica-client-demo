"use client"
import { ILense, ILenseFeatures } from '@/ts-definition/interfaces';
import { ChevronRight } from 'lucide-react';
import React from 'react';
// import { lenses } from './productCategoryData';
import { GoForwardPayload } from '@/ts-definition/types';

const LenseTypeSection = ({current, goForward, setSelectedLense, lens}: {current: {type:string, title?:string}, goForward: (payload: GoForwardPayload) => void, setSelectedLense: (payload: ILense) => void, lens:ILense[] }) => {

    console.log(current.title)

    return (
        <div>
            {lens
            .filter((l: ILense) => l.subType === current.title)
            .map((item: ILense, index: number) => (
                <div
                key={index}
                onClick={() => {
                if(item.subType === 'Zero Power') return
                goForward({ type: 'details', title: item.title })
                }}
                className="flex items-start justify-between p-1 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                                >
                <div className='w-[95%]'>
                    <p  className="px-1 font-bold mb-2">{item.title}</p>
                    {
                        item.features.map((feature: ILenseFeatures, index:number) => <p className='ml-3 text-sm' key={index}>{feature.feature}</p> )
                    }
                    <br />
                    <div className='flex items-center justify-between'>
                        <div onClick={(event) => {
                        event.stopPropagation();
                        setSelectedLense(item)
                        }}  className='text-sm text-green-400 ml-3 flex items-center hover:bg-gray-300 rounded-md p-1'> 
                        <p>Details</p> 
                        <ChevronRight size={13}/>
                        </div>
                            <p className='text-sm font-bold text-orange-600'> ৳{item.price}</p>
                    </div>
                </div>
                    <ChevronRight />
                </div>
                ))}
        </div>
    );
};

export default LenseTypeSection;