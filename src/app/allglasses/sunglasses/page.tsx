import ProductGallery from '@/component/UI/ProductGallery';
import { getFrame } from '@/fetchData/fetchFrameData';
import { TData, TFrame } from '@/ts-definition/types';
import React from 'react';

const Sunglasses =  async() => {
    const frame = await getFrame('sunglasses') as TData<TFrame>;
      const allFrames = Array.isArray(frame?.data?.data) ? frame?.data?.data : [];
    return (
        <>
            <ProductGallery data={allFrames} />
        </>
    );
};

export default Sunglasses;