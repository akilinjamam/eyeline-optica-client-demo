import { TData, TLens } from '@/ts-definition/types';
import React from 'react';
import { PageProps } from '../allglasses/page';
import { getLens } from '@/fetchData/fetchFrameData';
import LensGallery from '@/component/UI/LensGallery';

const Lense = async ({ searchParams }: PageProps) => {

    const resolvedParams = await searchParams;
    const plainParams: Record<string, string> = {};
    if (resolvedParams) {
        for (const [key, value] of Object.entries(resolvedParams)) {
        plainParams[key] = Array.isArray(value) ? value[0] : value;
        }
    }

    const lens = await getLens(plainParams) as TData<TLens>;
    const allLens = Array.isArray(lens?.data?.data) ? lens?.data?.data : [];
   
    return (
        <>
            <LensGallery data={allLens}/>
        </>
    );
};

export default Lense;