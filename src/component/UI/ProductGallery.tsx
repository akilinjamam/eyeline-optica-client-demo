/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import GlassCardAuto from "./GlassCardAuto";
import { TFrame, TLens } from "@/ts-definition/types";
import Pagination from "../Pagination";

type Props = {
  data: TLens[];
  currentPage: number;
  totalPage:number;
};

const ProductGallery = ({ data,  currentPage, totalPage }: Props) => {


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
    <div className="w-full">
      <div className="w-full bg-gray-200 py-2 px-3 flex items-center justify-end">
        <div className="flex items-center justify-between w-auto">
          <label className="text-blue-500 mx-2">SORT BY:</label>
          <select
            className="border border-black"
            // value={currentSort}
            // onChange={handleSortChange}
          >
            <option value="bestseller">Best Sellers</option>
            <option value="price_asc">Price (Low → High)</option>
            <option value="price_desc">Price (High → Low)</option>
          </select>
        </div>
      </div>

      <section className="w-full p-2 flex flex-col items-center">
        <div className="flex gap-2 flex-wrap w-[70%] md:w-full lg:w-full">
          {data?.map(({ color, name, brand, salesPrice, badge, images, _id }: TFrame, index: number) => (
            <GlassCardAuto
              key={index}
              color={color}
              images={images}
              badge={badge}
              salesPrice={salesPrice}
              name={name}
              brand={brand}
              _id={_id}
            />
          ))}
        </div>

       {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={handleNextPage}
      />
      </section>
    </div>
  );
};

export default ProductGallery;
