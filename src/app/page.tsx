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

async function getProduct(value:string) {

  if(value === 'weeklyDeals'){
    const res = await fetch(`https://server.eyelineoptica.com/api/v1/products?weeklyDeals=true&limit=12&page=1`, {
    
    next: { tags: ["frames"] },
  });

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
  }

  if(value === 'newArrivals'){
    const res = await fetch(`https://server.eyelineoptica.com/api/v1/products?limit=12&page=1`, {
    
    next: { tags: ["frames"] },
  });

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
  }

  if(value === 'sold'){
    const res = await fetch(`https://server.eyelineoptica.com/api/v1/products?sort=-sold&limit=12&page=1`, {
    
    next: { tags: ["frames"] },
  });

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
  }

  if(value === 'biologyCategoryMan'){
    const res = await fetch(`https://server.eyelineoptica.com/api/v1/products?biologyCategory=men&limit=12&page=1`, {
    
    next: { tags: ["frames"] },
  });

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
  }

  if(value === 'biologyCategoryWomen'){
    const res = await fetch(`https://server.eyelineoptica.com/api/v1/products?biologyCategory=women&limit=12&page=1`, {
    
    next: { tags: ["frames"] },
  });

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
  }

  if(value === 'biologyCategoryKids'){
    const res = await fetch(`https://server.eyelineoptica.com/api/v1/products?biologyCategory=kids&limit=12&page=1`, {
    
    next: { tags: ["frames"] },
  });

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
  }
}

export default async function Home() {

  const frameWithDeals = await getProduct('weeklyDeals') as TData<TFrame>;
  const allFramesWithDeals = Array.isArray(frameWithDeals?.data?.data) ? frameWithDeals?.data?.data : [];
  const frameWithNewArrivals = await getProduct('newArrivals') as TData<TFrame>;
  const allFramesWithNewArrivals = Array.isArray(frameWithNewArrivals?.data?.data) ? frameWithNewArrivals?.data?.data : [];

  const frameWithBestSaling = await getProduct('sold') as TData<TFrame>;
  const allFramesWithBestSelling = Array.isArray(frameWithBestSaling?.data?.data) ? frameWithBestSaling?.data?.data : [];

  const frameWithMen = await getProduct('biologyCategoryMan') as TData<TFrame>;
  const allFramesWithMan = Array.isArray(frameWithMen?.data?.data) ? frameWithMen?.data?.data : [];

  const frameWithWoMen = await getProduct('biologyCategoryWomen') as TData<TFrame>;
  const allFramesWithWomen = Array.isArray(frameWithWoMen?.data?.data) ? frameWithWoMen?.data?.data : [];

  const frameWithKids = await getProduct('biologyCategoryKids') as TData<TFrame>;
  const allFramesWithKids = Array.isArray(frameWithKids?.data?.data) ? frameWithKids?.data?.data : [];

  return (
    <div className="bg-blue-50">
        <ImagePreview/>
        <PopularBrand/>
        <WeeklyDeals/>
        <GlassCardsGallary data={allFramesWithDeals}/>
        <LatestCollections/>
        <BookAppointment/>
        <NewArrivals data={allFramesWithNewArrivals}/>
        <BestSelling data={allFramesWithBestSelling}/>
        <ContactLense/>
        <FindYourPerfectGlass/>
        <MensSunglass data={allFramesWithMan}/>
        <WomenSunglass data={allFramesWithWomen}/>
        <Kidsglass data={allFramesWithKids}/>
        <ShopByFrameShape/>
        <TopFooter/>
        <Footer/> 
        {/* <GlassTryOn/> */}
    </div>
  );
}
