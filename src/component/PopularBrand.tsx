"use client"
import {FC} from 'react';
import HorizontalBrandScroll from './HorizontalBrandScroll';
import Title from './Title';

const PopularBrand:FC = () => {
    return (
        <div className='w-full mt-5'>
            <Title value='OUR POPULAR BRANDS'/>
            <HorizontalBrandScroll/>
        </div>
    );
};

export default PopularBrand;