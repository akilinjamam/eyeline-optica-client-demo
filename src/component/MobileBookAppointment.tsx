import Image from "next/image";
// import img from "../../public/images/mobile-book-appointment-banner.png"
import { IBanner } from "@/ts-definition/interfaces";
import { bannerAccordingToCategory } from "@/fetchData/bannerAccordingToCategory";

const MobileBookAppointment = ({bannerData}: {bannerData:IBanner[]}) => {
    return (
        <div className="w-full h-64 bg-gradient-to-t from-blue-300 to-white flex items-center justify-center md:hidden lg:hidden px-1">
            <Image width={1000} height={1000} src={bannerAccordingToCategory("Mobile Book Appointment", bannerData) as string} alt="mobile-banner-image" />
        </div>
    );
};

export default MobileBookAppointment;