"use client"

import HorizontalBrandScroll from './HorizontalBrandScroll';
import Title from './Title';
import HorizontalMobileBrandScroll from './HorizontalMobileBrandScroll';
import { IBanner } from '@/ts-definition/interfaces';

const PopularBrand = ({bannerData}: {bannerData:IBanner[]}) => {
    return (
        <div className='w-full md:mt-5 lg:mt-5 mt-0'>
            <Title value='OUR POPULAR BRANDS'/>
            <HorizontalBrandScroll bannerData={bannerData}/>
            <HorizontalMobileBrandScroll bannerData={bannerData}/>
        </div>
    );
};

export default PopularBrand;