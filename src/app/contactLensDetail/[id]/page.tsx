/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/component/Footer";
import ShopByFrameShape from "@/component/ShopByFrameShape";
import TopFooter from "@/component/TopFooter";
import DetailPartForContactLens from "@/component/UI/productDetail/DetailPartForContactLens";
import ImagePartForLens from "@/component/UI/productDetail/ImagePartForLens";
import RegardingInfo from "@/component/UI/productDetail/RegardingInfo";
import { TAccessory, TContactLens, TData, TLens } from "@/ts-definition/types";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";

async function getSingleLens(id: string) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}contact-lens/get-contact-lens-by-id/${id}`,{
        next: {revalidate: 60}
    },

  );
  if (!response.ok) return null;
  return response.json();
}


async function getAllAccessories(){
  const allAccessories = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}accessory/get-accessories`);

  if (!allAccessories.ok) return null;
  return allAccessories.json();
}

type ParamsPromise = Promise<{ id: string }>;

export default async function page({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params;
  const product = (await getSingleLens(id)) as TData<TContactLens>;
  const allAccessories = (await getAllAccessories()) as TData<TAccessory>;
  
  if (!product?.data) return notFound();
  if (!allAccessories?.data) return notFound();
  
  const singleLens = product?.data;
  const allAccessoryData = allAccessories?.data?.data;
  const addingNewFieldWithSingleLens = {...singleLens, additionalType:'contact-lens'}


  return (
    <div className="w-full bg-blue-50 px-1">
      <ToastContainer/>
      <div className="w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-start border-y border-gray-400 flex-wrap">
        <div className="sm:w-full md:w-[55%] lg:w-[55%]">
          <ImagePartForLens product={addingNewFieldWithSingleLens} />
        </div>
        <div className="sm:w-full md:w-[45%] lg:w-[45%]  ">
          <DetailPartForContactLens singleLens={addingNewFieldWithSingleLens as any} allAccessory={allAccessoryData as any} />
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
