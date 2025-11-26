import DoctorTag from "@/component/DoctorTag";
import { IDoctor } from "@/ts-definition/interfaces";
import { Calendar } from "lucide-react";
import Image from "next/image";
import defaultImg from "../../../../public/images/telemedicine/user.jpg";

const Doctor = ({getSingleDoctor}: {getSingleDoctor: IDoctor}) => {
  
    return (
        <div className="w-full text-black">
            <section className="w-full h-auto bg-gradient-to-r from-blue-100 to-blue-200 py-3">
                <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-[65%_35%] h-full">
                
                {/* Left Column */}
                <div className=" flex items-center justify-center">
                   <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[30%_70%] h-full">
                
                    {/* Left Column */}
                    <div className="flex items-center justify-center p-1 ">
                        <Image src={getSingleDoctor.images?.[0] as string || defaultImg}  width={240} height={240} alt="single-doctor-image" className="border-4 border-white rounded-3xl"/>
                    </div>

                    {/* Right Column */}
                    <div className=" flex items-start justify-center p-1">
                        <div className="w-full h-auto p-2 text-center lg:text-left md:text-left">
                            <p className="font-bold text-xl lg:ml-3 md:ml-3">{getSingleDoctor.name}</p>
                            <p className="mb-3 lg:ml-3 md:ml-3">{getSingleDoctor.studies?.map((item:string) => item)?.join(",") as string}</p>
                            <div className="px-3 flex items-center justify-center md:justify-start lg:justify-start ">
                                <DoctorTag text={getSingleDoctor.specialities?.map((item:string) => item)?.join(",") as string} charWidth={12} />
                            </div>
                            <br />
                            <div className="lg:w-[400px] md:w-[400px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                <div className="text-center lg:border-r-2 lg:border-gray-400">
                                    <p className="text-blue-400">Total Experience</p>
                                    <p className="font-bold">{getSingleDoctor.totalExperience}</p>
                                </div>
                                <div className="text-center lg:border-r-2 lg:border-gray-400">
                                    <p className="text-blue-400 ">BMDC Number</p>
                                    <p className="font-bold">will be added</p>
                                </div>
                                {/* <div className="text-center">
                                    <p className="text-blue-400">Ratings</p>
                                    <div className="flex items-center justify-center gap-1 mt-2 text-blue-600 mx-auto ">
                                        <span className="text-sm text-gray-700">({getSingleDoctor.reviews})</span>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={i < getSingleDoctor.reviews ? "fill-blue-500 text-blue-500" : "text-white"}
                                                />
                                            ))}
                                        </div>
                                </div> */}
                            </div>
                            <br />
                            <div className="ml-3">
                                <p className="text-blue-500">Working in : <span className="text-black">CHITTAGONG EYE INFIRMARY & TRAINING COMPLEX</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                {/* Right Column */}
                <div className=" flex items-center justify-center p-6">
                   <div className="text-center">
                        <p className="font-semibold text-2xl">Consultation Fee</p>
                        <p className="text-5xl font-semibold text-blue-500 ">{getSingleDoctor?.appointmentFee} BDT</p>
                        <br />
                       
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-md transition">
                            <Calendar size={18} className="text-white" />
                            Book Online Appointment
                        </button>
                       
                   </div>
                </div>
            </div>
            </section>
        </div>

    );
};

export default Doctor;