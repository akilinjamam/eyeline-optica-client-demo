/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import GlassCardAuto from "./GlassCardAuto";
import { TLens } from "@/ts-definition/types";
import Pagination from "../Pagination";
import Image from "next/image";
import filterIcon from "../../../public/icons/filter-icon.png";
import sortBy from "../../../public/icons/sort-by-icon.png";
import { useSidebar } from "@/context/SidebarContext";
import { useState } from "react";

export type Props = {
  data: TLens[];
  currentPage: number;
  totalPage:number;
  setIsFilterOpen?:any;
};

const ProductGallery = ({ data,  currentPage, totalPage }: Props) => {

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
  
   const { setIsSidebarOpen } = useSidebar();
   
  const [count, setCount] = useState(0)
  const handleMobileSort = () => {
  let value = ""
  
  if(count === 2){
    setCount(0);
  }else{
    setCount(count + 1)
  }

  if(count === 0) value = "salesPrice"
  if(count === 1) value = "-salesPrice"
  if(count === 2) value = ""
 
  const params = new URLSearchParams(searchParams);

  if (value) params.set("sort", value);
  else params.delete("sort");     // remove sort for default

  router.push(`?${params.toString()}`);
};
      
     
  return (
    <div className="w-full">
  {/* Sort Bar */}
  <div className="w-full bg-gray-200 py-2 px-3 flex items-center justify-end ">
    <div className="flex items-center justify-between w-auto">
      <label className="text-blue-500 mx-2">SORT BY:</label>
      <select
        className="border border-black rounded px-2 py-1 text-black"
        onChange={handleSortChange}
      >
        <option value="">Price</option>
        <option value="salesPrice">Price (Low → High)</option>
        <option value="-salesPrice">Price (High → Low)</option>
      </select>
    </div>
  </div>

  {/* Product Grid Section */}
  <section className="w-full p-4 flex flex-col items-center relative">
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-3
        xl:grid-cols-3
        gap-4
        w-full
        max-w-7xl
      "
    >
      {data?.map(
        ({ color, name, brand, salesPrice, badge, images, otherImages, _id, sizeCategory, rating }: any, index: number) => (
          <GlassCardAuto
            key={index}
            color={color}
            images={images}
            otherImages={otherImages}
            badge={badge}
            salesPrice={salesPrice}
            name={name}
            brand={brand}
            sizeCategory={sizeCategory}
            rating={rating}
            _id={_id}
          />
        )
      )}
    </div>
    <div className="w-full bg-white h-[60px] fixed md:hidden lg:hidden bottom-0 z-20 rounded-lg border-t-2 border-blue-500 flex items-center">
        <div onClick={() => setIsSidebarOpen(true)} className="w-[50%] flex items-center justify-center cursor-pointer border-r-2 border-blue-500 h-full">
            <div className="flex items-center">
                <div className="mr-2"><Image src={filterIcon} alt="all-products-icon" /></div>
                <p className="text-black">FILTER</p>
            </div>
        </div>
        <div className="w-[50%] flex items-center justify-center cursor-pointer">
          <div onClick={handleMobileSort}  className="flex items-center">
                <div className="mr-2"><Image src={sortBy} alt="all-products-icon" /></div>
                <p className="text-black">SORT BY PRICE</p>
            </div>
        </div>
    </div>
  </section>

  {/* Pagination Component */}
  <div className="flex justify-center mt-6">
    <Pagination
      currentPage={currentPage}
      totalPage={totalPage}
      onPageChange={handleNextPage}
    />
  </div>
</div>

  );
};

export default ProductGallery;
