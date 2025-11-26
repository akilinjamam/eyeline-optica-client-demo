"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useSearchParams } from 'next/navigation';
import { TAccessory } from '@/ts-definition/types';
import Pagination from '../Pagination';
import AccessoryCardAuto from './AccessoryCardAuto';
import Image from 'next/image';
import filterIcon from "../../../public/icons/filter-icon.png";
import { useSidebar } from '@/context/SidebarContext';


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

    const {setIsSidebarOpen} = useSidebar()
    
    const router = useRouter();
    const searchParams = useSearchParams();
        
        
          const handleNextPage = (value:any) => {
            const params = new URLSearchParams(searchParams);
            if(currentPage <= totalPage){
                params.set("page", String(value));
                router.push(`?${params.toString()}`);
            }
          };
    
  


    return (
        <div className=' w-full'>
            <div className='w-full h-[40px] bg-gray-200 py-2 px-3 flex items-center justify-end' >
                <div className='flex items-center justify-between w-auto '>
                    {/* <label htmlFor="" className='text-blue-500 mx-2'>SORT BY:</label>
                    <select name="" id="" className='border border-black'>
                        <option value="hello">Best Sellers</option>
                        <option value="hello">hello</option>
                        <option value="hello">hello</option>
                    </select> */}
                </div>
            </div>
            <section className='w-full p-4 flex flex-col items-center'>
                <div className='grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-3
                    xl:grid-cols-3
                    gap-4
                    w-full
                    max-w-7xl'>
                    {
                        managedData?.map(({name, brand, salesPrice, images, _id }: any, index: number) => <AccessoryCardAuto  images={images}  salesPrice={salesPrice} name={name} brand={brand} _id={_id} key={index}/> )
                    }
                </div>
                <div className="w-full bg-white h-[60px] fixed md:hidden lg:hidden bottom-0 z-20 rounded-lg border-t-2 border-blue-500 flex items-center">
                                        <div onClick={() => setIsSidebarOpen(true)} className="w-full flex items-center justify-center cursor-pointer h-full">
                                            <div className="flex items-center">
                                                <div className="mr-2"><Image src={filterIcon} alt="all-products-icon" /></div>
                                                <p className="text-black">FILTER</p>
                                            </div>
                                        </div>
                                        
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