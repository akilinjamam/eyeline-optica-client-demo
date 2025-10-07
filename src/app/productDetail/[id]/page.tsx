/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/component/Footer";
import ShopByFrameShape from "@/component/ShopByFrameShape";
import TopFooter from "@/component/TopFooter";
import DetailPart from "@/component/UI/productDetail/DetailPart";
import ImagePart from "@/component/UI/productDetail/ImagePart";
import RegardingInfo from "@/component/UI/productDetail/RegardingInfo";
import { TData, TFrame, TLens } from "@/ts-definition/types";
import { notFound } from "next/navigation";



async function getSingleProduct(id: string) {

  const response = await fetch(
    `https://server.eyelineoptica.com/api/v1/products/get-single-product/${id}`,{
        next: {revalidate: 60}
    },

  );
  if (!response.ok) return null;
  return response.json();
}

async function getAllLensData(){
  const response = await fetch('https://server.eyelineoptica.com/api/v1/lens');
  return response.json();
};


type ParamsPromise = Promise<{ id: string }>;

export default async function SingleProduct({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params;
  const product = (await getSingleProduct(id)) as TData<TFrame>;
  
  if (!product?.data) return notFound();
  
  const frame = product?.data;

  const lensData = await getAllLensData() as TData<TLens[]>;

  const allLens = lensData?.data?.data?.map((item:TLens) => {
    return {
      type: "Lense",
      subType: item?.lensType,
      title: item?.name,
      features: item?.coatings?.map((coating:string) => coating),
      price: item?.salesPrice,
      images: item?.images?.map((img) => img),
      index: item?.index,
      material:item?.material,
      thickness: item?.thickness,
      color:item?.color,
      diameter:item?.diameter,
      warrenty:item?.warranty,
      deliveryTime:item?.deliveryTime,
      offer:item?.offer,
      rating:item?.rating,
      
    }
  });

  return (
    <div className="w-full bg-blue-50 px-1">
      <div className="w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-center border-y border-gray-400 flex-wrap">
        <div className="sm:w-full md:w-[55%] lg:w-[55%]">
          <ImagePart product={frame} />
        </div>
        <div className="sm:w-full md:w-[45%] lg:w-[45%]">
          <DetailPart product={frame as TFrame} lens={allLens as any} />
        </div>
      </div>

      <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
        <RegardingInfo data={frame as TFrame} />
      </div>
      <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
        <ShopByFrameShape />
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
}
