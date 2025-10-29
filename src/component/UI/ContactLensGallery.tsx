"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useSearchParams } from 'next/navigation';
import ContactLensCardAuto from './ContactLensCardAuto';
import { TContactLens, } from '@/ts-definition/types';
import Pagination from '../Pagination';

const ContactLensGallery = ({data, currentPage, totalPage}: {data:TContactLens[], currentPage:number, totalPage:number}) => {

    const router = useRouter();
    const searchParams = useSearchParams();
        
          const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const sortValue = event.target.value;
            const params = new URLSearchParams(searchParams);
            params.set("sort", sortValue);
            router.push(`?${params.toString()}`); // 🔁 updates URL → triggers new server render
          };
        
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
                    <select onChange={handleSortChange} name="" id="" className='border border-black'>
                        <option value="">Price</option>
                        <option value="salesPrice">Price (Low → High)</option>
                        <option value="-salesPrice">Price (High → Low)</option>
                    </select>
                </div>
            </div>
            <section className='w-full p-4 flex flex-col items-center'>
                <div className='grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-4
                w-full
                max-w-7xl'>
                    {
                        data?.map(({color, name, brand, salesPrice, images, _id }: TContactLens, index: number) => <ContactLensCardAuto color={color} images={images}  salesPrice={salesPrice} name={name} brand={brand} _id={_id} key={index}/> )
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

export default ContactLensGallery;