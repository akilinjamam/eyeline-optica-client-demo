/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ILense } from '@/ts-definition/interfaces';
import { ChevronRight, Dot } from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';
// import { lenses } from './productCategoryData';
import { GoForwardPayload, TWeeklyDeals } from '@/ts-definition/types';
import Image from 'next/image';
import defaultImg from '../../../../public/images/lense-1.png';
import useSwipe from '@/custom-hooks/useSwipe';

const LenseTypeSection = ({current, goForward, setSelectedLense, lens, setLensInfo, badgeCategory, dealsData}: {current: {type:string, title?:string}, goForward: (payload: GoForwardPayload) => void, setSelectedLense: (payload: ILense) => void, lens:ILense[], setLensInfo:any, badgeCategory?:any , dealsData:TWeeklyDeals}) => {

    
    const sorteLensWithWeeklyDeals = useMemo(() => {
        const sortedData = lens?.sort((a:any,b:any) => {
            return (b.weeklyDeals ? 1 : 0) - (a.weeklyDeals ? 1 : 0)
        });
        return sortedData
    }, [lens])
    
    const swipeRef = useRef(null);
    const [subType , setSubType] = useState("Lense");
    const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)
    
    
    return (
        <div className='h-[75vh] overflow-y-scroll hide-scrollbar'>
            <div className='w-[90%]  absolute top-3 right-0'>
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
                        badgeCategory?.filter((f:any) => f.type === current.title)?.map((item:any, index:number) => (
                            <div onClick={() => {
                                setSubType(item.badge)
                            }} key={index} className='w-auto bg-gradient-to-b from-[#2770FF] to-[#1A46BB]  text-white text-[12px] px-3 py-1 rounded-full mr-1 cursor-pointer'>
                                {item?.badge?.split(' ')?.join("_")}
                            </div>
                        ))
                    }
                    {
                        current.title !== "Frame Only" && <p onClick={() => setSubType("Lense")} className='w-auto bg-gradient-to-b from-[#2770FF] to-[#1A46BB]  text-white text-[12px] px-3 py-1 rounded-full mr-1 cursor-pointer'>All</p>
                    }
                </div>
                </div>
            </div>
            {sorteLensWithWeeklyDeals
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
                    id:item?.id,
                    weeklyDeals: item?.weeklyDeals,
                    lensType: item?.subType

                })
                }}
                className="flex items-start justify-between p-1 bg-white hover:bg-gray-100 m-2 rounded-md cursor-pointer w-[97%] "
                                >
                <div className='w-full'>
                   <div className='flex w-full'>
                     <div className='w-[30%]'>
                        <Image width={100} height={100} src={item?.images?.[0] ?? defaultImg} alt='lens-img' className='rounded-md w-full'/>
                     </div>
                     <div className='w-[70%] ml-2 relative'>
                        <div className='w-full flex items-center justify-between'>
                        <p  className="px-1 font-bold">{item.title}</p>
                            <ChevronRight />
                        </div>
                        <div >
                            {
                                item?.features?.slice(0,2)?.map((feature:any, index:number) => <div key={index}>
                                    <div className="text-xs flex items-center justify-start   text-gray-600"><Dot/> <p>{feature}</p></div>
                                </div> )
                            }
                        </div>
                         <div className='flex items-center justify-between'>
                        <div onClick={(event) => {
                        event.stopPropagation();
                        setSelectedLense(item)
                        }}  className='text-sm text-green-400  flex items-center hover:bg-gray-300 rounded-md p-1'> 
                        <p>Details</p> 
                        <ChevronRight size={13}/>
                        </div>        
                            <div>
                                {   item?.weeklyDeals &&
                                    <span className='line-through text-red-600'>{item?.price}</span>
                                } 
                                <span className='text-sm font-bold text-orange-600'> ৳         {item?.weeklyDeals ? (item?.price - Math.floor(((item.price * dealsData?.discountPercent) / 100))) : item?.price} 
                                </span>
                                
                            </div>           
                    </div>
                     </div>
                   </div>        
                </div >
                </div>
                ))}
        </div>
    );
};

export default LenseTypeSection;