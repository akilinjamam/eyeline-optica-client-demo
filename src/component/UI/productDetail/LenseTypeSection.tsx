/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ILense, ILenseFeatures } from '@/ts-definition/interfaces';
import { ChevronRight, Dot } from 'lucide-react';
import React, { useRef, useState } from 'react';
// import { lenses } from './productCategoryData';
import { GoForwardPayload } from '@/ts-definition/types';
import Image from 'next/image';
import defaultImg from '../../../../public/images/lense-1.png';
import useSwipe from '@/custom-hooks/useSwipe';

const LenseTypeSection = ({current, goForward, setSelectedLense, lens, setLensInfo, badgeCategory}: {current: {type:string, title?:string}, goForward: (payload: GoForwardPayload) => void, setSelectedLense: (payload: ILense) => void, lens:ILense[], setLensInfo:any, badgeCategory?:any }) => {

    const swipeRef = useRef(null);
            const [subType , setSubType] = useState("Lense");
            const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)


    return (
        <div className='h-[80vh] overflow-y-scroll hide-scrollbar'>
            <div className='w-[90%] absolute top-3 right-0'>
                <div className='flex item-center justify-start overflow-x-hidden cursor-grab '
                ref={swippedRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                >
                <div className='flex items-center justify-between'>
                    { current.title !== "Frame Only" &&
                        ["All",...badgeCategory]?.map((item:any, index:number) => (
                            <div onClick={() => {
                                if(item === "All"){
                                    setSubType("Lense")
                                    return
                                }
                                setSubType(item)
                            }} key={index} className='w-auto bg-blue-800 text-white px-3 py-1 rounded-full mr-4 cursor-pointer'>{item?.split(' ')?.join("_")}</div>
                        ))
                    }
                </div>
                </div>
            </div>
            {lens
            .filter((l: ILense) => l.subType === current.title)?.filter((i:ILense) => i.badge === subType || i.type === subType )
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
                     <div>
                        <Image width={60} height={60} src={item?.images?.[0] ?? defaultImg} alt='lens-img' className='rounded-md'/>
                     </div>
                     <div>
                        <p  className="px-1 font-bold">{item.title}</p>
                        {
                            item?.features?.slice(0,2)?.map((feature:any, index:number) => <div key={index}>
                                <div className="text-xs flex items-center justify-start   text-gray-600"><Dot/> <p>{feature}</p></div>
                            </div> )
                        }
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