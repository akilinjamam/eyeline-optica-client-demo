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

export default function Home() {
  return (
    <div className="bg-blue-50">
        <ImagePreview/>
        <PopularBrand/>
        <WeeklyDeals/>
        <GlassCardsGallary/>
        <LatestCollections/>
        <BookAppointment/>
        <NewArrivals/>
        <BestSelling/>
        <ContactLense/>
        <FindYourPerfectGlass/>
        <MensSunglass/>
        <WomenSunglass/>
        <Kidsglass/>
    </div>
  );
}
