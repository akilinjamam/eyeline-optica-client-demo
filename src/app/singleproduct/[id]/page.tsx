/* eslint-disable @typescript-eslint/no-explicit-any */
import { glassData } from "@/component/glassData";
import DetailPart from "@/component/UI/productDetail/DetailPart";
import ImagePart from "@/component/UI/productDetail/ImagePart";



 const SingleProduct = async ({ params }: any) => {
  const { id } = params; // destructure inside function body
  const product = glassData.find((p) => p.id === Number(id));
 
  if (!product) return null;

  return (
    <div className="w-full bg-blue-50">
        <div className='w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-center border-y border-gray-400 flex-wrap'>
            <div className='sm:w-full md:w-[55%] lg:w-[55%]'>
              <ImagePart product={product}/>
            </div>
            <div className='sm:w-full md:w-[45%] lg:w-[45%]'>
              <DetailPart />
            </div>
        </div>
    </div>
  );
};

export default SingleProduct
