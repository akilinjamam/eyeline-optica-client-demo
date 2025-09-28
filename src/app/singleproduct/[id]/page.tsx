import Footer from "@/component/Footer";
import ShopByFrameShape from "@/component/ShopByFrameShape";
import TopFooter from "@/component/TopFooter";
import DetailPart from "@/component/UI/productDetail/DetailPart";
import ImagePart from "@/component/UI/productDetail/ImagePart";
import RegardingInfo from "@/component/UI/productDetail/RegardingInfo";
import { TData, TFrame } from "@/ts-definition/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getSingleProduct(id: string) {
  const response = await fetch(
    `https://eyeline-optica-server.onrender.com/api/v1/products/get-single-product/${id}`,
    { cache: "no-store" }
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

  const product = (await getSingleProduct(id)) as TData<TFrame>;
  if (!product?.data) return notFound();

  const frame = product.data;

  return (
    <div className="w-full bg-blue-50 px-1">
      <div className="w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-center border-y border-gray-400 flex-wrap">
        <div className="sm:w-full md:w-[55%] lg:w-[55%]">
          <ImagePart product={frame} />
        </div>
        <div className="sm:w-full md:w-[45%] lg:w-[45%]">
          <DetailPart {...(frame as TFrame)} />
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
