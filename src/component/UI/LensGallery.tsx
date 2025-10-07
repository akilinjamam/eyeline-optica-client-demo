/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {TLens } from '@/ts-definition/types';
import LensCardAuto from './LensCardAuto';
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from '../Pagination';

const LensGallery = ({data, currentPage, totalPage}: {data:TLens[], currentPage:number, totalPage:number}) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    
    //   const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const sortValue = event.target.value;
    //     const params = new URLSearchParams(searchParams);
    //     params.set("sort", sortValue);
    //     router.push(`?${params.toString()}`); // 🔁 updates URL → triggers new server render
    //   };
    
      const handleNextPage = (value:any) => {
        const params = new URLSearchParams(searchParams);
        if(currentPage <= totalPage){
            params.set("page", String(value));
            router.push(`?${params.toString()}`);
        }
      };

    return (
        <div className=' w-full'>
            <div className='w-full bg-gray-200 py-2 px-3 flex items-center justify-end' >
                <div className='flex items-center justify-between w-auto '>
                    <label htmlFor="" className='text-blue-500 mx-2'>SORT BY:</label>
                    <select name="" id="" className='border border-black'>
                        <option value="hello">Best Sellers</option>
                        <option value="hello">hello</option>
                        <option value="hello">hello</option>
                    </select>
                </div>
            </div>
            <section className='w-full p-2 flex items-center justify-center '>
                <div className='flex gap-2 flex-wrap w-[70%] md:w-full lg:w-full '>
                    {
                        data?.map(({color, name, brand, salesPrice, images, _id, purchasePrice, stock, category, lensType, material }: TLens, index: number) => (
                            <LensCardAuto
                                color={color}
                                images={images}
                                salesPrice={salesPrice}
                                name={name}
                                brand={brand}
                                _id={_id}
                                purchasePrice={purchasePrice}
                                stock={stock}
                                category={category}
                                lensType={lensType}
                                material={material}
                                key={index}
                            />
                        ))
                    }
                </div>
            </section>
             {/* Pagination Component */}
                <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={handleNextPage}
                />
        </div>
    );
};

export default LensGallery;