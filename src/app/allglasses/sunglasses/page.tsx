import ProductGallery from '@/component/UI/ProductGallery';
import { getFrame } from '@/fetchData/fetchFrameData';
import { TData, TFrame } from '@/ts-definition/types';
import React from 'react';
import { PageProps } from '../page';

const Sunglasses =  async({ searchParams }: PageProps) => {
    const resolvedParams = await searchParams;
    const plainParams: Record<string, string> = {};
    if (resolvedParams) {
        for (const [key, value] of Object.entries(resolvedParams)) {
        plainParams[key] = Array.isArray(value) ? value[0] : value;
        }
    }

    const mergedParams = {type: "sunglasses", ...plainParams}

    const frame = await getFrame(mergedParams) as TData<TFrame>;
    const allFrames = Array.isArray(frame?.data?.data) ? frame?.data?.data : [];
    return (
        <>
            <ProductGallery data={allFrames} />
        </>
        );
    };

export default Sunglasses;