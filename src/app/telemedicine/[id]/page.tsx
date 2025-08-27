/* eslint-disable @typescript-eslint/no-explicit-any */
import { telemedicineData } from "@/component/telemedicineData";
import Doctor from "@/component/UI/doctorDetail/Doctor";
import OtherInfo from "@/component/UI/doctorDetail/OtherInfo";

const SingleDoctorProfile = async ({params}: any) => {

    const {id} = await params
    console.log(id)
    const getSingleDoctor =  telemedicineData.find((_, index:number) => (index + 1) === Number(id));
   
    if(!getSingleDoctor) return;

    return (
        <div>
            <Doctor getSingleDoctor={getSingleDoctor} />
            <OtherInfo/>
        </div>
    );
};

export default SingleDoctorProfile;