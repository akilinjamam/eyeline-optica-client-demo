import BrandCarouselSkeleton from "@/component/UI/sceleton/BrandScheleton";
import ImagePreviewScheleton from "@/component/UI/sceleton/ImagePreviewScheleton";
import MobileBannerSkeleton from "@/component/UI/sceleton/MobileBannerScheleton";
import MobileBrandCarouselSkeleton from "@/component/UI/sceleton/MobileBrandSceleton";
import TitleSkeleton from "@/component/UI/sceleton/TitleSceleton";
import WeeklyDealsSkeleton from "@/component/UI/sceleton/WeeklyDealsScheleton";

const loading = () => {
    return (
        <div className="bg-blue-50 h-[100vh] ">
            <MobileBannerSkeleton/>
            <ImagePreviewScheleton/>
            <TitleSkeleton/>
            <BrandCarouselSkeleton/>
            <MobileBrandCarouselSkeleton/>
            <WeeklyDealsSkeleton/>
        </div>
    );
};

export default loading;