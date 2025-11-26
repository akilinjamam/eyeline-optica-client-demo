/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { IPowerOptions } from '@/ts-definition/interfaces';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import {  powerTypeForContactLens } from './productCategoryData';
import { GoForwardPayload } from '@/ts-definition/types';

const ContactLensPowerOption = ({goForward, lensInfo}: {goForward: (payload: GoForwardPayload) => void, lensInfo?:any}) => {
    console.log(lensInfo)
    return (
        <div>
            {
                powerTypeForContactLens?.filter((i:any) => i.title === lensInfo.powerType).map((power:IPowerOptions, index:number) => {
                        return (
                            <div onClick={() => goForward({type: power.title, title: power.title})} key={index} className='bg-white hover:bg-gray-100 my-2 rounded-md cursor-pointer flex items-center justify-between'>
                                <div>
                                    <p className='px-2 pb-3 font-bold'>{power.subTitle}</p>
                                
                                    <p className='px-2 pb-2 text-sm'>{power.description}</p>
                                </div>
                                <ChevronRight/>
                            </div>
                        )
                })
            }
        </div>
    );
};

export default ContactLensPowerOption;