import { ITelemedicineServiceData } from "@/ts-definition/interfaces";
import { telemidineServiceData } from "./telemedicineServiceData";
import Title from "./Title";
import Image from "next/image";

const TelemedicineServices = () => {
    return (
        <div className="w-full">
            <Title value="Our Services"/>
            <br />
            <section className="w-[80%] mx-auto ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                    {telemidineServiceData.map((service:ITelemedicineServiceData, index:number) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg py-5 flex flex-col items-center text-center hover:shadow-lg transition w-full h-full"
                    >
                        <div className="w-full h-[100px] flex items-center justify-center border-b-2 border-blue-400">
                            <Image src={service.img} width={90} alt="telemdicine-services"/>
                        </div>
                    
                        <p className="text-sm text-gray-600 mt-2 font-bold">{service.title}</p>
                    </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TelemedicineServices;