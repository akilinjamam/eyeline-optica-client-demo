import { TData, TLens } from '@/ts-definition/types';
import React from 'react';
import { getLens } from '@/fetchData/fetchFrameData';
import LensGallery from '@/component/UI/LensGallery';
import { PageProps } from '@/app/allglasses/page';

const ProgressiveLense = async ({ searchParams }: PageProps) => {

    const resolvedParams = await searchParams;
    const plainParams: Record<string, string> = {};
    if (resolvedParams) {
        for (const [key, value] of Object.entries(resolvedParams)) {
        plainParams[key] = Array.isArray(value) ? value[0] : value;
        }
    }

    const lens = await getLens({lensType: "progressive",page:"1", limit:"20", ...plainParams}) as TData<TLens>;
    const allLens = Array.isArray(lens?.data?.data) ? lens?.data?.data : [];
    const page = lens?.data?.meta?.page;
    const totalPage = lens?.data?.meta?.totalPage
   
    return (
        <>
            <LensGallery data={allLens} currentPage={page as number} totalPage={totalPage as number}/>
        </>
    );
};

export default ProgressiveLense;