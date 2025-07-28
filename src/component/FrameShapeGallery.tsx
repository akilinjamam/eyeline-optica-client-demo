import React, { FC } from 'react';
import { latestCollectionData } from './latestCollectionsElements';
import { TLatestCollectionsData } from '@/ts-definition/interfaces';
import FrameShapeCard from './FrameShapeCard';

const FrameShapeGallery:FC = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-[1200px] flex items-center justify-between gap-2.5'>
                {
                    latestCollectionData?.map(({image, type}:TLatestCollectionsData, index: number) => <FrameShapeCard key={index} image={image} type={type}/>)
                }
            </div>
        </div>
    );
};

export default FrameShapeGallery;