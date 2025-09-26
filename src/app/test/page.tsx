
import Footer from "@/component/Footer";
// import GlassCardsGallary from "@/component/GlassCardsGallary";
import { glassData } from "@/component/glassData";
import ShopByFrameShape from "@/component/ShopByFrameShape";
import TopFooter from "@/component/TopFooter";
import DetailPart from "@/component/UI/productDetail/DetailPart";
import ImagePart from "@/component/UI/productDetail/ImagePart";
import RegardingInfo from "@/component/UI/productDetail/RegardingInfo";


const Test = () => {
    const product = glassData.find(glass => glass.id === 1);
    return (
        <div className="w-full bg-blue-50 px-1">
        <div className='w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-center border-y border-gray-400 flex-wrap'>
            <div className='sm:w-full md:w-[55%] lg:w-[55%]'>
              <ImagePart product={product}/>
            </div>
            <div className='sm:w-full md:w-[45%] lg:w-[45%]'>
              {product && <DetailPart {...product} />}
            </div>
        </div>
        <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto">
          <RegardingInfo/>
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

export default Test;