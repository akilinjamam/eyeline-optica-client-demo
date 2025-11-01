"use client"
import { TLatestCollectionsData } from '@/ts-definition/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React from 'react';

const LatestCollectionCard:React.FC<TLatestCollectionsData> = ({image, type, value}) => {
    const router = useRouter();
    const handleClick = (value:string) => {
        const params = new URLSearchParams();
        if(value) params.set("shapeCategory", value);
        router.push(`/allglasses/brand?${params.toString()}`);
    }
    return (
        <div  className='w-[200px] '>
            <div className='flex items-center justify-center'>
                <Image width={150} src={image} alt='latest-collection'/>
            </div>
            <p className='text-center font-bold text-black'>{type}</p>
            <br />
            <button onClick={() => handleClick(value)} className='w-[70%] block mx-auto mt-2 py-2 text-white font-semibold rounded bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition cursor-pointer'>Explore</button>
        </div>
    );
};

export default LatestCollectionCard;