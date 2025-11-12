/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import GlassCardAuto from "./GlassCardAuto";
import { TLens } from "@/ts-definition/types";
import Pagination from "../Pagination";

export type Props = {
  data: TLens[];
  currentPage: number;
  totalPage:number;
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
  

  return (
    <div className="w-full">
  {/* Sort Bar */}
  <div className="w-full bg-gray-200 py-2 px-3 flex items-center justify-end">
    <div className="flex items-center justify-between w-auto">
      <label className="text-blue-500 mx-2">SORT BY:</label>
      <select
        className="border border-black rounded px-2 py-1"
        onChange={handleSortChange}
      >
        <option value="">Price</option>
        <option value="salesPrice">Price (Low → High)</option>
        <option value="-salesPrice">Price (High → Low)</option>
      </select>
    </div>
  </div>

  {/* Product Grid Section */}
  <section className="w-full p-4 flex flex-col items-center">
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
        ({ color, name, brand, salesPrice, badge, images, otherImages, _id }: any, index: number) => (
          <GlassCardAuto
            key={index}
            color={color}
            images={images}
            otherImages={otherImages}
            badge={badge}
            salesPrice={salesPrice}
            name={name}
            brand={brand}
            _id={_id}
          />
        )
      )}
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
