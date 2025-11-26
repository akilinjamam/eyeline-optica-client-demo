"use client"
import { IPowerTypes } from '@/ts-definition/interfaces';
import { GoForwardPayload } from '@/ts-definition/types';
import { ChevronRight } from 'lucide-react';
import React from 'react';



const PowerTypeSection = ({powerTypes, goForward, productType, genderType}: {powerTypes: IPowerTypes[], goForward: (payload: GoForwardPayload) => void, productType:string, genderType: string }) => {

    let customType = '';

    if(genderType === 'kids'){
        customType = 'kids'
    }else{
        customType = productType
    }

    const modifyName = (value:string) => {
        if(value === 'single vision'){
            return 'Single Vision/With Power'
        }
        if(value === 'progressive'){
            return 'Progressive'
        }
        if(value === 'bifocal'){
            return 'Bifocal'
        }
        if(value === 'zero power'){
            return 'Zero Power'
        }
        return value;
    }
    console.log(productType)
    return (
        <div className='bg-blue-100 h-full'>
            {powerTypes?.filter((f: IPowerTypes) => f.frameType === customType || f.frameType === 'sun + eye')?.map((item: IPowerTypes, index: number) => (
                <div
                key={index}
                onClick={() => goForward({ type: 'lens', title: item.title })}
                className="flex items-start justify-between p-1 bg-white hover:bg-gray-100 m-2 rounded-md cursor-pointer"
                >
                    <div>
                        <p className="px-1 font-bold mb-4">{modifyName(item.title)}</p>
                        <p className='px-1 text-sm'>{item.description}</p>
                    </div>
            
                    <ChevronRight />
                    </div>
            ))
            }
        </div>
    );
};

export default PowerTypeSection;