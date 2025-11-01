"use client"
import { TLatestCollectionsData } from '@/ts-definition/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const FrameShapeCard:React.FC<TLatestCollectionsData> = ({image, type, value}) => {
    const router = useRouter()
    return (
        <div onClick={() => router.push(`/allglasses/brand?shapeCategory=${value}`)} className='w-full cursor-pointer '>
            <div className='flex items-center justify-center w-[200px]  mx-auto'>
                <Image width={150} src={image} alt='latest-collection'/>
            </div>
            <p className='text-center font-bold text-black'>{type}</p>
            
        </div>
    );
};

export default FrameShapeCard;