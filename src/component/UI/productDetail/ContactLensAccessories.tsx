"use client"
import { IPowerOptions } from '@/ts-definition/interfaces';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import {  powerTypeAndAccessories } from './productCategoryData';
import { GoForwardPayload } from '@/ts-definition/types';

const ContactLensAccessories = ({goForward, current}: {goForward: (payload: GoForwardPayload) => void, current:{type:string, title:string}}) => {
    console.log(current)
    return (
        <div>
            {
                powerTypeAndAccessories?.filter(f => f.title === `${current.title} and accessories`).map((power:IPowerOptions, index:number) => {
                        return (
                            <div onClick={() => goForward({type: power.subTitle, title: power.title})} key={index} className='bg-white hover:bg-gray-100 my-2 rounded-md cursor-pointer flex items-center justify-between'>
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

export default ContactLensAccessories;