import { TLatestCollectionsData } from '@/ts-definition/interfaces';
import Image from 'next/image';
import React from 'react';

const FrameShapeCard:React.FC<TLatestCollectionsData> = ({image, type}) => {
    return (
        <div className='w-full '>
            <div className='flex items-center justify-center w-[200px]  mx-auto'>
                <Image width={150} src={image} alt='latest-collection'/>
            </div>
            <p className='text-center font-bold text-black'>{type}</p>
            
        </div>
    );
};

export default FrameShapeCard;