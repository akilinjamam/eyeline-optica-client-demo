/* eslint-disable @typescript-eslint/no-explicit-any */
import { glassData } from "@/component/glassData";
import DetailPart from "@/component/UI/productDetail/DetailPart";
import ImagePart from "@/component/UI/productDetail/ImagePart";



 const SingleProduct = async ({ params }: any) => {
  const { id } = params; // destructure inside function body
  const product = glassData.find((p) => p.id === Number(id));
  console.log(product)

  if (!product) return null;

  return (
    <div className='w-[1250px] mx-auto flex items-center'>
      <div className='w-[55%]'>
        <ImagePart product={product}/>
      </div>
      <div className='w-[45%]'>
        <DetailPart />
      </div>
    </div>
  );
};

export default SingleProduct
