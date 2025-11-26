/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/component/Footer";
import ShopByFrameShape from "@/component/ShopByFrameShape";
import TopFooter from "@/component/TopFooter";
import DetailPartForAccessory from "@/component/UI/productDetail/DetalPartForAccessory";
import ImagePartForLens from "@/component/UI/productDetail/ImagePartForLens";
import RegardingInfo from "@/component/UI/productDetail/RegardingInfo";
import { TAccessory,  TData } from "@/ts-definition/types";
import { notFound } from "next/navigation";

async function getSingleLens(id: string) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}accessory/get-accessory-by-id/${id}`
  );

  if (!response.ok) return null;
  return response.json();
}

type ParamsPromise = Promise<{ id: string }>;

export default async function page({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params;
  const product = (await getSingleLens(id)) as TData<TAccessory>;
  
  if (!product?.data) return notFound();
  
  const singleAccessory = product?.data as any;
  
  return (
    <div className="w-full bg-blue-50 px-1">
      <div className="w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-center border-y border-gray-400 flex-wrap">
        <div className="sm:w-full md:w-[55%] lg:w-[55%]">
          <ImagePartForLens product={singleAccessory} />
        </div>
        <div className="sm:w-full md:w-[45%] lg:w-[45%]">
          <DetailPartForAccessory singAccessory={singleAccessory as any} />
        </div>
      </div>

      <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
        <RegardingInfo data={singleAccessory as TAccessory} />
      </div>
      <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
        <ShopByFrameShape />
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
}
