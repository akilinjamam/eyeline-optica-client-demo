import ImagePreview from "@/component/ImagePreview";
import PopularBrand from "@/component/PopularBrand";
import WeeklyDeals from "@/component/WeeklyDeals";
import GlassCardsGallary from "@/component/GlassCardsGallary";
import LatestCollections from "@/component/LatestCollections";
import BookAppointment from "@/component/BookAppointment";
import NewArrivals from "@/component/NewArrival";
import BestSelling from "@/component/BestSelling";
import ContactLense from "@/component/ContactLense";

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
    </div>
  );
}
