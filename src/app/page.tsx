import ImagePreview from "@/component/ImagePreview";
import PopularBrand from "@/component/PopularBrand";
import WeeklyDeals from "@/component/WeeklyDeals";
import GlassCardsGallary from "@/component/GlassCardsGallary";
import LatestCollections from "@/component/LatestCollections";

export default function Home() {
  return (
    <div>
        <ImagePreview/>
        <PopularBrand/>
        <WeeklyDeals/>
        <GlassCardsGallary/>
        <LatestCollections/>
    </div>
  );
}
