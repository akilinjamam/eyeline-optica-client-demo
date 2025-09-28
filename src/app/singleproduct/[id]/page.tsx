/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/component/Footer";
// import GlassCardsGallary from "@/component/GlassCardsGallary";
import ShopByFrameShape from "@/component/ShopByFrameShape";
import TopFooter from "@/component/TopFooter";
import DetailPart from "@/component/UI/productDetail/DetailPart";
import ImagePart from "@/component/UI/productDetail/ImagePart";
import RegardingInfo from "@/component/UI/productDetail/RegardingInfo";
import { TData, TFrame } from "@/ts-definition/types";

async function getSingleProduct(){
  const response = await fetch(`https://eyeline-optica-server.onrender.com/api/v1/products`,{
    
    next: { tags: ["frames"] },
  })

  return response.json();
}



 const SingleProduct = async ({ params }: any) => {
  const allData = await getSingleProduct() as TData<TFrame[]>;
  const data = allData?.data?.data;

  const { id } = await params;
  const product = data?.find((p) => p._id === id as string);
 
  if (!product) return null;

  return (
    <div className="w-full bg-blue-50 px-1">
        <div className='w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-center border-y border-gray-400 flex-wrap'>
            <div className='sm:w-full md:w-[55%] lg:w-[55%]'>
              <ImagePart product={product}/>
            </div>
            <div className='sm:w-full md:w-[45%] lg:w-[45%]'>
              <DetailPart {...product} />
            </div>
        </div>
        <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
          <RegardingInfo data={product}/>
        </div>
        <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
          {/* <GlassCardsGallary/> */}
          <ShopByFrameShape/>
        </div>
        <TopFooter/>
        <Footer/>
    </div> 
  );
};

export default SingleProduct
