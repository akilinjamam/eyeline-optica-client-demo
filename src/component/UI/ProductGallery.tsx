import React, { FC } from 'react';
import { glassData } from '../glassData';
import { GlassCardProps } from '@/ts-definition/interfaces';
import GlassCard from '../GlassCard';

const ProductGallery:FC = () => {
    return (
        <div className=' w-full'>
            <div className='w-full bg-gray-200 py-2 px-3 flex items-center justify-end' >
                <div className='flex items-center justify-between w-[170px] '>
                    <label htmlFor="" className='text-blue-500'>SORT BY:</label>
                    <select name="" id="" className='border border-black'>
                        <option value="hello">Best Sellers</option>
                        <option value="hello">hello</option>
                        <option value="hello">hello</option>
                    </select>
                </div>
            </div>
            <section className='w-full p-2 flex items-start justify-start'>
                <div className='flex gap-2 flex-wrap w-full'>
                    {
                        glassData?.map(({colorCount, title, model, price, tag, image }: GlassCardProps, index: number) => <GlassCard colorCount={colorCount} image={image} tag={tag} price={price} title={title} model={model} key={index}/> )
                    }
                </div>
            </section>
        </div>
    );
};

export default ProductGallery;