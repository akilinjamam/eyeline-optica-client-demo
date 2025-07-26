import ImagePreview from "@/component/ImagePreview";
import PopularBrand from "@/component/PopularBrand";
import WeeklyDeals from "@/component/WeeklyDeals";
import GlassCardsGallary from "@/component/GlassCardsGallary";
import LatestCollections from "@/component/LatestCollections";
import BookAppointment from "@/component/BookAppointment";

export default function Home() {
  return (
    <div className="bg-blue-50">
        <ImagePreview/>
        <PopularBrand/>
        <WeeklyDeals/>
        <GlassCardsGallary/>
        <LatestCollections/>
        <BookAppointment/>
    </div>
  );
}
