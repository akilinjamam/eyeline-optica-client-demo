/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/component/Footer";
import ShopByFrameShape from "@/component/ShopByFrameShape";
import TopFooter from "@/component/TopFooter";
import DetailPartForLens from "@/component/UI/productDetail/DetailPartForLens";
import ImagePart from "@/component/UI/productDetail/ImagePart";
import RegardingInfo from "@/component/UI/productDetail/RegardingInfo";
import { TData, TLens } from "@/ts-definition/types";
import { notFound } from "next/navigation";

async function getSingleLens(id: string) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}lens/get-lens-by-id/${id}`,{
        next: {revalidate: 60}
    },

  );
  if (!response.ok) return null;
  return response.json();
}

type ParamsPromise = Promise<{ id: string }>;

export default async function SingleProduct({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params;
  const product = (await getSingleLens(id)) as TData<TLens>;
  
  if (!product?.data) return notFound();
  
  const singleLens = product?.data;


  return (
    <div className="w-full bg-blue-50 px-1">
      <div className="w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-center border-y border-gray-400 flex-wrap">
        <div className="sm:w-full md:w-[55%] lg:w-[55%]">
          <ImagePart product={singleLens} />
        </div>
        <div className="sm:w-full md:w-[45%] lg:w-[45%]">
          <DetailPartForLens singleLens={singleLens as any}  />
        </div>
      </div>

      <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
        <RegardingInfo data={singleLens as TLens} />
      </div>
      <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
        <ShopByFrameShape />
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
}
