"use client"
import { IPowerOptions } from '@/ts-definition/interfaces';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { powerOptions } from './productCategoryData';
import { GoForwardPayload } from '@/ts-definition/types';

const LenseDetailSectionWithAccessory = ({goForward}: {goForward: (payload: GoForwardPayload) => void}) => {
    return (
        <div className='px-2'>
            {
                powerOptions.map((power:IPowerOptions, index:number) => {
                        return (
                            <div onClick={() => goForward({type: 'details', title: power.subTitle})} key={index} className='bg-gray-100 hover:bg-gray-200 my-2 rounded-md cursor-pointer flex items-center justify-between'>
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

export default LenseDetailSectionWithAccessory;