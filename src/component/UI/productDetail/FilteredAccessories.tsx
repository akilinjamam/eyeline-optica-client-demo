/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ChevronRight } from 'lucide-react';
import React from 'react';

import { GoForwardPayload, TAccessory, TAccessoryItem, TWeeklyDeals } from '@/ts-definition/types';
import Image from 'next/image';
import defaultImg from '../../../../public/images/lense-1.png'

const FilteredAccessories = ({goForward, current, allAccessory, setSelectAccessory, setOpen, dealsData}: {goForward: (payload: GoForwardPayload) => void, current:{type:string, title:string}, allAccessory:TAccessory[],  setSelectAccessory:any, setOpen:any, dealsData:TWeeklyDeals }) => {
   
    console.log(allAccessory?.map((value:any) => value.type))

    const managedData = allAccessory?.map((item:TAccessory) => {
        const name = item?.items?.map((value:TAccessoryItem) => value.name)?.join("+");
        const price = item?.items?.map((value:TAccessoryItem) => value.salesPrice)?.join("+");
        const total = item?.items?.map((value:TAccessoryItem) => value.salesPrice)?.reduce((acc:number, sum:number) => acc + sum,0);
        const brand = item?.items?.map((value:TAccessoryItem) => value.brand)?.join("+");
        const description = item?.items?.map((value:TAccessoryItem) => value.description)?.join("and");
        const category = item?.items?.map((value:TAccessoryItem) => value.description)?.join("and");
    
        
        return {
            id: item?._id,
            type:item?.type,
            images: item?.images,
            image:item?.images[0],
            name,
            price,
            total,
            description,
            brand,
            category,
            weeklyDeals:item?.weeklyDeals
        }
    })

    const sortedManagedData = managedData?.sort((a:any,b:any) => {
        return (b.weeklyDeals ? 1 : 0) - (a.weeklyDeals ? 1 : 0)
    });

    console.log(sortedManagedData);
    

    return (
        <div>
            {managedData
                .filter((l: any) => l.type === current.type)
                .map((item: any, index: number) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSelectAccessory({
                                    id:item?.id,
                                    name: item?.name,
                                    price: item?.price,
                                    total:item?.total,
                                    brand: item?.brand,
                                    images: item?.images,
                                    description: item?.description,
                                    category: item?.category,
                                    weeklyDeals: item?.weeklyDeals
                            })
                            goForward({ type: 'details', title: current.title })
                        }}
                        className="flex items-start justify-between p-2 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                    >
                    <div className='w-[95%]'>
                        <div className='flex '>
                            <Image width={60} height={60} src={item?.image ?? defaultImg} alt='lens-img' className='rounded-md'/>
                            <div>
                                <p  className="px-1 font-bold ml-4">{item.title}</p>
                                <p  className="text-sm px-1 mb-2 ml-4 text-gray-600">{item?.description}</p>
                            </div>
                        </div>
                            
                        <div className='flex items-center justify-between mt-5'>
                            <div onClick={(event) => {
                                event.stopPropagation();
                                setSelectAccessory({
                                    id:item?.id,
                                    name: item?.name,
                                    price: item?.price,
                                    total:item?.total,
                                    brand: item?.brand,
                                    images: item?.images,
                                    description: item?.description,
                                    category: item?.category
                                })
                                setOpen(true)
                               
                            }}  className='text-sm text-green-400 flex items-center hover:bg-gray-300 rounded-md p-1'> 
                            <p>Details</p> 
                            <ChevronRight size={13}/>
                        </div>
                        <div>
                            <span className='text-sm font-bold text-red-600 line-through '> ৳{item?.weeklyDeals && item?.price }</span>
                            <span className='text-sm font-bold text-orange-600'> ৳{item?.weeklyDeals ? (item?.total - (Number(item?.total * dealsData?.discountPercent) / 100)) : item.total}</span>
                        </div>
                        </div>
                    </div>
                        <ChevronRight />
                </div>
            ))}
        </div>
    );
};

export default FilteredAccessories;