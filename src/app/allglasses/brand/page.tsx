import ProductGallery from '@/component/UI/ProductGallery';
import { getFrame } from '@/fetchData/fetchFrameData';
import { TData, TFrame } from '@/ts-definition/types';
import React from 'react';

const Brand:React.FC = async () => {
     const frame = await getFrame({}) as TData<TFrame>;
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