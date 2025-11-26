/* eslint-disable @typescript-eslint/no-explicit-any */
// import { telemedicineData } from "@/component/telemedicineData";
import Doctor from "@/component/UI/doctorDetail/Doctor";
import OtherInfo from "@/component/UI/doctorDetail/OtherInfo";
import { getDoctors, getSlots } from "@/fetchData/fetchFrameData";
import { IDoctor } from "@/ts-definition/interfaces";

const SingleDoctorProfile = async ({params}: any) => {

    const telemedicineData = await getDoctors();
    const allDoctorData = telemedicineData?.data?.data;
    
    const {id} = await params
    console.log(id)
    const getSingleDoctor =  allDoctorData.find((item:IDoctor) => item?._id === id);

    const slotData = await getSlots(id);
    const allSlotData = slotData?.data;
    
    if(!getSingleDoctor) return;

    return (
        <div className="bg-white h-[100vh]">
            <Doctor getSingleDoctor={getSingleDoctor} />
            <OtherInfo getSingleDoctor={getSingleDoctor} allSlotData={allSlotData}/>
        </div>
    );
};

export default SingleDoctorProfile;