import ProductGallery from '@/component/UI/ProductGallery';
import { getLens } from '@/fetchData/fetchFrameData';
import { TData, TLens } from '@/ts-definition/types';
import React from 'react';

const Lense = async () => {
    const frame = await getLens("") as TData<TLens>;
          const allLens = Array.isArray(frame?.data?.data) ? frame?.data?.data : [];
    return (
        <>
            <ProductGallery data={allLens}/>
        </>
    );
};

export default Lense;