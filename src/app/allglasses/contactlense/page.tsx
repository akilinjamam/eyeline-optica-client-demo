import ProductGallery from '@/component/UI/ProductGallery';
import { getcontactLens } from '@/fetchData/fetchFrameData';
import { TData, TLens } from '@/ts-definition/types';
import React from 'react';

const Contactlense:React.FC = async () => {
    const contactlens = await getcontactLens("") as TData<TLens>;
      const allLens = Array.isArray(contactlens?.data?.data) ? contactlens?.data?.data : [];
    return (
        <>
            <ProductGallery data={allLens}/>
        </>
    );
};

export default Contactlense;