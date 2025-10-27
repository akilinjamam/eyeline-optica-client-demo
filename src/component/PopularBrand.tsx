"use client"
import {FC} from 'react';
import HorizontalBrandScroll from './HorizontalBrandScroll';
import Title from './Title';
import HorizontalMobileBrandScroll from './HorizontalMobileBrandScroll';

const PopularBrand:FC = () => {
    return (
        <div className='w-full md:mt-5 lg:mt-5 mt-2'>
            <Title value='OUR POPULAR BRANDS'/>
            <HorizontalBrandScroll/>
            <HorizontalMobileBrandScroll/>
        </div>
    );
};

export default PopularBrand;