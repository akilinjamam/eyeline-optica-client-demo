/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ILense, ILenseFeatures } from '@/ts-definition/interfaces';
import { ChevronRight } from 'lucide-react';
import React from 'react';
// import { lenses } from './productCategoryData';
import { GoForwardPayload } from '@/ts-definition/types';
import Image from 'next/image';
import defaultImg from '../../../../public/images/lense-1.png';

const LenseTypeSection = ({current, goForward, setSelectedLense, lens, setLensInfo}: {current: {type:string, title?:string}, goForward: (payload: GoForwardPayload) => void, setSelectedLense: (payload: ILense) => void, lens:ILense[], setLensInfo:any }) => {

    return (
        <div>
            {lens
            .filter((l: ILense) => l.subType === current.title)
            .map((item: ILense, index: number) => (
                <div
                key={index}
                onClick={() => {
                if(item.subType === 'zero power'){
                    goForward({ type: 'details-zero-power', title: item.title })    
                }else{
                    goForward({ type: 'details', title: item.title })
                }
                
                setLensInfo({
                    title:item?.title,
                    price:item?.price,
                    brand: item?.brand,
                    color: item?.color,
                    id:item?.id
                })
                }}
                className="flex items-start justify-between p-1 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                                >
                <div className='w-[95%]'>
                   <div className='flex '>
                     <Image width={60} height={60} src={item?.images?.[0] ?? defaultImg} alt='lens-img' className='rounded-md'/>
                     <div>
                        <p  className="px-1 font-bold ml-4">{item.title}</p>
                        <p  className="text-sm px-1 mb-2 ml-4 text-gray-600">{item?.description}</p>
                     </div>
                   </div>
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