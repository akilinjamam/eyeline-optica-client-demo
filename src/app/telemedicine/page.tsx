import Image from "next/image";
import telemedicineBanner from '../../../public/images/telemedicine/Group 366.png';
import Title from "@/component/Title";

import TelemidiceGallery from "@/component/TelemidiceGallery";
import TelemedicineServices from "@/component/TelemedicineServices";
import TelemedicineEyeTest from "@/component/TelemedicineEyeTest";
import Footer from "@/component/Footer";

const Telemedicine = () => {
    return (
        <div className="w-full bg-blue-50">
           <div className="w-full flex items-center justify-center ">
                <Image src={telemedicineBanner} alt="telemdicine-banner" />
           </div>
           <br />
           <div>
                <Title value='Our Specialists'/>
           </div>
           <div className="mt-10 lg:w-[80%] md:w-[90%] w-[100%] mx-auto">
                <TelemidiceGallery/>
                <br />
           </div>
           <div>
               <TelemedicineServices/>
           </div>
           <div>
               <TelemedicineEyeTest/>
           </div>
           <Footer/>
        </div>
    );
};

export default Telemedicine;