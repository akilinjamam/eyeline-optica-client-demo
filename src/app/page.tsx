import ImagePreview from "@/component/ImagePreview";
import PopularBrand from "@/component/PopularBrand";
import WeeklyDeals from "@/component/WeeklyDeals";
import GlassCardsGallary from "@/component/GlassCardsGallary";
import LatestCollections from "@/component/LatestCollections";
import BookAppointment from "@/component/BookAppointment";
import NewArrivals from "@/component/NewArrival";
import BestSelling from "@/component/BestSelling";
import ContactLense from "@/component/ContactLense";
import FindYourPerfectGlass from "@/component/FindYourPerfectGlass";
import MensSunglass from "@/component/MensSunglass";
import WomenSunglass from "@/component/WomenSunglass";
import Kidsglass from "@/component/KidsGlasses";
import ShopByFrameShape from "@/component/ShopByFrameShape";
import TopFooter from "@/component/TopFooter";
import Footer from "@/component/Footer";
import { TData, TFrame } from "@/ts-definition/types";

// import GlassTryOn from "@/component/GlassTryOnV2";

async function getFrame() {
  const res = await fetch(`https://server.eyelineoptica.com/api/v1/products`, {
    
    next: { tags: ["frames"] },
  });

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
}

export default async function Home() {

  const frame = await getFrame() as TData<TFrame>;
  const allFrames = Array.isArray(frame?.data?.data) ? frame?.data?.data : [];

  return (
    <div className="bg-blue-50">
        <ImagePreview/>
        <PopularBrand/>
        <WeeklyDeals/>
        <GlassCardsGallary data={allFrames}/>
        <LatestCollections/>
        <BookAppointment/>
        <NewArrivals data={allFrames}/>
        <BestSelling data={allFrames}/>
        <ContactLense/>
        <FindYourPerfectGlass/>
        <MensSunglass data={allFrames}/>
        <WomenSunglass data={allFrames}/>
        <Kidsglass data={allFrames}/>
        <ShopByFrameShape/>
        <TopFooter/>
        <Footer/>
        {/* <GlassTryOn/> */}
    </div>
  );
}
