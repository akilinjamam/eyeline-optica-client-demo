"use client"
import { IPowerTypes } from '@/ts-definition/interfaces';
import { GoForwardPayload } from '@/ts-definition/types';
import { ChevronRight } from 'lucide-react';
import React from 'react';



const PowerTypeSection = ({powerTypes, goForward}: {powerTypes: IPowerTypes[], goForward: (payload: GoForwardPayload) => void }) => {
    return (
        <div>
            {powerTypes.map((item: IPowerTypes, index: number) => (
                <div
                key={index}
                onClick={() => goForward({ type: 'lenses', title: item.title })}
                className="flex items-start justify-between p-1 bg-gray-100 hover:bg-gray-200 m-2 rounded-md cursor-pointer"
                >
                    <div>
                        <p className="px-1 font-bold mb-4">{item.title}</p>
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