import { TData, TFrame } from "@/ts-definition/types";
import GlassCardsGallary from "./GlassCardsGallary";



async function getGlasses() {
    const res = await fetch("http://localhost:5000/api/v1/products", {
        next: {tags: ["glasses"]}
    });

    if(!res.ok) throw new Error("Failed to fetch glasses");

    return res.json();
}

const Glass = async () => {
    
    const frame = await getGlasses() as TData<TFrame>

    const allFrame = Array.isArray(frame?.data?.data) ? frame.data.data : [frame?.data?.data].filter(Boolean);

    return <GlassCardsGallary data={allFrame}/>
};

export default Glass;