// /* eslint-disable @typescript-eslint/no-explicit-any */
// import ImagePreview from "@/component/ImagePreview";
// import PopularBrand from "@/component/PopularBrand";
// import WeeklyDeals from "@/component/WeeklyDeals";
// import GlassCardsGallary from "@/component/GlassCardsGallary";
// import BookAppointment from "@/component/BookAppointment";
// import NewArrivals from "@/component/NewArrival";
// import BestSelling from "@/component/BestSelling";
// import ContactLense from "@/component/ContactLense";
// import FindYourPerfectGlass from "@/component/FindYourPerfectGlass";
// import MensSunglass from "@/component/MensSunglass";
// import WomenSunglass from "@/component/WomenSunglass";
// import Kidsglass from "@/component/KidsGlasses";
// import ShopByFrameShape from "@/component/ShopByFrameShape";
// import TopFooter from "@/component/TopFooter";
// import Footer from "@/component/Footer";
// import { TData, TDataWithoutMeta, TFrame, TWeeklyDeals } from "@/ts-definition/types";
// import MobileBanner from "@/component/MobileBanner";
// import FeaturedCategory from "@/component/FeaturedCategory";
// import MobileImageGrid from "@/component/MobileImageGrid";
// import MobileBookAppointment from "@/component/MobileBookAppointment";
// import DesignedSunglasses from "@/component/DesignedSunglasses";
// import MobileLensSection from "@/component/MobileLensSection";
// import HomeBlogSection from "@/component/HomeBlogSection";
// import { getBanners, getcontactLens, getWeeklyDeals } from "@/fetchData/fetchFrameData";
// import { IBanner } from "@/ts-definition/interfaces";


// async function getProduct(value:string) {

//   if(value === 'weeklyDeals'){
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}search/get-items`);

//   if (!res.ok) throw new Error("Failed to fetch frames");

//   return res.json();
//   }

//   if(value === 'newArrivals'){
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products?weeklyDeals=false&limit=12&page=1`, {
    
//     next: { tags: ["frames"] },
//   });

//   if (!res.ok) throw new Error("Failed to fetch frames");

//   return res.json();
//   }

//   if(value === 'sold'){
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products?weeklyDeals=false&sort=-sold&limit=12&page=1`, {
    
//     next: { tags: ["frames"] },
//   });

//   if (!res.ok) throw new Error("Failed to fetch frames");

//   return res.json();
//   }

//   if(value === 'biologyCategoryMan'){
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products?weeklyDeals=false&biologyCategory=men&limit=12&page=1`, {
    
//     next: { tags: ["frames"] },
//   });

//   if (!res.ok) throw new Error("Failed to fetch frames");

//   return res.json();
//   }

//   if(value === 'biologyCategoryWomen'){
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products?weeklyDeals=false&biologyCategory=women&limit=12&page=1`, {
    
//     next: { tags: ["frames"] },
//   });

//   if (!res.ok) throw new Error("Failed to fetch frames");

//   return res.json();
//   }

//   if(value === 'biologyCategoryKids'){
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products?weeklyDeals=false&biologyCategory=kids&limit=12&page=1`, {
    
//     next: { tags: ["frames"] },
//   });

//   if (!res.ok) throw new Error("Failed to fetch frames");

//   return res.json();
//   }
// }

export default async function Home() {

  // const contactLensData = await getcontactLens({});
  // const allContactLensData = contactLensData?.data?.data;

  // const frameWithDeals = await getProduct('weeklyDeals') as TDataWithoutMeta<TFrame>;
  // const allFramesWithDeals = Array.isArray(frameWithDeals?.data) ? frameWithDeals?.data?.filter((item:any) => item.weeklyDeals === true) : [];
  // const frameWithNewArrivals = await getProduct('newArrivals') as TData<TFrame>;
  // const allFramesWithNewArrivals = Array.isArray(frameWithNewArrivals?.data?.data) ? frameWithNewArrivals?.data?.data : [];

  // const frameWithBestSaling = await getProduct('sold') as TData<TFrame>;
  // const allFramesWithBestSelling = Array.isArray(frameWithBestSaling?.data?.data) ? frameWithBestSaling?.data?.data : [];

  // const frameWithMen = await getProduct('biologyCategoryMan') as TData<TFrame>;
  // const allFramesWithMan = Array.isArray(frameWithMen?.data?.data) ? frameWithMen?.data?.data : [];

  // const frameWithWoMen = await getProduct('biologyCategoryWomen') as TData<TFrame>;
  // const allFramesWithWomen = Array.isArray(frameWithWoMen?.data?.data) ? frameWithWoMen?.data?.data : [];

  // const frameWithKids = await getProduct('biologyCategoryKids') as TData<TFrame>;
  // const allFramesWithKids = Array.isArray(frameWithKids?.data?.data) ? frameWithKids?.data?.data : [];


  // const getWeeklyDealsDate = await getWeeklyDeals() as TDataWithoutMeta<TWeeklyDeals>;
  // const getWeeklyDealsData = getWeeklyDealsDate?.data

  // const allBanners = await getBanners() as TData<IBanner[]>;
  // const bannerData = allBanners?.data?.data;


  return (
    <div className="bg-blue-50">
        {/* <MobileBanner bannerData={bannerData}/>
        <ImagePreview bannerData={bannerData}/>
        <PopularBrand bannerData={bannerData}/>
        <WeeklyDeals dealsData={getWeeklyDealsData }/>
        <GlassCardsGallary data={allFramesWithDeals} dealsData={getWeeklyDealsData}/>
        <FeaturedCategory bannerData={bannerData}/> */}
        {/* <LatestCollections/> */}
        {/* <BookAppointment bannerData={bannerData}/>
        <NewArrivals data={allFramesWithNewArrivals}/>
        <BestSelling data={allFramesWithBestSelling}/>
        <MobileImageGrid bannerData={bannerData}/>
        <MobileBookAppointment bannerData={bannerData}/>
        <DesignedSunglasses bannerData={bannerData}/>
        <MobileLensSection bannerData={bannerData}/>
        <ContactLense contactLens={allContactLensData} bannerData={bannerData}/>
        <FindYourPerfectGlass bannerData={bannerData}/>
        <MensSunglass data={allFramesWithMan} bannerData={bannerData}/>
        <WomenSunglass data={allFramesWithWomen} bannerData={bannerData}/>
        <Kidsglass data={allFramesWithKids} bannerData={bannerData}/>
        <ShopByFrameShape/>
        <HomeBlogSection/>
        <TopFooter/>
        <Footer/>  */}
        {/* <GlassTryOn/> */}
    </div>
  );
}
