"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useSearchParams } from 'next/navigation';
import { TAccessory } from '@/ts-definition/types';
import Pagination from '../Pagination';
import AccessoryCardAuto from './AccessoryCardAuto';

const AccessoryGallery = ({data, currentPage, totalPage}: {data:TAccessory[], currentPage:number, totalPage:number}) => {
    
    const managedData = data?.flatMap((item:TAccessory) => {
        const totalPrice = item?.items?.map(value => value.salesPrice)?.join('+');
        const name = item?.items?.map(value => value.name)?.join('+');
        const category = item?.items?.map(value => value.category)?.join('+');
        const brand = item?.items?.map(value => value.brand)?.join(',');
        return {
            _id:item._id,
            images:item?.images,
            type: item?.type,
            salesPrice: totalPrice,
            category,
            name,
            brand
        }
    })
    
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
                        managedData?.map(({name, brand, salesPrice, images, _id }: any, index: number) => <AccessoryCardAuto  images={images}  salesPrice={salesPrice} name={name} brand={brand} _id={_id} key={index}/> )
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

export default AccessoryGallery;