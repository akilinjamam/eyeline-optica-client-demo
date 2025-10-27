import Image from "next/image";
import img from "../../public/images/mobile-book-appointment-banner.png"

const MobileBookAppointment = () => {
    return (
        <div className="w-full h-64 bg-gradient-to-t from-blue-300 to-white flex items-center justify-center md:hidden lg:hidden ">
            <Image src={img} alt="mobile-banner-image" />
        </div>
    );
};

export default MobileBookAppointment;