import ProductGallery from '@/component/UI/ProductGallery';
import { getFrame } from '@/fetchData/fetchFrameData';
import { TData, TFrame } from '@/ts-definition/types';
import React from 'react';
import { PageProps } from '../page';
export const revalidate = 120; // ✅ enable ISR every 2 minutes


const Brand:React.FC = async ({ searchParams }: PageProps) => {

    const resolvedParams = await searchParams;
  const plainParams: Record<string, string> = {};
  if (resolvedParams) {
    for (const [key, value] of Object.entries(resolvedParams)) {
      plainParams[key] = Array.isArray(value) ? value[0] : value;
    }
  }

  const mergedParams = {page:"1",limit:"20",...plainParams}

     const frame = await getFrame(mergedParams) as TData<TFrame>;
      const allFrames = Array.isArray(frame?.data?.data) ? frame?.data?.data : [];
      const totalPage = frame?.data?.meta?.totalPage;
      const currentPage = frame?.data?.meta?.page;
    return (
        <>
            <ProductGallery data={allFrames} totalPage={totalPage as number} currentPage={currentPage as number}/>
        </>
    );
};

export default Brand;